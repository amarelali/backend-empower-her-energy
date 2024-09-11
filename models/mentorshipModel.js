const mongoose = require("mongoose");

const mentorshipSchema = mongoose.Schema(
  {
    mentor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mentees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["ongoing", "completed", "upcoming"],
      default: "upcoming",
    },
  },
  { timestamps: true }
);

const MentorshipModel = mongoose.model("Mentorship", mentorshipSchema);

module.exports = MentorshipModel;
