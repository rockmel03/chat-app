import { Router } from "express";
import {
  addNewParticipant,
  createNewChat,
  deleteChat,
  getChatList,
  removeParticipant,
} from "../controllers/chat.controllers.js";
import { body, param, query } from "express-validator";

const router = new Router();

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
  );

router
  .route("/chatId")
  .post(
    [
      param("chatId").isMongoId().withMessage("chatId should be valid"),
      body("isGroupChat")
        .default(false)
        .isBoolean()
        .withMessage("isGroupChat should be boolean"),
      body("chatname").isString().withMessage("chatname should be string"),
      body("participants")
        .default([])
        .isArray()
        .withMessage("participants should be an Array of userIds"),
    ],
    createNewChat
  )
  .delete(
    [param("chatId").isMongoId().withMessage("chatId should be valid")],
    deleteChat
  );

router
  .route("/participants")
  .post(
    body("newParticipant")
      .isMongoId()
      .withMessage("paticipant must be valid mongo Id"),
    addNewParticipant
  )
  .delete(
    body("participant")
      .optional()
      .isMongoId()
      .withMessage("participant must be valid mongo Id"),
    removeParticipant
  );

export default router;
