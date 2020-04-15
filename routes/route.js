const express = require("express");
const router = express.Router();

const signupController = require("../controllers/signupController");
const loginController = require("../controllers/loginController");

router.get("/", function(req, res) {
  console.log("test");
  res.send("Router Page");
});

// sign up
router.get("/signup", function(req, res) {
  // res.send("signup");
  res.render("signup");
});
router.post("/signup", signupController.post_newuser);

// login in
router.get("/login", function(req, res) {
  res.send("login");
});
router.post("/login", loginController.post_userlogin);

// book
router.get("/book", function(req, res) {
  res.send("book");
});

// search
router.get("/search", function(req, res) {
  res.send("search");
});

// advertisement
router.get("/ad", function(req, res) {
  res.send("ad");
});

// rate/comment
router.get("/rate", function(req, res) {
  res.send("rate");
});

module.exports = router;
