import { useAuth } from "../context/AuthContext";
import { useAuthServices } from "./useAuthServices";

export default function useRefreshTokens() {
  const { setAuth } = useAuth();
  const { refreshTokens } = useAuthServices();
  return async function refresh() {
    try {
      const data = await refreshTokens();
      if (data?.statusCode === 200) {
        const { accessToken, refreshToken } = data;
        setAuth((prev) => ({ ...prev, token: accessToken, ...data }));
        return { accessToken, refreshToken };
      }

      return null;
    } catch (error) {
      console.log("Failed to Refresh Auth Token", error);
      throw Error("Failed to Refresh Auth Token");
    }
  };
}
