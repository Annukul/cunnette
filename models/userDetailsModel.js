import mongoose from "mongoose";

const userDetailsSchema = new mongoose.Schema(
  {
    _userId: {
      type: String,
    },
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
          type: Date,
        },
        to: {
          type: Date,
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
    internships: [
      {
        internshipName: {
          type: String,
        },
        internshipDetail: {
          type: String,
        },
        internshipDuration: {
          from: {
            type: String,
          },
          to: {
            type: String,
          },
        },
      },
    ],
    jobs: [
      {
        jobName: {
          type: String,
        },
        jobDetail: {
          type: String,
        },
        jobDuration: {
          from: {
            type: String,
          },
          to: {
            type: String,
          },
        },
      },
    ],
    certificates: [
      {
        certificateName: {
          type: String,
        },
        certificateLink: {
          type: String,
        },
      },
    ],
    achievements: [
      {
        achievement: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Details = mongoose.model("userDetails", userDetailsSchema);
export default Details;
