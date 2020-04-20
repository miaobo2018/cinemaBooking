// 本例子采取pool进行conn练习 一定注意异步问题！！
var mysql = require("mysql");
var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Mb2047809!!",
  database: "testmysqldb", // schema name
});

module.exports.post_addfilm = function (req, res) {
  // var filmId = req.body.filmId;
  var filmName = req.body.filmName;
  var type = req.body.type;
  var length = req.body.length;
  console.log("add film ...");
  pool.getConnection(function (err, mysqldb) {
    if (err) throw err;

    var table = "testfilm"; // table name
    // var sql = `INSERT INTO ${table} (filmId, filmName, type, length) VALUES (${filmId}, '${filmName}', '${type}', ${length})`;
    var sql = `INSERT INTO ${table} (filmName, type, length) VALUES ('${filmName}', '${type}', ${length})`;
    mysqldb.query(sql, function (err, result) {
      if (err) throw err;
      console.log("New Film Inserted");

      //   pool.releaseConnection(mysqldb);
    });
  });

  // render to home page?
  res.send("Return to some page");
};

// search film info by name
module.exports.post_searchfilm = function (req, res) {
  // search film info by name
  var filmName = req.body.filmName;

  pool.getConnection(function (err, mysqldb) {
    if (err) throw err;

    var table = "testfilm";
    var sql = `SELECT filmId, filmName, type, length FROM ${table}`;

    mysqldb.query(sql, function (err, result, fields) {
      if (err) throw err;
      var find = 0;
      var i;
      for (i = 0; i < result.length; i++) {
        if (filmName === result[i].filmName) {
          console.log("filmId: " + result[i].filmId);
          console.log("type: " + result[i].type);
          console.log("length: " + result[i].length);
          find = 1;
          break;
        }
      }
      pool.releaseConnection(mysqldb);
      if (find === 1) {
        return res.render("home");
      } else {
        return res.render("signup");
      }
    });
  });

  //     // 异步问题使得 永远找到的是开始的find值
  //   console.log("第二次find: ", find);
  //   if (find === 1) {
  //     console.log("存在");
  //     return res.render("home");
  //   } else {
  //     // Not Find
  //     console.log("不存在");
  //     return res.render("signup");
  //   }
};
