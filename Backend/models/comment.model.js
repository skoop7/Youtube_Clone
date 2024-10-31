const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    user_profile: {
      type: String,
    },
    comment: {
      type: String,
    },
    videoId: {
      type: String,
    },
    time: {
      type: String,
    },
    likes: {
      type: Number,
    },
    user_email: {
      type: String,
    },
    channel_id: {
      type: String,
    },
    heartComment: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
