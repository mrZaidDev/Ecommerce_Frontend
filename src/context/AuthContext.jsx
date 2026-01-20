import React, { createContext, useEffect, useState } from "react";
export const AuthDataContext = createContext();
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_API } from "../config/api";

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();


  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${BASE_API}/users/login`,
        { email, password },
        { withCredentials: true },
      );
      setIsAuthenticated(true);
      setUser(response.data.user);
      setIsAdmin(response.data.user.role === "admin");
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };

  // const logout = async () => {
  //   try {
  //     await fetch("http://your-backend/api/users/logout", {
  //       method: "POST",
  //       credentials: "include",
  //     });
  //     setUser(null);
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //   }
  // };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(
        `${BASE_API}/users/register`,
        { name, email, password },
        { withCredentials: true },
      );
      setIsAuthenticated(true);
      setUser(response.data.user);
      setIsAdmin(response.data.user.role === "admin");
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${BASE_API}/users/verify`, {
          withCredentials: true,
        });
        setIsAuthenticated(true);
        setUser(response.data.user);
        setIsAdmin(response.data.user.role === "admin");
        navigate("/products");
      } catch (error) {
        console.log(error);
      }
    };
    checkAuth();
  }, []);

  return (
    <div>
      <AuthDataContext.Provider
        value={[isAuthenticated, isAdmin, user, login, register]}
      >
        {children}
      </AuthDataContext.Provider>
    </div>
  );
};

export default AuthContext;
