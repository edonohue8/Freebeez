// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/members", (req, res) => {
    res.render("partials/members");
    // console.log(res);
  });

  app.get("/", (req, res) => {
    // if (req.user) {
    //   res.redirect("/members");
    // }
    res.render("layouts/main");
    // console.log(res);
  });
  // app.get("/", (req, res) => {
  //   // If the user already has an account send them to the members page
  //   if (req.user) {
  //     res.redirect("/members");
  //   }
  //   res.sendFile(path.join(__dirname, "../public/login.html"));
  // });
  // app.get("/", (req, res) => {
  //   // If the user already has an account send them to the members page
  //   if (req.user) {
  //     res.redirect("/members");
  //   }
  //   res.render("main", { title: Login });
  // });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get("/members", isAuthenticated, (_req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/members.html"));
  // });
  app.get("/members", isAuthenticated, (_req, res) => {
    res.render("partials/members");
  });
};
