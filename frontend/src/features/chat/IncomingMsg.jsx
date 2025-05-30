import { Message } from "./Message";
import PropTypes from "prop-types";

export const IncomingMsg = ({ data }) => {
  return (
    <div className="bg-lightbg w-fit rounded-md relative before:w-3 before:rotate-45 before:aspect-square before:bg-inherit before:absolute before:-left-1 before:top-2">
      <Message data={data} />
    </div>
  );
};

IncomingMsg.propTypes = {
  data: PropTypes.object.isRequired,
};
