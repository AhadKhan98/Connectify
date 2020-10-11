const firebaseModel = require("../models/firebase");

// ADD NEW USER WITH DEFAULT PARAMS
const addNewUserToDatabase = ({db, result}) => {
    console.log("BEFORE INSERTING", );
    data = {
        displayName: result.displayName,
        email: result.email,
        completedProfile: false,
    };
    db.collection("users").doc(result.email).set({data});
  };

module.exports = {addNewUserToDatabase};
