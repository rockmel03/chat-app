import apiInstance from "./axiosInstance";
import useAxios from "./useAxios";

export const useAuthServices = () => {
  const axiosPrivate = useAxios();

  const registerUser = async function ({ username, email, password }) {
    try {
      const response = await apiInstance.post("/users/register", {
        username,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Registration Failed: ", error);
      throw new Error(
        error.response?.data?.message || error?.message || "Registration Failed"
      );
    }
  };

  const loginUser = async function ({ user, password }) {
    try {
      const response = await apiInstance.post("/users/login", {
        user,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Login Failed: ", error);
      throw new Error(
        error.response?.data?.message || error?.message || "Login Failed"
      );
    }
  };

  const logoutUser = async function () {
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

  const refreshTokens = async function () {
    try {
      const response = await axiosPrivate.get("/users/refresh");
      return response.data;
    } catch (error) {
      console.error("Failed to refresh token : ", error);
      throw new Error(
        error.response?.data?.message ||
          error?.message ||
          "Failed to refresh token"
      );
    }
  };

  return { registerUser, loginUser, logoutUser, refreshTokens };
};
