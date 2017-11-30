var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var methodOverride = require("method-override");
var Request = require("./models/request/request");
var Comment = require("./models/comment");
var User = require("./models/user");

// requiring routes
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");
var restaurantRoutes = require("./routes/restaurant/restaurants");
var restaurantCommentRoutes = require("./routes/restaurant/comments");
var historicalPlaceRoutes = require("./routes/historicalPlace/historicalPlaces");
var historicalPlaceCommentRoutes = require("./routes/historicalPlace/comments");
var shoppingMallRoutes = require("./routes/shoppingMall/shoppingMalls");
var shoppingMallCommentRoutes = require("./routes/shoppingMall/comments");
var superMarketRoutes = require("./routes/superMarket/superMarkets");
var superMarketCommentRoutes = require("./routes/superMarket/comments");
var bataRoutes = require("./routes/bata/batas");
var bataCommentRoutes = require("./routes/bata/comments");
var servisRoutes = require("./routes/servis/servises");
var servisCommentRoutes = require("./routes/servis/comments");
var hospitalRoutes = require("./routes/hospital/hospitals");
var hospitalCommentRoutes = require("./routes/hospital/comments");
var instituteRoutes = require("./routes/institute/institutes");
var instituteCommentRoutes = require("./routes/institute/comments");
var shoppingCenterRoutes = require("./routes/shoppingCenter/shoppingCenters");
var shoppingCenterCommentRoutes = require("./routes/shoppingCenter/comments");
var indexRoutes = require("./routes/index");


// mongoose.connect("mongodb://localhost/yelp-camp");

mongoose.connect("mongodb://akberlaghari:123abc..@ds145892.mlab.com:45892/visithyderabad");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret: "this is yelp_camp app",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// var c;
// Request.count({}, function(err, count){
//         if(err){
//             console.log(err);
//         }else{
//             c = count;
//         }        
// });

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
//    res.locals.count = c;
    next();
});

app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(restaurantRoutes);
app.use(restaurantCommentRoutes);
app.use(historicalPlaceRoutes);
app.use(historicalPlaceCommentRoutes);
app.use(shoppingMallRoutes);
app.use(shoppingMallCommentRoutes);
app.use(superMarketRoutes);
app.use(superMarketCommentRoutes);
app.use(bataRoutes);
app.use(bataCommentRoutes);
app.use(servisRoutes);
app.use(servisCommentRoutes);
app.use(hospitalRoutes);
app.use(hospitalCommentRoutes);
app.use(instituteRoutes);
app.use(instituteCommentRoutes);
app.use(shoppingCenterRoutes);
app.use(shoppingCenterCommentRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Visit Hyderabad Server has Started !!");
});