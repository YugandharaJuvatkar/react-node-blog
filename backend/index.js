const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to DB"))
  .catch((e) => {
    console.log(e);
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, "hello.jpeg");
  },
});

const upload = multer({ storage: storage });
app.post("/api/v1/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/posts", postsRoute);
app.use("/api/v1/categories", categoryRoute);

app.listen("5000", () => {
  console.log("Listening on port 5000");
});
