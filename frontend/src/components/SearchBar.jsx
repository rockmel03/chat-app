import { useEffect, useState } from "react";

export const SearchBar = ({ placeholder, onChangeHandler }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    const timeOut = setTimeout(() => {
      onChangeHandler(input);
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [input]);

  return (
    <div className="w-full rounded-full bg-zinc-700 text-white">
      <input
        type="search"
        name="search"
        id="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder || "Search here"}
        autoComplete="off"
        className="px-4 py-2 w-full rounded-full outline-none"
      />
    </div>
  );
};
