var mongoose = require("mongoose");

    // creating Modelschema for comments
    
var ServiscommentSchema = new mongoose.Schema({
    text: String,
    created : {type : Date , default : Date.now()},
    author : {
        id: {
           type : mongoose.Schema.Types.ObjectId,
           ref  : "User"
        },
        username: String
    }
});

    // compiling a commentSchema into a Model and exporting to app.js

module.exports =  mongoose.model("Serviscomment", ServiscommentSchema);