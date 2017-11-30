var express = require("express");
var router  = express.Router();
var SC = require("../../models/shoppingCenter/shoppingCenter");
var Comment = require("../../models/shoppingCenter/comment");
var middleware = require("../../middleware");

            // ===========================
            //      COMMENTS ROUTES
            // ===========================
            
// router.get("/shoppingCenters/:id/comments/new", middleware.isLoggedIn, function(req, res) {
        
//         SC.findById(req.params.id, function(err, shoppingCenter){
//           if(err){
//               console.log(err);
//           } else{
//               res.render("shoppingCenters/comments/new", {shoppingCenter: shoppingCenter});
//           }
//         });  
// });           

router.post("/shoppingCenters/:id/comments", middleware.isLoggedIn, function(req, res){
   
    var text = req.body.text;
    var author = req.body.author;
    var obj = {text: text , author: author};
    
    SC.findById(req.params.id, function(err, shoppingCenter) {
       if(err){
           console.log(err);
       }else{
            Comment.create(obj, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    shoppingCenter.comments.push(comment);
                    comment.save();
                    shoppingCenter.save();
                    res.redirect("/shoppingCenters/" + shoppingCenter._id);        
                }
        });   
       }
    });
     
});

// Edit Comment
router.get("/shoppingCenters/:id/comments/:comment_id/edit", middleware.checkshoppingCentercommentUser, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else{
         res.render("places/comments/edit",{place_id: req.params.id ,comment: foundComment, url: "/shoppingCenters"});
      }
   });
    
});

// Update /shoppingCenters/comments Route
router.put("/shoppingCenters/:id/comments/:comment_id", middleware.checkshoppingCentercommentUser, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       }
       else{
           res.redirect("/shoppingCenters/" + req.params.id);
       }
   });
});

// delete a Comment
router.delete("/shoppingCenters/:id/comments/:comment_id", middleware.checkshoppingCentercommentUser,  function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
          res.redirect("back");
      }
      req.flash("sucess", "Sucessfully deleted a comment")
      res.redirect("back");
   }); 
});

module.exports = router;