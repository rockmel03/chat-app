import { useEffect, useState } from "react";
import { SearchBar } from "../../../components";
import useUserServices from "../../../api/useUserServices";
import useChatServices from "../../../api/useChatServices";
import { useNavigate } from "react-router-dom";

import UserList from "./UserList";
import ConfirmChatModal from "./ConfirmChatModal";
import ParticipantsList from "./ParticipantsList";

export const NewChatForm = () => {
  const [participants, setParticipants] = useState([]);
  const [isGroupChat, setIsGroupChat] = useState(false);
  const [chatname, setChatname] = useState("");

  const { searchUsers } = useUserServices();
  const [users, setUsers] = useState([]);

  const removeParticipant = (id) => {
    setParticipants((prev) => prev.filter((usr) => usr._id !== id));
  };

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

  const handleSelectClick = (user) => {
    setParticipants((prev) => {
      const isSelected = prev.some((usr) => usr._id === user._id);
      if (isSelected) {
        return isGroupChat ? prev.filter((usr) => usr._id !== user._id) : [];
      } else {
        return isGroupChat ? [...prev, user] : [user];
      }
    });
  };

  // If it's a one-on-one chat, immediately create a new chat whenever participant changes
  useEffect(() => {
    if (!isGroupChat && participants.length > 0) {
      handleCreateNewChat();
    }
  }, [participants]);

  const [showConfirmChatModal, setShowConfirmChatModal] = useState(false);

  const handleConfirmClick = () => {
    console.log({ isGroupChat, participants, chatname });
    if (!isGroupChat && chatname?.trim().length < 4) return;
    // create group chat
    handleCreateNewChat();
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
          <ParticipantsList
            participants={participants}
            removeParticipant={removeParticipant}
          />
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

        <UserList
          users={users}
          participants={participants}
          onUserClick={handleSelectClick}
          isGroupChat={isGroupChat}
        />

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
          <ConfirmChatModal
            chatname={chatname}
            setChatname={setChatname}
            participants={participants}
            removeParticipant={removeParticipant}
            onCancel={handleCancelClick}
            onConfirm={handleConfirmClick}
          />
        )}
      </div>
    </>
  );
};
