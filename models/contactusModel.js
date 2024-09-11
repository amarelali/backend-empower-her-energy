const mongoose = require("mongoose");

const contactUsSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required!"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
    },
    status: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    dateSubmitted: { // fina n3temed l createdAt?
      type: Date,
      default: Date.now, 
    },
    message: {
      type: String,
      required: [true, "Message is required!"],
    },
  },
  { timestamps: true } 
);

const ContactUsModel = mongoose.model("ContactUs", contactUsSchema);

module.exports = ContactUsModel;
