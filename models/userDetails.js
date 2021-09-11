const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _userId: {
    type: String,
  }
  collegeDetail: {
    collegeName:{
      type: String
    },
    collegeBranch:{
      type: String
    },
    collegeRollNo:{
      type: String
    },
    courseDuration:{
      from:{
        type: Date
      },
      to:{
        type: Date
      }
    }
  },
  about: {
    type: String,
  },
  skills: {
    type: Array,
  },
  dob: {
    type: Date,
  },
  contacts: {
    professionalEmailId:{
      type: String,
    },
    phoneNumber:{
      type: String,
    }
  },
  socialLinks: {
  	twitter:{
      type: String,
    },
    linkedin:{
      type: String,
    }
  },
  address:{
  	currentState:{
      type: String,
    },
    currentCiy:{
      type: String,
    }
  },
});


module.exports = mongoose.model("userDetails", userSchema);
