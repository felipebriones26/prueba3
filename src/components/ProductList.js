// src/components/ProductList.js
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

function ProductList({ products, onAddToCart, onShowDetails }) { // <-- Añadir onShowDetails
  return (
    <Row xs={1} md={2} lg={4} className="g-4">
      {products.map(product => (
        <Col key={product.id}>
          {/* Pasar la función onShowDetails a cada tarjeta */}
          <ProductCard 
            product={product} 
            onAddToCart={onAddToCart}
            onShowDetails={onShowDetails} 
          />
        </Col>
      ))}
    </Row>
  );
}

export default ProductList;