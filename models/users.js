const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  fullName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  emailDomain: {
    type: String,
  },
  userRole: {
  	type: String,
  },
  emailVerifyStatus:{
  	type: Boolean,
  },
  verificationCode:{
  	type: String,
  },
  accountStatus:{
  	type: Boolean,
  }

});


module.exports = mongoose.model("Users", userSchema);
