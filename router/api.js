const router = require("express").Router();
const User = require("../models/User.js");
const Category = require("../models/Category.js");
const Item = require("../models/Item.js");





router.post("/insert-items", function(req, res) {
  // as long as req.body matches what the model expects, this should insert into the database
  //create and save item in db
  Item.create({
    name: req.body.name,
    condition: req.body.condition,
    note: req.body.note,
    phonenumber: req.body.phonenumber
    
  })
  .then(function(result) {
     console.log(result);
    
    res.json(result);
  })
  .catch(function(err) {
    res.json(err);
  })
});
// Route for retrieving all items from the db
router.get("/items", function(req, res) {
  // Find all items
  Item.find({})
    .then(function(dbItem) {
      // If all items are successfully found, send them back to the client
      res.json(dbItem);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});


router.post("/insert-category", function(req, res) {
  // as long as req.body matches what the model expects, this should insert into the database
  //create and save category in db
  Category.create({
    name: req.body.name,
  })
  .then(function(result) {
     console.log(result);
    
    res.json(result);
  })
  .catch(function(err) {
    res.json(err);
  })
});

router.get("/categories", function(req, res) {
  // Find all categories
  Category.find({})
    .then(function(dbCategory) {
      // If all categories are successfully found, send them back to the client
      res.json(dbCategory);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});




// Route for saving a new item to the db and associating it with a User
router.post("/additem-to-user", function(req, res) {
  // Create a new Note in the db
  Item.create(req.body)
    .then(function(dbItem) {
      // If a item was created successfully, find one User (there's only one) and push the new Note's _id to the User's `item` array
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return User.findOneAndUpdate({}, { $push: { item: dbItem._id } }, { new: true });
    })
    .then(function(dbUser) {
      // If the User was updated successfully, send it back to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});






//populating item with users and category with item
// Route to get all User's and populate them with their items
router.get("/users-and-items", function(req, res) {
  // Find all users
  User.find({})
    // Specify that we want to populate the retrieved users with any associated notes
    .populate("item")
    .then(function(dbUser) {
      // If able to successfully find and associate all Users and items, send them back to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});


//??????SHOULD CATEGORY HOLD ITEMS INSTEAD??????




// Route for saving a new category to the db and associating it with a item
router.post("/addcategory-to-item", function(req, res) {
  // Create a new Note in the db
  category.create(req.body)
    .then(function(dbCategory) {
      // If a item was created successfully, find one User (there's only one) and push the new Note's _id to the User's `item` array
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return Item.findOneAndUpdate({}, { $push: { category: dbCategory._id } }, { new: true });
    })
    .then(function(dbItem) {
      // If the item was updated successfully, send it back to the client
      res.json(dbItem);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});






//populating item with users and category with item
// Route to get all User's and populate them with their items
router.get("/users-and-items", function(req, res) {
  // Find all users
  Category.find({})
    // Specify that we want to populate the retrieved categories with any associated notes
    .populate("item")
    .then(function(dbCategory) {
      // If able to successfully find and associate all Users and items, send them back to the client
      res.json(dbCategory);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});


module.exports = router;