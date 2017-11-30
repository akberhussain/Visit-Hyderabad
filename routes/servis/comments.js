var express = require("express");
var router  = express.Router();
var Servis = require("../../models/servis/servis");
var Comment = require("../../models/servis/comment");
var middleware = require("../../middleware");

            // ===========================
            //      COMMENTS ROUTES
            // ===========================
            
// router.get("/servises/:id/comments/new", middleware.isLoggedIn, function(req, res) {
        
//         Servis.findById(req.params.id, function(err, servis){
//           if(err){
//               console.log(err);
//           } else{
//               res.render("servises/comments/new", {servis: servis});
//           }
//         });  
// });           

router.post("/servises/:id/comments", middleware.isLoggedIn, function(req, res){
   
    var text = req.body.text;
    var author = req.body.author;
    var obj = {text: text , author: author};
    
    Servis.findById(req.params.id, function(err, servis) {
       if(err){
           console.log(err);
       }else{
            Comment.create(obj, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    servis.comments.push(comment);
                    comment.save();
                    servis.save();
                    res.redirect("/servises/" + servis._id);        
                }
        });   
       }
    });
     
});

// Edit Comment
router.get("/servises/:id/comments/:comment_id/edit", middleware.checkServiscommentUser, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else{
         res.render("places/comments/edit",{place_id: req.params.id ,comment: foundComment, url: "/servises"});
      }
   });
    
});

// Update /servises/comments Route
router.put("/servises/:id/comments/:comment_id", middleware.checkServiscommentUser, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       }
       else{
           res.redirect("/servises/" + req.params.id);
       }
   });
});

// delete a Comment
router.delete("/servises/:id/comments/:comment_id", middleware.checkServiscommentUser,  function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
          res.redirect("back");
      }
      req.flash("sucess", "Sucessfully deleted a comment");
      res.redirect("back");
   }); 
});

module.exports = router;