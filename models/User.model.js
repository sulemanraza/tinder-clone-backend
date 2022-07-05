const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    dob_day: {
      type: String,
    },
    dob_month: {
      type: String,
    },
    dob_year: {
      type: String,
    },
    show_gender: {
      type: Boolean,
    },
    gender: {
      type: String,
    },
    interest: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    photos: [String],
    about: {
      type: String,
    },
    matches: [{}],
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("User", userSchema);
