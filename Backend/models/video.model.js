const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Invalid Email Address!!!",
      },
    },
    videoData: [
      {
        thumbnailURL: {
          type: String,
          required: true,
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
        Tags: {
          type: String,
          required: true,
        },
        videoLength: {
          type: Number,
          required: true,
        },
        views: {
          type: Number,
          default: 0,
        },
        visibility: {
          type: String,
          default: "Public",
        },
        likes: {
          type: Number,
          default: 0,
        },
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
      },
    ],
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
