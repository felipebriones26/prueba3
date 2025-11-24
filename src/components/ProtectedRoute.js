// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/authService';

function ProtectedRoute({ children }) {
  const currentUser = authService.getCurrentUser();

  if (!currentUser || currentUser !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;