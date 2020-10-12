var express = require('express');
var router = express.Router();
var firebase = require("firebase");


/* FIREBASE AUTH LISTENER */
let currentUser = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    currentUser = user;
  } else {
    currentUser = null;
    console.log("NO USER");
  }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('landing.ejs', {username:currentUser.displayName});
});

module.exports = router;
