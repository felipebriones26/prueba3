// src/components/Header.js
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header({ handleShowLogin, handleShowRegister }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">🎮 Level-Up Gamer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Productos</Nav.Link>
            <Nav.Link as={Link} to="/checkout">Carrito</Nav.Link>
            {/* Agrega más links aquí si es necesario */}
          </Nav>
          <Nav>
            <Button variant="outline-primary" className="me-2" onClick={handleShowRegister}>
              📝 Registrarse
            </Button>
            <Button variant="primary" onClick={handleShowLogin}>
              🔑 Ingresar
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;