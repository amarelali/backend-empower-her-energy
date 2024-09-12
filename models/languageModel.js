const mongoose = require("mongoose");

const languageSchema = mongoose.Schema(
  {
    language: {
      type: String,
    },
    language_code:{
      type: String,
      unique: true,
    },
    is_active:{
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const LanguageModel = mongoose.model("Language", languageSchema);

module.exports = LanguageModel;
