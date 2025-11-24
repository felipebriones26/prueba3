const BASE_URL = 'http://localhost:8080/api/v1';

export const loginUser = async (username, password) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) throw new Error('Error en el login');

    const data = await response.json();
    return data; 
};

export const getProducts = async () => {
    const response = await fetch(`${BASE_URL}/productos`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error al cargar productos');
    return await response.json();
};

export const getVentas = async () => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(`${BASE_URL}/boletas`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    if (!response.ok) return []; 
    return await response.json();
};


export const createSale = async (cartItems) => {
    const token = localStorage.getItem('jwt_token');
    if (!token) throw new Error('Debes iniciar sesión para comprar.');

    const itemsFormateados = cartItems.map(item => ({
        productoId: item.id,
        cantidad: item.cantidad || 1 
    }));

    const payload = { items: itemsFormateados };

    const response = await fetch(`${BASE_URL}/boletas`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error al procesar la compra');
    }
    
    return await response.json();
};

export const getCategories = async () => {
    const response = await fetch(`${BASE_URL}/categorias`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error al cargar categorías');
    return await response.json();
};