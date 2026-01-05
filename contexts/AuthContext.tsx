import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthAPI } from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token === 'admin-authenticated-token') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, pass: string): Promise<boolean> => {
    try {
      const isValid = await AuthAPI.login(username, pass);
      if (isValid) {
        localStorage.setItem('adminToken', 'admin-authenticated-token');
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login Check Failed", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};