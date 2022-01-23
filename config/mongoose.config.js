//require the library
const mongoose = require("mongoose");

//connect to the database
mongoose.connect(process.env.MONGO_URI);

//acquire the connection , to check if it is successfull
const db = mongoose.connection;

//if there is error print this
db.on("error", console.error.bind(console, "error connecting to db"));

//if db is connected do this
db.once("open", function () {
  console.log("successfully connected the db");
});
