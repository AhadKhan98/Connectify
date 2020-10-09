var express = require("express");
var router = express.Router();
const firebaseModel = require("../models/firebase");
const firebase = require("firebase");

/* FIREBASE AUTH LISTENER */
let currentUser = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    currentUser = user;
    console.log("OTHER ATTRIBUTES ", currentUser);
    console.log("WE HAVE A USER", currentUser.displayName);
  } else {
    currentUser = null;
    console.log("NO USER");
  }
});

/* HANDLER FUNCTIONS */

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
      res.redirect("/");
    }
    
  });
});

/* SIGN IN FUNCTIONALITY */

// Google Sign In
router.get("/googlesignintoken", function(req,res,next) {
  console.log("GOT GOOGLE SIGN IN TOKEN");
  res.redirect('/');
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
      res.redirect("/");
    }
  });
});

/* LOG OUT FUNCTIONALITY */
router.get("/logout", function (req, res, next) {
  firebaseModel.authLogOut();
  res.redirect("/");
});

module.exports = router;
