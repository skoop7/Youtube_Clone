const mongoose = require("mongoose");

const trendingSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Invalid Email Address!!!",
      },
    },
    thumbnailURL: {
      type: String,
      required: true,
    },
    trendingNo: {
      type: String,
    },
    uploader: {
      type: String,
      required: true,
    },
    videoURL: {
      type: String,
      required: true,
    },
    ChannelProfile: {
      type: String,
      required: true,
    },
    Title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
    },
    videoLength: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    uploaded_data: {
      type: String,
    },
  },
  { timestamps: true }
);

const Trending = mongoose.model("Trending", trendingSchema);

module.exports = Trending;
