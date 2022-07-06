const express = require("express");
const {
  getMessage,
  updateMessage,
  addMessage,
} = require("../controllers/Message.controller");

// Message Routes
const messageRoute = express.Router();

messageRoute.post("/", addMessage);
messageRoute.get("/", getMessage);
messageRoute.put("/", updateMessage);

module.exports = messageRoute;
