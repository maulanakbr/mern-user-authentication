const express = require("express");
const {
  info,
  signup,
  login,
  verifyToken,
  accessUser,
  refreshToken,
  logout,
} = require("../controllers/user-controller");
const router = express.Router();

router.get("/", info);
router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, accessUser);
router.get("/refresh", refreshToken, verifyToken, accessUser);
router.post("/logout", verifyToken, logout);

module.exports = router;
