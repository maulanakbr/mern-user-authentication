require("dotenv").config();
const express = require("express");
const connectToDb = require("./config/db");
const errorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const router = require("./routes/user-routes");
const private = require("./routes/private");
const URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require("cors");

connectToDb();

// Middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", router);
app.use("/api/private", private);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err}`);
  server.close(() => process.exit(1));
});
