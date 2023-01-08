const express = require("express");
const User = require("../models/users");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res, next) => {
  try {
    const user = req.body;

    const takenUsername = await User.findOne({ username: user.username });
    const takenEmail = await User.findOne({ email: user.email });

    if (takenUsername || takenEmail) {
      res
        .status(400)
        .send({ message: "Username or email has already been taken" });
    } else {
      user.password = await bcrypt.hash(req.body.password, 10);

      const userObj = new User({
        fullname: user.fullname,
        username: user.username.toLowerCase(),
        email: user.email,
        password: user.password,
      });

      userObj.save();
      res.json({ message: "Success" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
