import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, LoginCredentials } from '../types/auth';
import { api } from '../services/api';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => {
    // Recupera o estado de autenticação do localStorage
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      return JSON.parse(savedAuth);
    }
    return {
      isAuthenticated: false,
      user: null,
    };
  });

  // Persiste o estado de autenticação no localStorage
  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  const login = async (credentials: LoginCredentials) => {
    // Check admin credentials first
    if (credentials.email === 'admin@admin.com' && credentials.password === 'admin') {
      const authState = {
        isAuthenticated: true,
        user: { 
          id: 'admin',
          email: credentials.email, 
          role: 'admin' 
        },
      };
      setAuth(authState);
      return true;
    }

    // Check registered users
    try {
      const user = await api.auth.validateCredentials(credentials.email, credentials.password);
      if (user) {
        const authState = {
          isAuthenticated: true,
          user: {
            id: user.id || user.email,
            email: user.email,
            name: user.name,
            role: user.role
          },
        };
        setAuth(authState);
        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    return false;
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}