const express = require("express");
const User = require("../models/users");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const user = await User.find({});
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
