import JWT from "jsonwebtoken";
import { validationResult } from "express-validator";

import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const generateAuthTokens = function (user) {
  try {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    return { accessToken, refreshToken };
  } catch (error) {
    console.error(error);
    throw new Error("failed to generate tokens");
  }
};

export const registerUser = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) throw ApiError.validationError(result.array());

  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) throw new ApiError(400, "User already exists");

  const user = await User.create({ username, email, password });

  const { accessToken, refreshToken } = generateAuthTokens(user);
  if (!accessToken || !refreshToken)
    throw new Error("failed to generate tokens");

  user.refreshToken = refreshToken;
  await user.save();

  const userData = user.toObject();
  delete userData.password;
  delete userData.refreshToken;

  return res
    .status(201)
    .cookie("token", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 60 * 24,
      secure: process.env.NODE_ENV === "production",
    })
    .json(
      ApiResponse.success(
        { user: userData, accessToken, refreshToken },
        "Registered successfully",
        201
      )
    );
});

export const loginUser = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) throw ApiError.validationError(result.array());

  const { user, password } = req.body;

  const findedUser = await User.findOne({
    $or: [{ username: user }, { email: user }],
  });

  if (!findedUser) throw new ApiError(400, "Invalid credentials");

  const isPwdMatched = await findedUser.comparePassword(password);
  if (!isPwdMatched) throw new ApiError(400, "Invalid credentials");

  const { accessToken, refreshToken } = generateAuthTokens(findedUser);
  if (!accessToken || !refreshToken)
    throw new Error("failed to generate tokens");

  findedUser.refreshToken = refreshToken;
  await findedUser.save();

  const userData = findedUser.toObject();
  delete userData.password;
  delete userData.refreshToken;

  return res
    .status(200)
    .cookie("token", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 60 * 24,
      secure: process.env.NODE_ENV === "production",
    })
    .json(
      ApiResponse.success(
        { user: userData, accessToken, refreshToken },
        "Logged in successfully"
      )
    );
});

export const refreshAuthTokens = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) throw ApiError.validationError(result.array());

  const token = req.body?.refreshToken || req.cookies?.token;
  if (!token) throw new ApiError(400, "invalid refresh token");

  const decodedToken = JWT.verify(token, process.env.REFRESH_TOKEN_SECRET);
  if (!decodedToken)
    throw new ApiError(400, "invalid or expired refresh token");

  const user = await User.findById(decodedToken._id);
  if (!user) throw new ApiError(404, "user not found");

  const { accessToken, refreshToken } = generateAuthTokens(user);
  if (!accessToken || !refreshToken)
    throw new Error("failed to generate tokens");

  user.refreshToken = refreshToken;
  await user.save();

  return res
    .status(200)
    .cookie("token", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 60 * 24,
      secure: process.env.NODE_ENV === "production",
    })
    .json(
      ApiResponse.success(
        { accessToken, refreshToken },
        "Logged in successfully"
      )
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  const token = req.cookies?.token;

  const user = await User.findOne({ refreshToken: token });
  if (user) {
    user.refreshToken = null;
    await user.save();
  }
  // todo: blacklist token

  res.clearCookie("token", {
    httpOnly: true,
    maxAge: 60 * 60 * 60 * 24,
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200);
  res.json(ApiResponse.success(null, "logged out successfully"));
});
