const validator = require("validator");
function validateSignup(req) {
  const { firstName, lastName, email, passowrd } = req.body;
  if(!validator.isEmail(email)){
    throw new Error("Invalid email");
  }
}


function validateEditProfile(req){
  const ALLOWED_PROFILE_UPDATES = ["firstName","lastName","email","age","gender", "education", "hobbies", "photoUrl"];
  const isUpdatesAllowed = Object.keys(req.body).every((key)=>(ALLOWED_PROFILE_UPDATES.includes(key)));
  if(isUpdatesAllowed){

  }else{
    throw new Error("Unnecessary data send...")
  }

}
module.exports = {validateSignup,validateEditProfile}
