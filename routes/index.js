var express = require("express");
var router = express.Router();
const firebaseModel = require("../models/firebase");
const firebase = require("firebase");
const githubAuth = require("../models/githubAuth");
const firestore = require("../models/firestore");
const usersRoute = require("../routes/users");

router.use('/users', usersRoute);

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


/* HOME PAGE */
router.get("/", function (req, res, next) {
  res.render("index", { user: currentUser });
});

/* SIGN UP FUNCTIONALITY */

// Show Sign Up Page
router.get("/signUp", function (req, res, next) {
  res.render("signup", {errorMessage:""});
});

// Form Submit (POST METHOD)
router.post("/signup/submit", function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  firebaseModel.authSignUp(name, email, password).then((result) => {
    if (typeof result === "string") {
      let errorMessage = result;
      res.render("signup", {errorMessage})
    } else {
      res.redirect("/checkUserProfile");
    }

  });
});

/* SIGN IN FUNCTIONALITY */

// GitHub Sign In

// Listening for an error from GitHub
githubAuth.on('error', (error) => {
  console.log("ERROR USING GITHUB LOGIN", error);
});

// Listening for a token from GitHub
githubAuth.on('token', (token, res) => {
  console.log("GOT TOKEN FROM GITHUB", token);
  firebaseModel.githubSignIn(token.access_token).then(result => {
    if (typeof result === "string") {
      res.render("login", {errorMessage:"Failed to sign in. Please try again."})
    } else {
      res.redirect('/checkUserProfile');
    }
  });
});

// Initiate Github Login
router.get("/auth/github", function(res,req,next) {
  console.log("Started GitHub OAuth");
  return githubAuth.login(res,req);
});

// Recieving Callback from Github
router.get("/auth/github/callback", function(res, req, next) {
  console.log("Got Callback from Github");
  return githubAuth.callback(res,req);
})



// Google Sign In
router.get("/googlesignintoken", function(req,res,next) {
  console.log("GOT GOOGLE SIGN IN TOKEN");
  const google_id_token = req.query.id_token
  console.log(google_id_token)
  firebaseModel.googleSignIn(google_id_token).then(result => {
    if (typeof result === "string") {
      res.render("login", {errorMessage:"Failed to sign in. Please try again."})
    } else {
      res.redirect('/checkUserProfile');
    }
  });
});

// Show Login Page
router.get("/login", function (req, res, next) {
  res.render("login", {errorMessage:""});
});

// Form Submit (POST METHOD)
router.post("/login/submit", function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  firebaseModel.authSignIn(email, password).then(result => {
    if (typeof result === "string") {
      errorMessage = "Failed to log in. Please re-check your email and password.";
      res.render("login", {errorMessage})
    } else {
      res.redirect("/checkUserProfile");
    }
  });
});

/* LOG OUT FUNCTIONALITY */
router.get("/logout", function (req, res, next) {
  firebaseModel.authLogOut();
  res.redirect("/");
});

/* COMPLETE USER PROFILE FUNCTIONALITY */

// Check if user has completed their profile and redirect them to appropriate page
router.get("/checkUserProfile", function (req, res, next) {
  if (currentUser) {
    firestore.checkUserProfile({db:firebaseModel.db, user:currentUser}).then((completedProfile) => {
      console.log('COMPLETEDPROFILE', completedProfile)
      if (completedProfile===true) {
        console.log("USER HAS COMPLETED THEIR PROFILE");
        res.redirect('/users');
      } else {
        res.redirect('/complete-profile');
      }
    });
  } else {
    res.redirect('/');
  };
});

router.get("/complete-profile", function (req,res,next) {
  res.render("complete-profile", {displayName:currentUser.displayName})
});

router.post("/complete-profile/submit", function(req,res,next) {
  // Add the data sent back to the firestore
  const college = req.body.college;
  const subjectsArray = req.body["subjects-array"];
  firestore.completeUserProfile({db:firebaseModel.db, user:currentUser, college:college, subjects:subjectsArray});
  res.redirect('/users/');
})

/* STUDY ROOM FUNCTIONALITY */
router.get('/chat', function(req, res, next) {
  res.render('chat', {username: currentUser.displayName});
});


module.exports = router;
