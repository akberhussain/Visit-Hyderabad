var express = require("express");
var router  = express.Router();
var SM = require("../../models/shoppingMall/shoppingMall");
var middleware = require("../../middleware");

// show campgounds Page
router.get("/shoppingMalls", function(req, res) {
    SM.find({},function(err, shoppingMalls){
        if(err){
            console.log("Error");
        }
        else{
                    // Ref = 1 for campgrounds.ejs
            res.render("places/places", {places:shoppingMalls, url: "/shoppingMalls", name : "Shopping Malls"});            
        }
    });
});

        // NEW
        
        // Rendering a form on campgrounds/new path

// router.get("/shoppingMalls/new", middleware.isLoggedIn, function(req, res){
//     res.render("shoppingMalls/newCamp");
// });

        // CREATE
router.post("/shoppingMalls", middleware.isLoggedIn,function(req, res){
    
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
   
        // insering object into SM model
    SM.create(obj,function(err, shoppingMalls){
        if(err){
            console.log("Error");
        }
        else{
            req.flash("success", "shoppingMall successfully created !!!");
            res.redirect("/requests");        
        }
    });
});
        // SHOW
        
        // Finding a perticular SM by Id and using it in show page
router.get("/shoppingMalls/:id", function(req, res) {
    SM.findById(req.params.id).populate("comments").exec(function(err, data){
        if(err){
            console.log("Error");
        }
        else{
                // Ref = 2 for show.ejs
            res.render("places/show", {places:data, url: "/shoppingMalls"});     
        }
    });
});

// edit route

router.get("/shoppingMalls/:id/edit", middleware.checkSMuser, function(req, res){ 
    SM.findById(req.params.id, function(err, foundSM){
        if(err){
            res.redirect("/shoppingMalls");
        }else {
         res.render("places/edit", {place: foundSM, url: "/shoppingMalls"});     
        }
    });
});

// updated Route
router.put("/shoppingMalls/:id", middleware.checkSMuser, function(req, res){
    SM.findByIdAndUpdate(req.params.id, req.body.place, function(err, updatedSM){
        if(err){
            res.redirect("/shoppingMalls");
        } else{
            res.redirect("/shoppingMalls/"+req.params.id);
        }
    });
});

// Delete Route

router.delete("/shoppingMalls/:id", middleware.checkSMuser, function(req, res){
   SM.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/shoppingMalls");
       } else {
            req.flash("success", "Sucessfully deleted a shoppingMall");   
            res.redirect("/shoppingMalls");
       }
   });
});

module.exports = router;
