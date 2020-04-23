const express = require("express");
const router = express.Router();

const signupController = require("../controllers/signupController");
const loginController = require("../controllers/loginController");
const users = require('../controllers/userController.js');
const movies = require('../controllers/movieController.js');
const reservations = require('../controllers/reservationController.js');
const newses = require('../controllers/newsController.js');

const modelFilm = require("../modules/modelFilm");
const modelSeat = require("../modules/modelSeat");


/** 下方代码已包含 建议删除
// sign up
router.get("/signup", function (req, res) {

    res.render('index', {
      title: 'Signup',
      user: req.user == undefined ? 'none' : req.user,
      action: 'signup',
      msg: 'none'
    });

});
router.post("/signup", signupController.post_newuser);

// login in
router.get("/login", function (req, res) {
  res.render('index', {
    title: 'Login',
    user: req.user == undefined ? 'none' : req.user,
    action: 'login',
    msg: 'none'
  });
});
router.post("/login", loginController.post_userlogin);

// book
router.get("/book", function (req, res) {
  res.send("book");
});
// book 根据ERD SCREENING Entity 应该有film_id 和 room_num两个foreign key
// 第一次查找：通过film name 查到有几个screening对应 （film 和 screening 要inner join）
// 第二次查找：用户要选择一个screening 这个screening对应1个room
// 第三次查找：用户根据该room 和 available 查找available=0的seat的row和col
// 第一次修改：如果available 并且点击预定 通过roomNum, rowNum, colNum将该位置的seat available修改
router.post("/book", modelSeat.post_bookseat);

// search
router.get("/search", function (req, res) {
  res.send("search");
});
router.post("/search", modelFilm.post_searchfilm); // search film info by film name

// admin add film
router.get("/addfilm", function (req, res) {
  res.send("add film by admin");
});
router.post("/addfilm", modelFilm.post_addfilm);

// advertisement
router.get("/ad", function (req, res) {
  res.send("ad");
});
 **/

// rate/comment
router.get("/rate", function (req, res) {
  res.send("rate");
});




module.exports = router;
