import { Server } from "socket.io";
import corsOptions from "../config/corsOptions.js";

export default function initSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: corsOptions,
  });

  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    socket.on("message", (data) => {
      console.log(data);
      socket.emit("message", data);
    });
    socket.on("disconnect", (reson) => {
      console.log("socket disconnected ! Reson: ", reson);
    });
  });
}
