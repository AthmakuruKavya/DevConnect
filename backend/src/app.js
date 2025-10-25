const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectDb } = require("../configs/db");
const User = require("../models/user");
const { validateSignup } = require("../utils/validateSignup");

const authRoutes = require("../routes/authRoutes");
const profileRoutes = require("../routes/profileroutes")

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// app.post("/signup", async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;
//   try {
//     //performing validations
//     validateSignup(req);

//     //encrypting the password
//     const hashPassword = await bcrypt.hash(password, 10);

//     //checking user
//     const existUser = await User.findOne({ email: email });
//     if (existUser) {
//       return res.status(200).json({message:"user already exist"});
//     }

//     const data = new User({
//       firstName,
//       lastName,
//       email,
//       password: hashPassword,
//     });
//     await data.save();
//     res.status(201).send("user created successfully...")
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const userData = await User.findOne({ email: email });
//     if (!userData) {
//       return res.send("Register to login...");
//     }

//     const validUser = await bcrypt.compare(password, userData.password);

//     //generating jwt
//     const payload = {
//       id: userData._id,
//     };
//     if (validUser) {
//       const token = await jwt.sign(payload, "kavya@13", { expiresIn: "10s" });
//       res.cookie("token", token);
//       res.status(200).send("login seccessful...!");
//     } else {
//       // throw new Error("Invalid credentials");
//       return res.send("Invalid credentials...")
//     }
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// app.post("/logout", async (req,res)=>{
//     const {token} = req.cookies
//     console.log(token)
//     // res.clearCookie(token)
//     res.cookie("token", "", { expires: new Date(Date.now()) });
//     res.send("You are logged out...")
//   // res.clearCookie()
// })

app.use("/", authRoutes)
app.use("/",profileRoutes)

// app.get("/profile",authUser, async (req, res) => {
//   try {
//     res.status(200).send(req.user)
    
//   } catch (error) {
//     return res.send(500).send("Error occured...")
//   }

//   // try {
//   //   const { token } = req.cookies;
//   //   const verifyToken = await jwt.verify(token, "kavya@13");
//   //   if (verifyToken) {
//   //     //getting userData from jwtToken
//   //     const userData = await User.findOne({ _id: verifyToken.id });
//   //     res.send(userData);
//   //   } else {
//   //     res.send("Invalid token...");
//   //   }
//   //   // const verifyToken = await jwt.verify()
//   // } catch (err) {
//   //   res.send(err.message);
//   // }
// });

connectDb()
  .then(() => {
    app.listen(4321, () => {
      console.log("Server started...");
    });
  })
  .catch((err) => {
    console.log("Server is not connected");
  });
