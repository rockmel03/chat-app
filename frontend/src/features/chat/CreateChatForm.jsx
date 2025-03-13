import { useState } from "react";
import useUserServices from "../../api/useUserServices";
import { SearchBar } from "../../components";

export const CreateChatForm = () => {
  const [users, setUsers] = useState([]);
  const { searchUsers } = useUserServices();
  const [selectedIds, setSelectedIds] = useState([]);

  const onInputChange = async (query) => {
    try {
      const response = await searchUsers(query);
      if (response.status) setUsers(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form className="flex flex-col gap-2">
      <h2 className="text-center text-xl font-semibold">Create Chat </h2>
      <SearchBar
        placeholder="Search Participant"
        onChangeHandler={onInputChange}
      />

      <div className="flex gap-2 items-center p-2 hover:bg-white/10 rounded-md">
        <div className="w-8 h-8 rounded-full border grid place-items-center">
          <i className="ri-group-fill"></i>
        </div>
        <p className="font-semibold text-sm">New Group</p>
      </div>
      <hr />
      <div className="max-h-30 overflow-auto">
        {users.length > 0 &&
          users.map((user) => (
            <label
              htmlFor={user._id}
              key={user._id}
              className="flex gap-2 items-center justify-between p-2 hover:bg-white/10 rounded-md"
            >
              <div className="flex gap-2 items-center ">
                <div className="w-8 h-8 rounded-full border grid place-items-center">
                  <i className="ri-user-fill"></i>
                </div>
                <p className="font-semibold text-sm flex flex-col leading-[1.1]">
                  <span>{user.username}</span>
                  <span className="opacity-70">{user.email}</span>
                </p>
              </div>
              <div>
                <input
                  type="checkbox"
                  id={user._id}
                  checked={selectedIds.includes(user._id)}
                  onChange={(e) => {
                    if (e.target.checked)
                      setSelectedIds((prev) => [...prev, user._id]);
                    else
                      setSelectedIds((prev) =>
                        prev.filter((id) => id !== user._id)
                      );
                  }}
                  className="w-4 h-4"
                />
              </div>
            </label>
          ))}
      </div>
      <button
        type="submit"
        className="px-2 py-2 bg-blue-800 hover:bg-blue-700 rounded"
      >
        Create
      </button>
    </form>
  );
};
