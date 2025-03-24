import useAxios from "./useAxios";

export default function useChatServices() {
  const axiosPrivate = useAxios();

  const createChat = async (
    participants = [],
    isGroupChat = false,
    chatName = ""
  ) => {
    try {
      const response = await axiosPrivate.post("/chats", {
        participants,
        isGroupChat,
        chatName,
      });
      return response?.data;
    } catch (err) {
      console.error("Failed to crate chat", err);
      throw new Error("Failed to crate chat");
    }
  };

  const getChatList = async (page, limit) => {
    const query = new URLSearchParams();
    query.set("page", page || 1);
    query.set("limit", limit || 10);

    try {
      const response = await axiosPrivate.get(`/chats/?${query.toString()}`);
      return response?.data;
    } catch (err) {
      console.error("Failed to get chat list", err);
      throw new Error("Failed to get chat list");
    }
  };

  const getChatById = async (chatId) => {
    try {
      const response = await axiosPrivate.get(`/chats/${chatId}`);
      return response?.data;
    } catch (error) {
      console.error("Failed to get Chat", error);
      throw new Error("Failed to get Chat");
    }
  };

  const addParticipant = async (chatId, participantId) => {
    try {
      const response = await axiosPrivate.patch(
        `/chats/${chatId}/paticipants`,
        {
          paticipant: participantId,
        }
      );

      return response.data;
    } catch (err) {
      console.error("Failed to add participant", err);
      throw new Error("Failed to add participant");
    }
  };

  const removeParticipant = async (chatId, participantId) => {
    try {
      const response = await axiosPrivate.delete(
        `/chats/${chatId}/paticipants`,
        {
          paticipant: participantId,
        }
      );

      return response?.data;
    } catch (err) {
      console.error("Failed to remove participant", err);
      throw new Error("Failed to remove participant");
    }
  };

  const deleteChat = async (chatId) => {
    try {
      const response = await axiosPrivate.delete(`/chats/${chatId}`);

      return response?.data;
    } catch (err) {
      console.error("Failed to delete chat", err);
      throw new Error("Failed to delete chat");
    }
  };

  return {
    createChat,
    getChatList,
    getChatById,
    addParticipant,
    removeParticipant,
    deleteChat,
  };
}
