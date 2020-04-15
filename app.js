const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const router = require("./routes/route");
// connect to mongodb
const mongo = require("mongodb");
const monk = require("monk");
var mondb = monk("localhost:27017/testmongodb");
// connect to MySQL
var mysql = require("mysql");
var mysqldb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mb2047809!!",
  database: "testmysqldb"
});

app.set("view engine", "ejs"); // ejs engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", function(req, res) {
  res.render("home");
});

app.use("/api", router);
app.use(express.static(__dirname + "/public"));

// mongodb <--> service
app.use(function(req, res, next) {
  req.mondb = mondb;
  next();
});
// sql <--> service ?

const port = 3000;
app.listen(port, function(req, res) {
  console.log(`Listening on port ${port}...`);
});
