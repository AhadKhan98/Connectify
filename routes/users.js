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
      firestore.getUserPoints({db:firebaseModel.db, user:currentUser}).then(user => {
        // firestore.addUserPoints({db:firebaseModel.db, user:currentUser, points:30});
        res.render('landing.ejs', {username:currentUser.displayName, userData:data, userPoints:user.points});
      })
      
    });
  } else {
    // res.render("index", {user:currentUser});
    res.redirect('/');
  }
  
});

router.get('/settings', function(req, res, next) {
  if (currentUser) {
    firestore.getUserCollegeAndSubjects({db:firebaseModel.db, user:currentUser}).then(result => {
      let subjectsArrayText = "";
      result.subjects.map(subject => {
        subjectsArrayText += subject + '|'
      });

      const userData = {
        username:currentUser.displayName, 
        email:currentUser.email, 
        college:result.college,
        subjects:result.subjects, 
        subjectsText:subjectsArrayText};
      res.render("settings", {userData});
    })
  } else {
    res.redirect('/');
  }
});

router.post('/update/submit', function(req,res,next) {
  console.log(req.body);
  subjectsArray = req.body["subjects-array"].split('|');
  subjectsArray.pop();
  const updatedUserData = {
    name: req.body.name,
    college: req.body.college,
    subjects: subjectsArray,
    password: req.body.password,
  };
  firestore.updateUserProfile({db:firebaseModel.db, user:currentUser, newData:updatedUserData})


  res.redirect('/users');
})

module.exports = router;
