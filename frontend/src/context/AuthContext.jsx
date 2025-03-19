import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    if (auth?.token) {
      const decoded = jwtDecode(auth?.token);
      if (decoded) {
        setAuth((prev) => ({ ...prev, user: decoded }));
      }
    }
  }, [auth?.token]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
