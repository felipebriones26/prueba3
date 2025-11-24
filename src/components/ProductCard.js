import React from 'react';
import { Card, Button } from 'react-bootstrap';

function ProductCard({ product, onAddToCart, onShowDetails }) {
  const toCLP = (n) => n.toLocaleString('es-CL');

  return (
    <Card className="h-100" style={{ cursor: 'pointer' }} onClick={() => onShowDetails(product)}>
      <Card.Img variant="top" src={product.imagen} onError={(e) => {e.target.onerror = null; e.target.src="https://via.placeholder.com/400x200"}} />
      <Card.Body>
        <Card.Title>{product.nombre}</Card.Title>
        <Card.Text className="mb-1">{product.fabricante}</Card.Text>
        
        {}
        <Card.Text className="mb-2"><strong>Rating:</strong> {product.rating || 'N/A'} ⭐</Card.Text>

        <Card.Text>
          <strong>${toCLP(product.precio)} CLP</strong>
        </Card.Text>
        
        {}
        <Button variant="primary" onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}>
          Agregar al Carrito
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;