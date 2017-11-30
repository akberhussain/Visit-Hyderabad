var express = require("express");
var router  = express.Router();
var SC = require("../../models/shoppingCenter/shoppingCenter");
var middleware = require("../../middleware");

// show campgounds Page
router.get("/shoppingCenters", function(req, res) {
    SC.find({},function(err, shoppingCenters){
        if(err){
            console.log("Error");
        }
        else{
                    // Ref = 1 for campgrounds.ejs
            // res.render("shoppingCenters/shoppingCenters", {shoppingCenters:shoppingCenters});
            res.render("places/places", {places:shoppingCenters, url: "/shoppingCenters", name: "Shopping Centers"});
        }
    });
});

        // NEW
        
        // Rendering a form on campgrounds/new path

// router.get("/shoppingCenters/new", middleware.isLoggedIn, function(req, res){
//     res.render("shoppingCenters/newCamp");
// });

        // CREATE
router.post("/shoppingCenters", middleware.isLoggedIn,function(req, res){
    
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
   
        // insering object into SC model
    SC.create(obj,function(err, shoppingCenters){
        if(err){
            console.log("Error");
        }
        else{
            req.flash("success", "shoppingCenter successfully created !!!");
            res.redirect("/requests");        
        }
    });
});
        // SHOW
        
        // Finding a perticular SC by Id and using it in show page
router.get("/shoppingCenters/:id", function(req, res) {
    SC.findById(req.params.id).populate("comments").exec(function(err, data){
        if(err){
            console.log("Error");
        }
        else{
                // Ref = 2 for show.ejs
            res.render("places/show", {places:data, url: "/shoppingCenters"});     
        }
    });
});

// edit route

router.get("/shoppingCenters/:id/edit", middleware.checkshoppingCenteruser, function(req, res){ 
    SC.findById(req.params.id, function(err, foundSC){
        if(err){
            res.redirect("/shoppingCenters");
        }else {
         res.render("places/edit", {place: foundSC, url: "/shoppingCenters"});     
        }
    });
});

// updated Route
router.put("/shoppingCenters/:id", middleware.checkshoppingCenteruser, function(req, res){
    SC.findByIdAndUpdate(req.params.id, req.body.place, function(err, updatedSC){
        if(err){
            res.redirect("/shoppingCenters");
        } else{
            res.redirect("/shoppingCenters/"+req.params.id);
        }
    });
});

// Delete Route

router.delete("/shoppingCenters/:id", middleware.checkshoppingCenteruser, function(req, res){
   SC.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/shoppingCenters");
       } else {
            req.flash("success", "Sucessfully deleted a shoppingCenter");   
            res.redirect("/shoppingCenters");
       }
   });
});

module.exports = router;
