const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home.controller");

console.log("Router loaded");

router.get("/", homeController.index);
router.use("/users", require("./user.route"));

module.exports = router;
