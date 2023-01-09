const express = require("express");
const {
  info,
  signup,
  login,
  verifyToken,
  accessUser,
} = require("../controllers/user-controller");
const router = express.Router();

router.get("/", info);
router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, accessUser);

module.exports = router;
