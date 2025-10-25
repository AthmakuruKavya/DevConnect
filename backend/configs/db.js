const mongoose = require("mongoose")

const url = "mongodb://localhost:27017/user"
const connectDb = async () =>{
    await mongoose.connect(url)
    .then( ()=>{
        console.log("Connected to database...");
    })
    .catch( (err) => {
        console.log("Unable to connect to database...");
    })
}

module.exports = {connectDb}