const User = require("../models/userModel");

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

module.exports = { register };
