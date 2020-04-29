/*jshint browser: true, globalstrict: true, devel: true */
/*globals io: false */
"use strict";
var mysql = require("mysql");
var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "liu54420322",
  database: "cinema_booking", // schema name
});

var async = require("async");

exports.showuser = function () {
  return function (req, res) {
    /**
     * 查找数据库 返回所有用户数组 users  [{name:bomiao, email:...},{name:xiaoming, email:..}]
     */
    var users = "none";

    pool.getConnection(function (err, mysqldb) {
      if (err) throw err;

      var table = "user"; // table name
      var sql = `SELECT * FROM ${table}`;
      mysqldb.query(sql, function (err, result, fields) {
        if (err) throw err;
        users = result;
        res.render("index", {
          title: "Show users",
          user: req.user == undefined ? "none" : req.user,
          returnList: users,
          action: "showuser",
          msg: "none",
        });
      });
      pool.releaseConnection(mysqldb);
    });
  };
};

exports.deleteuser = function () {
  return function (req, res) {
    res.render("index", {
      title: "Delete user",
      user: req.user == undefined ? "none" : req.user,
      returnList: "none",
      action: "deleteuser",
      msg: "none",
    });
  };
};

exports.edituser = function () {
  return function (req, res) {
    res.render("index", {
      title: "Edit user",
      user: req.user == undefined ? "none" : req.user,
      returnList: "none",
      action: "edituser",
      msg: "none",
    });
  };
};

//user的各种post处理
exports.deleteuserCRUD = function () {
  return function (req, res) {
    var username = req.body.username;

    /**
     * 后端删除该user账号
     */
    pool.getConnection(function (err, mysqldb) {
      if (err) throw err;

      var table = "user"; // table name
      var sql = `DELETE FROM ${table} WHERE name = '${username}'`;
      mysqldb.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Delete Finished");
      });
      pool.releaseConnection(mysqldb);
      res.redirect("showuser");
    });
  };
};

exports.edituserCRUD = function () {
  return function (req, res) {
    var username = req.user.name;
    var FavouriteTypeNew = req.body.favouriteTypeNew;
    var EmailNew = req.body.emailNew;
    var PhoneNew = req.body.phoneNew;
    /**
     * 后端更新该账号
     */
    console.log(username);
    pool.getConnection(function (err, mysqldb) {
      if (err) throw err;
      // unable to update username otherwise session doesn't work well
      var table = "user"; // table name
      var sql = `UPDATE ${table} SET favouriteType = '${FavouriteTypeNew}', email = '${EmailNew}', cellphone = '${PhoneNew}' WHERE name = '${username}'`;
      mysqldb.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Update Finished");
      });
      pool.releaseConnection(mysqldb);
    });

    res.redirect("showuser");
  };
};
