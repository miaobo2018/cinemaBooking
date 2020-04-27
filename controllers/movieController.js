"use strict";
var mysql = require("mysql");
var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Mb2047809!!",
  database: "cinema_booking", // schema name
});
exports.addmovie = function () {
  return function (req, res) {
    res.render("index", {
      title: "Add movie",
      user: req.user == undefined ? "none" : req.user,
      returnList: "none",
      action: "addmovie",
      msg: "none",
    });
  };
};

exports.deletemovie = function () {
  return function (req, res) {
    res.render("index", {
      title: "Delete movie",
      user: req.user == undefined ? "none" : req.user,
      returnList: "none",
      action: "deletemovie",
      msg: "none",
    });
  };
};

exports.editmovie = function () {
  return function (req, res) {
    res.render("index", {
      title: "Edit movie",
      user: req.user == undefined ? "none" : req.user,
      returnList: "none",
      action: "editmovie",
      msg: "none",
    });
  };
};

/* CRUD */
exports.showmovieCRUD = function () {
  return function (req, res) {
    /**
     * 返回所有movies 格式为 movies = [{name:"Harry Potter", room:1, day:Monday, startTime:4:00}, {...}]
     */

    res.render("index", {
      title: "Show movies",
      user: req.user == undefined ? "none" : req.user,
      returnList: movies,
      action: "showmovie",
      msg: "none",
    });
  };
};

exports.addmovieCRUD = function () {
  return function (req, res) {
    var movieName = req.body.movie;
    var movieType = req.body.type;
    var movieLength = req.body.length;
    var moviePrice = req.body.price;
    var hallNumber = req.body.hall;
    var days = req.body.day;
    var hours = req.body.hour;

    /**
     * 需要后端保存新的电影 hall就是room 注意这里的days可能是单个日期 也可能是一个日期数组 hours同理 写入后端的时候要分情况
     * 考虑
     */

    res.location("showmovie");
    res.redirect("showmovie");
  };
};

exports.deletemovieCRUD = function () {
  return function (req, res) {
    var movieName = req.body.movie;

    /**
     * 需要后端根据movieName删除该电影
     */

    res.location("showmovie");
    res.redirect("showmovie");
  };
};

exports.editmovieCRUD = function () {
  return function (req, res) {
    var movieName = req.body.movie;
    var movieType = req.body.type;
    var movieLength = req.body.length;
    var moviePrice = req.body.price;
    var movieNameNew = req.body.movieNew;
    var hallNumberNew = req.body.hallNew;
    var dayNew = req.body.dayNew;
    var hourNew = req.body.hourNew;

    /**
     * 需要后端根据movieName查找到该记录 删除该记录 并添加新的movie
     */
    res.location("showmovie");
    res.redirect("showmovie");
  };
};
exports.search = function () {
  return function (req, res) {
    res.render("index", {
      title: "Search movies",
      user: req.user == undefined ? "none" : req.user,
      action: "search_movie",
      msg: "none",
    });
  };
};

exports.searchMovies = function () {
  return function (req, res) {
    var movieName = req.body.search;
    movieName = movieName.toString();

    pool.getConnection(function (err, connection) {
      if (err) throw err;

      var table = "screening"; // table name
      var sql = `SELECT name, day, startTime, sfilmPrice, room from ${table} WHERE name = '${movieName}';`;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("successfully query screening table");
        console.log(result);

        res.render("index", {
          title: "Search Results",
          user: req.user == undefined ? "none" : req.user,
          returnList: result,
          action: "show_search_result",
          msg: "none",
        });
      });
    });
  };
};

/* AJAX */
exports.getmovies = function (req, res) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;

    var table = "film"; // table name
    var sql = `SELECT filmName FROM ${table} `;

    connection.query(sql, function (err, movies, fields) {
      connection.release();
      // console.log(movies);
      res.json({
        movies: movies,
      });
    });
  });
};

exports.getdays = function (req, res) {
  var movieName = req.body.movieName;
  // console.log('movieName', movieName);
  pool.getConnection(function (err, connection) {
    if (err) throw err;

    var table = "screening"; // table name
    var sql = `SELECT day, room FROM ${table} WHERE name = '${movieName}' `;

    connection.query(sql, function (err, days, fields) {
      connection.release();
      // console.log(movies);
      res.json({
        days: days,
      });
    });
  });
};

exports.gethours = function (req, res) {
  var movieName = req.body.movieName;
  var movieDay = req.body.movieDay;
  pool.getConnection(function (err, connection) {
    if (err) throw err;

    var table = "screening"; // table name
    var sql = `SELECT startTime FROM ${table} WHERE name = '${movieName}' and Day = '${movieDay}' `;

    connection.query(sql, function (err, startTimes, fields) {
      connection.release();
      // console.log(movies);
      res.json({
        startTimes: startTimes,
      });
    });
  });
};

exports.getPrice = function (req, res) {
  var movieName = req.body.movieName;
  var movieDay = req.body.movieDay;
  var movieHour = req.body.movieStartTime;

  /**
   * 根据电影名字和日期和开始时间返回票价，直接返回整数
   */
};
