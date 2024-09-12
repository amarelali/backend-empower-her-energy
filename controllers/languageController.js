const _Language = require("../models/languageModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createLanguage = async (req, res) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res
      .status(401)
      .send({ message: "No token provided, access denied" });
  }
  try {
    const { language, language_code, is_active } = req.body;
    console.log(language);
    // compare gotten token by the token in the database
    const { id } = jwt.verify(token, process.env.JWT_SECRET); // return user id
    console.log("userId ", id);
    const user = await User.findOne({ _id: id });
    console.log("user user ... ", user);

    if (!user) return res.status(404).send({ message: "User not found" });

    if (user.role !== "super-admin" && user.role !== "admin") {
      return res.status(403).send({
        success: false,
        message: "You don't have permission to create language!",
      });
    }
    const LanguageModel = new _Language({
      language,
      language_code,
      is_active,
    });

    const savedLanguage = await LanguageModel.save();
    return res.status(201).send({
      success: true,
      message: "Language added successfully !",
      Language: savedLanguage,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const deleteLanguage = async (req, res) => {
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
        message: "You don't have permission to delete Language!",
      });
    }
    const { id } = req.params;

    const deletedLanguage = await _Language.findByIdAndDelete(id);

    if (!deletedLanguage) {
      return res
        .status(404)
        .json({ success: false, message: "Language not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Language deleted successfully!",
      Language: deletedLanguage,
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

const editLanguage = async (req, res) => {
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
        message: "You don't have permission to edit Language!",
      });
    }
    const { id } = req.params;

    const editedLanguage = await _Language.findByIdAndUpdate(id, req.body,{new:true});

    if (!editedLanguage) {
      return res
        .status(404)
        .json({ success: false, message: "Language not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Language edited successfully!",
      Language: editedLanguage
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
module.exports = { createLanguage, deleteLanguage, editLanguage };
