var express = require("express");
var router  = express.Router();
var Restaurant = require("../../models/restaurant/restaurant");
var middleware = require("../../middleware");

// show campgounds Page

router.get("/restaurants", function(req, res) {
    Restaurant.find({},function(err, restaurants){
        if(err){
            console.log("Error");
        }
        else{
                    // Ref = 1 for campgrounds.ejs
            res.render("places/places", {places:restaurants, url: "/restaurants", name : "Restaurants"});            
        }
    });
});


        // NEW
        
        // Rendering a form on campgrounds/new path

// router.get("/restaurants/new", middleware.isLoggedIn, function(req, res){
//     res.render("restaurants/newCamp");
// });

        // CREATE
router.post("/restaurants", middleware.isLoggedIn,function(req, res){
    
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
   
        // insering object into Restaurant model
    Restaurant.create(obj,function(err, restaurants){
        if(err){
            console.log("Error");
        }
        else{
            req.flash("success", "restaurant successfully created !!!");
            res.redirect("/requests");        
        }
    });
});
        // SHOW
        
        // Finding a perticular Restaurant by Id and using it in show page
router.get("/restaurants/:id", function(req, res) {
    Restaurant.findById(req.params.id).populate("comments").exec(function(err, data){
        if(err){
            console.log("Error");
        }
        else{
                // Ref = 2 for show.ejs
            res.render("places/show", {places:data, url: "/restaurants"});     
        }
    });
});

// edit route

router.get("/restaurants/:id/edit", middleware.checkRuser, function(req, res){ 
    Restaurant.findById(req.params.id, function(err, foundRestaurant){
        if(err){
            res.redirect("/restaurants");
        }else {
         res.render("places/edit", {place: foundRestaurant, url: "/restaurants"});     
        }
    });
});

// updated Route
router.put("/restaurants/:id", middleware.checkRuser, function(req, res){
    Restaurant.findByIdAndUpdate(req.params.id, req.body.place, function(err, updatedRestaurant){
        if(err){
            res.redirect("/restaurants");
        } else{
            res.redirect("/restaurants/"+req.params.id);
        }
    });
});

// Delete Route

router.delete("/restaurants/:id", middleware.checkRuser, function(req, res){
   Restaurant.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/restaurants");
       } else {
            req.flash("success", "Sucessfully deleted a restaurant");   
            res.redirect("/restaurants");
       }
   });
});

module.exports = router;
