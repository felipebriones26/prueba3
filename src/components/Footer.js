import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      <Container>
        <p>📩 Contáctanos: <a href="mailto:soporte@levelupgamer.cl">soporte@levelupgamer.cl</a></p>
        <p>&copy; 2025 Level-Up Gamer - Todos los derechos reservados</p>
      </Container>
    </footer>
  );
}

export default Footer;