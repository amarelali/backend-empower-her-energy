const mongoose = require("mongoose");

const nominationSchema = mongoose.Schema(
  {
    nominator_fullname: {
      type: String,
      required: [true, "Nominator's full name is required!"],
    },
    nominator_email: {
      type: String,
      required: [true, "Nominator's email is required!"],
    },
    nominee_fullname: {
      type: String,
      required: [true, "Nominee's full name is required!"],
    },
    nominee_email: {
      type: String,
      required: [true, "Nominee's email is required!"],
    },
    category: {
      type: String,
      enum: ["leadership", "innovation", "community_impact"],
      required: [true, "Category is required!"],
    },
    leadership: {
      type: String,
    },
    innovation: {
      type: String,
    },
    community_impact: {
      type: String,
    },
    reason: {
      type: String,
      required: [true, "Reason for nomination is required!"],
    },
    dateSubmitted: {
      type: Date,
      default: Date.now, // fina n3temed l createdAt?
    },
    message: {
      type: String,
      required: [true, "Reason for nomination is required!"],
    },
  },
  { timestamps: true }
);

const NominationModel = mongoose.model("Nomination", nominationSchema);

module.exports = NominationModel;
