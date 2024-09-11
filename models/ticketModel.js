const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Event",
      required: true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    payment_status:{
        type: String,
        enum: ["pending", "paid", "cancelled"],
        default: "pending"
    },
    purchase_date:{
        type:Date,
        default: Date.now,
    },
    tax:{
        type:Number,
        default: 0
    },
    discount_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Discount"
    }
  },
  { timestamps: true }
);

const ticketModel = mongoose.model("Ticket", ticketSchema);

module.exports = ticketModel;
