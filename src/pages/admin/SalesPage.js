import React, { useState, useEffect } from 'react';
import { Table, Container, Alert } from 'react-bootstrap';
import { getVentas } from '../../services/api'; 

function SalesPage() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      const data = await getVentas();
      setVentas(data);
    };
    cargar();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Listado de Ventas (Boletas)</h2>
      {ventas.length === 0 ? (
        <Alert variant="info">No hay ventas registradas aún.</Alert>
      ) : (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID Boleta</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Usuario</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map(v => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{new Date(v.fecha).toLocaleDateString()}</td>
                <td>${v.total}</td>
                <td>{v.usuario ? v.usuario.username : 'Anónimo'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default SalesPage;