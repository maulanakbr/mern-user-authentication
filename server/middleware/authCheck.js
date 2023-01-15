const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponses = require("../utils/errorResponses");

exports.verifyToken = async (req, res, next) => {
  const headers = req.headers.authorization;

  let token;

  if (headers && headers.startsWith("Bearer")) {
    // [0: Bearer] [1: Token]
    token = headers.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponses("Token is not found", 400));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorResponses("No user found with selected id", 400));
    }

    req.id = user.id;
    next();
  } catch (err) {
    console.log(err);
    return next(new ErrorResponses("Not authorized to access this route", 404));
  }
};
