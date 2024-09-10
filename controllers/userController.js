const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  if(req.body.password != req.body.reenterPassword){
    return res.status(400).send({
      success: false,
      message: "Passwords must match!",
    }); 
  }
  try {
    const user = await User.create(req.body);
    res.status(200).send({
      success: true,
      user,
    });
  } catch (e) {
    res.status(400).send({
      success: false,
      message: e.message,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found",
      });
    }
    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: rememberMe ? "30d" : "1h",
    });
    console.log(token);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 1 * 60 * 60 * 1000,
    });

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    // If valid, create a session and respond with user data
    req.login(user, (err) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: "Failed to log in",
        });
      }
      res.status(200).send({
        success: true,
        user,
      });
    });
  } catch (e) {
    res.status(400).send({
      success: false,
      message: e.message,
    });
  }
};
module.exports = { register, login };
