import { useEffect, useRef, useState } from "react";
import { SearchBar } from "../../../components";
import useUserServices from "../../../api/useUserServices";
import useChatServices from "../../../api/useChatServices";
import { useNavigate } from "react-router-dom";

const ListItem = ({
  username,
  email,
  onClick,
  showIcon,
  iconElement,
  onIconClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex gap-2 items-center justify-between p-2 hover:bg-white/10 rounded-md"
    >
      <div className="flex gap-2 items-center ">
        <div className="w-8 h-8 rounded-full border grid place-items-center">
          <i className="ri-user-fill"></i>
        </div>
        <p className="font-semibold text-sm flex flex-col leading-[1.1]">
          <span>{username}</span>
          <span className="opacity-70">{email}</span>
        </p>
      </div>

      {showIcon && (
        <div onClick={onIconClick} className="text-lg cursor-pointer">
          <span className="">{iconElement ? iconElement : ""}</span>
        </div>
      )}
    </div>
  );
};

export const NewChatForm = () => {
  const [participants, setParticipants] = useState([]);
  const [isGroupChat, setIsGroupChat] = useState(false);
  const [chatname, setChatname] = useState("");

  const { searchUsers } = useUserServices();
  const [users, setUsers] = useState([]);

  const handleSearchInputChange = async (query) => {
    try {
      const response = await searchUsers(query);
      if (response.status) setUsers(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const { createChat } = useChatServices();
  const navigate = useNavigate();

  const handleCreateNewChat = async () => {
    const members = participants.map((usr) => usr._id);
    try {
      const response = await createChat(members, isGroupChat, chatname);
      if (response.status) {
        console.log("chat created successfully", response);
        navigate(`/chat/${response.data._id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [showConfirmChatModal, setShowConfirmChatModal] = useState(false);
  const chatnameRef = useRef(null);

  useEffect(() => {
    if (chatname.trim().length > 4)
      chatnameRef.current.style.outline = "1px solid transparent";
    chatnameRef.current?.focus();
  }, [chatname]);

  const handleConfirmClick = () => {
    console.log({ isGroupChat, participants, chatname });
  };

  const handleCancelClick = () => {
    setShowConfirmChatModal(false);
    setIsGroupChat(false);
    setParticipants([]);
  };

  return (
    <>
      <div className="relative flex flex-col gap-1">
        {isGroupChat && (
          <button
            type="button"
            onClick={handleCancelClick}
            className="absolute"
          >
            <i className="ri-arrow-left-line ri-lg"></i>
          </button>
        )}
        <h2 className="text-xl font-semibold capitalize text-center pb-2">
          Create New Chat
        </h2>
        <SearchBar
          placeholder={"Search Participants..."}
          onChangeHandler={handleSearchInputChange}
        />
        {isGroupChat ? (
          <div>
            {participants.map((user) => (
              <div
                key={user._id}
                className="inline-flex gap-1 items-center  bg-white/10 mr-1 px-1 rounded"
              >
                <span className="text-xs font-semibold">{user.username}</span>
                <button
                  className="cursor-pointer"
                  onClick={() =>
                    setParticipants((prev) =>
                      prev.filter((usr) => usr._id !== user._id)
                    )
                  }
                >
                  <span className="text-red-500">
                    <i className="ri-close-circle-line"></i>
                  </span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setIsGroupChat(true)}
              className="flex gap-2 items-center p-2 hover:bg-white/10 rounded-md"
            >
              <div className="w-8 h-8 rounded-full border grid place-items-center">
                <i className="ri-group-fill"></i>
              </div>
              <p className="font-semibold text-sm">New Group</p>
            </button>
            <hr />
          </>
        )}

        <div className="h-30 overflow-auto">
          {users.length > 0 ? (
            users.map((user) => {
              const { _id: id, username, email } = user;

              const isSelected = participants.some(
                (usr) => usr._id === user._id
              );

              const handleSelectClick = () => {
                setParticipants((prev) =>
                  prev.some((usr) => usr._id === user._id)
                    ? isGroupChat
                      ? prev.filter((usr) => usr._id !== user._id)
                      : []
                    : isGroupChat
                    ? [...prev, user]
                    : [user]
                );

                // create new chat, if 1 to 1 chat
                if (!isGroupChat) handleCreateNewChat();
              };

              const iconElement = isSelected ? (
                <i className="ri-checkbox-circle-fill text-green-500"></i>
              ) : (
                <i className="ri-add-circle-fill"></i>
              );

              return (
                <ListItem
                  key={id}
                  username={username}
                  email={email}
                  showIcon={isGroupChat}
                  iconElement={iconElement}
                  onClick={handleSelectClick}
                />
              );
            })
          ) : (
            <div className="w-full h-full grid place-items-center">
              <p className="text-center text-xs font-semibold opacity-50">
                No Participants found
              </p>
            </div>
          )}
        </div>
        {isGroupChat && (
          <button
            type="button"
            disabled={participants.length <= 0}
            onClick={() => setShowConfirmChatModal(true)}
            className="px-2 py-2 bg-blue-800 hover:bg-blue-700 rounded disabled:cursor-not-allowed"
          >
            Next
          </button>
        )}
        {showConfirmChatModal && (
          <div className="absolute top-0 left-0 w-full h-full bg-darkbg flex flex-col justify-between gap-1">
            <div>
              <input
                type="text"
                name="chatname"
                id="chatname"
                className="w-full px-2 py-2 rounded bg-white/10 border-none"
                placeholder="Group name"
                autoComplete="off"
                ref={chatnameRef}
                value={chatname}
                onChange={(e) => setChatname(e.target.value)}
              />
              <div>
                <h3 className="text-sm font-semibold opacity-50 py-2">
                  Participants{" "}
                  <span className="inline-block rounded">
                    {participants.length}
                  </span>
                </h3>
                <hr className="opacity-50 py-1" />

                <div className="max-h-40 overflow-auto">
                  {participants.length > 0 ? (
                    participants.map((user) => {
                      return (
                        <ListItem
                          key={user._id}
                          username={user.username}
                          email={user.email}
                          showIcon={true}
                          iconElement={<i className="ri-close-circle-fill"></i>}
                          onIconClick={() =>
                            setParticipants((prev) =>
                              prev.filter((usr) => usr._id !== user._id)
                            )
                          }
                        />
                      );
                    })
                  ) : (
                    <p className="text-center text-xs font-semibold opacity-50">
                      No Participants found
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 ">
              <button
                onClick={handleCancelClick}
                className="flex-1 px-4 py-2 text-sm font-semibold cursor-pointer bg-gray-500 hover:bg-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmClick}
                className="flex-1 px-4 py-2 text-sm font-semibold cursor-pointer bg-green-500 hover:bg-green-700 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
