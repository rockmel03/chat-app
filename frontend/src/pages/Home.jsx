import { ChatList, SearchBar } from "../components";
import { useAuth } from "../context/AuthContext";
import { SocketProvider } from "../context/SocketContext";
import { Chat } from "../features/chat";

export const Home = () => {
  const { auth } = useAuth();

  return (
    <SocketProvider token={auth?.token}>
      <div className="w-full h-screen grid grid-cols-[minmax(0,350px)_1fr]">
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
              <ChatList />
            </div>
            <div className=" absolute bottom-4 right-4 p-4">
              <div
                title="New Chat"
                className="w-12 h-12 rounded-full bg-zinc-700 text-zinc-400 cursor-pointer grid place-items-center"
              >
                <span className="text-lg font-semibold">
                  <i className="ri-add-large-line"></i>
                </span>
              </div>
            </div>
          </div>
        </aside>
        <section className=" bg-zinc-200">
          <Chat />
        </section>
      </div>
    </SocketProvider>
  );
};
