const {database} = require("../models/firebase");


// ADD NEW USER WITH DEFAULT PARAMS
const addNewUserToDatabase = ({user}) => {
    data = {
        displayName: user.displayName,
        email: user.email,
        completedProfile: false,
    };
    console.log("ADDING NEW USER TO DB", user.displayName);
  };

module.exports = {addNewUserToDatabase};
