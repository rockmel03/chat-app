import PropTypes from "prop-types";

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

ListItem.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  showIcon: PropTypes.bool,
  iconElement: PropTypes.element,
  onIconClick: PropTypes.func,
};

export default ListItem;
