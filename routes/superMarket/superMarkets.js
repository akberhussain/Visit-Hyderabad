var express = require("express");
var router  = express.Router();
var SuperM = require("../../models/superMarket/superMarket");
var Request = require("../../models/request/request");
var middleware = require("../../middleware");

// show campgounds Page
router.get("/superMarkets", function(req, res) {
    SuperM.find({},function(err, superMarkets){
        if(err){
            console.log("Error");
        }
        else{
            res.render("places/places", {places:superMarkets, url: "/superMarkets", name : "Super Markets"});            
        }
    });
});

        // NEW
        
        // Rendering a form on campgrounds/new path

// router.get("/superMarkets/new", middleware.isLoggedIn, function(req, res){
//     res.render("superMarkets/newCamp");
// });

        // CREATE
router.post("/superMarkets", middleware.isLoggedIn,function(req, res){
    
            // data coming from form
    // ==============================
    var name = req.body.name;
    var url = req.body.url;
    var description = req.body.description;
    var direction = req.body.direction;
    // ==============================
    
    var author = {
        id: req.body.id,
        username: req.body.username
    };
    
        // creating object of formData to insert in campgroundSchema
    var obj = {name:name, url:url, description: description, author: author, direction: direction};
   
        // insering object into SuperM model
    SuperM.create(obj,function(err, superMarkets){
        if(err){
            console.log("Error");
        }
        else{
            req.flash("success", "superMarket successfully created !!!");
            res.redirect("/requests");        
        }
    });
});


        // SHOW
        
        // Finding a perticular SuperM by Id and using it in show page
router.get("/superMarkets/:id", function(req, res) {
    SuperM.findById(req.params.id).populate("comments").exec(function(err, data){
        if(err){
            console.log("Error");
        }
        else{
                // Ref = 2 for show.ejs
            res.render("places/show", {places:data, url: "/superMarkets"});     
        }
    });
});

// edit route

router.get("/superMarkets/:id/edit", middleware.checkSuperMuser, function(req, res){ 
    SuperM.findById(req.params.id, function(err, foundSuperM){
        if(err){
            res.redirect("/superMarkets");
        }else {
         res.render("places/edit", {place: foundSuperM, url: "/superMarkets"});     
        }
    });
});

// updated Route
router.put("/superMarkets/:id", middleware.checkSuperMuser, function(req, res){
    SuperM.findByIdAndUpdate(req.params.id, req.body.place, function(err, updatedSuperM){
        if(err){
            res.redirect("/superMarkets");
        } else{
            res.redirect("/superMarkets/"+req.params.id);
        }
    });
});

// Delete Route

router.delete("/superMarkets/:id", middleware.checkSuperMuser, function(req, res){
   SuperM.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/superMarkets");
       } else {
            req.flash("success", "Sucessfully deleted a superMarket");   
            res.redirect("/superMarkets");
       }
   });
});


module.exports = router;
