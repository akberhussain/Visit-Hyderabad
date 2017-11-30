var express = require("express");
var router  = express.Router();
var Hospital = require("../../models/hospital/hospital");
var Comment = require("../../models/hospital/comment");
var middleware = require("../../middleware");

            // ===========================
            //      COMMENTS ROUTES
            // ===========================
            
// router.get("/hospitals/:id/comments/new", middleware.isLoggedIn, function(req, res) {
        
//         Hospital.findById(req.params.id, function(err, hospital){
//           if(err){
//               console.log(err);
//           } else{
//               res.render("hospitals/comments/new", {hospital: hospital});
//           }
//         });  
// });           

router.post("/hospitals/:id/comments", middleware.isLoggedIn, function(req, res){
   
    var text = req.body.text;
    var author = req.body.author;
    var obj = {text: text , author: author};
    
    Hospital.findById(req.params.id, function(err, hospital) {
       if(err){
           console.log(err);
       }else{
            Comment.create(obj, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    hospital.comments.push(comment);
                    comment.save();
                    hospital.save();
                    res.redirect("/hospitals/" + hospital._id);        
                }
        });   
       }
    });
     
});

// Edit Comment
router.get("/hospitals/:id/comments/:comment_id/edit", middleware.checkHospitalcommentUser, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else{
         res.render("places/comments/edit",{place_id: req.params.id ,comment: foundComment, url: "/hospitals"});
      }
   });
    
});

// Update /hospitals/comments Route
router.put("/hospitals/:id/comments/:comment_id", middleware.checkHospitalcommentUser, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       }
       else{
           res.redirect("/hospitals/" + req.params.id);
       }
   });
});

// delete a Comment
router.delete("/hospitals/:id/comments/:comment_id", middleware.checkHospitalcommentUser,  function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
          res.redirect("back");
      }
      req.flash("sucess", "Sucessfully deleted a comment")
      res.redirect("back");
   }); 
});

module.exports = router;