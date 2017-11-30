var express = require("express");
var router  = express.Router();
var Hospital = require("../../models/hospital/hospital");
var middleware = require("../../middleware");

// show campgounds Page
router.get("/hospitals", function(req, res) {
    Hospital.find({},function(err, hospitals){
        if(err){
            console.log("Error");
        }
        else{
                    // Ref = 1 for campgrounds.ejs
            res.render("places/places", {places:hospitals, url: "/hospitals", name : "Hospitals"});            
        }
    });
});

        // NEW
        
        // Rendering a form on campgrounds/new path

// router.get("/hospitals/new", middleware.isLoggedIn, function(req, res){
//     res.render("hospitals/newCamp");
// });

        // CREATE
router.post("/hospitals", middleware.isLoggedIn,function(req, res){
    
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
   
        // insering object into Hospital model
    Hospital.create(obj,function(err, hospitals){
        if(err){
            console.log("Error");
        }
        else{
            req.flash("success", "hospital successfully created !!!");
            res.redirect("/requests");        
        }
    });
});
        // SHOW
        
        // Finding a perticular Hospital by Id and using it in show page
router.get("/hospitals/:id", function(req, res) {
    Hospital.findById(req.params.id).populate("comments").exec(function(err, data){
        if(err){
            console.log("Error");
        }
        else{
                // Ref = 2 for show.ejs
            res.render("places/show", {places:data, url: "/hospitals"});     
        }
    });
});

// edit route

router.get("/hospitals/:id/edit", middleware.checkHospitaluser, function(req, res){ 
    Hospital.findById(req.params.id, function(err, foundHospital){
        if(err){
            res.redirect("/hospitals");
        }else {
         res.render("places/edit", {place: foundHospital, url: "/hospitals"});     
        }
    });
});

// updated Route
router.put("/hospitals/:id", middleware.checkHospitaluser, function(req, res){
    Hospital.findByIdAndUpdate(req.params.id, req.body.place, function(err, updatedHospital){
        if(err){
            res.redirect("/hospitals");
        } else{
            res.redirect("/hospitals/"+req.params.id);
        }
    });
});

// Delete Route

router.delete("/hospitals/:id", middleware.checkHospitaluser, function(req, res){
   Hospital.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/hospitals");
       } else {
            req.flash("success", "Sucessfully deleted a hospital");   
            res.redirect("/hospitals");
       }
   });
});

module.exports = router;
