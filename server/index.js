const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const User = require("./models/users");

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

app.get("/", (req, res) => {
  res.end(`<diV>
  <h1>Hello Admin</h1>
  <p>Total users: ${User.length}</p>
  <p>${new Date().toLocaleString()}</p></diV>`);
});

app.get("/api/users", async (req, res, next) => {
  try {
    const user = await User.find({});
    res.json(user);
  } catch (err) {
    next(err);
  }
});

app.get("/api/users/:id", async (req, res, next) => {
  try {
    const id = await req.params.id;
    const user = await User.findById(id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

app.post("/api/users", async (req, res, next) => {
  try {
    const body = req.body;

    const userObj = await new User({
      fullname: body.fullname,
      username: body.username,
      email: body.email,
      password: body.password,
    });

    const user = await userObj.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
});

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
