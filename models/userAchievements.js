const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _userId: {
    type: String,
  },
  internships: {[
    {
      internshipName: {
        type: String
      },
      internshipDetail: {
        type: String
      },
      internshipDuration: {
         from: {
          type: String
         },
         to: {
          type: String
         }
      },
    }
  ]},
  jobs: {[
    {
      jobName: {
        type: String
      },
      jobDetail: {
        type: String
      },
      jobDuration: {
         from: {
          type: String
         },
         to: {
          type: String
         }
      },
    }
  ]},
  certificates:{[
    {
      certificateName:{
        type: String,
      },
      certificateLink: {
        type: String,
      }
    }
  ]}
  Achievments: {[
    {
      Achievment: {
        type: String
      }
    }
  ]},
});


module.exports = mongoose.model("userAchievements", userSchema);
