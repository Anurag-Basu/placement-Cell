// Require express
const express = require("express");
const app = express();

// Access env variables
require("dotenv").config();
require("./config/view_helpers")(app);

// Cookie parser
const cookieParser = require("cookie-parser");
const port = process.env.PORT;
const db = require("./config/mongoose.config");
const path = require("path");

// Express layout for global layout
const expressLayouts = require("express-ejs-layouts");

// used for authentication cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport.config");

// For storing session in db
const MongoStore = require("connect-mongo");

// flash message
const flash = require("connect-flash");
// middleware to store flash messages
const customMware = require("./config/middleware");

// Html parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// layouts
app.use(expressLayouts);

// set styles and scripts for sub pages
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//static files
app.use("/static", express.static(path.join(__dirname, "assets")));

// setup view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// use MongoStore to store cookie in mongodb
app.use(
  session({
    name: "placementCell",
    secret: "hjbhjbjjnj",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: process.env.MONGO_URI,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "mongodb setup ok");
      }
    ),
  })
);

// Initializing passport
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use flash
app.use(flash());
app.use(customMware.setFlash);

// use router
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in starting server ${err}`);
    return;
  }
  console.log(`Server is running on port ; ${port}`);
});
