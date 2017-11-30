var express = require("express");
var router  = express.Router();
var HP = require("../../models/historicalPlace/historicalPlace");
var middleware = require("../../middleware");

// show Historical Places Page
router.get("/historicalPlaces", function(req, res) {
    HP.find({},function(err, historicalPlaces){
        if(err){
            console.log("Error");
        }
        else{
                    // Ref = 1 for campgrounds.ejs
            res.render("places/places", {places:historicalPlaces, url: "/historicalPlaces", name : "Historical Places"});            
        }
    });
});

        // NEW
        
        // Rendering a form on campgrounds/new path

// router.get("/historicalPlaces/new", middleware.isLoggedIn, function(req, res){
//     res.render("historicalPlaces/newCamp");
// });

        // CREATE
router.post("/historicalPlaces", middleware.isLoggedIn,function(req, res){
    
            // data coming from form
    // ==============================
    var name = req.body.name;
    var url = req.body.url;
    var description = req.body.description;
    var direction = req.body.direction;
    // ==============================
    
    var author = {
        id: req.user.id,
        username: req.user.username
    };
    
        // creating object of formData to insert in campgroundSchema
    var obj = {name:name, url:url, description: description, author: author, direction: direction};
   
        // insering object into HP model
    HP.create(obj,function(err, historicalPlaces){
        if(err){
            console.log("Error");
        }
        else{
            req.flash("success", "historicalPlace successfully created !!!");
            res.redirect("/requests");        
        }
    });
});
        // SHOW
        
        // Finding a perticular HP by Id and using it in show page
router.get("/historicalPlaces/:id", function(req, res) {
    HP.findById(req.params.id).populate("comments").exec(function(err, data){
        if(err){
            console.log("Error");
        }
        else{
                // Ref = 2 for show.ejs
            res.render("places/show", {places:data, url: "/historicalPlaces"});     
        }
    });
});

// edit route

router.get("/historicalPlaces/:id/edit", middleware.checkHPuser, function(req, res){ 
    HP.findById(req.params.id, function(err, foundHP){
        if(err){
            res.redirect("/historicalPlaces");
        }else {
         res.render("places/edit", {place: foundHP, url: "/historicalPlaces"});     
        }
    });
});

// updated Route
router.put("/historicalPlaces/:id", middleware.checkHPuser, function(req, res){
    HP.findByIdAndUpdate(req.params.id, req.body.place, function(err, updatedHP){
        if(err){
            res.redirect("/historicalPlaces");
        } else{
            res.redirect("/historicalPlaces/"+req.params.id);
        }
    });
});

// Delete Route

router.delete("/historicalPlaces/:id", middleware.checkHPuser, function(req, res){
   HP.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/historicalPlaces");
       } else {
            req.flash("success", "Sucessfully deleted a historicalPlace");   
            res.redirect("/historicalPlaces");
       }
   });
});

module.exports = router;
