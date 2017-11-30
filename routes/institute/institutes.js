var express = require("express");
var router  = express.Router();
var Institute = require("../../models/institute/institute");
var middleware = require("../../middleware");

// show campgounds Page
router.get("/institutes", function(req, res) {
    Institute.find({},function(err, institutes){
        if(err){
            console.log("Error");
        }
        else{
                    // Ref = 1 for campgrounds.ejs
            res.render("places/places", {places:institutes, url: "/institutes", name : "Institutes"});            
        }
    });
});

        // NEW
        
        // Rendering a form on campgrounds/new path

// router.get("/institutes/new", middleware.isLoggedIn, function(req, res){
//     res.render("institutes/newCamp");
// });

        // CREATE
router.post("/institutes", middleware.isLoggedIn,function(req, res){
    
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
   
        // insering object into Institute model
    Institute.create(obj,function(err, institutes){
        if(err){
            console.log("Error");
        }
        else{
            req.flash("success", "institute successfully created !!!");
            res.redirect("/requests");        
        }
    });
});
        // SHOW
        
        // Finding a perticular Institute by Id and using it in show page
router.get("/institutes/:id", function(req, res) {
    Institute.findById(req.params.id).populate("comments").exec(function(err, data){
        if(err){
            console.log("Error");
        }
        else{
                // Ref = 2 for show.ejs
            res.render("places/show", {places:data, url: "/institutes"});     
        }
    });
});

// edit route

router.get("/institutes/:id/edit", middleware.checkInstituteuser, function(req, res){ 
    Institute.findById(req.params.id, function(err, foundInstitute){
        if(err){
            res.redirect("/institutes");
        }else {
         res.render("places/edit", {place: foundInstitute, url: "/institutes"});     
        }
    });
});

// updated Route
router.put("/institutes/:id", middleware.checkInstituteuser, function(req, res){
    Institute.findByIdAndUpdate(req.params.id, req.body.place, function(err, updatedInstitute){
        if(err){
            res.redirect("/institutes");
        } else{
            res.redirect("/institutes/"+req.params.id);
        }
    });
});

// Delete Route

router.delete("/institutes/:id", middleware.checkInstituteuser, function(req, res){
   Institute.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/institutes");
       } else {
            req.flash("success", "Sucessfully deleted a institute");   
            res.redirect("/institutes");
       }
   });
});

module.exports = router;
