import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const ChatList = ({ chatList }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  return (
    <ul className="flex flex-col gap-2">
      {chatList.length > 0 ? (
        chatList.map((chat) => {
          const friend = chat.participants.filter(
            (usr) => usr._id !== auth.user._id
          );
          const title = chat.isGroupChat ? chat.chatName : friend[0]?.username;
          const lastMessage = chat.lastMessage?.content;
          const date = new Date(chat.createdAt).toDateString();
          return (
            <li
              key={chat._id}
              onClick={() => navigate(`/chat/${chat._id}`)}
              className="px-2 py-2 rounded-md hover:bg-zinc-900 flex items-center justify-between cursor-pointer transition ease-linear duration-150"
            >
              <div className="flex gap-2 items-center">
                <div className="w-12 h-12 rounded-full bg-zinc-700"></div>
                <div>
                  <h4 className="font-medium">{title}</h4>
                  <p className="opacity-50 text-sm">
                    {lastMessage || <>&nbsp;</>}
                  </p>
                </div>
              </div>
              <div className="flex gap-0.5">
                <p className="text-xs opacity-50">{date}</p>
              </div>
            </li>
          );
        })
      ) : (
        <p className="text-center text-sm font-medium">No Chats Found</p>
      )}
    </ul>
  );
};

ChatList.propTypes = {
  chatList: PropTypes.array.isRequired,
};
