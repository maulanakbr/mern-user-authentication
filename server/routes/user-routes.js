const express = require("express");
const {
  info,
  signup,
  login,
  forgotPassword,
  resetPassword,
  accessUser,
  refreshToken,
  logout,
} = require("../controllers/user-controller");
const { verifyToken } = require("../middleware/authCheck");
const router = express.Router();

router.get("/", info);
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);
router.get("/user", verifyToken, accessUser);
router.get("/refresh", refreshToken, verifyToken, accessUser);
router.post("/logout", verifyToken, logout);

module.exports = router;
