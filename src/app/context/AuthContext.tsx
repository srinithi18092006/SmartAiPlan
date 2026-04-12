import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('archint_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // Simulate async API call
    await new Promise((r) => setTimeout(r, 800));
    const mockUser: User = {
      email,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    };
    setUser(mockUser);
    localStorage.setItem('archint_user', JSON.stringify(mockUser));
    return true;
  }, []);

  const register = useCallback(async (email: string, _password: string, name: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 900));
    const mockUser: User = { email, name };
    setUser(mockUser);
    localStorage.setItem('archint_user', JSON.stringify(mockUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('archint_user');
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
