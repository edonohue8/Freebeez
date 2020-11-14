// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      address1: req.body.address1,
      // address2: req.body.address2,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    // will not work because logout doesnt exist req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/userData", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // Need route to delete user WITH items associated with user
  // this code alone shall be able to delte user and everything associated with user like user items

  app.delete("api/userData/:id", (req, res) => {
    db.User.destroy({
      include: db.Item,
      where: {
        id: req.params.id
      }
    }).then(dbItem => {
      res.json(dbItem);
    });
  });

  //route for posting or adding an item
  app.post("/api/itemPost", (req, res) => {
    db.Item.create({
      itemName: req.body.itemName,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
      skuPic: req.body.skuPic,
      sellIndicator: req.body.sellIndicator,
      traderIndicator: req.body.tradeIndicator,
      newUsed: req.body.newUsed
    }).then(item => {
      // respond back with the item id
      res.json(item.id);
    });
  });

  // 2 step process
  // 1 create the item (and get the item id of the newly created item )
  // upload photo (and associate the photo wih the item id )
  // done

  // Route for viewing all items and associate with users that post them
  // need foreign key in MySQL tables
  app.get("/api/item_data", (req, res) => {
    db.Item.findAll({
      include: db.User
    }).then(items => {
      res.json(items);
    });
  });

  // Need route for pulling a specified item from db (when user wants to view it)
  app.get("api/item_data/:id", (req, res) => {
    db.Item.findOne({
      include: db.User
    }).then(items => {
      res.json(items);
    });
  });

  // Need route to view items by category (needs editing)
  app.get("api/item_data/:category", (req, res) => {
    db.Item.findOne({
      include: db.User
    }).then(items => {
      res.json(items);
    });
  });

  // I don't think we need to allow updating of items - Joe
  // Need route to update item using PUT
  // app.put("api/item_data", (req, res) => {
  //   db.Item.update(req.body, {
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //     .then(dbItem => {
  //       res.json(dbItem);
  //     })
  //     .catch(err => {
  //       res.json(err);
  //     });
  // });

  // Need route to view items listed under user
  app.get("api/userData/:id", (req, res) => {
    db.User.findOne({
      include: db.Item
    }).then(userItems => {
      res.json(userItems);
    });
  });

  // Need route to delete item
  //might not need this due to line 66 being responsible for deleting all of user and everything associated with user
  app.delete("api/item_data/:id", (req, res) => {
    db.Item.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbItem => {
      res.json(dbItem);
    });
  });
};

// Load in our dependencies
// var express = require('express');
// var jwt = require('jsonwebtoken');

// var app = express();

// Register the home route that displays a welcome message
// This route can be accessed without a token
// app.get('/', function(req, res){
//   res.send("Welcome to our API");
// })

// Register the route to get a new token
// In a real world scenario we would authenticate user credentials
// before creating a token, but for simplicity accessing this route
// will generate a new token that is valid for 2 minutes
// app.get('/token', function(req, res){
//   var token = jwt.sign({username:"ado"}, 'supersecret',{expiresIn: 120});
//   res.send(token)
// })

// Register a route that requires a valid token to view data
/*app.get('/api', function(req, res){
  var token = req.query.token;
  jwt.verify(token, 'supersecret', function(err, decoded){
    if(!err){
      var secrets = {"" : "","" : "","" : ""};
      res.json(secrets);
    } else {
      res.send(err);
    }
  })
})

// Launch our app on port ""
app.listen('');*/
