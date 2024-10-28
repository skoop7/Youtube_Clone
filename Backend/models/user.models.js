const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
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
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    },
    hasChannel: {
      type: Boolean,
      default: false,
    },
    channelName: {
      type: String,
    },
    thumbnails: [
      {
        imageURL: {
          type: String,
        },
      },
    ],
    videos: [
      {
        videoURL: {
          type: String,
        },
        videoLength: {
          type: Number,
          required: true,
        },
      },
    ],
    likedVideos: [
      {
        email: {
          type: String,
          required: true,
          validate: {
            validator: function (value) {
              return validator.isEmail(value);
            },
            message: "Invalid email address",
          },
        },
        videoURL: {
          type: String,
        },
        thumbnailURL: {
          type: String,
        },
        videoLength: {
          type: Number,
        },
        views: {
          type: Number,
          default: 0,
        },
        uploaded_date: {
          type: String,
        },
        ChannelProfile: {
          type: String,
        },
        Title: {
          type: String,
        },
        video_privacy: {
          type: String,
        },
        uploader: {
          type: String,
        },
        likedVideoID: {
          type: String,
        },
      },
    ],
    likedComments: [
      {
        comment_ID: {
          type: String,
        },
      },
    ],
    savedPlaylists: [
      {
        playlistID: {
          type: String,
        },
      },
    ],
    watchLater: [
      {
        email: {
          type: String,
          required: true,
          validate: {
            validator: function (email) {
              return validator.isEmail(email);
            },
            message: "Invalid Email Address",
          },
        },
        videoURL: {
          type: String,
        },
        thumbnailURL: {
          type: String,
        },
        videoLength: {
          type: Number,
        },
        views: {
          type: Number,
          default: 0,
        },
        uploaded_date: {
          type: String,
        },
        ChannelProfile: {
          type: String,
        },
        videoprivacy: {
          type: String,
        },
        title: {
          type: String,
        },
        uploader: {
          type: String,
        },
        savedVideoID: {
          type: String,
        },
      },
    ],
    channelData: [
      {
        subscribers: {
          type: Number,
          default: 0,
        },
        channelName: {
          type: String,
        },
        channelDiscription: {
          type: String,
        },
        channelProfile: {
          type: String,
        },
        channelCoverImg: {
          type: String,
        },
        joinedDate: {
          type: String,
        },
        socialLinks: [
          {
            facebook: {
              type: String,
            },
            instagram: {
              type: String,
            },
            twitter: {
              type: String,
            },
            website: {
              type: String,
            },
          },
        ],
      },
    ],
    subscribedChannels: [
      {
        channelName: {
          type: String,
        },
        channelProfile: {
          type: String,
        },
        channelID: {
          type: String,
        },
      },
    ],
    featuredChannels: [
      {
        channelName: {
          type: String,
        },
        channelProfile: {
          type: String,
        },
        channelID: {
          type: String,
        },
      },
    ],
    Playlists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
};

const User = mongoose.model("User", userSchema);

module.exports = User;
