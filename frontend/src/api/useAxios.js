import { useEffect } from "react";
import apiInstance from "./axiosInstance";
import { useAuth } from "../context/AuthContext";

export default function useAxios() {
  const { auth } = useAuth();

  useEffect(() => {
    const requestInterseptor = apiInstance.interceptors.request.use(
      (request) => {
        if (!request.headers.Authorization && auth?.token) {
          request.headers.Authorization = `Bearer ${auth.token}`;
        }
        return request
      },
      (error) => error
    );

    const responseInterceptor = apiInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const oldReq = error.config;

        if (auth?.token && error.status === 401 && !error.isRetried) {
          error.isRetried = true;
          // todo: refresh the tokens
          return oldReq;
        }

        return Promise.reject(error.message);
      }
    );

    return () => {
      apiInstance.interceptors.request.eject(requestInterseptor);
      apiInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [auth]);

  return apiInstance;
}
