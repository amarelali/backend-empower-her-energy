const mongoose = require("mongoose");

const partnershipSchema = mongoose.Schema(
  {
    organization_or_individual_name: {
      type: String,
      required: [true, "Organization or individual name is required!"],
    },
    fullname: {
      type: String,
      required: [true, "Full name is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
    },
    phoneNb: {
      type: String,
    },
    type: {
      type: String,
      required: [true, "Type is required!"],
      enum: ["organization", "individual"], // Possible types
    },
    description: {
      type: String,
    },
    event_sponsorship: {
      type: String,
    },
    content_collaboration: {
      type: String,
    },
    corporate_membership: {
      type: String,
    },
  },
  { timestamps: true }
);

const PartnershipModel = mongoose.model("Partnership", partnershipSchema);

module.exports = PartnershipModel;
