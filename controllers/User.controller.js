const User = require("../models/User.model");
const cloudinary = require("../helper/cloudinary");
const APIFeatures = require("./../utils/apiFeatures");
const imageFilter = require("../utils/imageFilter");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helper/token");
const { validateEmail } = require("../helper/emailValidator");

exports.signupUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //  validate Email
    if (!validateEmail(email)) {
      return res.status(409).json({ error: "Please Add valid Email" });
    }

    // user exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Account already exist with that email. Please Login" });
    }

    // hash  row Password and create new user
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      email,
      password: hashPassword,
    });
    await newUser.save();

    // create token
    const token = await generateToken({ id: newUser._id.toString() }, "7d");

    // finally response if everything fine
    return res.status(201).json({ userId: newUser._id, email, token });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Login
exports.LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ error: "User not Exist with that Email" });

    const CorrectPassword = await bcrypt.compare(password, user.password);
    if (!CorrectPassword)
      return res.status(404).json({ error: "Invalided Password" });

    // finally response if everything fine
    const token = await generateToken({ id: user._id.toString() }, "7d");
    return res.status(200).json({ userId: user._id, email, token });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getUser = async (req, res) => {
  try {
    const features = new APIFeatures(User.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();

    const user = await features.queryModel;
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateUser = async (req, res) => {
  const {
    _id,
    firstName,
    dob_day,
    dob_month,
    dob_year,
    show_gender,
    gender,
    interest,
    email,
    about,
    matches,
    // photos,
  } = req.body.formData;

  // const images = imageFilter(photos);
  // console.log(Object.values(images));
  // console.log(photos);
  try {
    // const uploadImage = await cloudinary.uploader.upload(
    //   photos["image_1"],
    //   function (error, result) {
    //     console.log(result, error);
    //   }
    // );
    const updateUser = await User.findOneAndUpdate({ _id }, req.body.formData);
    // finally response if everything fine
    const token = await generateToken({ id: updateUser._id.toString() }, "7d");
    return res.status(201).json({ userId: updateUser._id, email, token });
  } catch (error) {
    return res.status(500).json(error);
  }
};
// get getMatchesUser
exports.getMatchesUser = async (req, res) => {
  const { userIds } = req.body;
  try {
    const matchedUser = await User.find({ _id: userIds });

    return res.status(200).json(matchedUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};
// add User Match
exports.updateUserMatch = async (req, res) => {
  const { userId, matchedUserId } = req.body;
  try {
    const matchUser = await User.findOne({ _id: userId });

    // if both user chat exist in database
    matchUser.matches.push({ user_id: matchedUserId });
    await matchUser.save();

    // finally response if everything fine
    return res.status(200).json(matchUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};
