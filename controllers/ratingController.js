// SJSU CMPE 226 Spring 2020 Team4
"use strict";

var mongoose = require("mongoose");
var ratingSchema = mongoose.Schema({
  userName: String,
  filmName: String,
  score: String,
  comment: String
});
var ratingModel = mongoose.model("ratingModel", ratingSchema);

exports.getModel = ratingModel;

// logger
var log4js = require("log4js");
const logger = log4js.getLogger();

exports.rating = function () {
  return function (req, res) {
    res.render("index", {
      title: "Rating",
      user: req.user == undefined ? "none" : req.user,
      action: "rating",
      msg: "none",
    });
  };
};

exports.makeRating = function () {
  return function (req, res) {
    var username = req.body.username;
    var filmname = req.body.filmname;
    var score = req.body.score;

    var newRating = new ratingModel({
      userName: username,
      filmName: filmname,
      score: score,
    });

    newRating.save(function (err) {
      logger.info("MongoDB Query: ", newRating);
      if (err) {
        return console.log(err);
      }
    });
    res.location("/");
    res.redirect("/");
  };
};
