var express = require("express");
var router  = express.Router();
var SM = require("../../models/shoppingMall/shoppingMall");
var Comment = require("../../models/shoppingMall/comment");
var middleware = require("../../middleware");

            // ===========================
            //      COMMENTS ROUTES
            // ===========================
            
// router.get("/shoppingMalls/:id/comments/new", middleware.isLoggedIn, function(req, res) {
        
//         SM.findById(req.params.id, function(err, shoppingMall){
//           if(err){
//               console.log(err);
//           } else{
//               res.render("shoppingMalls/comments/new", {shoppingMall: shoppingMall});
//           }
//         });  
// });           

router.post("/shoppingMalls/:id/comments", middleware.isLoggedIn, function(req, res){
   
    var text = req.body.text;
    var author = req.body.author;
    var obj = {text: text , author: author};
    
    SM.findById(req.params.id, function(err, shoppingMall) {
       if(err){
           console.log(err);
       }else{
            Comment.create(obj, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    shoppingMall.comments.push(comment);
                    comment.save();
                    shoppingMall.save();
                    res.redirect("/shoppingMalls/" + shoppingMall._id);        
                }
        });   
       }
    });
     
});

// Edit Comment
router.get("/shoppingMalls/:id/comments/:comment_id/edit", middleware.checkSMcommentUser, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else{
         res.render("places/comments/edit",{place_id: req.params.id ,comment: foundComment, url: "/shoppingMalls"});
      }
   });
    
});

// Update /shoppingMalls/comments Route
router.put("/shoppingMalls/:id/comments/:comment_id", middleware.checkSMcommentUser, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       }
       else{
           res.redirect("/shoppingMalls/" + req.params.id);
       }
   });
});

// delete a Comment
router.delete("/shoppingMalls/:id/comments/:comment_id", middleware.checkSMcommentUser,  function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
          res.redirect("back");
      }
      req.flash("sucess", "Sucessfully deleted a comment")
      res.redirect("back");
   }); 
});

module.exports = router;