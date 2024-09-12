const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required!"],
    },
    description: {
      type: String,
      required: [true, "Description is required!"],
    },
    files: [
      {
        url: { type: String, required: true },
        type: { type: String, required: true },
      },
    ],
    date: {
      type: Date,
    },
    start_time: {
      type: String,
    },
    end_time: {
      type: String,
    },
    location: {
      type: String,
      default: "Online",
    },
    event_mode: {
      type: String,
      required: [true, "Event mode is required!"],
      enum: ["hybrid", "online", "in-person"],
    },
    languages: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Language",
    },
    ticket_id: { //?
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
    event_type: {
      type: String,
      required: [true, "Event type is required!"],
      enum: ["liveStream", "workshop", "panelDiscussions"],
    },
    status: {
      type: String,
      enum: ["ongoing", "upcoming", "cancelled", "completed"],
      default: "upcoming",
    },
    participants: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    revenue_generated: {
      type: Number,
      default: 0,
    },
    is_approved: {
      type: Boolean,
      default: false,
    },
    is_hidden: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const EventModel = mongoose.model("Event", eventSchema);

module.exports = EventModel;
