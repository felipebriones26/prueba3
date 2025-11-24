import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { productService } from '../../services/productService'; 

function ProductAdminPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error cargando lista de admin:", error);
    }
  };

  
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await productService.deleteProduct(id); 
        cargarProductos(); 
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
              {}
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