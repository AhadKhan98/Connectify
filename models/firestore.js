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


// GET USER'S COLLEGE
const getUserCollegeAndSubjects = ({db, user}) => {
  return db.collection("users").doc(user.email).get()
  .then(snapshot => {
    return {college:snapshot.data().college, subjects:snapshot.data().subjects};
  })
  .catch(error => {
    return error
  })
};


// GET USER'S POINTS
const getUserPoints = ({db, user}) => {
  return db.collection("users").doc(user.email).get()
  .then(snapshot => {
    return {points:snapshot.data().points};
  })
  .catch(error => {
    return error
  })
};

// ADD POINTS TO USER
const addUserPoints = ({db, user, points}) => {
  let currentUserPoints = 0;
  getUserPoints({db, user}).then(result => {
    currentUserPoints = result.points;
    newUserPoints = currentUserPoints += points;
    db.collection("users").doc(user.email).update({points:newUserPoints});
  });
};


// UPDATE USER PROFILE WITH NEW DATA
const updateUserProfile = ({db, user, newData}) => {
  db.collection("users").doc(user.email).update({
    displayName: newData.name,
    college: newData.college,
    subjects: newData.subjects,
  }).then(result => {
    console.log("NEWDATASUBJS", newData.subjects);
    if (newData.password) {
      user.updatePassword(newData.password).then(result => {
        console.log("PASSWORD CHANGE SUCCESSFUL");
      })
    }
    console.log("UPDATED DATA SUCCESSFULY");
  });
};

module.exports = {
  addNewUserToDatabase,
  checkUserProfile,
  completeUserProfile,
  getUserCollegeAndSubjects,
  getUserPoints,
  addUserPoints,
  updateUserProfile,
};
