const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  console.log("test");
  res.send("Router Page");
});

// sign up
router.get("/signup", function(req, res) {
  res.send("signup");
});

// login in

// book

// search

// advertisement

// rate/comment

module.exports = router;
