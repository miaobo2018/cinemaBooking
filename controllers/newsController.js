/*jshint browser: true, globalstrict: true, devel: true */
/*globals io: false */
"use strict";

/* Default */
var mysql = require("mysql");
var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "liu54420322",
  database: "cinema_booking",
});

// logger
var log4js = require("log4js");
const logger = log4js.getLogger();

exports.shownewsCRUD = function () {
  return function (req, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err;

      var table = "advertisement"; // table name
      var sql = `SELECT * FROM ${table} `;

      connection.query(sql, function (err, news, fields) {
        logger.info("SQL Query: ", sql);
        logger.info("SQL Result: ", news);
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

    pool.getConnection(function (err, connection) {
      if (err) throw err;

      var table = "advertisement";
      var sql = `INSERT INTO ${table} (AdTitle, AdContent) VALUES ('${title}', '${content}')`;
      connection.query(sql, function (err, user) {
        logger.info("SQL Query: ", sql);
        logger.info("SQL Result: ", user);
        if (err) {
          throw err;
        }
        connection.release();
        res.location("/");
        res.redirect("/");
      });
    });
  };
};

exports.deletenewsCRUD = function () {
  return function (req, res) {
    var title = req.body.title;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      var table = "advertisement";

      var sqlDeleteNews = `DELETE FROM ${table} WHERE AdTitle = '${title}'`;

      connection.query(sqlDeleteNews, function (err, result) {
        logger.info("SQL Query: ", sqlDeleteNews);
        logger.info("SQL Result: ", result);
        if (err) throw err;
        connection.release();
        res.location("/");
        res.redirect("/");
      });
    });
  };
};

exports.editnewsCRUD = function () {
  return function (req, res) {
    var title = req.body.title;
    var newTitle = req.body.newtitle;
    var newContent = req.body.newcontent;

    pool.getConnection(function (err, connection) {
      if (err) throw err;
      var table = "advertisement";

      var sqlDeleteNews = `DELETE FROM ${table} WHERE AdTitle = '${title}'`;

      connection.query(sqlDeleteNews, function (err, result) {
        if (err) throw err;
      });
      var sql = `INSERT INTO ${table} (AdTitle, AdContent) VALUES ('${newTitle}', '${newContent}')`;
      connection.query(sql, function (err, user) {
        logger.info("SQL Query: ", sql);
        logger.info("SQL Result: ", user);
        if (err) {
          throw err;
        }
        connection.release();
        res.location("/");
        res.redirect("/");
      });
    });
  };
};
