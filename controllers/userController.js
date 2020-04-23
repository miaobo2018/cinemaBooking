/*jshint browser: true, globalstrict: true, devel: true */
/*globals io: false */
"use strict";
var mysql = require("mysql");
var mysqldb = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mb2047809!!",
    database: "testmysqldb" // schema name
});


exports.showuser = function () {
    return function (req, res) {
        /**
         * 查找数据库 返回所有用户数组 users  [{name:bomiao, email:...},{name:xiaoming, email:..}]
         */

            res.render('index', {
                title: 'Show users',
                user: req.user == undefined ? 'none' : req.user,
                returnList: users,
                action: 'showuser',
                msg: 'none'
            });
    };
};

exports.deleteuser = function () {
    return function (req, res) {
        res.render('index', {
            title: 'Delete user',
            user: req.user == undefined ? 'none' : req.user,
            returnList: 'none',
            action: 'deleteuser',
            msg: 'none'
        });
    };
};

exports.edituser = function () {
    return function (req, res) {
        res.render('index', {
            title: 'Edit user',
            user: req.user == undefined ? 'none' : req.user,
            returnList: 'none',
            action: 'edituser',
            msg: 'none'
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

            res.redirect("showuser");
        };
    };

exports.edituserCRUD = function () {
    return function (req, res) {
        var username = req.user.username;
         var NameNew = req.body.nameNew;
        var EmailNew = req.body.emailNew;
        var PhoneNew = req.body.phoneNew;
        /**
         * 后端更新该账号
         */


            res.redirect("showuser");

    };
};