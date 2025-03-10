import { Server } from "socket.io";
import corsOptions from "../config/corsOptions.js";
import jwt from "jsonwebtoken";
import Message from "../models/message.model.js";

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

    socket.on("message", async ({ content }) => {
      console.log({ content });
      const message = new Message({
        sender: socket.user?._id,
        content,
      });
      io.emit("message", message);
    });

    socket.on("disconnect", (reson) => {
      console.log("socket disconnected ! Reson: ", reson);
    });
  });
}
