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
      db.collection("users").doc(result.email).set({...data});
      }
    });
  };

// CHECK IF USER HAS COMPLETED PROFILE
const checkUserProfile = ({db, user}) => {
  let completedProfile = db.collection("users").doc(user.email).get().then(snapshot => {
    console.log(snapshot.data());
    snapshotData = snapshot.data();
    return snapshotData.completedProfile;
  })
  .catch(error => error);
  return completedProfile;
};

// ADD SUBJECTS AND COLLEGE TO USER PROFILE
const completeUserProfile = ({db, user, college, subjects}) => {
  let subjectsArray = subjects.split('|');
  subjectsArray.pop();
  console.log("SUBJECTS ARRAY ⌛", subjectsArray);
  db.collection("users").doc(user.email).set({
    subjects:subjectsArray,
    college: college,
  }, {merge:true}).then(() => {
    console.log("COMPLETED USER IN FIREBASE 🔥");
  });
  db.collection("users").doc(user.email).update({completedProfile:true});
}

module.exports = {addNewUserToDatabase,checkUserProfile,completeUserProfile};
