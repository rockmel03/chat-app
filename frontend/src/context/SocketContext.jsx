import { createContext, useContext, useEffect, useMemo } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children, token }) => {
  const socket = useMemo(
    () =>
      io("http://localhost:8080", {
        autoConnect: false,
        auth: {
          token: `Bearer ${token}`,
        },
      }),
    [token]
  );

  useEffect(() => {
    socket.connect();
    socket.on("connection", (data) => {
      console.log("socket.io connected", data);
    });
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
