import PropTypes from "prop-types";

const ParticipantsList = ({ participants, removeParticipant }) => {
  return (
    <div>
      {participants.map((user) => (
        <div
          key={user._id}
          className="inline-flex gap-1 items-center  bg-white/10 mr-1 px-1 rounded"
        >
          <span className="text-xs font-semibold">{user.username}</span>
          <button
            className="cursor-pointer"
            onClick={() => removeParticipant(user._id)}
          >
            <span className="text-red-500">
              <i className="ri-close-circle-line"></i>
            </span>
          </button>
        </div>
      ))}
    </div>
  );
};

ParticipantsList.propTypes = {
  participants: PropTypes.array.isRequired,
  removeParticipant: PropTypes.func.isRequired,
};

export default ParticipantsList;
