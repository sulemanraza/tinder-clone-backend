const express = require("express");
const {
  getUser,
  signupUser,
  LoginUser,
  updateUser,
  getMatchesUser,
  updateUserMatch,
} = require("../controllers/User.controller");

// user Routes
const userRoute = express.Router();

userRoute.get("/", getUser);
userRoute.post("/matches", getMatchesUser);
userRoute.post("/signup", signupUser);
userRoute.post("/login", LoginUser);
userRoute.put("/", updateUser);
userRoute.put("/add-match", updateUserMatch);

module.exports = userRoute;
