// Need to require dotenv

// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");
const exphbs = require("express-handlebars");
// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({
    secret: process.env.SESSION_SECRET, // gets SESSION_SECRET value from .env file - Joe
    resave: true, // <-- determines whether session should be updated, even if user did not make a change; using false will save changes only if a change is made  - Joe
    saveUninitialized: true // <-- creates cookie whenever user visits page, even if not logged in - Joe
    // , cookie: { secure: true } <-- ??? - Joe
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
