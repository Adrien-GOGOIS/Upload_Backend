const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

const upload = multer({ dest: "./public" });

const users = [];

app.use(express.static("public"));

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users/", upload.single("img"), (req, res) => {
  fs.renameSync(
    req.file.path,
    path.join(req.file.destination, req.file.originalname)
  );

  users.push({
    username: req.body.username,
    image: "/" + req.file.originalname,
  });

  res.json(users);
  console.log(users);
});

app.listen(8000, () => {
  console.log("LISTENING...");
});
