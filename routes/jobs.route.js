const express = require("express");
const router = express.Router();
const passport = require("passport");
const jobController = require("../controllers/jobs.controller");

router.post("/create", jobController.create);

module.exports = router;
