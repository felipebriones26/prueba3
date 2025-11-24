// src/pages/admin/ProductAdminPage.js
import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// Asegúrate de que productService ya tenga el código nuevo con fetch que te di antes
import { productService } from '../../services/productService'; 

function ProductAdminPage() {
  const [products, setProducts] = useState([]);

  // --- 1. CARGA DE DATOS ASÍNCRONA ---
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      // Ahora getProducts devuelve una Promesa, hay que esperar (await)
      const data = await productService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error cargando lista de admin:", error);
    }
  };

  // --- 2. ELIMINAR CONECTADO AL BACKEND ---
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await productService.deleteProduct(id); // Llamada al API DELETE
        cargarProductos(); // Recargar la tabla para ver el cambio
      } catch (error) {
        alert("Error al eliminar: " + error.message);
      }
    }
  };

  return (
    <div>
      <h1>Gestión de Productos (Admin)</h1>
      <Button as={Link} to="/admin/productos/nuevo" variant="success" className="mb-3">
        + Crear Nuevo Producto
      </Button>
      
      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              {/* CORRECCIÓN: Accedemos a p.categoria.nombre con seguridad (?) */}
              <td>{p.categoria?.nombre || 'Sin Categoría'}</td>
              <td>${p.precio.toLocaleString('es-CL')}</td>
              <td>
                <Button as={Link} to={`/admin/productos/editar/${p.id}`} variant="warning" className="me-2">
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(p.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductAdminPage;