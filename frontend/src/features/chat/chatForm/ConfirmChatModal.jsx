import { useEffect, useRef } from "react";
import ListItem from "./ListItem";
import PropTypes from "prop-types";

const ConfirmChatModal = ({
  chatname,
  setChatname,
  participants,
  removeParticipant,
  onCancel,
  onConfirm,
}) => {
  const chatnameRef = useRef(null);

  useEffect(() => {
    if (chatname.trim().length > 4)
      chatnameRef.current.style.outline = "1px solid transparent";
    chatnameRef.current?.focus();
  }, [chatname]);

  return (
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
            <span className="inline-block rounded">{participants.length}</span>
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
                    onIconClick={() => removeParticipant(user._id)}
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
          onClick={onCancel}
          className="flex-1 px-4 py-2 text-sm font-semibold cursor-pointer bg-gray-500 hover:bg-gray-700 rounded"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 px-4 py-2 text-sm font-semibold cursor-pointer bg-green-500 hover:bg-green-700 rounded"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

ConfirmChatModal.propTypes = {
  chatname: PropTypes.string.isRequired,
  setChatname: PropTypes.func.isRequired,
  participants: PropTypes.array.isRequired,
  removeParticipant: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmChatModal;
