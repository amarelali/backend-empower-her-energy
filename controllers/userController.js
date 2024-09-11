const User = require("../models/userModel");
const UserTokens = require("../models/userTokensModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = async (userId, withRemember = false) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: withRemember ? "30d" : "1h",
  });
};
const register = async (req, res) => {
  if (req.body.password != req.body.reenterPassword) {
    return res.status(400).send({
      success: false,
      message: "Passwords must match!",
    });
  }
  try {
    const user = await User.create(req.body);
    const token = await generateToken(user._id);
    const userTokenResponse = await UserTokens.create({ user_id: user._id , token });
    return res.status(200).send({
      success: true,
      user,
      token,
      expiresAt: userTokenResponse.expiresAt,
    });
  } catch (e) {
    return res.status(400).send({
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
    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid credentials",
      });
    }
    const tokenExist = await UserTokens.findOne({ user_id: user._id });
    const expiresAt = new Date(
      Date.now() + (rememberMe ? 30 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000)
    );
    let token;
    if (tokenExist && Date.now() < tokenExist.expiresAt) {
      // token exist and still valid so we update the expiration date
      tokenExist.expiresAt = expiresAt;
      await tokenExist.save();
      token = tokenExist.token;
    } else {
      token = await generateToken(user._id, rememberMe);
      if (tokenExist) {
        // token exist but date.now > epires date of token, that's why we need to update token with expiration date
        tokenExist.token = token;
        tokenExist.expiresAt = expiresAt;
        await tokenExist.save();
      } else {
        await UserTokens.create({
          user_id: user._id,
          token,
          expiresAt,
        });
      }
    }
    return res.status(200).send({
      success: true,
      user,
      token,
      expiresAt,
    });
  } catch (e) {
    return res.status(400).send({
      success: false,
      message: e.message,
    });
  }
};
module.exports = { register, login };
