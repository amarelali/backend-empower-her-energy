const mongoose = require("mongoose");

const tierSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    price:{
      type: String, // price as string or a number with currency string property?
    },
    benefits:{
        type: String, 
    }
  },
  { timestamps: true }
);

const TierModel = mongoose.model("Tier", tierSchema);

module.exports = TierModel;
