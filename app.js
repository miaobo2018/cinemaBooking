
// SJSU CMPE 226 Spring 2020 Team4
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const router = require("./routes/route");
// connect to mongodb

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cinema_booking");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function (callback) {
  console.log("[MONGODB] Connect with MoongoDB!");
});

// connect to MySQL
var mysql = require("mysql");
var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "liu54420322",
  database: "cinema_booking",
});

// logger
var log4js = require("log4js");
log4js.configure({
  appenders: {
    fileAppender: {
      type: "DateFile",
      filename: "./logs/httpAndDatabase",
      pattern: "yyyy-MM-dd.log",
      alwaysIncludePattern: true,
      category: "access",
    },
    console: { type: "console" },
  },
  categories: {
    default: { appenders: ["fileAppender", "console"], level: "info" },
  },
});
app.use(
  log4js.connectLogger(log4js.getLogger("access"), {
    level: log4js.levels.INFO,
  })
);
const logger = log4js.getLogger();
// logger end

const users = require("./controllers/userController.js");
const movies = require("./controllers/movieController.js");
const reservations = require("./controllers/reservationController.js");
const newses = require("./controllers/newsController.js");

const ratings = require("./controllers/ratingController");

app.set("view engine", "ejs"); // ejs engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Passport
var passport = require("passport");
var flash = require("connect-flash");
var session = require("express-session");
app.use(session({ secret: "testowySekret" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req,res,next){

  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// 采用本地passport策略， 并在session层持久化
var LocalStrategy = require("passport-local").Strategy;
passport.serializeUser(function (user, done) {
  // console.log('我现在要序列化了！');
  // console.log('序列化里的user', user);
  return done(null, user.name);
});
passport.deserializeUser(function (name, done) {
  pool.getConnection(function (err, connection) {
    var table = "user"; // table name
    var sql = `SELECT * FROM ${table} where user.name = '${name}'`;
    connection.query(sql, function (err, users, fields) {
      logger.info("SQL Query: ", sql);
      logger.info("SQL Result: ", users);
      connection.release();
      if (err) throw err;
      var user = users[0];
      return done(err, user);
    });
  });
});

//新注册用户密码哈希化
var passwordHash = require("password-hash");
passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      var email = req.body.email;
      var password = passwordHash.generate(req.body.password);
      var type = 0;
      var name = req.body.username;
      var cellphone = req.body.cellphone;
      var favouriteType = req.body.favouriteType;
      var spending = req.body.spending;

      pool.getConnection(function (err, connection) {
        if (err) throw err;

        var table = "user";
        var sql1 = `SELECT name  FROM ${table} WHERE name = '${name}'`;
        connection.query(sql1,function(err, user){
          console.log("signup查询user是否存在",user);
          //这里不能写成if(user)的形式 JS中 空数组也是true ！！！
          if (user.length !== 0){

            return done(null, false, req.flash('signupMsg', 'The username is already existed!'));
          }
        })
        var sql2= `INSERT INTO ${table} (email, password, type, name, cellphone, favouriteType, spending) VALUES ('${email}', '${password}', '${type}', '${name}', '${cellphone}', '${favouriteType}','${spending}')`;
        connection.query(sql2, function (err, user) {
          logger.info("SQL Query: ", sql2);
          logger.info("SQL Result: ", user);
          if (err) {
            // throw err;
          } else {
            console.log("Register new user successfully!");
          }
        });

        connection.query(`CALL SetCustomerLevel('${name}')`, function (err) {
              console.log("CALL Successfully!");
        });
        sql2 = `SELECT name, password FROM ${table} WHERE name = '${name}'`;
        connection.query(sql2, function (err, users) {
          logger.info("SQL Query: ", sql2);
          logger.info("SQL Result: ", users);
          var user = users[0];
          // console.log("signup's user", user);
          return done(null, user);
        });
      });
    }
  )
);

//login用户名密码检验 并生成user用户 传到后续所有页面 相当于替代了原来的loginController的post功能
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      var name = req.body.username;
      var password = req.body.password;
      console.log("password", password);

      //数据库检验密码用户名真伪，如果密码;相等 就调用done函数 进入下一层
      pool.getConnection(function (err, connection) {
        if (err) throw err;
        console.log("Connect to MySQL DB");
        var table = "user"; // table name
        var sql = `SELECT name, password FROM ${table} WHERE name = '${name}'`;

        connection.query(sql, function (err, users, fields) {
          logger.info("SQL Query: ", sql);
          logger.info("SQL Result: ", users);
          connection.release();
          var user = users[0];
          if (!user){
            req.flash('error',"The username is not existed!");
            return done(null, false, req.flash('loginMsg', 'The username is not existed!'))
          }
          if (passwordHash.verify(password, user.password)) {
            //输入密码哈希化并对比
            // console.log("login的user", user);
            return done(null, user);
          }
          else{

            return done(null, false, req.flash('loginMsg','The password is not correct!'))
          }
        });
      });
    }
  )
);

app.use(express.static(__dirname + "/public"));



app.get("/", function (req, res) {
  res.render("index", {
    title: "Reservation",
    user: req.user == undefined ? "none" : req.user,
    action: "none",
    msg: "none",
  });
});

app.get("/signup", function (req, res) {
  res.render("index", {
    title: "Signup",
    user: req.user == undefined ? "none" : req.user,
    action: "signup",
    msg: "none",
  });
});
app.post(
  "/signup",
  passport.authenticate("signup", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

app.get("/login", function (req, res) {
  res.render("index", {
    title: "Login",
    user: req.user == undefined ? "none" : req.user,
    action: "login",
    msg: "none",
  });
});
app.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

function isLoggedAdminIn(req, res, next) {
  if (req.user.name == "admin") {
    return next();
  }
  res.redirect("/");
}
/* User */
app.get("/showuser", users.showuser());
app.get("/deleteuser", isLoggedAdminIn, users.deleteuser());
app.get("/edituser", users.edituser());
app.post("/deleteuserCRUD", isLoggedAdminIn, users.deleteuserCRUD());
app.post("/edituserCRUD", users.edituserCRUD());

/* Movie */
app.get("/showmovie", movies.showmovieCRUD());
app.get("/addmovie", movies.addmovie());
app.get("/deletemovie", isLoggedAdminIn, movies.deletemovie());
app.get("/editmovie", movies.editmovie());
app.post("/addmovieCRUD", isLoggedAdminIn, movies.addmovieCRUD());
app.post("/deletemovieCRUD", isLoggedAdminIn, movies.deletemovieCRUD());
app.post("/editmovieCRUD", isLoggedAdminIn, movies.editmovieCRUD());
app.get("/search", movies.search());
app.post("/searchmovies", movies.searchMovies());

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

/* Ratings */
app.get("/ratings", ratings.rating());
app.post("/makeRatings", ratings.makeRating());

const port = 3000;
app.listen(port, function (req, res) {
  console.log(`Listening on port ${port}...`);
});
