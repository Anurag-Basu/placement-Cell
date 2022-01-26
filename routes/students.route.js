const express = require("express");
const router = express.Router();
const passport = require("passport");
const studentController = require("../controllers/students.controller");

router.post("/add", passport.checkAuthenticated, studentController.addStudent);
// router.get(
//   "/remove/:id",
//   passport.checkAuthenticated,
//   studentController.removeStudent
// );

module.exports = router;
