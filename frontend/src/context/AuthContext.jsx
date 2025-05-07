import { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

// Create authentication context
export const AuthContext = createContext();

/**
 * AuthProvider component to manage authentication state
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get('/auth/profile');
        setUser(data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    setUser(data);
  };

  // Register function
  const register = async (username, email, password) => {
    const { data } = await api.post('/auth/register', { username, email, password });
    setUser(data);
  };

  // Logout function
  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};