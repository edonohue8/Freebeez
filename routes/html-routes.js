// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/members", (req, res) => {
    res.render("partials/members");
    
  });

  app.get("/", (req, res) => {
    
    res.render("layouts/main");
    
  });
 
  app.get("/members", isAuthenticated, (_req, res) => {
    res.render("partials/members");
  });
};
