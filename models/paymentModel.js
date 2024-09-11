const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required!"],
    },
    cardholder_name: {
      type: String,
      required: [true, "Cardholder name is required!"],
    },
    cardNumber: {
      type: String,
      required: [true, "Card number is required!"],
    },
    expiry_date: {
      type: Date,
      required: [true, "Expiry date is required!"],
    },
    CVV: {
      type: String,
      required: [true, "CVV is required!"],
    },
    country: {
      type: String,
      required: [true, "Country is required!"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required!"],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required!"],
    },
    ticket_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
      },
    ],
  },
  { timestamps: true }
);

const PaymentModel = mongoose.model("Payment", paymentSchema);

module.exports = PaymentModel;
