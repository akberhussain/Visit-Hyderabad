var express = require("express");
var router  = express.Router();
var Restaurant = require("../../models/restaurant/restaurant");
var Comment = require("../../models/restaurant/comment");
var middleware = require("../../middleware");

            // ===========================
            //      COMMENTS ROUTES
            // ===========================
            
// router.get("/restaurants/:id/comments/new", middleware.isLoggedIn, function(req, res) {
        
//         Restaurant.findById(req.params.id, function(err, restaurant){
//           if(err){
//               console.log(err);
//           } else{
//               res.render("restaurants/comments/new", {restaurant: restaurant});
//           }
//         });  
// });           

router.post("/restaurants/:id/comments", middleware.isLoggedIn, function(req, res){
   
    var text = req.body.text;
    var author = req.body.author;
    var obj = {text: text , author: author};
    
    Restaurant.findById(req.params.id, function(err, restaurant) {
       if(err){
           console.log(err);
       }else{
            Comment.create(obj, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    restaurant.comments.push(comment);
                    comment.save();
                    restaurant.save();
                    res.redirect("/restaurants/" + restaurant._id);        
                }
        });   
       }
    });
     
});

// Edit Comment
router.get("/restaurants/:id/comments/:comment_id/edit", middleware.checkRcommentUser, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else{
         res.render("places/comments/edit",{place_id: req.params.id ,comment: foundComment, url: "/restaurants"});
      }
   });
    
});

// Update /restaurants/comments Route
router.put("/restaurants/:id/comments/:comment_id", middleware.checkRcommentUser, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       }
       else{
           res.redirect("/restaurants/" + req.params.id);
       }
   });
});

// delete a Comment
router.delete("/restaurants/:id/comments/:comment_id", middleware.checkRcommentUser,  function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
          res.redirect("back");
      }
      req.flash("sucess", "Sucessfully deleted a comment")
      res.redirect("back");
   }); 
});

module.exports = router;