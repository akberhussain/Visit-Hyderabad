var Campground = require("../models/campground");
var Comment = require("../models/comment");
var Restaurant = require("../models/restaurant/restaurant");
var Rcomment = require("../models/restaurant/comment");
var HP = require("../models/historicalPlace/historicalPlace");
var HPcomment = require("../models/historicalPlace/comment");
var SM = require("../models/shoppingMall/shoppingMall");
var SMcomment = require("../models/shoppingMall/comment");
var SuperM = require("../models/superMarket/superMarket");
var SuperMcomment = require("../models/superMarket/comment");
var Bata = require("../models/bata/bata");
var Batacomment = require("../models/bata/comment");
var Servis = require("../models/servis/servis");
var Serviscomment = require("../models/servis/comment");
var Hospital = require("../models/hospital/hospital");
var Hospitalcomment = require("../models/hospital/comment");
var Institute = require("../models/institute/institute");
var Institutecomment = require("../models/institute/comment");
var SC = require("../models/shoppingCenter/shoppingCenter");
var SCcomment = require("../models/shoppingCenter/comment");



var middlewareObj = {};

middlewareObj.isLoggedIn =  function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must be logged in to do that");
    res.redirect("/login");
};

middlewareObj.checkUser = function (req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground) {
            if(err){
                req.flash("error", "Something Went Wrong!!");
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }
                else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
     
    } else{
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");  
     }
};

middlewareObj.checkCommentUser = function (req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err){
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();                    
                } else {
                    res.redirect("back");
                }
            }
        });
    } else{
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");
    }
};

//Relate Restarant

middlewareObj.checkRuser = function (req, res, next){
    if(req.isAuthenticated()){
        Restaurant.findById(req.params.id, function(err, foundRestaurant) {
            if(err){
                req.flash("error", "Something Went Wrong!!");
                res.redirect("back");
            } else {
                if(foundRestaurant.author.id.equals(req.user._id)){
                    next();
                }
                else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
     
    } else{
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");  
     }
};

//Relate Restaurant Comment

middlewareObj.checkRcommentUser = function (req, res, next){
    if(req.isAuthenticated()){
        Rcomment.findById(req.params.comment_id, function(err, foundComment) {
            if(err){
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();                    
                } else {
                    res.redirect("back");
                }
            }
        });
    } else{
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");
    }
};

    // Relate Historical Place

middlewareObj.checkHPuser = function (req, res, next){
    if(req.isAuthenticated()){
        HP.findById(req.params.id, function(err, foundHP) {
            if(err){
                req.flash("error", "Something Went Wrong!!");
                res.redirect("back");
            } else {
                if(foundHP.author.id.equals(req.user._id)){
                    next();
                }
                else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
     
    } else{
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");  
     }
};

    // Relate Historical Place Comment

middlewareObj.checkHPcommentUser = function (req, res, next){
    if(req.isAuthenticated()){
        HPcomment.findById(req.params.comment_id, function(err, foundComment) {
            if(err){
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();                    
                } else {
                    res.redirect("back");
                }
            }
        });
    } else{
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");
    }
};

    // Relate Shopping Mall

middlewareObj.checkSMuser = function (req, res, next){
    if(req.isAuthenticated()){
        SM.findById(req.params.id, function(err, foundSM) {
            if(err){
                req.flash("error", "Something Went Wrong!!");
                res.redirect("back");
            } else {
                if(foundSM.author.id.equals(req.user._id)){
                    next();
                }
                else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
     
    } else{
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");  
     }
};

    // Relate Shopping Mall Comment

middlewareObj.checkSMcommentUser = function (req, res, next){
    if(req.isAuthenticated()){
        SMcomment.findById(req.params.comment_id, function(err, foundComment) {
            if(err){
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();                    
                } else {
                    res.redirect("back");
                }
            }
        });
    } else{
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");
    }
};

    // Relate Super Market

middlewareObj.checkSuperMuser = function (req, res, next){
    if(req.isAuthenticated()){
        SuperM.findById(req.params.id, function(err, foundSuperM) {
            if(err){
                req.flash("error", "Something Went Wrong!!");
                res.redirect("back");
            } else {
                if(foundSuperM.author.id.equals(req.user._id)){
                    next();
                }
                else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
     
    } else{
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");  
     }
};

    // Relate Super Market Comment

middlewareObj.checkSuperMcommentUser = function (req, res, next){
    if(req.isAuthenticated()){
        SuperMcomment.findById(req.params.comment_id, function(err, foundComment) {
            if(err){
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();                    
                } else {
                    res.redirect("back");
                }
            }
        });
    } else{
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");
    }
};

    // Relate Bata Store

middlewareObj.checkBatauser = function (req, res, next){
    if(req.isAuthenticated()){
        Bata.findById(req.params.id, function(err, foundBata) {
            if(err){
                req.flash("error", "Something Went Wrong!!");
                res.redirect("back");
            } else {
                if(foundBata.author.id.equals(req.user._id)){
                    next();
                }
                else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
     
    } else{
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");  
     }
};

    // Relate Bata Store Comment

middlewareObj.checkBatacommentUser = function (req, res, next){
    if(req.isAuthenticated()){
        Batacomment.findById(req.params.comment_id, function(err, foundComment) {
            if(err){
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();                    
                } else {
                    res.redirect("back");
                }
            }
        });
    } else{
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");
    }
};

    // Relate Servis Store

middlewareObj.checkServisuser = function (req, res, next){
    if(req.isAuthenticated()){
        Servis.findById(req.params.id, function(err, foundServis) {
            if(err){
                req.flash("error", "Something Went Wrong!!");
                res.redirect("back");
            } else {
                if(foundServis.author.id.equals(req.user._id)){
                    next();
                }
                else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
     
    } else{
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");  
     }
};

    // Relate Servis Store Comment

middlewareObj.checkServiscommentUser = function (req, res, next){
    if(req.isAuthenticated()){
        Serviscomment.findById(req.params.comment_id, function(err, foundComment) {
            if(err){
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();                    
                } else {
                    res.redirect("back");
                }
            }
        });
    } else{
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");
    }
};


    // Relate Hospital

middlewareObj.checkHospitaluser = function (req, res, next){
    if(req.isAuthenticated()){
        Hospital.findById(req.params.id, function(err, foundHospital) {
            if(err){
                req.flash("error", "Something Went Wrong!!");
                res.redirect("back");
            } else {
                if(foundHospital.author.id.equals(req.user._id)){
                    next();
                }
                else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
     
    } else{
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");  
     }
};

    // Relate Hospital Comment

middlewareObj.checkHospitalcommentUser = function (req, res, next){
    if(req.isAuthenticated()){
        Hospitalcomment.findById(req.params.comment_id, function(err, foundComment) {
            if(err){
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();                    
                } else {
                    res.redirect("back");
                }
            }
        });
    } else{
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");
    }
};


    // Relate Institute

middlewareObj.checkInstituteuser = function (req, res, next){
    if(req.isAuthenticated()){
        Institute.findById(req.params.id, function(err, foundInstitute) {
            if(err){
                req.flash("error", "Something Went Wrong!!");
                res.redirect("back");
            } else {
                if(foundInstitute.author.id.equals(req.user._id)){
                    next();
                }
                else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
     
    } else{
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");  
     }
};

    // Relate Institute Comment

middlewareObj.checkInstitutecommentUser = function (req, res, next){
    if(req.isAuthenticated()){
        Institutecomment.findById(req.params.comment_id, function(err, foundComment) {
            if(err){
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();                    
                } else {
                    res.redirect("back");
                }
            }
        });
    } else{
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");
    }
};


    // Relate Shopping Center

middlewareObj.checkshoppingCenteruser = function (req, res, next){
    if(req.isAuthenticated()){
        SC.findById(req.params.id, function(err, foundSC) {
            if(err){
                req.flash("error", "Something Went Wrong!!");
                res.redirect("back");
            } else {
                if(foundSC.author.id.equals(req.user._id)){
                    next();
                }
                else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
     
    } else{
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");  
     }
};

    // Relate Shopping Center Comment

middlewareObj.checkshoppingCentercommentUser = function (req, res, next){
    if(req.isAuthenticated()){
        SCcomment.findById(req.params.comment_id, function(err, foundComment) {
            if(err){
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();                    
                } else {
                    res.redirect("back");
                }
            }
        });
    } else{
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");
    }
};

module.exports = middlewareObj;