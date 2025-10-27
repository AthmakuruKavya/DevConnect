const mongoose  = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required: true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    age:{
         type :Number
    },
    gender:{
        type:String
    },
    education:{
        type:String
    },
    hobbies : {
        type:String
    },
    photoUrl:{
        type:String,
        default:"https://hips.hearstapps.com/hmg-prod/images/ginger-maine-coon-kitten-running-on-lawn-in-royalty-free-image-1719608142.jpg?crop=1xw:0.84415xh;0,0.185xh"
    }
},{timestamps:true})

module.exports = mongoose.model("user", userSchema);