import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const healthcheck = asyncHandler((req, res) => {
  return res.status(200).json(ApiResponse.success("OK", "Health check passed"));
});
