const userData = require("../models/user.model");
const videodata = require("../models/video.model");
const TrendingData = require("../models/trending.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getUserChannel = asyncHandler(async (req, res) => {
  const email = req.params.email;
  const user = await userData.findOne({ email });
  if (!user) {
    throw new ApiError(404, "USER DOESN'T EXIST");
  } else {
    const hasChannel = user?.hasChannel;
    const userProfile = user?.profilePic;
    const ChannelName = user?.channelName;
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { hasChannel, userProfile, ChannelName },
          "Channel Data"
        )
      );
  }
});

const getUserCover = asyncHandler(async (req, res) => {
  const email = req.params.email;
  const user = await userData.findOne({ email });
  if (!user) {
    throw new ApiError(404, "USER DOESN'T EXIST");
  }
  const coverimg = user.channelData.channelCoverImg;
  if (!coverimg) {
    throw new ApiError(200, "No data");
  }
  res.status(200).json(new ApiResponse(200, coverimg, "Cover Image"));
});

const getUserChannelID = asyncHandler(async (req, res) => {
  const email = req.params.email;
  const user = await userData.findOne({ email });
  if (!user) {
    throw new ApiError(404, "USER DOESN'T EXIST");
  }
  if (user?.hasChannel) {
    const channelID = user.channelData._id;
    const channelDescription = user.channelData.channelDescription;
    const subscribers = user.channelData.subscribers;
    const links = user.channelData.socialLinks;
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { channelID, subscribers, channelDescription, links },
          "Channel ID"
        )
      );
  } else {
    throw new ApiError(404, "USER DOESN'T HAVE CHANNEL");
  }
});

const saveChannel = asyncHandler(async (req, res) => {
  const {
    email,
    ChannelName,
    ChannelAbout,
    fblink,
    instalink,
    twitterlink,
    websitelink,
    profileURL,
    currentDate,
  } = req.body;

  const user = await userData.findOneAndUpdate(
    { email },
    {
      $set: {
        profilePic: profileURL,
        channelName: ChannelName,
        hasChannel: true,
        channelData: [
          {
            channelName: ChannelName,
            channelProfile: profileURL,
            channelDescription: ChannelAbout,
            joinedDate: currentDate,
            socialLinks: [
              {
                facebook: fblink,
                instagram: instalink,
                twitter: twitterlink,
                website: websitelink,
              },
            ],
          },
        ],
      },
    },
    { new: true }
  );

  if (!user) {
    throw new ApiError(404, "USER DOESN'T EXIST");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { message: "Channel saved successfully" },
        "Channel Saved"
      )
    );
});

const checkChannel = asyncHandler(async (req, res) => {
  const email = req.params.email;
  const user = await userData.findOne({ email });
  const channelname = user.channelName;
  if (!channelname) {
    throw new ApiError(404, "Channel not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, channelname, "Channel Found"));
});

const getVideos = asyncHandler(async (req, res) => {
  const email = req.params.email;
  const videos = await videodata.findOne({ email });
  if (!videos) {
    throw new ApiError(404, "USER DOESN'T EXIST");
  }
  const myvideos = videos.VideoData;
  res.status(200).json(new ApiResponse(200, myvideos, "User Videos"));
});

const getOtherChannel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await userData.findOne({ "channelData._id": id });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const channelData = user.channelData.find(
    (channel) => channel._id.toString() === id
  );
  if (!channelData) {
    throw new ApiError(404, "Channel not found");
  }
  const userEmail = user.email;
  res.json(new ApiResponse(200, userEmail, "Other Channel"));
});

const subscribe = asyncHandler(async (req, res) => {
  const { channelID, email, email2 } = req.params;
  const { youtuberName, youtuberProfile, youtubeChannelID } = req.body;

  const user = await userData.findOne({ email });
  const user2 = await userData.findOne({ email: email2 });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!user2) {
    throw new ApiError(404, "User not found");
  }

  // Add validation checks for youtubeChannelID and channelID
  if (!youtubeChannelID || !channelID) {
    throw new ApiError(400, "Invalid channel ID");
  }

  const existingChannelIndex = user.subscribedChannels.findIndex(
    (channel) => channel.channelID.toString() === channelID.toString()
  );

  if (existingChannelIndex === -1) {
    user.subscribedChannels.push({
      channelname: youtuberName,
      channelProfile: youtuberProfile,
      channelID: youtubeChannelID.toString(),
    });
    user2.channelData.subscribers += 1;
    res.status(201).json(new ApiResponse(201, "Subscribed", "Subscribed"));
  } else {
    user.subscribedChannels.splice(existingChannelIndex, 1);
    user2.channelData.subscribers -= 1;
    res.status(200).json(new ApiResponse(200, "Unsubscribed", "Unsubscribed"));
  }

  await user.save();
  await user2.save();
});

const getSubscriptions = asyncHandler(async (req, res) => {
  const email = req.params.email;
  const user = await userData.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const subscribedData = user.subscribedChannels;
  if (subscribedData.length > 0) {
    res.status(200).json(new ApiResponse(200, subscribedData, "Subscriptions"));
  } else {
    res
      .status(200)
      .json(
        new ApiResponse(200, { subscribedData: "NO DATA" }, "No Subscriptions")
      );
  }
});

const saveFeaturedChannel = asyncHandler(async (req, res) => {
  const email = req.params.email;
  const data = req.body;

  const user = await userData.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const featuredChannelData = user.featuredChannels;
  const channelExists = featuredChannelData.some(
    (channel) => channel.channelID === data.channelID
  );

  if (channelExists) {
    return res
      .status(200)
      .json(new ApiResponse(200, "Channel added already", "Featured Channel"));
  }

  featuredChannelData.push({
    channelname: data.channelname,
    channelProfile: data.channelProfile,
    channelID: data.channelID,
  });

  await user.save();
  res
    .status(200)
    .json(new ApiResponse(200, featuredChannelData, "Featured Channel"));
});

const getFeaturedChannels = asyncHandler(async (req, res) => {
  const email = req.params.email;
  const user = await userData.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const featuredChannelData = user.featuredChannels;
  if (featuredChannelData.length > 0) {
    res
      .status(200)
      .json(new ApiResponse(200, featuredChannelData, "Featured Channels"));
  } else {
    res
      .status(200)
      .json(new ApiResponse(200, "No channels", "Featured Channels"));
  }
});

const deleteFeaturedChannel = asyncHandler(async (req, res) => {
  const { email, channelid } = req.params;
  const user = await userData.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const featuredChannelData = user.featuredChannels;
  const updatedFeaturedChannels = featuredChannelData.filter(
    (channel) => channel.channelID !== channelid
  );
  user.featuredChannels = updatedFeaturedChannels;
  await user.save();
  res
    .status(200)
    .json(new ApiResponse(200, "Channel removed", "Featured Channel Removed"));
});

const saveCustomization = asyncHandler(async (req, res) => {
  const email = req.params.email;
  const { profileURL, coverURL, channelid } = req.body;

  const user = await userData.findOne({ email });
  const video = await videodata.findOne({ user_email: email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!video) {
    throw new ApiError(404, "Video data not found");
  }

  user.profilePic = profileURL;
  user.channelData.channelProfile = profileURL;
  user.channelData.channelCoverImg = coverURL;

  await userData.updateMany(
    { "subscribedChannels.channelID": channelid },
    {
      $set: {
        "subscribedChannels.$.channelProfile": profileURL,
      },
    }
  );

  await userData.updateMany(
    { "featuredChannels.channelID": channelid },
    {
      $set: {
        "featuredChannels.$.channelProfile": profileURL,
      },
    }
  );

  video.VideoData.forEach((item) => {
    item.ChannelProfile = profileURL;
  });

  await videodata.updateMany(
    { "VideoData.comments.user_email": email },
    {
      $set: {
        "VideoData.$[video].comments.$[comment].user_profile": profileURL,
      },
    },
    {
      arrayFilters: [
        { "video.comments.user_email": email },
        { "comment.user_email": email },
      ],
    }
  );

  await user.save();
  await video.save();

  res.json(
    new ApiResponse(
      200,
      { success: true, userData: user },
      "Customization Saved"
    )
  );
});

const updateChannelData = asyncHandler(async (req, res) => {
  const email = req.params.email;
  const { channelName, channelDescription, channelID } = req.body;

  const user = await userData.findOne({ email });
  const video = await videodata.findOne({ email });
  const trending = await TrendingData.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.channelName = channelName;
  user.channelData.channelName = channelName;
  user.channelData.channelDescription = channelDescription;

  user.Playlists.forEach((element) => {
    element.playlist_owner = channelName;
  });

  await userData.updateMany(
    { "Playlists.owner_email": email },
    {
      $set: {
        "Playlists.$[playlist].playlist_owner": channelName,
      },
    },
    {
      arrayFilters: [{ "playlist.owner_email": email }],
    }
  );

  await userData.updateMany(
    { "subscribedChannels.channelID": channelID },
    {
      $set: {
        "subscribedChannels.$.channelname": channelName,
      },
    }
  );

  await userData.updateMany(
    { "featuredChannels.channelID": channelID },
    {
      $set: {
        "featuredChannels.$.channelname": channelName,
      },
    }
  );

  await userData.updateMany(
    { "likedVideos.email": email },
    {
      $set: {
        "likedVideos.$.uploader": channelName,
      },
    }
  );

  await userData.updateMany(
    { "watchLater.email": email },
    {
      $set: {
        "watchLater.$.uploader": channelName,
      },
    }
  );

  await user.save();

  if (!video) {
    throw new ApiError(404, "Video data not found");
  }

  video.VideoData.forEach((item) => {
    item.uploader = channelName;
  });

  await videodata.updateMany(
    { "VideoData.comments.user_email": email },
    {
      $set: {
        "VideoData.$[video].comments.$[comment].username": channelName,
      },
    },
    {
      arrayFilters: [
        { "video.comments.user_email": email },
        { "comment.user_email": email },
      ],
    }
  );

  await video.save();

  if (trending) {
    trending.uploader = channelName;
    await trending.save();
  }

  res.json(new ApiResponse(200, "DONE", "Channel Data Updated"));
});

module.exports = {
  getUserChannel,
  getUserCover,
  getUserChannelID,
  saveChannel,
  checkChannel,
  getVideos,
  getOtherChannel,
  subscribe,
  getSubscriptions,
  saveFeaturedChannel,
  getFeaturedChannels,
  deleteFeaturedChannel,
  saveCustomization,
  updateChannelData,
};
