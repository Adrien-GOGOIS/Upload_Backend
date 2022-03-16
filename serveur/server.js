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

const upload = multer({ dest: "../public/uploads" });

const users = [];

app.use(express.static("../public"));

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users/", upload.single("img"), (req, res) => {
  console.log(req.body);
  //   users.push(req.body.username);

  //   fs.renameSync(
  //     req.file.path,
  //     path.join(req.file.destination, req.file.originalname)
  //   );
  res.send("Image reçue, c'est sympa merci");
  res.json(users);
});

app.listen(8000, () => {
  console.log("LISTENING...");
});
