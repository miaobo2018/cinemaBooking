/*jshint browser: true, globalstrict: true, devel: true */
/*globals io: false */
"use strict";

/* Default */

var mysql = require("mysql");
var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "liu54420322",
  database: "cinema_booking", // schema name
});

// logger
var log4js = require("log4js");
const logger = log4js.getLogger();

exports.getreservation = function (req, res) {
  var movieName = req.body.movieName;
  var movieDay = req.body.movieDay;
  var movieHour = req.body.movieHour;
  pool.getConnection(function (err, connection) {
    if (err) throw err;

    var table = "booking"; // table name
    var sql = `SELECT seat FROM ${table} WHERE filmname = '${movieName}' and day = '${movieDay}' and startTime = '${movieHour}'`;

    connection.query(sql, function (err, seats, fields) {
      logger.info("SQL Query: ", sql);
      logger.info("SQL Result: ", seats);
      connection.release();
      // console.log(movies);
      res.json({
        seats: seats,
      });
    });
  });
};

exports.getinformationaboutseat = function (req, res) {
  var movieName = req.body.movieName;
  var movieDay = req.body.movieDay;
  var movieHour = req.body.movieStartTime;
  var seat = req.body.seat;

  /**
   * admin专用 用处为admin登录时 查看该座位是否被预约 被谁预约 要求返回元json格式的数组 [{seat:{seat}, name:{name}, email:{email}, phone:{phone}}]
   */
};
exports.makeReservation = function (req, res) {
  var movieName = req.body.movieName;
  var movieDay = req.body.movieDay;
  var movieHour = req.body.movieStartTime;
  var seats = req.body.seats;
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;

  pool.getConnection(function (err, connection) {
    if (err) throw err;
    //这里for循环一定要房子getConnection里面！！！！
    for (var i = 0; i < seats.length; i++) {
      var table = "booking"; // table name

      var sql = `INSERT INTO ${table} (username, filmname, day, startTime, seat) VALUES ('${name}', '${movieName}', '${movieDay}', '${movieHour}', '${seats[i]}')`;
      connection.query(sql, function (err, result, fields) {
        logger.info("SQL Query: ", sql);
        if (err) {
          console.log(err);
        } else {
          logger.info("SQL Result: ", result);
        }
      });
    }
    connection.release();
  });
};
