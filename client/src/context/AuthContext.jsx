import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // if token exists but no user, fetch profile
    if (token && !user) {
      fetchProfile();
    }
    // eslint-disable-next-line
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users/me");
      setUser(res.data.data || res.data);
      localStorage.setItem("user", JSON.stringify(res.data.data || res.data));
    } catch (err) {
      console.warn("Failed to fetch profile", err?.response?.data || err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = (userObj, jwt) => {
    setUser(userObj);
    setToken(jwt);
    localStorage.setItem("token", jwt);
    localStorage.setItem("user", JSON.stringify(userObj));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, logout, fetchProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
