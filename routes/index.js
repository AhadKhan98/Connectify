var express = require("express");
var router = express.Router();
const firebaseModel = require("../models/firebase");
const firebase = require("firebase");

/* FIREBASE AUTH LISTENER */
let currentUser = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    currentUser = user;
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
  res.render("signup");
});

// Form Submit (POST METHOD)
router.post("/signup/submit", function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  firebaseModel.authSignUp(name, email, password);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      res.redirect("/");
    }
  });
});

/* SIGN IN FUNCTIONALITY */

// Show Login Page
router.get("/login", function (req, res, next) {
  res.render("login");
});

// Form Submit (POST METHOD)
router.post("/login/submit", function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  firebaseModel.authSignIn(email, password);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
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
