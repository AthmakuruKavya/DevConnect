const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectDb } = require("../configs/db");
const User = require("../models/user");
const { validateSignup } = require("../utils/validateSignup");

const authRoutes = require("../routes/authRoutes");
const profileRoutes = require("../routes/profileroutes");
const connectionRoutes = require("../routes/connectionRoutes");

app.use(express.json());
app.use(cookieParser());
app.use(cors());



app.use("/", authRoutes)
app.use("/",profileRoutes)
app.use("/connection",connectionRoutes)

connectDb()
  .then(() => {
    app.listen(4321, () => {
      console.log("Server started...");
    });
  })
  .catch((err) => {
    console.log("Server is not connected");
  });
