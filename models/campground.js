
var mongoose = require("mongoose");

    // creating Modelschema for campgrounds
    
var campgroundSchema = new mongoose.Schema({
    name: String,
    url : String,
    description: String,
    direction : String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Comment"
        }
    ],
    author:{
        id:{
          type: mongoose.Schema.Types.ObjectId,
          ref : "User"
        },
        username: String
    }
});

    // compiling a campgroundSchema into a Model and exporting to app.js

module.exports =  mongoose.model("Campground", campgroundSchema);

