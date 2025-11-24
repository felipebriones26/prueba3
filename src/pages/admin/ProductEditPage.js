import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { productService } from '../../services/productService';

function ProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    imagen: '',
    fabricante: '',
    categoriaId: '' 
  });

  const [categories, setCategories] = useState([]); 
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const cats = await productService.getCategories();
        setCategories(cats);

        let catIdPorDefecto = cats.length > 0 ? cats[0].id : '';

        if (isEditing) {
          const products = await productService.getProducts();
          const product = products.find(p => p.id === parseInt(id));
          
          if (product) {
            setFormData({
              nombre: product.nombre,
              descripcion: product.descripcion || '',
              precio: product.precio,
              stock: product.stock || 0,
              imagen: product.imagen || '',
              fabricante: product.fabricante || '',
              categoriaId: product.categoria?.id || catIdPorDefecto
            });
          }
        } else {
            setFormData(prev => ({ ...prev, categoriaId: catIdPorDefecto }));
        }
      } catch (err) {
        setError('Error al cargar datos: ' + err.message);
      }
    };

    cargarDatos();
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const productoParaEnviar = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock),
      imagen: formData.imagen,
      fabricante: formData.fabricante,
      categoria: { id: parseInt(formData.categoriaId) } 
    };

    try {
      if (isEditing) {
        await productService.updateProduct(id, productoParaEnviar);
        alert('¡Producto actualizado correctamente!');
      } else {
        await productService.createProduct(productoParaEnviar);
        alert('¡Producto creado exitosamente!');
      }
      navigate('/admin/productos');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error al guardar.');
    }
  };

  return (
    <Container>
      <h2 className="my-4">{isEditing ? 'Editar Producto' : 'Nuevo Producto'}</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control as="textarea" name="descripcion" value={formData.descripcion} onChange={handleChange} />
        </Form.Group>

        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="number" name="precio" value={formData.precio} onChange={handleChange} required />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" name="stock" value={formData.stock} onChange={handleChange} required />
            </Form.Group>
          </div>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>URL de Imagen</Form.Label>
          <Form.Control type="text" name="imagen" placeholder="/img/ejemplo.jpg" value={formData.imagen} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fabricante</Form.Label>
          <Form.Control type="text" name="fabricante" value={formData.fabricante} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>
          {}
          <Form.Select name="categoriaId" value={formData.categoriaId} onChange={handleChange} required>
            {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="success" type="submit">
          {isEditing ? 'Guardar Cambios' : 'Crear Producto'}
        </Button>
        <Button variant="secondary" className="ms-2" onClick={() => navigate('/admin/productos')}>
          Cancelar
        </Button>
      </Form>
    </Container>
  );
}

export default ProductEditPage;     