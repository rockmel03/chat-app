import { useEffect } from "react";
import apiInstance from "./axiosInstance";
import { useAuth } from "../context/AuthContext";
import useRefreshTokens from "./useRefreshTokens";

export default function useAxios() {
  const { auth } = useAuth();
  const refresh = useRefreshTokens();

  useEffect(() => {
    const requestInterseptor = apiInstance.interceptors.request.use(
      (request) => {
        if (!request.headers.Authorization && auth?.token) {
          request.headers.Authorization = `Bearer ${auth.token}`;
        }
        return request;
      },
      (error) => error
    );

    const responseInterceptor = apiInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const oldReq = error.config;

        if (auth?.token && error.status === 401 && !error.isRetried) {
          error.isRetried = true;
          const { accessToken } = await refresh();
          oldReq.headers.Authorization = `Bearer ${accessToken}`;
          return apiInstance(oldReq); // retry request
        }

        return Promise.reject(error.response.data); // Return the actual error response;
      }
    );

    return () => {
      apiInstance.interceptors.request.eject(requestInterseptor);
      apiInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [auth]);

  return apiInstance;
}
