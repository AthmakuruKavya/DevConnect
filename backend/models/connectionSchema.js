const mongoose = require("mongoose")
const connectionSchema = new mongoose.Schema({
    fromUserId : {
        type:String
    },
    toUserId : {
        type:String
    },
    status : {
        type : String,
        enum : ["interested", "ignore", "accepted", "rejected"]
    }
},{timestamps:true})

module.exports = mongoose.model("connection",connectionSchema)