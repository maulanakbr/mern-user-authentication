const express = require("express");
const User = require("../models/users");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const userLength = await User.estimatedDocumentCount();
    const date = new Date().toLocaleString();

    res.end(`<diV>
          <h1>Hello Admin</h1>
          <p>Total users: ${userLength}</p>
          <p>${date}</p></diV>`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
