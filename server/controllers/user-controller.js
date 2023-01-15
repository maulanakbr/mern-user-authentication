const User = require("../models/User");
const ErrorResponses = require("../utils/errorResponses");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

const info = async (req, res, next) => {
  const date = new Date().toLocaleString();

  try {
    const userLength = await User.estimatedDocumentCount();

    res.end(`<diV>
            <h1>Hello Admin</h1>
            <p>Total users: ${userLength}</p>
            <p>${date}</p></diV>`);
  } catch (err) {
    console.log(err);
  }
};

const dashboard = async (req, res, next) => {
  try {
    const user = await User.find({});

    if (user.length === 0) {
      return next(new ErrorResponses("Could not find any data", 400));
    }

    res.send(user);
  } catch (err) {
    next(err);
  }
};

const signup = async (req, res, next) => {
  const { fullname, username, email, password } = req.body;

  try {
    const takenEmail = await User.findOne({ email: email });
    const takenUsername = await User.findOne({ username: username });

    if (takenEmail || takenUsername) {
      return next(
        new ErrorResponses("Username or email has already been taken", 400)
      );
    }

    const user = new User({
      fullname,
      username,
      email,
      password,
    });

    await user.save();

    sendToken(user, 201, res);
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponses("Email and password is required", 400));
  }

  try {
    const existingUser = await User.findOne({ email }).select("+password");

    if (!existingUser) {
      return next(
        new ErrorResponses("User not found. Create new account", 401)
      );
    }

    const isCorrectPassword = await existingUser.correctPassword(password);

    if (!isCorrectPassword) {
      return next(new ErrorResponses("Invalid password", 401));
    }

    sendToken(existingUser, 201, res);
  } catch (err) {
    next(err);
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    console.log(user);

    if (!user) {
      return next(new ErrorResponses("Email could not be sent", 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetPassowordUrl = `http:localhost:3000/resetpassword/${resetToken}`;

    const userMessage = `
    <h1>You have requested a reset password</h1>
    <p>Please visit this link to reset your password</p>
    <a href=${resetPassowordUrl} clicktracking=off>${resetPassowordUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password reset request",
        text: userMessage,
      });

      res.status(200).json({
        success: true,
        message: "Email sent",
      });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponses("Emaild could not be sent", 500));
    }
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  const resetNewPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken: resetNewPasswordToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return next(new ErrorResponses("Invalid reset token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      message: "Password reset success",
    });
  } catch (err) {
    next(err);
  }
};

const userData = async (req, res, next) => {
  const userId = req.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorResponses("Could not find user data", 400));
    }

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

const sendToken = (user, status, res) => {
  const token = user.createToken();
  res.status(status).json({
    success: true,
    token,
  });
};

module.exports = {
  info,
  dashboard,
  signup,
  signin,
  forgotPassword,
  resetPassword,
  userData,
};
