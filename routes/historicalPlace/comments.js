var express = require("express");
var router  = express.Router();
var HP = require("../../models/historicalPlace/historicalPlace");
var Comment = require("../../models/historicalPlace/comment");
var middleware = require("../../middleware");

            // ===========================
            //      COMMENTS ROUTES
            // ===========================
            
// router.get("/historicalPlaces/:id/comments/new", middleware.isLoggedIn, function(req, res) {
        
//         HP.findById(req.params.id, function(err, historicalPlace){
//           if(err){
//               console.log(err);
//           } else{
//               res.render("historicalPlaces/comments/new", {historicalPlace: historicalPlace});
//           }
//         });  
// });           

router.post("/historicalPlaces/:id/comments", middleware.isLoggedIn, function(req, res){
   
    var text = req.body.text;
    var author = req.body.author;
    var obj = {text: text , author: author};
    
    HP.findById(req.params.id, function(err, historicalPlace) {
       if(err){
           console.log(err);
       }else{
            Comment.create(obj, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    historicalPlace.comments.push(comment);
                    comment.save();
                    historicalPlace.save();
                    res.redirect("/historicalPlaces/" + historicalPlace._id);        
                }
        });   
       }
    });
     
});

// Edit Comment
router.get("/historicalPlaces/:id/comments/:comment_id/edit", middleware.checkHPcommentUser, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else{
         res.render("places/comments/edit",{place_id: req.params.id ,comment: foundComment, url: "/historicalPlaces"});
      }
   });
    
});

// Update /historicalPlaces/comments Route
router.put("/historicalPlaces/:id/comments/:comment_id", middleware.checkHPcommentUser, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       }
       else{
           res.redirect("/historicalPlaces/" + req.params.id);
       }
   });
});

// delete a Comment
router.delete("/historicalPlaces/:id/comments/:comment_id", middleware.checkHPcommentUser,  function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
          res.redirect("back");
      }
      req.flash("sucess", "Sucessfully deleted a comment")
      res.redirect("back");
   }); 
});

module.exports = router;