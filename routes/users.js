var express = require('express');
var router = express.Router();
var firebase = require("firebase");
const firebaseModel = require("../models/firebase");
const firestore = require("../models/firestore");
const moment= require('moment')
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
        console.log(user,data)
        res.render('landing.ejs', {username:currentUser.displayName, email:currentUser.email, userData:data});
      })
      
    });
  } else {
    // res.render("index", {user:currentUser});
    res.redirect('/');
  }
  
});

/* Profile Page */
router.get('/profile/:email', function(req,res,next) {
  if (currentUser) {
    email=req.params.email
    firestore.getUserPosts({db:firebaseModel.db, email:email}).then(posts => {
      let postsArray = posts.reverse();
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
          res.render('profile.ejs', {user:currentUser, posts:postsArray, userData,moment});
      })
     
    });
  } else {
    res.redirect('/');
  }
})

/* Upload Post. */
router.get('/upload', function(req, res, next) {
  if (currentUser) {
 
      res.render('upload.ejs', {username:currentUser.displayName, mail:currentUser.email});
  
  } else {
    res.render("upload", {user:currentUser});
  }
  
});

router.post('/upload', function(req, res, next) {
  if (currentUser) {
    console.log("HERE")
    const content = req.body.content
  const timestamp = Date.now()
  const type =req.body.type
  
 console.log(currentUser.email,content,timestamp,type)
  firestore.addPostToDatabase({db:firebaseModel.db, email:currentUser.email, postContent: content, postType: type, timestamp});
  res.redirect("/users")
  } else {
    res.render("index", {user:currentUser});
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
      res.render("settings", {username:currentUser.displayName, email:currentUser.email,userData});
    })
  } else {
    res.redirect('/');
  }
});

router.post('/update/submit', function(req,res,next) {
  if (currentUser) {
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
  } else {
    res.redirect('/');
  }
  
})

module.exports = router;
