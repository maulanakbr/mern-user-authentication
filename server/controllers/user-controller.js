const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

  let takenEmail;
  let takenUsername;

  try {
    takenEmail = await User.findOne({ email: email });
    takenUsername = await User.findOne({ username: username });
  } catch (err) {
    console.log(err);
  }

  if (takenEmail || takenUsername)
    return res
      .status(400)
      .json({ message: "Username or email has already been taken" });

  if (password.length <= 6)
    return res
      .status(400)
      .json({ message: "Password must be 6 or more characters" });

  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = new User({
    fullname,
    username,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }

  return res.status(201).json({ message: "Succesfully registered" });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }

  if (!existingUser)
    return res.status(400).json({
      message: "User not found. Please sign up",
    });

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect)
    return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign(
    {
      id: existingUser._id,
      fullname: existingUser.fullname,
      username: existingUser.username,
      email: existingUser.email,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "30s" }
  );

  res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 30),
    httpOnly: true,
    sameSite: "lax",
  });

  return res
    .status(200)
    .json({ message: "Login successfully", user: existingUser, token });
};

const verifyToken = (req, res, next) => {
  //   const headers = req.headers["authorization"];
  //   const token = headers.split(" ")[1]; // [0: Bearer] [1: Token]
  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1]; // [0: Cookie] [1: Token]

  if (!token) {
    res.status(400).json({
      message: "No token found",
    });
  }

  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      res.status(400).json({ message: "Invalid token" });
    }
    req.id = user.id;
  });

  next();
};

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

module.exports = {
  info,
  signup,
  login,
  verifyToken,
  accessUser,
};
