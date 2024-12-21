import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // Use the authentication context

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/login" />;
  }

  // Render children if authenticated
  return children;
}

export default ProtectedRoute;
