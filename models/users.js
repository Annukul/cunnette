import mongoose from 'mongoose';

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
  emailVerifyStatus: {
    type: Boolean,
  },
  verificationCode: {
    type: String,
  },
  accountStatus: {
    type: Boolean,
  }

});


const Users = mongoose.model("users", userSchema);
export default Users;
