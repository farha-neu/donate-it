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
  

module.exports = router;