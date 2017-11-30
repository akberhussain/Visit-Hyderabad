var express = require("express");
var router  = express.Router();
var SuperM = require("../../models/superMarket/superMarket");
var Comment = require("../../models/superMarket/comment");
var middleware = require("../../middleware");

            // ===========================
            //      COMMENTS ROUTES
            // ===========================
            
// router.get("/superMarkets/:id/comments/new", middleware.isLoggedIn, function(req, res) {
        
//         SuperM.findById(req.params.id, function(err, superMarket){
//           if(err){
//               console.log(err);
//           } else{
//               res.render("superMarkets/comments/new", {superMarket: superMarket});
//           }
//         });  
// });           

router.post("/superMarkets/:id/comments", middleware.isLoggedIn, function(req, res){
   
    var text = req.body.text;
    var author = req.body.author;
    var obj = {text: text , author: author};
    
    SuperM.findById(req.params.id, function(err, superMarket) {
       if(err){
           console.log(err);
       }else{
            Comment.create(obj, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    superMarket.comments.push(comment);
                    comment.save();
                    superMarket.save();
                    res.redirect("/superMarkets/" + superMarket._id);        
                }
        });   
       }
    });
     
});

// Edit Comment
router.get("/superMarkets/:id/comments/:comment_id/edit", middleware.checkSuperMcommentUser, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else{
         res.render("places/comments/edit",{place_id: req.params.id ,comment: foundComment, url: "/superMarkets"});
      }
   });
    
});

// Update /superMarkets/comments Route
router.put("/superMarkets/:id/comments/:comment_id", middleware.checkSuperMcommentUser, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       }
       else{
           res.redirect("/superMarkets/" + req.params.id);
       }
   });
});

// delete a Comment
router.delete("/superMarkets/:id/comments/:comment_id", middleware.checkSuperMcommentUser,  function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
          res.redirect("back");
      }
      req.flash("sucess", "Sucessfully deleted a comment");
      res.redirect("back");
   }); 
});

module.exports = router;