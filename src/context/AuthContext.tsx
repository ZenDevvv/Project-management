import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import UserService from "../api/userApi";

interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const token = Cookies.get("token");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const [role, setRole] = useState<string | null>(
    Cookies.get("userRole") || null
  );

  const clearAuth = () => {
    setIsAuthenticated(false);
    setRole(null);
    Cookies.remove("userRole");
    Cookies.remove("token");
    Cookies.remove("setIsAuthenticated");
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = Cookies.get("token");
      if (!token) return;

      try {
        const response = await UserService.checkLogin();
        setIsAuthenticated(true);
        setRole(response.user._doc.type);
        Cookies.set("userRole", response.user._doc.type, {
          expires: 1,
          path: "/",
        });
        Cookies.set("userId", response.user._doc._id, {
          expires: 1,
          path: "/",
        });
        Cookies.set("userId", response.user._doc._id, {
          expires: 1,
          path: "/",
        });
        Cookies.set("setIsAuthenticated", "true", {
          expires: 1,
          path: "/",
        });
      } catch (error) {
        console.error("Error checking login status:", error);
        clearAuth();
      }
    };

    checkLoginStatus();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await UserService.login({ email, password });
      setRole(response.user.type);
      setIsAuthenticated(true);
      Cookies.set("token", response.token, {
        expires: 1,
        path: "/",
      });
      Cookies.set("userRole", response.user.type, {
        expires: 1,
        path: "/",
      });
      Cookies.set("userId", response.user.id, {
        expires: 1,
        path: "/",
      });
    } catch (error) {
      clearAuth;
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    clearAuth();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
