import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import useRefreshTokens from "../../api/useRefreshTokens";

export const PersistLogin = () => {
  const [persist] = useLocalStorage("persist", false);
  const [isLoading, setIsLoading] = useState(true);

  const { auth } = useAuth();
  const refresh = useRefreshTokens();

  useEffect(() => {
    let isMounted = true;
    const refreshAuth = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    if (!auth?.token && JSON.parse(localStorage.getItem("isLoggedIn"))) {
      refreshAuth();
    } else {
      setIsLoading(false);
    }

    // clean up
    return () => {
      isMounted = false;
    };
  }, [refresh, auth?.token]);

  return !persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />;
};
