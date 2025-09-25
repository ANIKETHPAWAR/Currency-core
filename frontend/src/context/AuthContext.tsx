/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext, type ReactNode, useCallback } from 'react';
import type { User } from '../types/user.interface';
import axiosInstance from '../api/axiosInstance';

interface AuthContextType {
      user: User | null;
      token: string | null;
      login: (token: string, user: User) => void;
      logout: () => void;
      isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
      const [user, setUser] = useState<User | null>(null);
      const [token, setToken] = useState<string | null>(null);
      const [isLoading, setIsLoading] = useState(true);

      const fetchUserData = useCallback(async () => {
            const storedToken = localStorage.getItem('accessToken');
            if (storedToken) {
                  try {
                        const response = await axiosInstance.get('/auth/getme');
                        const userData = response.data.data;
                        setToken(storedToken);
                        setUser(userData);
                        localStorage.setItem('user', JSON.stringify(userData));
                  } catch (error) {
                        console.error("Failed to fetch user data, logging out.", error);
                        logout();
                  }
            }
            setIsLoading(false);
      }, []);

      useEffect(() => {
            fetchUserData();
      }, [fetchUserData]);

      const login = (newToken: string, userData: User) => {
            setToken(newToken);
            setUser(userData);
            localStorage.setItem('accessToken', newToken);
            localStorage.setItem('user', JSON.stringify(userData));
      };

      const logout = () => {
            setToken(null);
            setUser(null);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
      };

      return (
            <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
                  {children}
            </AuthContext.Provider>
      );
};

export const useAuth = () => {
      const context = useContext(AuthContext);
      if (context === undefined) {
            throw new Error('useAuth must be used within an AuthProvider');
      }
      return context;
};