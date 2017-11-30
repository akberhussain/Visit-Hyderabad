var express = require("express");
var router  = express.Router();
var Bata = require("../../models/bata/bata");
var Comment = require("../../models/bata/comment");
var middleware = require("../../middleware");

            // ===========================
            //      COMMENTS ROUTES
            // ===========================
            
// router.get("/batas/:id/comments/new", middleware.isLoggedIn, function(req, res) {
        
//         Bata.findById(req.params.id, function(err, bata){
//           if(err){
//               console.log(err);
//           } else{
//               res.render("batas/comments/new", {bata: bata});
//           }
//         });  
// });           

router.post("/batas/:id/comments", middleware.isLoggedIn, function(req, res){
   
    var text = req.body.text;
    var author = req.body.author;
    var obj = {text: text , author: author};
    
    Bata.findById(req.params.id, function(err, bata) {
       if(err){
           console.log(err);
       }else{
            Comment.create(obj, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    bata.comments.push(comment);
                    comment.save();
                    bata.save();
                    res.redirect("/batas/" + bata._id);        
                }
        });   
       }
    });
     
});

// Edit Comment
router.get("/batas/:id/comments/:comment_id/edit", middleware.checkBatacommentUser, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else{
         res.render("places/comments/edit",{place_id: req.params.id ,comment: foundComment, url: "/batas"});
      }
   });
    
});

// Update /batas/comments Route
router.put("/batas/:id/comments/:comment_id", middleware.checkBatacommentUser, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       }
       else{
           res.redirect("/batas/" + req.params.id);
       }
   });
});

// delete a Comment
router.delete("/batas/:id/comments/:comment_id", middleware.checkBatacommentUser,  function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
          res.redirect("back");
      }
      req.flash("sucess", "Sucessfully deleted a comment")
      res.redirect("back");
   }); 
});

module.exports = router;