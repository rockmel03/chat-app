import { Server } from "socket.io";
import corsOptions from "../config/corsOptions.js";
import jwt from "jsonwebtoken";
import Message from "../models/message.model.js";
import mongoose from "mongoose";

export default function initSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: corsOptions,
  });

  // auth middleware
  io.use((socket, next) => {
    const access_token =
      socket.handshake?.auth?.token || socket.handshake?.headers?.authorization;

    const token = access_token?.replace("Bearer ", "");
    if (!token) return next(new Error("token not found"));

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      socket.user = decoded;
      next();
    } catch (error) {
      console.error(error);
      next(new Error("invalid or expired token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    socket.on("join-chat", ({ chatId }) => {
      socket.join(chatId);

      console.log("chat joined", {
        socketId: socket.id,
        userId: socket.user?._id,
        chatId,
      });
    });

    socket.on("leave-chat", ({ chatId }) => {
      if (socket.rooms.has(chatId)) {
        socket.leave(chatId);

        console.log("chat leaved", {
          socketId: socket.id,
          userId: socket.user?._id,
          chatId,
        });
      }
    });

    socket.on("message", async ({ content, chatId }) => {
      console.log({ content, chatId });
      if (!chatId || !mongoose.isValidObjectId(chatId)) {
        throw new Error("invalid chatId");
      }
      try {
        const message = await Message.create({
          sender: socket.user?._id,
          content,
          chat: chatId,
        });
        const msgData = message.toObject();
        msgData.sender = socket?.user;
        io.to(chatId).emit("message", msgData);
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create meassage");
      }
    });

    socket.on("disconnect", (reson) => {
      console.log("socket disconnected ! Reson: ", reson);
    });
  });
}
