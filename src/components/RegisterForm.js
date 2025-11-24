import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { authService } from '../services/authService';

function RegisterForm({ show, handleClose }) {
  const [formData, setFormData] = useState({ nombre: '', correo: '', fechaNacimiento: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      // --- CORRECCIÓN AQUÍ ---
      // Antes decía: formData.formData (Error)
      // Ahora dice:  formData.correo   (Correcto)
      const user = await authService.register(formData.nombre, formData.correo, formData.password);
      
      const descuento = user.descuento || 0;
      
      if (descuento > 0) {
          setSuccess(`¡Registro exitoso! Como eres de Duoc UC, tienes un ${descuento}% de descuento.`);
      } else {
          setSuccess('¡Registro exitoso! Ya puedes iniciar sesión.');
      }
      
      // Limpiamos el formulario
      setFormData({ nombre: '', correo: '', fechaNacimiento: '', password: '' });
      
    } catch (err) {
      setError(err.message || 'Error al registrarse.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>📝 Registrarse</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control 
                type="text" 
                name="nombre" 
                value={formData.nombre}
                onChange={handleChange} 
                required 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control 
                type="email" 
                name="correo" 
                value={formData.correo}
                onChange={handleChange} 
                required 
            />
            <Form.Text className="text-muted">
                Usa tu correo @duocuc.cl para obtener beneficios.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control 
                type="date" 
                name="fechaNacimiento" 
                value={formData.fechaNacimiento}
                onChange={handleChange} 
                required 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control 
                type="password" 
                name="password" 
                value={formData.password}
                onChange={handleChange} 
                required 
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Registrarse
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RegisterForm;
        