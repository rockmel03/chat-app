import { useEffect, useState } from "react";
import { SearchBar } from "../components";
import { useAuth } from "../context/AuthContext";
import { SocketProvider } from "../context/SocketContext";
import { ChatList, NewChatForm } from "../features/chat";
import useChatServices from "../api/useChatServices";
import { Outlet } from "react-router-dom";

export const Home = () => {
  const { auth } = useAuth();
  const [chatList, setChatList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showNewChatDialog, setShowNewChatDialog] = useState(false);
  const { getChatList } = useChatServices();

  useEffect(() => {
    const fetchChats = async () => {
      setIsLoading(true);
      try {
        const response = await getChatList();
        if (response?.status) {
          setChatList(response?.data?.chats);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChats();
  }, []);

  return (
    <SocketProvider token={auth?.token}>
      <div className="w-full h-screen grid grid-cols-[minmax(0,350px)_1fr]">
        {showNewChatDialog && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowNewChatDialog(false);
            }}
            className="w-full h-full bg-zinc-800/70 fixed z-50 top-0 left-0 grid place-items-center backdrop-blur-md"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="p-5 bg-darkbg rounded-lg max-w-sm w-full"
            >
              <NewChatForm />
            </div>
          </div>
        )}{" "}
        <aside className="">
          <div className=" relative w-full h-full grid grid-rows-[10vh_10vh_80vh]">
            <div className="px-4 py-3 flex items-center justify-between">
              <h1 className="text-xl font-medium">Xhat</h1>
              <div className="cursor-pointer hover:bg-zinc-800 w-8 h-8 rounded-full grid place-items-center">
                <span className="font-medium text-lg">
                  <i className="ri-menu-3-fill"></i>
                </span>
              </div>
            </div>
            <div className="px-4">
              <SearchBar />
            </div>
            <div className="px-2 overflow-auto">
              {isLoading ? <p>Loading...</p> : <ChatList chatList={chatList} />}
            </div>
            <div className=" absolute bottom-4 right-4 p-4">
              <button
                title="New Chat"
                className="w-12 h-12 rounded-full bg-zinc-700 text-zinc-400 cursor-pointer grid place-items-center"
                onClick={() => setShowNewChatDialog(true)}
              >
                <span className="text-lg font-semibold">
                  <i className="ri-add-large-line"></i>
                </span>
              </button>
            </div>
          </div>
        </aside>
        <section className=" bg-zinc-200">
          <Outlet />
        </section>
      </div>
    </SocketProvider>
  );
};
