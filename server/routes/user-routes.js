const express = require("express");
const {
  info,
  dashboard,
  signup,
  signin,
  forgotPassword,
  resetPassword,
  userData,
} = require("../controllers/user-controller");
const { verifyToken } = require("../middleware/authCheck");
const router = express.Router();

router.get("/", info);
router.get("/dashboard", dashboard);
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);
router.get("/user", verifyToken, userData);

module.exports = router;
