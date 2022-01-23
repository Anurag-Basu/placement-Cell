const express = require("express");
const router = express.Router();
const passport = require("passport");
const usersController = require("../controllers/users.controller");

router.get("/signin", usersController.signIn);
router.get("/signup", usersController.signUp);
router.post("/create", usersController.create);

// use passport as middleware for authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/signin" }),
  usersController.createSession
);

router.get("/signout", usersController.destroySession);

module.exports = router;
