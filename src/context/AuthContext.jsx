import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load từ localStorage khi refresh
  useEffect(() => {
    const storedData = localStorage.getItem("auth");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setUser(parsed.user);
        setToken(parsed.token);
      } catch (err) {
        console.error("Lỗi khi parse auth:", err);
        localStorage.removeItem("auth");
      }
    }
  }, []);

  // ✅ login nhận { user, token }
  const login = (data) => {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("auth", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
