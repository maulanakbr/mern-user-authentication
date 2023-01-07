const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URL;

(async () => {
  try {
    await mongoose.connect(url);
    console.log("connected");
  } catch (err) {
    console.log(`There is an error ${err.message}`);
  }
})();

// mongoose
//   .connect(url)
//   .then((res) => {
//     console.log("connected");
//   })
//   .catch((err) => {
//     console.log(`There is an error ${err.message}`);
//   });

const userSchema = new mongoose.Schema({
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
});

userSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("User", userSchema);
