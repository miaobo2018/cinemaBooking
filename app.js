const express = require("express");
const app = express();
const router = require("./routes/route");
// connect to mongodb
const mongo = require("mongodb");
const monk = require("monk");
var mondb = monk("localhost:27017/testmongodb");
// connect to MySQL
var mysql = require("mysql");
var mysqlcon = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testmysqldb"
});

app.set("view engine", "ejs"); // ejs engine

app.get("/", function(req, res) {
  res.render("home");
});

app.use(express.static(__dirname + "/public"));
app.use("/api", router);
// mongodb <--> controller
app.use(function(req, res, next) {
  req.mondb = mondb;
  next();
});

const port = 3000;
app.listen(port, function(req, res) {
  console.log(`Listening on port ${port}...`);
});
