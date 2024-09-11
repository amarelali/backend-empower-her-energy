const mongoose = require("mongoose");

const resourceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
    },
    description: {
      type: String,
      required: [true, "Description is required!"],
    },
    image: {
      type: String,
    },
    date: {
      type: Date,
      required: [true, "Date is required!"],
    },
    format: {
      type: String,
      enum: ["article", "video", "tools"],
      required: [true, "Format is required!"],
    },
    viewsNb: {
      type: Number,
      default: 0,
    },
    likesNb: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const ResourceModel = mongoose.model("Resource", resourceSchema);

module.exports = ResourceModel;
