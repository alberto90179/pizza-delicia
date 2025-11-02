import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loginState, setLoginState] = useState(false);
  const [loginData, setLoginData] = useState({});

  useEffect(() => {
    // Verifica si ya hay sesión guardada
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const getLogin = (email, password) => {
    const res = axios
      .post("https://service-pizzadelicia-v1.gulliferwd.com/api/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        setLoginData(res.data);
        setLoginState(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getLogout = async (token) => {
    try {
      const res = await axios.get(
        "https://service-pizzadelicia-v1.gulliferwd.com/api/logout",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setLoginState(false);
      setLoginData({});
    } catch (error) {
      console.error(error);
    }
  };

  const login = (email, password) => {
    getLogin(email, password);
    // Se comprueba si el servidor manda el estatus verdadero
    if (loginState === true) {
      const fakeUser = {
        email,
        name: "Administrador",
        token: loginData.token,
      };
      setUser(fakeUser);
      localStorage.setItem("user", JSON.stringify(fakeUser));
      return true;
    } else if (loginState === false) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    getLogout(loginData.token);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
