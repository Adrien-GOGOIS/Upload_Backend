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

const upload = multer({ dest: "public/uploads" });

const users = [];

app.use(express.static("public"));

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/user", (req, res) => {
  console.log(req.body.username);
});

app.post("/users/", upload.single("img"), (req, res) => {
  console.log(req);
  fs.renameSync(
    req.file.path,
    path.join(req.file.destination, req.file.originalname)
  );

  res.send("Image reçue, c'est sympa merci");
});

app.listen(8000, () => {
  console.log("LISTENING...");
});
