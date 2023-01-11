const express = require("express");
const { private } = require("../controllers/private-data");
const { verifyToken } = require("../middleware/authCheck");
const router = express.Router();

router.get("/", verifyToken, private);

module.exports = router;
