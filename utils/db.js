const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(console.log("Mongodb connected!"));
    console.log("MongoDB connected...");
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = connectDB;
