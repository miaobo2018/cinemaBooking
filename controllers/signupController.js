var mysql = require("mysql");
var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Mb2047809!!",
  database: "testmysqldb", // schema name
});

module.exports.post_newuser = function (req, res) {
  // signup function
  // email password id type name cellphone favouriteType
  var email = req.body.email;
  var password = req.body.password;
  // var id = 1; // test -> should be unique increment automatically
  var type = req.body.type;
  var name = req.body.name;
  var cellphone = req.body.cellphone;
  var favouriteType = req.body.favouriteType;

  pool.getConnection(function (err, mysqldb) {
    if (err) throw err;
    // do not detect if email already exists

    var table = "testuser"; // table name
    // var sql = `INSERT INTO ${table} (email, password, id, type, name, cellphone, favouriteType) VALUES ('${email}', '${password}', ${id}, '${type}', '${name}', '${cellphone}', '${favouriteType}')`;
    var sql = `INSERT INTO ${table} (email, password, type, name, cellphone, favouriteType) VALUES ('${email}', '${password}', '${type}', '${name}', '${cellphone}', '${favouriteType}')`;
    mysqldb.query(sql, function (err, result) {
      if (err) throw err;
      console.log("New User Inserted");
    });
  });

  // render to dashboard page
  // pool.releaseConnection(mysqldb);
  res.send("Return to dashboard page");
};
