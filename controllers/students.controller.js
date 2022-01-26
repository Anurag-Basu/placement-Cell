const Student = require("../models/student.model");

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
