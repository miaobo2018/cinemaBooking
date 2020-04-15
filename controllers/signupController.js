var mysql = require("mysql");
var mysqldb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mb2047809!!",
  database: "testmysqldb" // schema name
});

module.exports.post_newuser = function(req, res) {
  // signup function
  // email password id type name cellphone favouriteType
  var email = req.body.email;
  var password = req.body.password;
  var id = 1; // test -> should be unique increment automatically
  var type = req.body.type;
  var name = req.body.name;
  var cellphone = req.body.cellphone;
  var favouriteType = req.body.favouriteType;

  mysqldb.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL DB");
    console.log(email);

    var table = "testuser"; // table name
    var sql = `INSERT INTO ${table} (email, password, id, type, name, cellphone, favouriteType) VALUES ('${email}', '${password}', ${id}, '${type}', '${name}', '${cellphone}', '${favouriteType}')`;

    console.log(sql);

    mysqldb.query(sql, function(err, result) {
      if (err) throw err;
      console.log("New User Inserted");
    });
  });

  // render to dashboard page
  res.send("Return to dashboard page");
};
