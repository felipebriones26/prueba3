import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createSale } from '../services/api'; 

function CheckoutPage({ cartItems, setCartItems }) {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Estado para el formulario de envío
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    ciudad: '',
    metodoPago: 'credito'
  });

  // Calcular total dinámico
  const total = cartItems.reduce((acc, item) => acc + (item.precio * (item.cantidad || 1)), 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- NUEVA FUNCIÓN: CAMBIAR CANTIDAD ---
  const handleQuantityChange = (id, newQuantity) => {
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 1) return; // Evitar números inválidos o 0

    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, cantidad: quantity } : item
      )
    );
  };
  // ---------------------------------------

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handlePagar = async (e) => {
    e.preventDefault();
    setError('');

    if (cartItems.length === 0) {
      setError('El carrito está vacío.');
      return;
    }

    if (!formData.nombre || !formData.direccion) {
      setError('Por favor completa los datos de envío.');
      return;
    }

    try {
      await createSale(cartItems);
      
      alert("¡Compra realizada con éxito! Tu pedido ha sido registrado.");
      setCartItems([]); 
      navigate('/'); 
      
    } catch (err) {
      console.error(err);
      // Mostramos el mensaje exacto que viene del backend (ej: "Stock insuficiente")
      setError(err.message || "Hubo un error al procesar la compra.");
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Finalizar Compra</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {/* Formulario de Datos */}
        <Col md={7}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-primary text-white">Datos de Envío y Pago</Card.Header>
            <Card.Body>
              <Form onSubmit={handlePagar}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre Completo</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="nombre" 
                    value={formData.nombre} 
                    onChange={handleChange} 
                    placeholder="Ej: Juan Pérez" 
                    required 
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Dirección</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="direccion" 
                        value={formData.direccion} 
                        onChange={handleChange} 
                        placeholder="Calle Falsa 123" 
                        required 
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Ciudad</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="ciudad" 
                        value={formData.ciudad} 
                        onChange={handleChange} 
                        required 
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Método de Pago</Form.Label>
                  <Form.Select name="metodoPago" value={formData.metodoPago} onChange={handleChange}>
                    <option value="credito">Tarjeta de Crédito</option>
                    <option value="debito">Tarjeta de Débito</option>
                    <option value="transferencia">Transferencia Bancaria</option>
                  </Form.Select>
                </Form.Group>

                <div className="d-grid">
                   <Button variant="success" size="lg" type="submit">
                      Confirmar y Pagar ${total.toLocaleString('es-CL')}
                   </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Resumen del Carrito con Edición */}
        <Col md={5}>
          <Card className="shadow-sm">
            <Card.Header>Resumen del Pedido</Card.Header>
            <Card.Body>
              {cartItems.length === 0 ? (
                <p>No hay productos.</p>
              ) : (
                <Table responsive size="sm" className="align-middle">
                  <thead>
                    <tr>
                        <th>Producto</th>
                        <th style={{width: '80px'}}>Cant.</th>
                        <th className="text-end">Subtotal</th>
                        <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                            <span className="fw-bold">{item.nombre}</span><br/>
                            <small className="text-muted">${item.precio.toLocaleString('es-CL')} c/u</small>
                        </td>
                        <td>
                            {/* Input para editar cantidad */}
                            <Form.Control 
                                type="number" 
                                min="1"
                                size="sm"
                                value={item.cantidad || 1}
                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                            />
                        </td>
                        <td className="text-end">
                            ${(item.precio * (item.cantidad || 1)).toLocaleString('es-CL')}
                        </td>
                        <td style={{width: '30px'}}>
                           <Button variant="link" className="text-danger p-0" onClick={() => handleRemoveItem(item.id)}>x</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="fw-bold table-light">
                      <td colSpan="2">TOTAL</td>
                      <td className="text-end">${total.toLocaleString('es-CL')}</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CheckoutPage;