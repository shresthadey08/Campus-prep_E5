import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../api/api";

const AuthContext = createContext(null);
const SESSION_KEY = "cp_session_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Preserve the logged-in user across a page refresh.
  useEffect(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = async ({ email, password, role }) => {
    const loggedInUser = await loginUser({ email, password, role });
    setUser(loggedInUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(loggedInUser));
    return loggedInUser;
  };

  const register = async ({ name, email, password, role }) => {
    const newUser = await registerUser({ name, email, password, role });
    const { password: _pw, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
    return safeUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
