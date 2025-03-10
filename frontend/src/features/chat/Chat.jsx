import { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../context/AuthContext";
import { ChatInput } from "./ChatInput";
import { IncomingMsg } from "./IncomingMsg";
import { OutgoingMsg } from "./OutgoingMsg";

export const Chat = () => {
  const { socket } = useSocket();
  const { auth } = useAuth();
  const [messageList, setMessageList] = useState([]);

  const sendMessage = (message) => {
    if (message.trim().lenght <= 0) return;
    console.log(message);
    socket.emit("message", { content: message });
  };

  useEffect(() => {
    const onMessage = (data) => {
      console.log(data);
      setMessageList((prev) => [...prev, data]);
    };

    socket.on("message", onMessage);

    return () => {
      socket.off("message", onMessage);
    };
  }, [socket]);
  return (
    <div className="w-full h-full max-h-screen flex flex-col justify-between ">
      <div className="bg-darkbg chat-header p-3 flex items-center justify-between">
        <div className="flex items-center gap-[0.5em]">
          <div className="w-10 h-10 rounded-full bg-zinc-200"></div>
          <div>
            <h3 className="text-sm">Chat Name</h3>
            <p className="text-xs">Offline</p>
          </div>
        </div>
        <button className="more">
          <i className="ri-more-2-line"></i>
        </button>
      </div>
      <div className="chat-content flex-1 px-4 py-2 overflow-auto flex flex-col gap-1 scroll-smooth">
        {/** all messages appear here */}
        {messageList.map((msgData, idx) => {
          const condition = auth.user?._id === msgData?.sender;
          return (
            <div key={idx} className="message ">
              {condition ? (
                <OutgoingMsg data={msgData} />
              ) : (
                <IncomingMsg data={msgData} />
              )}
            </div>
          );
        })}
      </div>
      <div className="chat-input pb-2 px-2">
        <ChatInput sendMessage={sendMessage} />
      </div>
    </div>
  );
};
