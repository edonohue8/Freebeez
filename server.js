// Need to require dotenv
// require("dotenv").config();

// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");
// Require multer
const multer = require("multer");

// Configuration for using multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "/public/data");
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  }
});

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
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Variable for uploading image using multer
const upload = multer({ storage: storage }).single("photo");

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// POST route for uploading image using multer
app.post("/upload/:item", (req, res) => {
  upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }

    // Everything went fine.
    db.Item.findOne({
      where: {
        id: req.params.item
      }
    }).then(async foundItem => {
      if (foundItem) {
        // u will need to figure this out yourself (rough estimation of actual code, about 70% correct)
        foundItem.photoLocation = req.files["photo"];
        // resave item so we know that the file is upload and the path was stored
        await foundItem.save();

        // respond back to client
        res.json({
          success: true,
          successMessage: "Success!"
        });
      } else {
      }
    });
  });
});

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
