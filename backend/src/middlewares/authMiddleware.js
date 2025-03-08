import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const authMiddleware = asyncHandler((req, res, next) => {
  const accessToken = req.headers.authorization?.replace("Bearer ", "");
  if (!accessToken) throw ApiError.authError("invalid auth token");

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
  } catch (error) {
    throw ApiError.authError("invalid or expired token");
  }

  next();
});

export default authMiddleware;
