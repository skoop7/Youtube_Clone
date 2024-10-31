const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
  {
    playlist_name: {
      type: String,
      required: true,
    },
    owner_email: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Invalid Email Address",
      },
    },
    playlist_privacy: {
      type: String,
      required: true,
    },
    playlist_date: {
      type: String,
    },
    playlist_owner: {
      type: String,
    },
    playlist__videos: [
      {
        thumbnail: {
          type: String,
        },
        title: {
          type: String,
        },
        videoId: {
          type: String,
        },
        description: {
          type: String,
        },
        videoLength: {
          type: String,
        },
        video_uploader: {
          type: String,
        },
        video_date: {
          type: String,
        },
        videoprivacy: {
          type: String,
        },
        video_views: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
