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

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponses("Please provide email and password", 400));
  }

  try {
    const existingUser = await User.findOne({ email }).select("+password");

    if (!existingUser) {
      return next(new ErrorResponses("User not found. Please signup", 401));
    }

    const isCorrectPassword = await existingUser.correctPassword(password);

    if (!isCorrectPassword) {
      return next(new ErrorResponses("Invalid credentials", 401));
    }

    sendToken(existingUser, 201, res);
  } catch (err) {
    next(err);
  }

  // const token = await jwt.sign(
  //   {
  //     id: existingUser.id,
  //     fullname: existingUser.fullname,
  //     username: existingUser.username,
  //     email: existingUser.email,
  //   },
  //   process.env.JWT_SECRET_KEY,
  //   { expiresIn: "45s" }
  // );

  // console.log("Generated token");

  // if (req.cookies[`${existingUser.id}`]) {
  //   req.cookies[`${existingUser.id}`] = "";
  // }

  // res.cookie(String(existingUser.id), token, {
  //   path: "/",
  //   expires: new Date(Date.now() + 1000 * 30),
  //   httpOnly: true,
  //   sameSite: "lax",
  // });

  // return res
  //   .status(200)
  //   .json({ message: "Login successfully", user: existingUser, token });
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

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

// const verifyToken = async (req, res, next) => {
//   //   const headers = await req.headers["authorization"];
//   //   const token = headers.split(" ")[1]; // [0: Bearer] [1: Token]
//   const cookies = await req.headers.cookie;
//   const token = cookies.split("=")[1]; // [0: Cookie] [1: Token]

//   if (!token) {
//     res.status(400).json({
//       message: "No token found",
//     });
//   }

//   await jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
//     if (err) {
//       res.status(400).json({ message: "Invalid token" });
//     }
//     req.id = user.id;
//   });

//   next();
// };

const accessUser = async (req, res, next) => {
  const userId = req.id;

  let user;

  try {
    user = await User.findById(userId, "-password");
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ user });
};

const refreshToken = async (req, res, next) => {
  const cookies = await req.headers.cookie;
  const prevToken = cookies.split("=")[1]; // [0: Cookie] [1: Token]

  if (!prevToken) {
    res.status(404).json({ message: "Could not provide any token" });
  }

  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      res.status(404).json({ message: "Authentication failed" });
    }

    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "45s",
    });

    console.log("Regenerated token");

    res.cookie(String(user.id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30),
      httpOnly: true,
      sameSite: "lax",
    });

    req.id = user.id;
    next();
  });
};

const logout = async (req, res, next) => {
  const cookies = await req.headers.cookie;
  const prevToken = cookies.split("=")[1]; // [0: Cookie] [1: Token]

  if (!prevToken) {
    res.status(404).json({ message: "Could not provide any token" });
  }

  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      res.status(404).json({ message: "Authentication failed" });
    }

    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";

    return res.status(200).json({ message: "Logout successfully" });
  });

  console.log("Session ended");
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
  signup,
  login,
  forgotPassword,
  resetPassword,
  accessUser,
  refreshToken,
  logout,
};
