var mysql = require("mysql");
var mysqldb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mb2047809!!",
  database: "testmysqldb" // schema name
});

module.exports.post_userlogin = function(req, res) {
  // login function
  // need to judge whether it is admin or user
  var email = req.body.email;
  var password = req.body.password;

  mysqldb.connect(function(err) {
    if (err) throw err;
    console.log("Connect to MySQL DB");

    var table = "testuser"; // table name
    var sql = `SELECT email, password FROM ${table}`;

    mysqldb.query(sql, function(err, result, fields) {
      if (err) throw err;
      var i;
      for (i = 0; i < result.length; i++) {
        if (email === result[i].email && password === result[i].password) {
          // Login Success -> Dashborad Page
          console.log("Success");
          return res.send("Login Success");
        }
        if (email === result[i].email && password != result[i].password) {
          // Password Wrong -> redirect
          console.log("Password Wrong");
          return res.redirect("index");
        }
      }

      // No User/Email
      console.log("Email Wrong");
      return res.redirect("index",{
        title: 'Reservation',
        user: req.user == undefined ? 'none' : req.user,
        action: 'none',
        msg: 'none'
      });
    });
  });
};
