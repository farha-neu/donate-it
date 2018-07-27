const router = require("express").Router();
const User = require("../models/User.js");
const Category = require("../models/Category.js");
const Item = require("../models/Item.js");

var loggedIn = false;
var user = null;

router.get("/auth", function(req, res) {
    // send back "session" status
    res.json({loggedIn:loggedIn,user:user});
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
            // req.session = dbUser;
            loggedIn = true;
            user = dbUser;    
        }
        res.json({loggedIn:loggedIn,user:user});
    })
    .catch(function(err) {
      res.json(err);
    });
})

router.get('/logout',function (req, res) {
    loggedIn = false;
    user = null;
    return res.json({loggedIn:loggedIn,user:user});
});
  

module.exports = router;