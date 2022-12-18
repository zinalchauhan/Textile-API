const dotenv = require("dotenv");
dotenv.config();
var mongoose = require("mongoose");
var express = require("express");
var app = express();
var multer = require("multer");
const path = require("path");
var bodyParser = require("body-parser");
const port = process.env.port || 3000;
var cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("upload"));
app.use(express.static(path.join(__dirname, "upload")));
app.use(express.static(path.join(__dirname, "public")));

const textileController = require("./controller/textileController");

app.use("/textile", textileController);
console.log(process.env.DATABASE);
mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((result) => {
    console.log("database connected...");
    app.listen(port, () => {
      console.log("server listening on port", port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
