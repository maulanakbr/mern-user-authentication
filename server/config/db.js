const mongoose = require("mongoose");
require("dotenv").config();

const connectToDb = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {});

  console.log("Connected to Database");
};

module.exports = connectToDb;
