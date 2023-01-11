const ErrorResponses = require("../utils/errorResponses");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  if (err.code === 11000) {
    const message = "Duplicate field value";
    error = new ErrorResponses(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponses(message, 400);
  }

  res.status(error.status || 500).json({
    success: false,
    error: error.message || "Server error",
  });
};

module.exports = errorHandler;
