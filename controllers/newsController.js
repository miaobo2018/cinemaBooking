/*jshint browser: true, globalstrict: true, devel: true */
/*globals io: false */
"use strict";

/* Default */
var mysql = require("mysql");
var mysqldb = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mb2047809!!",
    database: "testmysqldb" // schema name
});

exports.shownewsCRUD = function () {
    return function (req, res) {
        /**
         * 读取所有广告，这里news就是广告的意思 返回形式 object数组 [{title: "Harry Potter is comming!", content:"This is the 7th series!..."},{....}]
         */
    };
};

exports.addnews = function () {
    return function (req, res) {
        res.render('index', {
            title: 'Add news',
            user: req.user == undefined ? 'none' : req.user,
            returnList: 'none',
            action: 'addnews',
            msg: 'none'
        });
    };
};

exports.deletenews = function () {
    return function (req, res) {
        res.render('index', {
            title: 'Delete news',
            user: req.user == undefined ? 'none' : req.user,
            returnList: 'none',
            action: 'deletenews',
            msg: 'none'
        });
    };
};

exports.editnews = function () {
    return function (req, res) {
        res.render('index', {
            title: 'Edit news',
            user: req.user == undefined ? 'none' : req.user,
            returnList: 'none',
            action: 'editnews',
            msg: 'none'
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

