// src/pages/ProductDetailPage.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { productos } from '../data/productos';

function ProductDetailPage({ onAddToCart }) {
  const { id } = useParams();
  const allProducts = Object.values(productos).flat();
  const product = allProducts.find(p => p.id === id);

  if (!product) {
    return <h2>Producto no encontrado</h2>;
  }

  return (
    <Container>
      <Row className="my-5">
        <Col md={6}>
          <Image src={product.imagen} fluid />
        </Col>
        <Col md={6}>
          <h1>{product.nombre}</h1>
          <p className="lead">de {product.fabricante}</p>
          <h2>${product.precio.toLocaleString('es-CL')}</h2>
          <p>{product.descripcion}</p>
          <p><strong>Categoría:</strong> {product.categoria}</p>
          <p><strong>Rating:</strong> {product.rating} ⭐</p>
          <Button variant="primary" size="lg" onClick={() => onAddToCart(product)}>
            Agregar al Carrito
          </Button>
          <Link to="/" className="btn btn-secondary btn-lg ms-2">
            Volver al Catálogo
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetailPage;