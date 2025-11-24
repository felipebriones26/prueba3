
const API_URL = 'http://localhost:8080/api/v1/auth';

export const authService = {
  
  login: async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        
        
        localStorage.setItem('jwt_token', data.token);
        localStorage.setItem('usuario_actual', username);
        localStorage.setItem('user_role', data.role); 
        
        return true;
      } else {
        return false; 
      }
    } catch (error) {
      console.error("Error de conexión en login:", error);
      return false;
    }
  },

  
  register: async (nombre, correo, password) => {
    const usuarioRegistro = {
      username: correo, 
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

  logout: () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('usuario_actual');
    localStorage.removeItem('user_role');
  },

  getCurrentUser: () => {
    
    return localStorage.getItem('usuario_actual');
  },

  getUserRole: () => {
    return localStorage.getItem('user_role');
  },
  
  isAdmin: () => {
      return localStorage.getItem('user_role') === 'ADMINISTRADOR';
  }
};