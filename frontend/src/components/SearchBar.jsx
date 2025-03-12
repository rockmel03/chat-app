import React from "react";

export const SearchBar = ({ placeholder }) => {
  return (
    <div className="w-full rounded-full bg-zinc-700 text-white">
      <input
        type="search"
        name="search"
        id="search"
        placeholder={placeholder || "Search here"}
        autoComplete="off"
        className="px-4 py-2 w-full rounded-full outline-none"
      />
    </div>
  );
};
