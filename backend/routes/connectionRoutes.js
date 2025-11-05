const express = require("express");
const connectionRoutes = express.Router();

const authUser = require("../middlewares/auth");
const ConnectionModel = require("../models/connectionSchema");
const User = require("../models/user");

connectionRoutes.post("/request/send/:status/:toUserId",authUser, async(req,res)=>{
    try {

        // to send request  (ignore or interest) 
        const {status, toUserId}=req.params;
        const loggedInUser = req.user;
        const requestedUser = await User.findById(toUserId)

        //checking whether the requested user is there or not
        if(!requestedUser){
            throw new Error("Requested user is not found");
        }

        //checking whether the user is sending request to themselfs
        if(loggedInUser.toString() === toUserId.toString()){
            throw new Error("You can't send request to yourself");
        }

        //checking whether connection is already exist or not
        const checkConnection = await ConnectionModel.findOne({
            $or:[
                {fromUserId:loggedInUser._id, toUserId : toUserId},
                {fromUserId:toUserId, toUserId:loggedInUser._id}
            ]
        })
        if(checkConnection){
            throw new Error("Connection is already exist...")
        }

        const newConnection = new ConnectionModel({
            fromUserId : loggedInUser._id,
            toUserId,
            status
        })
        await newConnection.save();

        res.status(200).send(loggedInUser.lastName+" sent connection request to "+requestedUser.lastName)

    } catch (err) {
        res.status(404).send(err.message)
    }
})

module.exports = connectionRoutes;