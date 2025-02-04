import React from "react";

export const ChatList = () => {
  return (
    <ul className="flex flex-col gap-2">
      {[...Array(8).keys()].map((item) => (
        <li
          key={item}
          className="px-2 py-2 rounded-md hover:bg-zinc-900 flex items-center justify-between cursor-pointer transition ease-linear duration-150"
        >
          <div className="flex gap-2 items-center">
            <div className="w-12 h-12 rounded-full bg-zinc-700"></div>
            <div>
              <h4 className="font-medium">
                rockmel{(item + 1).toString().padStart(2, "0")}
              </h4>
              <p className="opacity-50 text-sm">hello world</p>
            </div>
          </div>
          <div
            title="more"
            className="cursor-pointer w-8 h-8 rounded-full grid place-items-center"
          >
            <span className="font-medium">
              <i className="ri-more-2-fill"></i>
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};
