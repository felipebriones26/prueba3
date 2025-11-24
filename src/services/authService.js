// src/services/authService.js

const API_URL = 'http://localhost:8080/api/v1/auth';

export const authService = {
  
  // 1. Login conectado al Backend
  login: async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // Tu backend espera "username", asegúrate de enviarlo así
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Guardamos Token, Usuario y Rol
        localStorage.setItem('jwt_token', data.token);
        localStorage.setItem('usuario_actual', username);
        localStorage.setItem('user_role', data.role); // Importante para el menú de App.js
        
        return true;
      } else {
        return false; // Credenciales inválidas
      }
    } catch (error) {
      console.error("Error de conexión en login:", error);
      return false;
    }
  },

  // 2. Registro conectado al Backend
  register: async (nombre, correo, password) => {
    const usuarioRegistro = {
      username: correo, // Usamos el correo como username
      email: correo,
      password: password
    };

    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuarioRegistro)
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || 'Error al registrar usuario');
    }
    
    return await response.json();
  },

  // 3. Logout (Borra todo del navegador)
  logout: () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('usuario_actual');
    localStorage.removeItem('user_role');
    // Opcional: Redirigir aquí o dejar que App.js lo maneje
  },

  // 4. Obtener usuario actual (Para App.js)
  getCurrentUser: () => {
    // Devuelve el nombre de usuario si existe, o null si no
    return localStorage.getItem('usuario_actual');
  },

  // 5. Obtener Rol (Útil para componentes protegidos)
  getUserRole: () => {
    return localStorage.getItem('user_role');
  },
  
  // Método auxiliar para verificar si es Admin
  isAdmin: () => {
      return localStorage.getItem('user_role') === 'ADMINISTRADOR';
  }
};