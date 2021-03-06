const User = require("../models/user.model");
const bcrypt = require("bcrypt");

// Render signup page
module.exports.signUp = (req, res) => {
  if (req.isAuthenticated()) {
    req.flash("error", "You are already Signed in!");
    return res.redirect("/users/profile");
  }
  return res.render("user_signup", { title: "Placement cell | Sign Up" });
};

// Create user
module.exports.create = (req, res) => {
  if (req.body.password !== req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log("Error in finding user in signing up");
      return;
    }

    if (!user) {
      User.create(req.body, async (err, user) => {
        if (err) {
          console.log("Error in creating user in signing up");
          return;
        }

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(user.password, salt);
        user.save();

        req.flash("success", "Successfully registered");
        return res.redirect("/users/signin");
      });
    } else {
      req.flash("error", "User with same email already exists.");
      return res.redirect("back");
    }
  });
};

// Login
module.exports.signIn = (req, res) => {
  if (req.isAuthenticated()) {
    req.flash("error", "You are already Signed in!");
    return res.redirect("/");
  }
  return res.render("user_signin", { title: "Placement cell | Sign In" });
};

// Create session
module.exports.createSession = (req, res) => {
  req.flash("success", "Logged in Successfully");
  return res.redirect("/");
};

// sign out
module.exports.destroySession = (req, res) => {
  req.logout();
  req.flash("success", "You have logged out!");

  return res.redirect("/");
};
