export const Message = ({ message }) => {
  return (
    <div className="px-3 py-2 z-[1] relative leading-[1.2] flex flex-wrap gap-x-4 items-end">
      <pre className="font-sans text-sm">{message?.content}</pre>
      <div className="text-end">
        <span className="text-xs font-light ">1:20 pm</span>
      </div>
    </div>
  );
};
