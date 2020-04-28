"use strict";
var mysql = require("mysql");
var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "liu54420322",
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

    var movies = "none";

    pool.getConnection(function (err, mysqldb) {
      if (err) throw err;

      var table = "screening"; // table name
      var sql = `SELECT * FROM ${table}`;

      mysqldb.query(sql, function (err, result, fields) {
        if (err) throw err;
        movies = result;
        // console.log(movies);
        res.render("index", {
          title: "Show movies",
          user: req.user == undefined ? "none" : req.user,
          returnList: movies,
          action: "showmovie",
          msg: "none",
        });
      });
      pool.releaseConnection(mysqldb);
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
    pool.getConnection(function (err, mysqldb) {
      if (err) throw err;
      var table1 = "film";
      var table2 = "screening";
      // insert into film table
      var sqlInsertFilm = `INSERT INTO ${table1} (filmName, type, length, price) VALUES ('${movieName}', '${movieType}', ${movieLength}, ${moviePrice})`;
      mysqldb.query(sqlInsertFilm, function (err, result) {
        if (err) throw err;
        console.log("New Film Inserted");
        var sqlSelectFilmId = `SELECT filmId FROM ${table1} WHERE filmName = '${movieName}'`;
        var newFilmId = 0;
        // get the newFilmId
        mysqldb.query(sqlSelectFilmId, function (err, result, fields) {
          if (err) throw err;
          newFilmId = result[0].filmId;
          console.log(newFilmId);
          // insert into screening table
          for (var i = 0; i < days.length; i++) {
            var day = days[i];
            for (var j = 0; j < hours.length; j++) {
              var hour = hours[j];
              var sqlInsertScreening = `INSERT INTO ${table2} (day, startTime, sfilmId, name, sfilmPrice, room) VALUES ('${day}', '${hour}', ${newFilmId}, '${movieName}', ${moviePrice}, ${hallNumber})`;
              mysqldb.query(sqlInsertScreening, function (err, result) {
                if (err) throw err;
                console.log("New Screening Inserted");
              });
            }
          }
        });
      });
      pool.releaseConnection(mysqldb);
      res.location("showmovie");
      res.redirect("showmovie");
    });
  };
};

exports.deletemovieCRUD = function () {
  return function (req, res) {
    var movieName = req.body.movie;
    /**
     * 需要后端根据movieName删除该电影
     */
    pool.getConnection(function (err, mysqldb) {
      if (err) throw err;
      var table1 = "film";
      var table2 = "screening";
      // 先在screening(child)删除记录 再在film(parent)删除记录
      // delete in screening table
      var sqlDeleteFilm = `DELETE FROM ${table1} WHERE filmName = '${movieName}'`;
      var sqlDeleteScreening = `DELETE FROM ${table2} WHERE name = '${movieName}'`;
      mysqldb.query(sqlDeleteScreening, function (err, result) {
        if (err) throw err;
        console.log("Target Film Deleted in Screening Table");
        // delete in film table
        mysqldb.query(sqlDeleteFilm, function (err, result) {
          if (err) throw err;
          console.log("Target Film Deleted in Film Table");
        });
      });
      pool.releaseConnection(mysqldb);
      res.location("showmovie");
      res.redirect("showmovie");
    });
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
    // dayNew 与 hourNew 都是单一元素 不是list
    // 先删 再加
    pool.getConnection(function (err, mysqldb) {
      if (err) throw err;
      var table1 = "film";
      var table2 = "screening";
      // 先在screening(child)删除记录 再在film(parent)删除记录
      // delete in screening table
      var sqlDeleteFilm = `DELETE FROM ${table1} WHERE filmName = '${movieName}'`;
      var sqlDeleteScreening = `DELETE FROM ${table2} WHERE name = '${movieName}'`;
      mysqldb.query(sqlDeleteScreening, function (err, result) {
        if (err) throw err;
        console.log("Target Film Deleted in Screening Table");
        // delete in film table
        mysqldb.query(sqlDeleteFilm, function (err, result) {
          if (err) throw err;
          console.log("Target Film Deleted in Film Table");
          // insert block begin
          // insert into film table
          var sqlInsertFilm = `INSERT INTO ${table1} (filmName, type, length, price) VALUES ('${movieNameNew}', '${movieType}', ${movieLength}, ${moviePrice})`;
          mysqldb.query(sqlInsertFilm, function (err, result) {
            if (err) throw err;
            console.log("New Film Inserted");
            var sqlSelectFilmId = `SELECT filmId FROM ${table1} WHERE filmName = '${movieNameNew}'`;
            var newFilmId = 0;
            // get the newFilmId
            mysqldb.query(sqlSelectFilmId, function (err, result, fields) {
              if (err) throw err;
              newFilmId = result[0].filmId;
              console.log(newFilmId);
              // insert into screening table
              var sqlInsertScreening = `INSERT INTO ${table2} (day, startTime, sfilmId, name, sfilmPrice, room) VALUES ('${dayNew}', '${hourNew}', ${newFilmId}, '${movieNameNew}', ${moviePrice}, ${hallNumberNew})`;
              mysqldb.query(sqlInsertScreening, function (err, result) {
                if (err) throw err;
                console.log("New Screening Inserted");
              });
              pool.releaseConnection(mysqldb);
              res.location("showmovie");
              res.redirect("showmovie");
            });
          });
          // insert block end
        });
      });
    });
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

  pool.getConnection(function (err, connection) {
    if (err) throw err;

    var table = "screening"; // table name
    var sql = `SELECT sfilmPrice FROM ${table} WHERE name = '${movieName}' and day = '${movieDay}' and startTime = '${movieHour}'`;

    connection.query(sql, function (err, price, fields) {
      connection.release();
      // console.log(movies);
      res.json({
        "price": price
      });

    });
  });

};
