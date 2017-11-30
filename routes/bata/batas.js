var express = require("express");
var router  = express.Router();
var Bata = require("../../models/bata/bata");
var middleware = require("../../middleware");

// show campgounds Page
router.get("/batas", function(req, res) {
    Bata.find({},function(err, batas){
        if(err){
            console.log("Error");
        }
        else{
                    // Ref = 1 for campgrounds.ejs
            res.render("places/places", {places:batas, url: "/batas", name : "Bata Stores"});            
        }
    });
});

        // NEW
        
        // Rendering a form on campgrounds/new path

// router.get("/batas/new", middleware.isLoggedIn, function(req, res){
//     res.render("batas/newCamp");
// });

        // CREATE
router.post("/batas", middleware.isLoggedIn,function(req, res){
    
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
   
        // insering object into Bata model
    Bata.create(obj,function(err, batas){
        if(err){
            console.log("Error");
        }
        else{
            req.flash("success", "bata successfully created !!!");
            res.redirect("/requests");        
        }
    });
});
        // SHOW
        
        // Finding a perticular Bata by Id and using it in show page
router.get("/batas/:id", function(req, res) {
    Bata.findById(req.params.id).populate("comments").exec(function(err, data){
        if(err){
            console.log("Error");
        }
        else{
                // Ref = 2 for show.ejs
            res.render("places/show", {places:data, url: "/batas"});     
        }
    });
});

// edit route

router.get("/batas/:id/edit", middleware.checkBatauser, function(req, res){ 
    Bata.findById(req.params.id, function(err, foundBata){
        if(err){
            res.redirect("/batas");
        }else {
         res.render("places/edit", {place: foundBata, url: "/batas"});     
        }
    });
});

// updated Route
router.put("/batas/:id", middleware.checkBatauser, function(req, res){
    Bata.findByIdAndUpdate(req.params.id, req.body.place, function(err, updatedBata){
        if(err){
            res.redirect("/batas");
        } else{
            res.redirect("/batas/"+req.params.id);
        }
    });
});

// Delete Route

router.delete("/batas/:id", middleware.checkBatauser, function(req, res){
   Bata.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/batas");
       } else {
            req.flash("success", "Sucessfully deleted a bata");   
            res.redirect("/batas");
       }
   });
});

module.exports = router;
