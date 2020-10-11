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

// CHECK IF USER HAS COMPLETED PROFILE
const checkUserProfile = ({db, user}) => {
  let completedProfile = db.collection("users").doc(user.email).get().then(snapshot => {
    console.log(snapshot.data());
    data = snapshot.data();
    if (data.completedProfile) {
      return true
    } else {
      return false
    }
  });
  return completedProfile;
}

module.exports = {addNewUserToDatabase,checkUserProfile};
