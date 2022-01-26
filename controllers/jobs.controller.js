const Job = require("../models/job.model");
const Student = require("../models/student.model");

// Add job
module.exports.create = async (req, res) => {
  try {
    let job = await Job.findOne({
      positon: req.body.position,
      company: req.body.company,
    });
    if (job) {
      req.flash(
        "error",
        `Job with positon ${req.body.position} & copany ${req.body.company} already exist!`
      );
      return res.redirect("back");
    }
    job = await Job.create(req.body);

    req.flash("success", "Job added!");
    return res.redirect("back");
  } catch (e) {
    console.log(e);
    return res.redirect("back");
  }
};

// Get single job
module.exports.getJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
    }).populate("students");
    if (!job) {
      req.flash("error", `Job does not exist!`);
      return res.redirect("back");
    }

    return res.render("job_detail", { job });
  } catch (e) {
    console.log(e);
    return res.redirect("back");
  }
};

// Add student to a interview
module.exports.addStudent = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.body.jobId,
    }).populate("students");
    if (!job) {
      req.flash("error", `Job does not exist!`);
      return res.redirect("back");
    }
    const student = await Student.findOne({ email: req.body.email });
    if (!student) {
      req.flash(
        "error",
        `Student with email ${req.body.email} does not exist!`
      );
      return res.redirect("back");
    }

    const exist = job.students.filter((stu) => stu.email === req.body.email);
    if (exist.length > 0) {
      req.flash("error", `Student already added to interview!`);
      return res.redirect("back");
    }

    job.students.push(student.id);
    await job.save();

    student.result.push({
      job: job.id,
      score: "DONTATTEMPT",
      date: req.body.date,
    });
    student.interviews.push(job.id);
    await student.save();

    req.flash("success", `Student added successfully!`);
    return res.redirect("back");
  } catch (e) {
    console.log(e);
    return res.redirect("back");
  }
};
