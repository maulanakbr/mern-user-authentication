const express = require("express");
const errorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const router = require("./routes/user-routes");
const private = require("./routes/private");
const { MONGODB_URI } = require("./utils/config");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

(async function () {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(`Failed to connect: ${err}`);
  }
})();

// Middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", router);
app.use("/api/private", private);
app.use(errorHandler);

module.exports = app;
