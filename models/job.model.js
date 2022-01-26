const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      required: true,
    },
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
    jobDesc: {
      type: String,
      required: true,
    },
    companyDesc: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: true,
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
