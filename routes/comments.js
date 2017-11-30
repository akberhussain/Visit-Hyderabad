var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

            // ===========================
            //      COMMENTS ROUTES
            // ===========================
            
// router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res) {
        
//         Campground.findById(req.params.id, function(err, campground){
//           if(err){
//               console.log(err);
//           } else{
//               res.render("comments/new", {campground: campground});
//           }
//         });  
// });           

router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res){
   
    var text = req.body.text;
    var author = req.body.author;
    var obj = {text: text , author: author};
    
    Campground.findById(req.params.id, function(err, campground) {
       if(err){
           console.log(err);
       }else{
            Comment.create(obj, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    campground.comments.push(comment);
                    comment.save();
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);        
                }
        });   
       }
    });
     
});

// Edit Comment
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentUser, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else{
         res.render("places/comments/edit",{place_id: req.params.id ,comment: foundComment, url: "/campgrounds"});
      }
   });
    
});

// Update /campgrounds/comments Route
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentUser, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       }
       else{
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});

// delete a Comment
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentUser,  function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
          res.redirect("back");
      }
      req.flash("sucess", "Sucessfully deleted a comment")
      res.redirect("back");
   }); 
});

module.exports = router;