const router = require("express").Router();
const User = require("../models/User.js");
const Category = require("../models/Category.js");
const Item = require("../models/Item.js");

//authenticating user
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

//login
router.post("/login",function(req,res){
    User.findOne({ $and: [{username: req.body.username}, {password: req.body.password}] })
    .then(function(dbUser) {
        if(dbUser!==null){
            req.session.user = dbUser;
        }
        res.json(req.session.user);
    })
    .catch(function(err) {
      res.json(err);
    });
})

//logout
router.get('/logout',function (req, res) {
    req.session.destroy();
    return res.json(req.session);
});

//bad. need to modify this.
// home page search by name, category, zipcode, radius
router.get("/search-items",function(req,res){
  var name=req.query.name;
  var categoryId=req.query.selectValue;
  var zipcode=req.query.zipCodes;
  var q =[];
  if(name){
    q.push({name:{ $regex: name + '.*' }})
  }
  if(categoryId){
    q.push({category:categoryId})
  }
  var query=[];
  if(zipcode!==undefined){
     for(var i=0; i<zipcode.length;i++){
       query.push({zipcode:zipcode[i]});
     }
     var obj={path:"user", select:"zipcode",match:{$or:query}};
   }
   else{
     var obj={path:"user",select:"zipcode"};
  }
  Item.find({$and: q})
     .populate("category")
     .populate(obj)
    .then(function(dbItem){
       var filteredItem = dbItem.filter(item => item.user !== null);
       res.json(filteredItem);
    })
    .catch(function(err){
        res.json(err);
    })
})



  // Route for retrieving all items from the db with category and user
  router.get("/items", function(req, res) {
    Item.find({})
      .populate("category")
      .populate("user")
      .then(function(dbItem) {
        res.json(dbItem);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  

  // Route for retrieving a single item from the db with category and user
  router.get("/item/:id", function(req, res) {
    Item.findOne({_id : req.params.id})
      .populate("category")
      .populate("user")
      .then(function(dbItem) {
        res.json(dbItem);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  
  //inserts a category into database
  router.post("/insert-category", function(req, res) {
    Category.create({
      name: req.body.name,
    })
    .then(function(result) { 
      res.json(result);
    })
    .catch(function(err) {
      res.json(err);
    })
  });

  
  // Find all categories
  router.get("/categories", function(req, res) {
    Category.find({})
      .then(function(dbCategory) {
        res.json(dbCategory);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  
  
 //creates an item and adds reference to user
  router.post("/additem-to-user", function(req, res) {
    Item.create(
        {name: req.body.name,
        description: req.body.description,
        condition: req.body.condition,
        note: req.body.note,
        category: req.body.selectValue,
        user: req.body.user,
        img:req.body.img}
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
  

  // Route to get all User's and populate them with their items and category
  router.get("/users-and-items", function(req, res) {
    User.find({})
      .populate({path:"item",populate:{path:"category"}})
      .then(function(dbUser) {
        res.json(dbUser);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  
  //recent 5 items...items ordered by date creation
  router.get("/recent-items",function(req,res){
      Item.find({}).sort([['dateCreated', -1]]).limit(6).populate("user")
      .then(function(dbItem){
          res.json(dbItem);
      })
      .catch(function(err){
          res.json(err);
      })
  })
    


module.exports = router;