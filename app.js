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
  database: "cinema_booking",
});
const users = require("./controllers/userController.js");
const movies = require("./controllers/movieController.js");
const reservations = require("./controllers/reservationController.js");
const newses = require("./controllers/newsController.js");
const signupController = require("./controllers/signupController");
const loginController = require("./controllers/loginController");

app.set("view engine", "ejs"); // ejs engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api", router);
app.use(express.static(__dirname + "/public"));

// mongodb <--> service
app.use(function (req, res, next) {
  req.mondb = mondb;
  next();
});
// sql <--> service ?

app.get("/", function (req, res) {
  res.render("index", {
    title: "Reservation",
    user: req.user == undefined ? "none" : req.user,
    action: "none",
    msg: "none",
  });
});

/**   the below is the code added by Xiaoming   **/

app.get("/signup", function (req, res) {
  res.render("index", {
    title: "Signup",
    user: req.user == undefined ? "none" : req.user,
    action: "signup",
    msg: "none",
  });
});
app.post("/signup", signupController.post_newuser);

app.get("/login", function (req, res) {
  res.render("index", {
    title: "Login",
    user: req.user == undefined ? "none" : req.user,
    action: "login",
    msg: "none",
  });
});
app.post("/login", loginController.post_userlogin);

function isLoggedAdminIn(req, res, next) {
  if (req.user.username == "admin") {
    return next(); // 改成username (email)
  }
  res.redirect("/");
}
/* User */
app.get("/showuser", users.showuser()); //ok
// app.get("/deleteuser", isLoggedAdminIn, users.deleteuser());
app.get("/deleteuser", users.deleteuser());
app.get("/edituser", users.edituser());
// app.post("/deleteuserCRUD", isLoggedAdminIn, users.deleteuserCRUD());
app.post("/deleteuserCRUD", users.deleteuserCRUD()); //ok
app.post("/edituserCRUD", users.edituserCRUD()); //ok

/* Movie */
app.get("/showmovie", movies.showmovieCRUD()); //ok
app.get("/addmovie", movies.addmovie());
// app.get("/deletemovie", isLoggedAdminIn, movies.deletemovie());
app.get("/deletemovie", movies.deletemovie());
app.get("/editmovie", movies.editmovie());
// app.post("/addmovieCRUD", isLoggedAdminIn, movies.addmovieCRUD());
app.post("/addmovieCRUD", movies.addmovieCRUD()); //ok
// app.post("/deletemovieCRUD", isLoggedAdminIn, movies.deletemovieCRUD());
app.post("/deletemovieCRUD", movies.deletemovieCRUD()); //ok
// app.post("/editmovieCRUD", isLoggedAdminIn, movies.editmovieCRUD());
app.post("/editmovieCRUD", movies.editmovieCRUD()); //ok 限单一操作 因为只能选1个 day 1个hour

/* AJAX - bases data */
app.post("/getmovies", movies.getmovies);
app.post("/getdays", movies.getdays);
app.post("/gethours", movies.gethours);
app.post("/getPrice", movies.getPrice);

/* Reservation */
app.post("/getreservation", reservations.getreservation);
app.post("/getinformationaboutseat", reservations.getinformationaboutseat);
app.post("/makeReservation", reservations.makeReservation);

/* Ads */
app.post("/shownews", newses.shownewsCRUD());
app.get("/addnews", isLoggedAdminIn, newses.addnews());
app.get("/deletenews", isLoggedAdminIn, newses.deletenews());
app.get("/editnews", isLoggedAdminIn, newses.editnews());
app.post("/addnewsCRUD", isLoggedAdminIn, newses.addnewsCRUD());
app.post("/deletenewsCRUD", isLoggedAdminIn, newses.deletenewsCRUD());
app.post("/editnewsCRUD", isLoggedAdminIn, newses.editnewsCRUD());

const port = 3000;
app.listen(port, function (req, res) {
  console.log(`Listening on port ${port}...`);
});
