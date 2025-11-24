const API_URL = 'http://localhost:8080/api/v1';

export const productService = {

  getProducts: async () => {
    try {
      const response = await fetch(`${API_URL}/productos`);
      if (!response.ok) throw new Error('Error al cargar productos');
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  getCategories: async () => {
    try {
      const response = await fetch(`${API_URL}/categorias`);
      if (!response.ok) throw new Error('Error al cargar categorías');
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  createProduct: async (newProduct) => {
    const token = localStorage.getItem('jwt_token');
    if (!token) throw new Error('No estás autenticado');

    const response = await fetch(`${API_URL}/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newProduct)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error al crear producto');
    }
    return await response.json();
  },

  updateProduct: async (id, updatedProduct) => {
    const token = localStorage.getItem('jwt_token');
    if (!token) throw new Error('No estás autenticado');

    const response = await fetch(`${API_URL}/productos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedProduct)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error al actualizar producto');
    }
    return await response.json();
  },

  deleteProduct: async (id) => {
    const token = localStorage.getItem('jwt_token');
    if (!token) throw new Error('No estás autenticado');

    const response = await fetch(`${API_URL}/productos/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'No se pudo eliminar el producto.');
    }
    return true; 
  }
};