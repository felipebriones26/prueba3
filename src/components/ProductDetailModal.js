// src/components/ProductDetailModal.js
import React from 'react';
import { Modal, Button, Image, Badge } from 'react-bootstrap';

function ProductDetailModal({ product, handleClose }) {
  // Si no hay producto seleccionado, no renderiza nada
  if (!product) {
    return null;
  }

  return (
    <Modal show={Boolean(product)} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{product.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <Image src={product.imagen} fluid rounded className="mb-3" style={{ maxHeight: '300px' }} />
        <p className="lead">{product.descripcion}</p>
        <hr/>
        <h4><strong>Precio:</strong> ${product.precio.toLocaleString('es-CL')} CLP</h4>
        <p className="text-muted"><strong>Fabricante:</strong> {product.fabricante}</p>
        <Badge bg="info">{product.categoria}</Badge>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductDetailModal;