const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const router = require("./routes/user-routes");
const uri = process.env.MONGODB_URI;
const port = 3001;
const app = express();
const cors = require("cors");

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);

(async () => {
  try {
    await mongoose.connect(uri);
  } catch (err) {
    console.log(`There is an error ${err.message}`);
  }

  app.listen(port, () => {
    console.log(`Database is connected! Server running on ${port}`);
  });
})();
