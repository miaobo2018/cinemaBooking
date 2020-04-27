/*jshint browser: true, globalstrict: true, devel: true */
/*globals io: false */
"use strict";

/* Default */
var mysql = require("mysql");
var mysqldb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mb2047809!!",
  database: "cinema_booking", // schema name
});

exports.getreservation = function (req, res) {
  var movieName = req.body.movieName;
  var movieDay = req.body.movieDay;
  var movieHour = req.body.movieStartTime;

  /**
   * 根据电影名日期和开始时间返回已经预定的所有座位,前端要求返回座位号数组 ["A1","B2","F3","C5"]
   */
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
  /**
   * 存入所有预约信息到数据库  seats是数组形式，包含了所有预约的座位号 ["A1","B2","F3","C5"]
   */
  // 最后
};
