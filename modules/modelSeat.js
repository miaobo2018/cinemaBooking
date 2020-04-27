var mysql = require("mysql");
var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Mb2047809!!",
  database: "cinema_booking", // schema name
});

module.exports.post_bookseat = function (req, res) {
  var sroomNum = req.body.roomId;
  var rowNum = req.body.rowNum;
  var colNum = req.body.colNum;

  console.log("booking...");

  pool.getConnection(function (err, mysqldb) {
    if (err) throw err;

    var table = "testseat"; // table name
    var sql = `UPDATE ${table} SET available = 1 WHERE sroomNum = ${sroomNum} and rowNum = '${rowNum}' and colNum = ${colNum}`;
    mysqldb.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Updated Seat Available");
    });
  });

  res.send("Book Seat Finished");
};
