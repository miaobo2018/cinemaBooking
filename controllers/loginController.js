// SJSU CMPE 226 Spring 2020 Team4
var mysql = require("mysql");
var mysqldb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "liu54420322",
  database: "cinema_booking", // schema name
});

module.exports.post_userlogin = function (req, res) {
  // login function
  // need to judge whether it is admin or user
  var name = req.body.username; // in frontend it called username
  var password = req.body.password;

  mysqldb.connect(function (err) {
    if (err) throw err;
    console.log("Connect to MySQL DB");

    var table = "user"; // table name
    var sql = `SELECT name, password FROM ${table}`;

    mysqldb.query(sql, function (err, result, fields) {
      if (err) throw err;
      var i;
      for (i = 0; i < result.length; i++) {
        if (name === result[i].name && password === result[i].password) {
          // Login Success -> Dashborad Page
          console.log("console login");

          return res.render("index", {
            title: "Reservation",
            user: req.user == undefined ? "none" : req.user,
            action: "none",
            msg: "none",
          });
        }
        if (name === result[i].name && password != result[i].password) {
          // Password Wrong -> redirect
          console.log("Password Wrong");
          return res.redirect("/login");
        }
      }
      console.log("No username found!");
      return res.redirect("/login");
    });
  });
};
