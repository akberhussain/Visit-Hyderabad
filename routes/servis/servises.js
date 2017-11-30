var express = require("express");
var router  = express.Router();
var Servis = require("../../models/servis/servis");
var middleware = require("../../middleware");

// show campgounds Page
router.get("/servises", function(req, res) {
    Servis.find({},function(err, servises){
        if(err){
            console.log("Error");
        }
        else{
                    // Ref = 1 for campgrounds.ejs
            res.render("places/places", {places:servises, url: "/servises", name : "Servis Stores"});            
        }
    });
});

        // NEW
        
        // Rendering a form on campgrounds/new path

// router.get("/servises/new", middleware.isLoggedIn, function(req, res){
//     res.render("servises/newCamp");
// });

        // CREATE
router.post("/servises", middleware.isLoggedIn,function(req, res){
    
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
   
        // insering object into Servis model
    Servis.create(obj,function(err, servises){
        if(err){
            console.log("Error");
        }
        else{
            req.flash("success", "servis successfully created !!!");
            res.redirect("/requests");        
        }
    });
});
        // SHOW
        
        // Finding a perticular Servis by Id and using it in show page
router.get("/servises/:id", function(req, res) {
    Servis.findById(req.params.id).populate("comments").exec(function(err, data){
        if(err){
            console.log("Error");
        }
        else{
                // Ref = 2 for show.ejs
            res.render("places/show", {places:data, url: "/servises"});     
        }
    });
});

// edit route

router.get("/servises/:id/edit", middleware.checkServisuser, function(req, res){ 
    Servis.findById(req.params.id, function(err, foundServis){
        if(err){
            res.redirect("/servises");
        }else {
         res.render("places/edit", {place: foundServis, url: "/servises"});     
        }
    });
});

// updated Route
router.put("/servises/:id", middleware.checkServisuser, function(req, res){
    Servis.findByIdAndUpdate(req.params.id, req.body.place, function(err, updatedServis){
        if(err){
            res.redirect("/servises");
        } else{
            res.redirect("/servises/"+req.params.id);
        }
    });
});

// Delete Route

router.delete("/servises/:id", middleware.checkServisuser, function(req, res){
   Servis.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/servises");
       } else {
            req.flash("success", "Sucessfully deleted a servis");   
            res.redirect("/servises");
       }
   });
});

module.exports = router;
