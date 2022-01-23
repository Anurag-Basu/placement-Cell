const User = require("../models/user.model");

module.exports.index = async (req, res) => {
  res.render("home");
};
