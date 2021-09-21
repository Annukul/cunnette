import mongoose from "mongoose";

const userAchievementsSchema = new mongoose.Schema(
  {
    _userId: { type: String },
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

const Achievements = mongoose.model("userAchievements", userAchievementsSchema);
export default Achievements;
