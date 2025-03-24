import { Router } from "express";
import { body, param, query } from "express-validator";
import authMiddleware from "../middlewares/authMiddleware.js";
import mongoose from "mongoose";
import {
  addNewParticipant,
  createNewChat,
  deleteChat,
  getChatById,
  getChatList,
  removeParticipant,
} from "../controllers/chat.controllers.js";

const router = new Router();

// verify valid user
router.use(authMiddleware);

router
  .route("/")
  .get(
    [
      query("page").default(1).isInt().withMessage("page should be an integer"),
      query("limit")
        .default(10)
        .isInt()
        .withMessage("limit should be an intenger"),
    ],
    getChatList
  )
  .post(
    [
      body("isGroupChat")
        .default(false)
        .isBoolean()
        .withMessage("isGroupChat should be boolean"),
      body("chatName")
        .isString()
        .withMessage("chatName should be string")
        .custom((input, meta) => {
          const { req, path } = meta;
          const field = req.body[path]?.trim();

          if (
            req.body?.isGroupChat &&
            !field &&
            field.length > 4 &&
            field.length < 50
          )
            return false;
          else return true;
        })
        .withMessage("chatname should be 4-50 character long"),
      body("participants")
        .default([])
        .isArray()
        .custom((input, meta) => {
          const { req, path } = meta;
          // is valid mongoId
          const field = req.body[path];
          const isMongoId = field.every((element) =>
            mongoose.isValidObjectId(element)
          );

          if (isMongoId) return true;
          else return false;
        })
        .withMessage("participants should be an Array of userIds"),
    ],
    createNewChat
  );

router
  .route("/:chatId")
  .get(
    [param("chatId").isMongoId().withMessage("chatId should be valid")],
    getChatById
  )
  .delete(
    [param("chatId").isMongoId().withMessage("chatId should be valid")],
    deleteChat
  );

router
  .route("/:chatId/participants")
  .patch(
    [
      param("chatId").isMongoId().withMessage("chatId should be valid"),
      body("participant")
        .isMongoId()
        .withMessage("paticipant must be valid mongo Id"),
    ],
    addNewParticipant
  )
  .delete(
    [
      param("chatId").isMongoId().withMessage("chatId should be valid"),
      body("participant")
        .isMongoId()
        .withMessage("paticipant must be valid mongo Id"),
    ],
    removeParticipant
  );

export default router;
