import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';

// Mock user data - in a real app, this would be fetched from an API
const mockUsers = [
  {
    id: "u1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: 'admin' as const
  },
  {
    id: "u2",
    name: "Regular User",
    email: "user@example.com",
    password: "user123",
    role: 'user' as const
  }
];

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null
  });

  useEffect(() => {
    // Check if user is stored in localStorage (for persistence)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser) as User;
        setAuthState({
          user,
          isAuthenticated: true,
          loading: false,
          error: null
        });
      } catch (error) {
        localStorage.removeItem('user');
        setAuthState({
          user: null,
          isAuthenticated: false,
          loading: false,
          error: null
        });
      }
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      // Find user with matching credentials
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      // Create user object without password
      const authenticatedUser: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      };
      
      // Store user in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
      
      setAuthState({
        user: authenticatedUser,
        isAuthenticated: true,
        loading: false,
        error: null
      });
    } catch (error) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      });
    }
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      // Check if user already exists
      if (mockUsers.some(u => u.email === email)) {
        throw new Error('User with this email already exists');
      }
      
      // In a real app, this would be an API call to create a new user
      // For this mock version, we'll just pretend it worked
      const newUser: User = {
        id: `u${mockUsers.length + 1}`,
        name,
        email,
        role: 'user'
      };
      
      // Store user in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(newUser));
      
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        loading: false,
        error: null
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      }));
    }
  };

  const logout = (): void => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null
    });
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};