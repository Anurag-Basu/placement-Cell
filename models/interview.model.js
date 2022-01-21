const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    package: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    skills: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      enum: ["PASS", "FAIL", "ONHOLD", "DONTATTEMPT"],
    },
  },
  {
    timestamps: true,
  }
);

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;
