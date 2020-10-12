var express = require('express');
var router = express.Router();
var firebase = require("firebase");
const firebaseModel = require("../models/firebase");
const firestore = require("../models/firestore");

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
  if (currentUser) {
    firestore.getUserCollegeAndSubjects({db:firebaseModel.db, user:currentUser})
    .then(data => {
      res.render('landing.ejs', {username:currentUser.displayName, userData:data});
    });
  } else {
    res.render("index", {user:currentUser});
  }
  
});

module.exports = router;
