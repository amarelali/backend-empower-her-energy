const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    req;
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
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found",
      });
    }
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
