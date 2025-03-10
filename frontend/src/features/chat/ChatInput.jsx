import { useState } from "react";

export const ChatInput = ({ sendMessage }) => {
  const [message, setMessage] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };
  return (
    <form
      onSubmit={submitHandler}
      className="px-2 bg-white text-black shadow-2xl rounded-full flex gap-2"
    >
      <textarea
        type="text"
        name="message"
        id="message"
        rows="1"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border-none outline-none bg-transparent p-2 resize-none text-inherit flex-1"
      ></textarea>
      <button
        disabled={!message.trim().length}
        type="submit"
        className="text-inherit text-2xl disabled:opacity-80 disabled:cursor-not-allowed"
      >
        <i className="ri-send-plane-2-fill"></i>
      </button>
    </form>
  );
};
