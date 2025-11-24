// src/components/FilterBar.js
import React from 'react';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';

function FilterBar({ filters, setFilters }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  return (
    <Row className="my-4 p-3 bg-dark text-white rounded">
      <Col md={6}>
        <InputGroup>
          <InputGroup.Text>🔎</InputGroup.Text>
          <Form.Control
            placeholder="Buscar producto..."
            name="term"
            value={filters.term}
            onChange={handleInputChange}
          />
        </InputGroup>
      </Col>
      <Col md={3}>
        <Form.Select name="category" value={filters.category} onChange={handleInputChange}>
          <option value="">Todas las categorías</option>
          <option value="juegos">Juegos de Mesa</option>
          <option value="accesorios">Accesorios</option>
          <option value="consolas">Consolas</option>
          {/* Agrega todas tus categorías */}
        </Form.Select>
      </Col>
      <Col md={3}>
        <Form.Select name="sort" value={filters.sort} onChange={handleInputChange}>
          <option value="pop">🔝 Relevancia</option>
          <option value="precioAsc">💲 Menor Precio</option>
          <option value="precioDesc">💲 Mayor Precio</option>
          <option value="ratingDesc">⭐ Mejor Calificados</option>
        </Form.Select>
      </Col>
    </Row>
  );
}

export default FilterBar;