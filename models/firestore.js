const firebaseModel = require("../models/firebase");

// ADD NEW USER WITH DEFAULT PARAMS
const addNewUserToDatabase = ({db, result}) => {
    // Check if user already exists in firestore
    db.collection("users").doc(result.email).get().then((document) => {
      if (document.exists) {
        console.log("USER EXISTS");
      } else {
        console.log("CREATING NEW USER", result);
        data = {
          displayName: result.displayName,
          email: result.email,
          completedProfile: false,
          points: 0,
      };
      db.collection("users").doc(result.email).set({data});
      }
    });

    
  };

module.exports = {addNewUserToDatabase};
