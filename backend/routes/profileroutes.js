const express = require("express")
const profileRoutes = express.Router();
const authUser = require("../middlewares/auth")

profileRoutes.get("/profile/view",authUser, async (req, res) => {
  try {
    console.log(req.user)
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

profileRoutes.patch("/profile/password", async (req, res) =>{
  try {
    
  } catch (error) {
    
  }
})

module.exports = profileRoutes;