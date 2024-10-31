const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    (req.header("Authorization") &&
      req.header("Authorization").replace("Bearer ", ""));

  if (!token) {
    throw new ApiError(401, "Unauthorized Access");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded?._id);

    if (!user) {
      throw new ApiError(401, "User does not exist");
    }

    req.user = user;
    next(); // Call next() to pass control
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }
});

module.exports = verifyJWT;
