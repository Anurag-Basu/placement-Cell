const express = require("express");
const router = express.Router();
const passport = require("passport");
const studentController = require("../controllers/students.controller");

router.post("/add", passport.checkAuthenticated, studentController.addStudent);
router.get("/", passport.checkAuthenticated, studentController.getAll);
router.get("/:id", passport.checkAuthenticated, studentController.getStudent);
router.post(
  "/update",
  passport.checkAuthenticated,
  studentController.updateStudent
);


module.exports = router;
