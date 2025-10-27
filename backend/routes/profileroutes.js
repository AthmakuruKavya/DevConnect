const express = require("express")
const profileRoutes = express.Router();
const bcrypt = require("bcrypt");

const authUser = require("../middlewares/auth")
const User = require("../models/user");

profileRoutes.get("/profile/view",authUser, async (req, res) => {
  try {
    // console.log(req.user)
    res.status(200).send(req.user)
    
  } catch (error) {
    return res.send(500).send("Error occured...")
  }

  // try {
  //   const { token } = req.cookies;
  //   const verifyToken = await jwt.verify(token, "kavya@13");
  //   if (verifyToken) {
  //     //getting userData from jwtToken
  //     const userData = await User.findOne({ _id: verifyToken.id });
  //     res.send(userData);
  //   } else {
  //     res.send("Invalid token...");
  //   }
  //   // const verifyToken = await jwt.verify()
  // } catch (err) {
  //   res.send(err.message);
  // }
});

profileRoutes.patch("/profile/edit", async (req,res)=>{
  
})

profileRoutes.patch("/profile/password", authUser,async (req, res) =>{
  try {
    // write a validaion where req body should allow only update of password
    const id = req.user._id;
    const { firstName, lastName, email, password } = req.user;
    const newPassword = req.body.password;
    const hashPassword = await bcrypt.hash(newPassword, 10);
    const updatePassword = await User.findByIdAndUpdate(id,{password:hashPassword},{ new: true, runValidators: true } )
    console.log(updatePassword)
    
    res.status(200).send("password changed successfully")
    
  } catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = profileRoutes;