import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import axios from 'axios';

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('archint_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const { token, user: userData } = response.data;
      
      setUser(userData);
      localStorage.setItem('archint_token', token);
      localStorage.setItem('archint_user', JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Login Error:', error);
      return false;
    }
  }, []);

  const register = useCallback(async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_URL}/register`, { email, password, name });
      const { token, user: userData } = response.data;
      
      setUser(userData);
      localStorage.setItem('archint_token', token);
      localStorage.setItem('archint_user', JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Registration Error:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('archint_user');
    localStorage.removeItem('archint_token');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
