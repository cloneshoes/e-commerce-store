import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Create context for authentication
const AuthContext = createContext();

// Authentication provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store the user information (null means not logged in)
  const [redirectPath, setRedirectPath] = useState('/'); // Store the redirect path
  const navigate = useNavigate();

  // Check if the user is authenticated
  const isAuthenticated = user !== null;

  // Sign up function (simulated with mock data)
  const signUp = (email, password) => {
    if (email === 'test@example.com' && password === 'password123') {
      setUser({ email });
      return true;
    }
    return false;
  };

  // Login function
  const login = (email, password) => {
    if (email === 'test@example.com' && password === 'password123') {
      setUser({ email });
      navigate(redirectPath); // Redirect user to the previously stored path after login
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    navigate('/login'); // Redirect to login page after logout
  };

  // Handle redirect if the user is trying to access a protected page
  const handleAuthRedirect = (path) => {
    if (!isAuthenticated) {
      setRedirectPath(path); // Store the current path before redirecting to login
      navigate('/login'); // Redirect to login page
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signUp, login, logout, handleAuthRedirect }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
