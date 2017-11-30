var express = require("express");
var router  = express.Router();
var Institute = require("../../models/institute/institute");
var Comment = require("../../models/institute/comment");
var middleware = require("../../middleware");

            // ===========================
            //      COMMENTS ROUTES
            // ===========================
            
// router.get("/institutes/:id/comments/new", middleware.isLoggedIn, function(req, res) {
        
//         Institute.findById(req.params.id, function(err, institute){
//           if(err){
//               console.log(err);
//           } else{
//               res.render("institutes/comments/new", {institute: institute});
//           }
//         });  
// });           

router.post("/institutes/:id/comments", middleware.isLoggedIn, function(req, res){
   
    var text = req.body.text;
    var author = req.body.author;
    var obj = {text: text , author: author};
    
    Institute.findById(req.params.id, function(err, institute) {
       if(err){
           console.log(err);
       }else{
            Comment.create(obj, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    institute.comments.push(comment);
                    comment.save();
                    institute.save();
                    res.redirect("/institutes/" + institute._id);        
                }
        });   
       }
    });
     
});

// Edit Comment
router.get("/institutes/:id/comments/:comment_id/edit", middleware.checkInstitutecommentUser, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else{
         res.render("places/comments/edit",{place_id: req.params.id ,comment: foundComment, url: "/institutes"});
      }
   });
    
});

// Update /institutes/comments Route
router.put("/institutes/:id/comments/:comment_id", middleware.checkInstitutecommentUser, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       }
       else{
           res.redirect("/institutes/" + req.params.id);
       }
   });
});

// delete a Comment
router.delete("/institutes/:id/comments/:comment_id", middleware.checkInstitutecommentUser,  function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
          res.redirect("back");
      }
      req.flash("sucess", "Sucessfully deleted a comment")
      res.redirect("back");
   }); 
});

module.exports = router;