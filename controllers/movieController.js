"use strict";
var mysql = require("mysql");
var mysqldb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mb2047809!!",
  database: "testmysqldb", // schema name
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

/* AJAX */
exports.getmovies = function (req, res) {
  /**
   * 返回所有电影名称，数组形式 ["Harry Potter","Price White",...]
   */
};

exports.getdays = function (req, res) {
  var movieName = req.body.movieName;
  /**
   * 根据movieName返回所有上映的日期，object数组形式 [{name:"harry potter",day:"Monday",room: 1},...]
   * 这里day和room必须返回 返回room是为了计算房间座位列表，每个房间座位总数可能不同
   */
};

exports.gethours = function (req, res) {
  var movieName = req.body.movieName;
  var movieDay = req.body.movieDay;

  /**
   * 根据movieName,和上映日期 返回所有startTime数组 ["8:00","9:00","12:00"]
   */
};

exports.getPrice = function (req, res) {
  var movieName = req.body.movieName;
  var movieDay = req.body.movieDay;
  var movieHour = req.body.movieStartTime;

  /**
   * 根据电影名字和日期和开始时间返回票价，直接返回整数
   */
};
