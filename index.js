const express = require("express");
const path = require("path");
require("dotenv").config();
const port = process.env.PORT;

//adding mongoose files to the database
const db = require("./config/mongoose");

//adding express as the server
const app = express();

//connected ejs as view engine
app.set("view engine", "ejs");
//joined the path of views folder to our current directory and then set that as our views
app.set("views", path.join(__dirname, "views"));

//encoding the code send by the browser
app.use(express.json());
//adding css and js
app.use(express.static("assets"));

//asking the server to start
app.listen(port, function (err) {
  if (err) {
    console.log(`error in running the server : ${err}`);
    return;
  }
  console.log(`server is running on port : ${port}`);
});
