const express = require("express");
const connectionRoutes = express.Router();

const authUser = require("../middlewares/auth");
const ConnectionModel = require("../models/connectionSchema");
const User = require("../models/user");

connectionRoutes.post("/request/send/:status/:toUserId",authUser, async(req,res)=>{
    try {
        const {status, toUserId}=req.params;
        const fromUserId = req.user._id;
        const requestedUser = await User.findById(toUserId)

        //checking whether the requested user is there or not
        if(!requestedUser){
            throw new Error("Requested user is not found");
        }

        //checking whether the user is sending request to themselfs
        if(fromUserId.toString() === toUserId.toString()){
            throw new Error("You can't send request to yourself");
        }

        const newConnection = new ConnectionModel({
            fromUserId,
            toUserId,
            status
        })
        await newConnection.save();

        res.status(200).send("Sent connection request successfully...")

    } catch (err) {
        res.status(404).send(err.message)
    }
})

module.exports = connectionRoutes;