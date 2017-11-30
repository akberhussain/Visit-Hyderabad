var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// show campgounds Page
router.get("/campgrounds", function(req, res) {
    Campground.find({},function(err, campgrounds){
        if(err){
            console.log("Error");
        }
        else{
                    // Ref = 1 for campgrounds.ejs
            res.render("places/places", {places:campgrounds, url: "/campgrounds", name : "Guest Houses"});            
        }
    });
});

        // NEW
        
        // Rendering a form on campgrounds/new path

// router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){
//     res.render("campgrounds/newCamp");
// });

        // CREATE
router.post("/campgrounds", middleware.isLoggedIn,function(req, res){
    
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
   
        // insering object into Campground model
    Campground.create(obj,function(err, campgrounds){
        if(err){
            console.log("Error");
        }
        else{
            req.flash("success", "campground successfully created !!!");
            res.redirect("/requests");        
        }
    });
});
        // SHOW
        
        // Finding a perticular Campground by Id and using it in show page
router.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, data){
        if(err){
            console.log("Error");
        }
        else{
                // Ref = 2 for show.ejs
            res.render("places/show", {places:data, url: "/campgrounds"});     
        }
    });
});

// edit route

router.get("/campgrounds/:id/edit", middleware.checkUser, function(req, res){ 
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds");
        }else {
         res.render("places/edit", {place: foundCampground, url: "/campgrounds"});     
        }
    });
});

// updated Route
router.put("/campgrounds/:id", middleware.checkUser, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.place, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

// Delete Route

router.delete("/campgrounds/:id", middleware.checkUser, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       } else {
            req.flash("success", "Sucessfully deleted a campground");   
            res.redirect("/campgrounds");
       }
   });
});

module.exports = router;
// var express = require("express");
// var router  = express.Router();
// var Campground = require("../models/campground");
// var middleware = require("../middleware");

// // show campgounds Page
// router.get("/campgrounds", function(req, res) {
//     Campground.find({},function(err, campgrounds){
//         if(err){
//             console.log("Error");
//         }
//         else{
//                     // Ref = 1 for campgrounds.ejs
//             res.render("campgrounds/campgrounds", {campgrounds:campgrounds});            
//         }
//     });
// });

//         // NEW
        
//         // Rendering a form on campgrounds/new path

// // router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){
// //     res.render("campgrounds/newCamp");
// // });

//         // CREATE
// router.post("/campgrounds", middleware.isLoggedIn,function(req, res){
    
//             // data coming from form
//     // ==============================
//     var name = req.body.name;
//     var url = req.body.url;
//     var description = req.body.description;
//     var direction = req.body.direction;
//     // ==============================
    
//     var author = {
//         id: req.user.id,
//         username: req.user.username
//     };
    
//         // creating object of formData to insert in campgroundSchema
//     var obj = {name:name, url:url, description: description, author: author, direction: direction};
   
//         // insering object into Campground model
//     Campground.create(obj,function(err, campgrounds){
//         if(err){
//             console.log("Error");
//         }
//         else{
//             req.flash("success", "campground successfully created !!!");
//             res.redirect("/campgrounds");        
//         }
//     });
// });
//         // SHOW
        
//         // Finding a perticular Campground by Id and using it in show page
// router.get("/campgrounds/:id", function(req, res) {
//     Campground.findById(req.params.id).populate("comments").exec(function(err, data){
//         if(err){
//             console.log("Error");
//         }
//         else{
//                 // Ref = 2 for show.ejs
//             res.render("campgrounds/show", {campgrounds:data});     
//         }
//     });
// });

// // edit route

// router.get("/campgrounds/:id/edit", middleware.checkUser, function(req, res){ 
//     Campground.findById(req.params.id, function(err, foundCampground){
//         if(err){
//             res.redirect("/campgrounds");
//         }else {
//          res.render("campgrounds/edit", {campground: foundCampground});     
//         }
//     });
// });

// // updated Route
// router.put("/campgrounds/:id", middleware.checkUser, function(req, res){
//     Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
//         if(err){
//             res.redirect("/campgrounds");
//         } else{
//             res.redirect("/campgrounds/"+req.params.id);
//         }
//     });
// });

// // Delete Route

// router.delete("/campgrounds/:id", middleware.checkUser, function(req, res){
//   Campground.findByIdAndRemove(req.params.id, function(err){
//       if(err){
//           res.redirect("/campgrounds");
//       } else {
//             req.flash("success", "Sucessfully deleted a campground");   
//             res.redirect("/campgrounds");
//       }
//   });
// });

// module.exports = router;
