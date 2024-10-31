const express = require("express");
const { signup, login, logout } = require("../Controller/auth.controller");
const verifyJWT = require("../middlewares/verifyJWT");

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(verifyJWT, logout);

module.exports = router;
