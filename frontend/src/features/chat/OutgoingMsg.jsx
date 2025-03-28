import { Message } from "./Message";
import PropTypes from "prop-types";

export const OutgoingMsg = ({ data }) => {
  return (
    <div className="ml-auto bg-lightbg w-fit rounded-md relative before:w-3 before:rotate-45 before:aspect-square before:bg-inherit before:absolute before:-right-1 before:top-2">
      <Message data={data} />
    </div>
  );
};

OutgoingMsg.propTypes = {
  data: PropTypes.object.isRequired,
};
