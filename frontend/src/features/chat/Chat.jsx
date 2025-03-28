import { useEffect, useRef, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../context/AuthContext";
import { ChatInput } from "./ChatInput";
import { IncomingMsg } from "./IncomingMsg";
import { OutgoingMsg } from "./OutgoingMsg";
import { useParams } from "react-router-dom";
import useChatServices from "../../api/useChatServices";

export const Chat = () => {
  const [messageList, setMessageList] = useState([]);
  const [chatData, setChatData] = useState(null);
  const { chatId } = useParams();
  const { socket } = useSocket();
  const { auth } = useAuth();
  const { getChatById } = useChatServices();

  const messageListRef = useRef(null);

  const sendMessage = (message) => {
    if (message.trim().lenght <= 0) return;
    console.log(message);
    socket.emit("message", { content: message, chatId });
  };

  useEffect(() => {
    console.log("chatId: ", chatId);
    const fetchChat = async () => {
      try {
        const response = await getChatById(chatId);
        if (response?.status) {
          console.log("chatData: ", response?.data);
          setChatData(response?.data);
          setMessageList(response?.data?.messages);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (chatId) {
      fetchChat().then(() => {
        socket.emit("join-chat", { chatId });
      });
    }

    return () => {
      socket.emit("leave-chat", { chatId });
    };
  }, [chatId, socket]);

  useEffect(() => {
    // scroll to bottom
    messageListRef.current?.scrollTo({
      top: messageListRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messageList]);

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

  if (!chatData)
    return (
      <div className="w-full h-full grid place-items-center">
        <p className="text-zinc-500">NO CHAT FOND</p>
      </div>
    );

  const chatname = chatData?.isGroupChat
    ? chatData.chatName
    : chatData?.participants.filter((u) => u._id !== auth?.user?._id)[0]
        ?.username;

  return (
    <div className="w-full h-full max-h-screen flex flex-col justify-between ">
      <div className="bg-darkbg chat-header p-3 flex items-center justify-between">
        <div className="flex items-center gap-[0.5em]">
          <div className="w-10 h-10 rounded-full bg-zinc-200"></div>
          <div>
            <h3 className="text-sm">{chatname}</h3>
            <p className="text-xs">Offline</p>
          </div>
        </div>
        <button className="more">
          <i className="ri-more-2-line"></i>
        </button>
      </div>
      <div
        ref={messageListRef}
        className="chat-content flex-1 px-4 py-2 overflow-auto flex flex-col gap-1 scroll-smooth"
      >
        {/** all messages appear here */}
        {messageList.map((msgData, idx) => {
          const condition = auth.user?._id === msgData?.sender?._id;
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
