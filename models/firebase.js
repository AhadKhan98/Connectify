const firebase = require("firebase");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Firebase Auth Sign Up Handler
const authSignUp = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      return result.user.updateProfile({ displayName: name });
    })
    .catch(function (error) {
      // Handle Errors here.
      console.log("USER SIGNUP FAIL");
      console.log("ERROR: ", error);
    });
};

const authSignIn = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => result)
    .catch((error) => {
      console.log("LOG IN FAIL", error);
    });
};

const authLogOut = () => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("USER SIGNED OUT");
    })
    .catch(function (error) {
      console.log("ERROR SIGNING USER OUT", error);
    });
};

module.exports = {
  database,
  authSignUp,
  authSignIn,
  authLogOut,
};
