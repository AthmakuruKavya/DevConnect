const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const verifyToken = await jwt.verify(token, "kavya@13");
    // console.log(verifyToken);
    

    //getting userData from jwtToken
    const userData = await User.findOne({ _id: verifyToken.id });
    if(!userData){
        throw new Error("Invalid user")
    }else{
        req.user=userData;
        next();
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
module.exports = authUser;
