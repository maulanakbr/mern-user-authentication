const express = require("express");
const User = require("../models/users");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res, next) => {
  try {
    const userLogin = req.body;

    const currUser = await User.findOne({ username: userLogin.username });
    if (!currUser) {
      return res.json({ message: "Invalid username or password" });
    }

    const currUserPassword = await bcrypt.compare(
      userLogin.password,
      currUser.password
    );
    if (currUserPassword) {
      const payload = {
        fullname: currUser.fullname,
        username: currUser.username,
        email: currUser.email,
        id: currUser.id,
      };

      await jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 86400 },
        (err, token) => {
          if (err) return res.json({ message: err });
          return res.json({
            message: "Success",
            token: `Bearer ${token}`,
          });
        }
      );
    } else {
      return res.json({ message: "Invalid username or password" });
    }
  } catch (err) {
    next(err);
  }
});
