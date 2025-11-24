import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { authService } from '../services/authService';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUser = { ...user };
    if (password) {
      updatedUser.password = password;
    }
    authService.updateUser(updatedUser);
    setSuccess('Perfil actualizado correctamente.');
  };

  if (!user) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <Container>
      <Card bg="dark" text="white" className="p-4">
        <Card.Body>
          <Card.Title as="h2">Mi Perfil</Card.Title>
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                value={user.nombre}
                onChange={(e) => setUser({ ...user, nombre: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control type="email" value={user.correo} disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nueva Contraseña (dejar en blanco para no cambiar)</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">Guardar Cambios</Button>
          </Form>
          <hr/>
          <h4>Información Adicional</h4>
          <p><strong>Puntos Level-Up:</strong> {user.puntos || 0}</p>
          <p><strong>Nivel:</strong> {user.nivel || 1}</p>
          <p><strong>Descuento Asignado:</strong> {user.descuento || 0}%</p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProfilePage;