import useAxios from "./useAxios";

export default function useUserServices() {
  const axiosPrivate = useAxios();

  const searchUsers = async (query) => {
    try {
      const response = await axiosPrivate.get(`/users/?search=${query}`);
      return response.data;
    } catch (err) {
      console.log("Failed to search users", err);
      throw new Error("Failed to search users");
    }
  };

  return { searchUsers };
}
