// SJSU CMPE 226 Spring 2020 Team4
var mysql = require("mysql");
var mysqldb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "liu54420322",
  database: "cinema_booking", // schema name
});

module.exports.post_newuser = function (req, res) {
  // signup function
  // email password id type name cellphone favouriteType
  var email = req.body.email;
  var password = req.body.password;
  // var id = 1; // test -> should be unique increment automatically
  var type = 0;
  var name = req.body.username;
  var cellphone = req.body.cellphone;
  var favouriteType = req.body.favouriteType;

  // pool.getConnection(function (err, mysqldb) {
  //   if (err) throw err;
  //   // do not detect if email already exists
  //
  //   var table = "user"; // table name
  //   // var sql = `INSERT INTO ${table} (email, password, id, type, name, cellphone, favouriteType) VALUES ('${email}', '${password}', ${id}, '${type}', '${name}', '${cellphone}', '${favouriteType}')`;
  //   var sql = `INSERT INTO ${table} (email, password, type, name, cellphone, favouriteType) VALUES ('${email}', '${password}', '${type}', '${name}', '${cellphone}', '${favouriteType}')`;
  //   mysqldb.query(sql, function (err, result) {
  //     if (err) throw err;
  //     console.log("New User Inserted");
  //   });
  // });
  mysqldb.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var table = "user"; // table name
    var sql = `INSERT INTO ${table} (email, password, type, name, cellphone, favouriteType) VALUES ('${email}', '${password}', '${type}', '${name}', '${cellphone}', '${favouriteType}')`;
    mysqldb.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  });

  res.render("index", {
    title: "Reservation",
    user: req.user == undefined ? "none" : req.user,
    action: "none",
    msg: "none",
  });
};
