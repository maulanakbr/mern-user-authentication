const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

(async () => {
  try {
    await mongoose.connect(uri);
    console.log("connected");
  } catch (err) {
    console.log(`There is an error ${err.message}`);
  }
})();

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
