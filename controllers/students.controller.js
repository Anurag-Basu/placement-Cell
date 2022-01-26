const Student = require("../models/student.model");

// Add a student
module.exports.addStudent = async (req, res) => {
  try {
    let student = await Student.findOne({ email: req.body.email });
    if (student) {
      req.flash(
        "error",
        `Student with email ${req.body.email} already exist !`
      );
      return res.redirect("back");
    }
    student = await Student.create(req.body);

    req.flash("success", "Student added!");
    return res.redirect("back");
  } catch (e) {
    req.flash("error", error);
    return res.redirect("back");
  }
};

// Return all students
module.exports.getAll = async (req, res) => {
  try {
    const students = await Student.find({});

    return res.render("student", { students });
  } catch (e) {
    req.flash("error", error);
    return res.redirect("back");
  }
};

// Return single student
module.exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findOne({
      _id: req.params.id,
    }).populate("interviews");

    console.log(req.params.id);
    if (!student) {
      req.flash("error", `Student does not exist!`);
      return res.redirect("back");
    }

    return res.render("student_detail", { student });
  } catch (e) {
    console.log(e);
    return res.redirect("back");
  }
};

// Update student interview status
module.exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findOne({
      _id: req.body.sId,
    }).populate("interviews");
    if (!student) {
      req.flash("error", `Student does not exist!`);
      return res.redirect("back");
    }

    const result = student.result;
    const index = result.findIndex((r) => r.job === req.body.jobId);
    result[index].score = req.body.score;

    student.result = result;
    await student.save();

    req.flash("success", `Status updated to ${req.body.score}`);
    return res.redirect("back");
  } catch (e) {
    console.log(e);
    return res.redirect("back");
  }
};
