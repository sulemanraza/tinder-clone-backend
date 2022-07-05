const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
var messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  messages: [{}],
});

//Export the model
module.exports = mongoose.model("Message", messageSchema);
