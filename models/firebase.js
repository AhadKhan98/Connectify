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
      return error.message;
    });
};

const authSignIn = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      return result
    })
    .catch((error) => {
      return error.message;
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

const googleSignIn = (google_id_token) => {
  var credential = firebase.auth.GoogleAuthProvider.credential(google_id_token);
  
  return firebase.auth().signInWithCredential(credential)
  .then((user)=>{
    console.log('NEW GFIREBASE USER', user);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log("GOOGLE USER TO FIREBASE ERROR",errorCode,errorMessage,email,credential)
    // ...
  });
};

const githubSignIn = (access_token) => {
  const credential = firebase.auth.GithubAuthProvider.credential(access_token);
  return firebase.auth().signInWithCredential(credential)
  .then((user) => {
    console.log('NEW GITHUB USER', user);
  })
  .catch((error) => {
    console.log("GITHUB USER TO FIREBASE ERROR", error.code, error.message, error.email, error.credential);
  })
};

module.exports = {
  database,
  authSignUp,
  authSignIn,
  authLogOut,
  googleSignIn,
  githubSignIn,
};
