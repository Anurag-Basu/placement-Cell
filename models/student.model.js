const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    college: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["NOT_PLACED", "PLACED"],
      default: "NOT_PLACED",
    },
    dsaScore: {
      type: Number,
      required: true,
    },
    webScore: {
      type: Number,
      required: true,
    },
    reactScore: {
      type: Number,
      required: true,
    },
    interviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interview",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
