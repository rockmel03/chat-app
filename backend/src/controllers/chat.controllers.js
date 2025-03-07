import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Chat from "../models/chat.model.js";
import mongoose from "mongoose";

export const createNewChat = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) throw ApiError.validationError(result.array());

  const { isGroupChat, chatName, participants } = req.body;

  const createdChat = await Chat.create({
    isGroupChat,
    chatName,
    participants: [...new Set([...participants, req.user._id])],
    groupAdmin: req.user?._id,
  });
  if (!createdChat) throw new ApiError(500, "Failed to create Chat ");

  return res
    .status(201)
    .json(ApiResponse.success(createdChat, "Chat created successfully", 201));
});

export const getChatList = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) throw ApiError.validationError(result.array());

  const { page = 1, limit = 10 } = req.params;

  const findedChats = await Chat.aggregate([
    {
      $match: {
        $in: {
          participants: mongoose.Types.ObjectId(req.user._id),
        },
      },
    },
    {
      $lookup: {
        from: "groupAdmin",
        foreignField: "_id",
        localField: "latestMessage",
        as: "groupAdmin",
      },
    },
    {
      $lookup: {
        from: "Message",
        foreignField: "_id",
        localField: "latestMessage",
        as: "latestMessage",
      },
    },
    {
      $sort: {
        createdAt: 1,
      },
    },
    {
      $skip: Number(limit) * (Number(page) - 1),
    },
    {
      $limit: Number(limit),
    },
    {
      $addFields: {
        page: Number(page),
        limit: Number(limit),
      },
    },
  ]);

  return res.status(200).json(ApiResponse.success(findedChats, "Success"));
});

export const addNewParticipant = asyncHandler(async (req, res) => {
  // find chat by id
  // check isAdmin
  // check valid user id
  // add user to list and update in datbase
  // send response
  const result = validationResult(req);
  if (!result.isEmpty()) throw ApiError.validationError(result.array());

  const { chatId } = req.params;
  const { newParticipant } = req.body;

  const chat = await Chat.findById(chatId);
  if (!chat) throw new ApiError(400, "Chat not existed ");

  const isAdmin = chat.isGroupChat && chat.groupAdmin === req.user?._id;
  if (!isAdmin) throw new ApiError(403, "Unauthorized");

  const updatedChat = await Chat.findByIdAndUpdate(
    chat._id,
    {
      participants: [...new Set([...chat.participants, newParticipant])],
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedChat, "New Participant added successfully!")
    );
});

export const removeParticipant = asyncHandler(async (req, res) => {
  // find chat by id
  // check isAdmin or user itself
  // remove user and if user is only particepants delete chat also
  // send response

  const result = validationResult(req);
  if (!result.isEmpty()) throw ApiError.validationError(result.array());

  const { chatId } = req.params;
  const { participant } = req.body;

  const chat = await Chat.findById(chatId);
  if (!chat) throw new ApiError(400, "Chat not existed ");

  const isAdmin = chat.isGroupChat && chat.groupAdmin === req.user?._id;
  const isUserItself = chat.participants.includes(req.user?._id);

  // TODO: think about more edge cases such as
  // user could be admin
  // user could be paricipant
  // user could be both admin and participant

  if (!isAdmin || !isUserItself) throw new ApiError(403, "Unauthorized");

  const filteredParticipants = chat.participants.filter(
    (pId) => pId !== (isAdmin ? participant : req.user?.id)
  );

  const updatedChat = await Chat.findByIdAndUpdate(
    chat._id,
    {
      participants: filteredParticipants,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedChat, "Participant removed successfully!")
    );
});

export const deleteChat = asyncHandler(async (req, res) => {
  // find chat by id
  // check user is admin
  // delete chat and send response
  const result = validationResult(req);
  if (!result.isEmpty()) throw ApiError.validationError(result.array());

  const { chatId } = req.params;

  const chat = await Chat.findById(chatId);
  if (!chat) throw new ApiError(400, "Chat not existed or already deleted");

  const isAdmin = chat.isGroupChat && chat.groupAdmin === req.user?._id;
  if (!isAdmin)
    throw new ApiError(
      403,
      "Unauthorized : only admin can perform this action"
    );

  const deletedChat = await Chat.findByIdAndDelete(chatId);

  return res
    .status(200)
    .json(new ApiResponse(200, deletedChat, "Chat deleted successfully"));
});
