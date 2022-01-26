const Job = require("../models/job.model");

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
