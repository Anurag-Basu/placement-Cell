const Job = require("../models/job.model");

// Return all jobs
module.exports.index = async (req, res) => {
  const jobs = await Job.find({});
  res.render("home", { jobs });
};
