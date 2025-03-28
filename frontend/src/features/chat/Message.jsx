import PropTypes from "prop-types";
export const Message = ({ data }) => {
  const date = new Date(data?.createdAt);
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="px-3 py-2 z-[1] relative leading-[1.2] flex flex-wrap gap-x-4 items-end">
      <pre className="font-sans text-sm">{data?.content}</pre>
      <div className="text-end">
        <span className="text-xs font-light ">{time.toLowerCase()}</span>
      </div>
    </div>
  );
};

Message.propTypes = {
  data: PropTypes.object.isRequired,
};
