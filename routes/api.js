const router = require("express").Router();
const User = require("../models/User.js");
const Category = require("../models/Category.js");
const Item = require("../models/Item.js");
// var loggedIn = false;
// var user = null;

router.get("/auth", function(req, res) {
    // send back "session" status
    res.json(req.session.user);
});


//signup
router.post("/signup",function(req,res){
    User.create(
       req.body
    ).then((dbUser)=>{
        res.json(dbUser)
    }).catch((err)=>{
        res.json(err);
    });
})


router.post("/login",function(req,res){
    User.findOne({ $and: [{username: req.body.username}, {password: req.body.password}] })
    .then(function(dbUser) {
        if(dbUser!==null){
            req.session.user = dbUser;
            console.log(req.session.user);
        }
        res.json(req.session.user);
    })
    .catch(function(err) {
      res.json(err);
    });
})

router.get('/logout',function (req, res) {
    req.session.destroy();
    return res.json(req.session);
});


// router.get("/search-items",function(req,res){
//     Item.find({})
//       .populate({ path: 'category', match: { name: "Home"}})
//       .then(function(dbItem){
//          dbItem = dbItem.filter(item =>item.category)
//          res.json(dbItem);
//       })
//       .catch(function(err){
//           res.json(err);
//       })
// })

router.get("/search-items",function(req,res){
  var name="baby";
  Item.find({$and: [{name:{ $regex: '.*' + name + '.*' }},{category:"5b5c1af267668652e0bb4d2a"},{zipcode:"02115"}]})
     .populate("category")
    .then(function(dbItem){
       res.json(dbItem);
    })
    .catch(function(err){
        res.json(err);
    })
})



  // Route for retrieving all items from the db with category and user
  router.get("/items", function(req, res) {
    // Find all items
    Item.find({})
      .populate("category")
      .populate("user")
      .then(function(dbItem) {
        console.log(dbItem);
        res.json(dbItem);
      })
      .catch(function(err) {
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
  
  

  router.post("/additem-to-user", function(req, res) {
    Item.create(
        {name: req.body.name,
        description: req.body.description,
        condition: req.body.condition,
        note: req.body.note,
        zipcode: req.body.zipcode,
        category: req.body.selectValue,
        user: req.body.user}
      )
      .then(function(dbItem) {
        res.json(dbItem);
        return User.findOneAndUpdate({_id: req.body.user}, { $push: { item: dbItem._id } }, { new: true });
      })
    //   .then(function(dbUser) {
    //     res.json(dbUser);
    //   })
      .catch(function(err) {
        res.json(err);
      });
  });
  

  //populating item with users and category with item
  // Route to get all User's and populate them with their items
  router.get("/users-and-items", function(req, res) {
    // Find all users
    User.find({})
      .populate({path:"item",populate:{path:"category"}})
      .then(function(dbUser) {
        res.json(dbUser);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  
  //recent items...items ordered by date creation
  router.get("/recent-items",function(req,res){
      Item.find({}).sort([['dateCreated', -1]])
      .then(function(dbItem){
          res.json(dbItem);
      })
      .catch(function(err){
          res.json(err);
      })
  })
    
//   // Route for saving a new category to the db and associating it with a item
//   router.post("/addcategory-to-item", function(req, res) {
//     // Create a new Note in the db
//     category.create(req.body)
//       .then(function(dbCategory) {
//         // If a item was created successfully, find one User (there's only one) and push the new Note's _id to the User's `item` array
//         // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//         // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//         return Item.findOneAndUpdate({}, { $push: { category: dbCategory._id } }, { new: true });
//       })
//       .then(function(dbItem) {
//         // If the item was updated successfully, send it back to the client
//         res.json(dbItem);
//       })
//       .catch(function(err) {
//         // If an error occurs, send it back to the client
//         res.json(err);
//       });
//   });
  
  
  
  
  
  
//   //populating item with users and category with item
//   // Route to get all User's and populate them with their items
//   router.get("/users-and-items", function(req, res) {
//     // Find all users
//     Category.find({})
//       // Specify that we want to populate the retrieved categories with any associated notes
//       .populate("item")
//       .then(function(dbCategory) {
//         // If able to successfully find and associate all Users and items, send them back to the client
//         res.json(dbCategory);
//       })
//       .catch(function(err) {
//         // If an error occurs, send it back to the client
//         res.json(err);
//       });
//   });

module.exports = router;