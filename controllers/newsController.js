/*jshint browser: true, globalstrict: true, devel: true */
/*globals io: false */
"use strict";

/* Default */
var mysql = require("mysql");
var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Mb2047809!!",
  database: "cinema_booking",
});

exports.shownewsCRUD = function () {
  return function (req, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err;

      var table = "advertisement"; // table name
      var sql = `SELECT * FROM ${table} `;

      connection.query(sql, function (err, news, fields) {
        // console.log("news", news);
        connection.release();
        res.json({
          news: news,
        });
      });
    });
  };
};

exports.addnews = function () {
  return function (req, res) {
    res.render("index", {
      title: "Add news",
      user: req.user == undefined ? "none" : req.user,
      returnList: "none",
      action: "addnews",
      msg: "none",
    });
  };
};

exports.deletenews = function () {
  return function (req, res) {
    res.render("index", {
      title: "Delete news",
      user: req.user == undefined ? "none" : req.user,
      returnList: "none",
      action: "deletenews",
      msg: "none",
    });
  };
};

exports.editnews = function () {
  return function (req, res) {
    res.render("index", {
      title: "Edit news",
      user: req.user == undefined ? "none" : req.user,
      returnList: "none",
      action: "editnews",
      msg: "none",
    });
  };
};

/* CRUD */
exports.addnewsCRUD = function () {
  return function (req, res) {
    var title = req.body.title;
    var content = req.body.content;

    /**
     * 后端存入广告 title和content
     */

    res.location("/");
    res.redirect("/");
  };
};

exports.deletenewsCRUD = function () {
  return function (req, res) {
    var title = req.body.title;
    /**
     * 后端根据title 删除该条广告
     */
    res.location("/");
    res.redirect("/");
  };
};

exports.editnewsCRUD = function () {
  return function (req, res) {
    var title = req.body.title;
    var newTitle = req.body.newtitle;
    var newContent = req.body.newcontent;

    /**
     * 根据title找到这条广告，并且存入新广告
     */
    res.location("/");
    res.redirect("/");
  };
};
