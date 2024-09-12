const Tier = require("../models/tierModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createTier = async (req, res) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res
      .status(401)
      .send({ message: "No token provided, access denied" });
  }
  const { name, price, currency, benefits } = req.body;
  try {
    // compare gotten token by the token in the database
    const { id } = jwt.verify(token, process.env.JWT_SECRET); // return user id
    const user = await User.findOne({ _id: id });

    if (!user) return res.status(404).send({ message: "User not found" });

    if (user.role !== "super-admin" && user.role !== "admin") {
      return res.status(403).send({
        success: false,
        message: "You don't have permission to create tier!",
      });
    }
    const newTier = new Tier({
      name: name,
      price: price,
      currency: currency,
      benefits: benefits,
    });

    const savedTier = await newTier.save();
    return res.status(201).send({
      success: true,
      message: "Tier added successfully !",
      tier: savedTier,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const deleteTier = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .send({ message: "No token provided, access denied" });
  }
  try {
    // compare gotten token by the token in the database
    const tokenData = jwt.verify(token, process.env.JWT_SECRET); // return user id
    const user = await User.findOne({ _id: tokenData.id });

    if (!user) return res.status(404).send({ message: "User not found" });

    if (user.role !== "super-admin" && user.role !== "admin") {
      return res.status(403).send({
        success: false,
        message: "You don't have permission to delete tier!",
      });
    }
    const { id } = req.params;

    const deletedTier = await Tier.findByIdAndDelete(id);

    if (!deletedTier) {
      return res
        .status(404)
        .json({ success: false, message: "Tier not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Tier deleted successfully!",
      tier: deletedTier,
    });
  } catch (error) {
    return res.status(500).send({ sucess: false, message: error.message });
  }
};
module.exports = { createTier, deleteTier };
