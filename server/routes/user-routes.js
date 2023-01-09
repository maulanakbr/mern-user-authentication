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

// const verifyJWT = (req, res, next) => {
//   const token = req.headers["x-access-token"]?.split(" ")[1];

//   if (token) {
//     jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
//       if (err)
//         return res.json({
//           isLoggedIn: false,
//           message: "Failed to authenticate",
//         });

//       req.user = {};
//       req.user.id = decoded.id;
//       req.user.username = decoded.username;
//       next();
//     });
//   } else {
//     res.json({ message: "Incorrect token given", isLoggedIn: false });
//   }
// };

// router.get("/users/auth", verifyJWT, (req, res) => {
//   res.json({ isLoggedIn: true, username: req.user.username });
// });

// router.get("/users/:id", async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const user = await User.findById(id);
//     res.json(user);
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
