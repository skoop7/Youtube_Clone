// routes/user.routes.js

const express = require("express");
const {
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
} = require("../Controller/channel.controller");
const verifyJWT = require("../middlewares/verifyJWT");
const router = express.Router();

router.route("/getchannel/:email").get(verifyJWT, getUserChannel);
router.route("/getcover/:email").get(verifyJWT, getUserCover);
router.route("/getchannelid/:email").get(verifyJWT, getUserChannelID);
router.route("/savechannel").post(verifyJWT, saveChannel);
router.route("/checkchannel/:email").get(verifyJWT, checkChannel);
router.route("/getuservideos/:email").get(verifyJWT, getVideos);
router.route("/otherchannel/:id").get(verifyJWT, getOtherChannel);
router.route("/getotherchannel/:id").get(verifyJWT, getOtherChannel);
router.route("/subscribe/:email").get(verifyJWT, subscribe);
router.route("/subscribe/:channelID/:email/:email2").post(verifyJWT, subscribe);
router.route("/getsubscriptions/:email").get(verifyJWT, getSubscriptions);
router
  .route("/savefeaturedchannel/:email")
  .post(verifyJWT, saveFeaturedChannel);
router.route("/getfeaturedchannels/:email").get(verifyJWT, getFeaturedChannels);
router
  .route("/deletefeaturedchannel/:email/:channelid")
  .post(verifyJWT, deleteFeaturedChannel);
router.route("/savecustomization/:email").post(verifyJWT, saveCustomization);
router.route("/updatechanneldata/:email").post(verifyJWT, updateChannelData);

module.exports = router;
