import useAxios from "./useAxios";

export default function useLogout() {
  const axiosPrivate = useAxios();

  return async function logout() {
    try {
      const response = await axiosPrivate.get("/users/logout");
      return response.data;
    } catch (error) {
      console.error("Logout Failed: ", error);
      throw new Error(
        error.response?.data?.message || error?.message || "Logout Failed"
      );
    }
  };
}
