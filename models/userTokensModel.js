const mongoose = require("mongoose");

const userTokensSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      default: Date.now() + 3600000, // 1 hour is the typical expiration time for google token
    },
  },
  { timestamps: true }
);

const UserTokensModel = mongoose.model("UserTokens", userTokensSchema);

module.exports = UserTokensModel;
