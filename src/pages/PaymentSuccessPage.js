// src/pages/PaymentSuccessPage.js
import React from 'react';
import { Alert, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PaymentSuccessPage() {
    return (
        <Container className="text-center mt-5">
            <Alert variant="success">
                <Alert.Heading>¡Compra Realizada con Éxito!</Alert.Heading>
                <p>
                    Tu pedido ha sido procesado y será despachado a la brevedad. Recibirás un correo con los detalles de tu compra.
                </p>
                <hr />
                <p className="mb-0">
                    Gracias por preferir Level-Up Gamer.
                </p>
            </Alert>
            <Link to="/">
                <Button variant="primary" size="lg">Volver al Inicio</Button>
            </Link>
        </Container>
    );
}

export default PaymentSuccessPage;