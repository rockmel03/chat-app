import { useAuth } from "../../../context/AuthContext";
import ListItem from "./ListItem";
import PropTypes from "prop-types";

const UserList = ({ users, participants, onUserClick, isGroupChat }) => {
  const { auth } = useAuth();
  return (
    <div className="h-30 overflow-auto">
      {users.length > 0 ? (
        users.map((user) => {
          if (user._id === auth.user?._id) return;

          const { _id: id, username, email } = user;
          const isSelected = participants.some((usr) => usr._id === user._id);
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
              onClick={() => onUserClick(user)}
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
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  participants: PropTypes.array.isRequired,
  onUserClick: PropTypes.func.isRequired,
  isGroupChat: PropTypes.bool,
};

export default UserList;
