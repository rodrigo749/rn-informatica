import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Credenciais lidas do .env
const ADMIN_USER = import.meta.env.VITE_ADMIN_USER;
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem("rn_admin") === "true"
  );

  const login = (user: string, pass: string) => {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      sessionStorage.setItem("rn_admin", "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem("rn_admin");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
