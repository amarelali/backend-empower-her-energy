const mongoose = require("mongoose");

const discountSchema = mongoose.Schema(
  {
    discountCode: {
      type: String,
      required: [true, "Discount code is required!"],
      unique: true, 
    },
    amount: {
      type: Number,
      required: [true, "Amount is required!"],
    },
  },
  { timestamps: true }
);

const DiscountModel = mongoose.model("Discount", discountSchema);

module.exports = DiscountModel;
