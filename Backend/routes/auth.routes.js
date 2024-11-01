const express = require("express");
const {
  signup,
  login,
  logout,
  getCurrentUser,
} = require("../Controller/auth.controller");
const verifyJWT = require("../middlewares/verifyJWT");

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(verifyJWT, logout);
router.route("/userdata").post(verifyJWT, getCurrentUser);

module.exports = router;
