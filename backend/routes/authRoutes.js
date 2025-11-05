const express = require("express")
const authRoutes = express.Router();
const { validateSignup } = require("../utils/validateSignup");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

authRoutes.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    //performing validations
    validateSignup(req);

    //encrypting the password
    const hashPassword = await bcrypt.hash(password, 10);

    //checking user
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      return res.status(200).json({message:"user already exist"});
    }

    const data = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    await data.save();
    res.status(201).send("user created successfully...")
  } catch (err) {
    res.status(500).send(err.message);
  }
});

authRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await User.findOne({ email: email });
    if (!userData) {
      return res.send("Register to login...");
    }

    const validUser = await bcrypt.compare(password, userData.password);

    //generating jwt
    const payload = {
      id: userData._id,
    };
    if (validUser) {
      const token = await jwt.sign(payload, "kavya@13", { expiresIn: "1h" });
      res.cookie("token", token);
      res.status(200).send(userData);
    } else {
      // throw new Error("Invalid credentials");
      return res.send("Invalid credentials...")
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

authRoutes.post("/logout", async (req,res)=>{
    const {token} = req.cookies
    console.log(token)
    // res.clearCookie(token)
    res.cookie("token", "", { expires: new Date(Date.now()) });
    res.send("You are logged out...")
  // res.clearCookie()
})

module.exports = authRoutes;