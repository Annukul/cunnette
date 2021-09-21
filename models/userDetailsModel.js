import mongoose from "mongoose";

const userDetailsSchema = new mongoose.Schema(
  {
    _userId: { type: String, immutable: true },
    collegeDetail: {
      collegeName: {
        type: String,
      },
      collegeBranch: {
        type: String,
      },
      collegeRollNo: {
        type: String,
      },
      courseDuration: {
        from: {
          type: String,
        },
        to: {
          type: String,
        },
      },
    },
    about: {
      type: String,
    },
    skills: {
      type: Array,
    },
    dob: {
      type: String,
    },
    contacts: {
      professionalEmailId: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
    },
    socialLinks: {
      twitter: {
        type: String,
      },
      linkedin: {
        type: String,
      },
    },
    address: {
      currentState: {
        type: String,
      },
      currentCity: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const Details = mongoose.model("userDetails", userDetailsSchema);
export default Details;
