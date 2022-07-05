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

userRoute
  .get("/", getUser)
  .post("/matches", getMatchesUser)
  .post("/signup", signupUser)
  .post("/login", LoginUser)
  .put("/", updateUser)
  .put("/add-match", updateUserMatch);

module.exports = userRoute;
