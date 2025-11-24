// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/authService';

function ProtectedRoute({ children }) {
  // Ahora esto devuelve un STRING (ej: "admin"), no un objeto.
  const currentUser = authService.getCurrentUser();

  // 1. Verificamos si existe usuario.
  // 2. Verificamos si el usuario es EXACTAMENTE "admin".
  // (Esto cumple con el rol de Administrador que tiene acceso total)
  if (!currentUser || currentUser !== 'admin') {
    // Si es cliente o vendedor (o no está logueado), lo mandamos fuera
    return <Navigate to="/" />;
  }

  // Si es admin, lo dejamos pasar
  return children;
}

export default ProtectedRoute;