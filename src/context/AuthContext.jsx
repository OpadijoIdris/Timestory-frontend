import { createContext, useState, useContext, useEffect } from "react";
import api from "../api/axios";
import { loginUser, registerUser, logoutUser } from "../api/auth.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      }
    };

    getUser();
  }, []);

  const login = async (data) => {
    setLoading(true);
    const res = await loginUser(data);
    setUser(res.user);
    setLoading(false);
    return res;
  };

  const register = async (data) => {
    setLoading(true);
    const res = await registerUser(data);
    setUser(res.user);
    setLoading(false);
    return res;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);