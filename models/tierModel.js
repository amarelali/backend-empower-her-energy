const mongoose = require("mongoose");

const tierSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    price:{
      type: Number, 
    },
    currency:{
      type:String
    },
    benefits:{
        type: String, 
    }
  },
  { timestamps: true }
);

const TierModel = mongoose.model("Tier", tierSchema);

module.exports = TierModel;
