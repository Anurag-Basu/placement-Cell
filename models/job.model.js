const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
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
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const job = mongoose.model("Job", jobSchema);

module.exports = job;
