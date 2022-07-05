const express = require("express");
const userRoute = require("./routes/User.router");
const cors = require("cors");
const messageRoute = require("./routes/Message.router");
const app = express();

// middleware ===========================================
app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
// Routes ===============================================
app.use("/users", userRoute);
app.use("/messages", messageRoute);

module.exports = app;
