const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

const reqLogger = (req, res, next) => {
  console.log(`Method: ${req.method}`);
  console.log(`Path: ${req.path}`);
  console.log(`Body: ${JSON.stringify(req.body)}`);
  console.log("---");
  next();
};

app.use(express.json());
app.use(reqLogger);
app.use(cors());

app.use("/", require("./routes/info"));
app.use("/users", require("./routes/users"));
app.use("/register", require("./routes/register"));

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.log(err);

  next(err);
};

const port = process.env.MONGODB_PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
