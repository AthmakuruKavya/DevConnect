const validator = require("validator");
function validateSignup(req) {
  const { firstName, lastName, email, passowrd } = req.body;
  if(!validator.isEmail(email)){
    throw new Error("Invalid email");
  }
}
module.exports = {validateSignup}
