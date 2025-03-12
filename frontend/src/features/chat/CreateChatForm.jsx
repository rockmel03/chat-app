import { SearchBar } from "../../components";

export const CreateChatForm = () => {
  return (
    <form className="flex flex-col gap-2">
      <h2 className="text-center text-xl font-semibold">Create Chat </h2>
      <SearchBar placeholder="Search Participant" />

      <div className="flex gap-2 items-center p-2 hover:bg-white/10 rounded-md">
        <div className="w-8 h-8 rounded-full border grid place-items-center">
          <i className="ri-group-fill"></i>
        </div>
        <p className="font-semibold text-sm">New Group</p>
      </div>
      <hr />
      <ul>
        <li className="flex gap-2 items-center justify-between p-2 hover:bg-white/10 rounded-md">
          <div className="flex gap-2 items-center ">
            <div className="w-8 h-8 rounded-full border grid place-items-center">
              <i className="ri-user-fill"></i>
            </div>
            <p className="font-semibold text-sm flex flex-col leading-none">
              <span>@rockmel03</span>
              <span className="opacity-70">rockmel@test.com</span>
            </p>
          </div>
          <div>
            <input type="checkbox" className="w-4 h-4" />
          </div>
        </li>
      </ul>
      <button
        type="submit"
        className="px-2 py-2 bg-blue-800 hover:bg-blue-700 rounded"
      >
        Create
      </button>
    </form>
  );
};
