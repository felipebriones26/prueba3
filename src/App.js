import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, Button, NavDropdown } from 'react-bootstrap';
import { authService } from './services/authService'; // Ajusta si usas api.js o authService.js

import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import ProfilePage from './pages/ProfilePage';
import ProductAdminPage from './pages/admin/ProductAdminPage';
import ProductEditPage from './pages/admin/ProductEditPage';
import ProtectedRoute from './components/ProtectedRoute';
import SalesPage from './pages/admin/SalesPage'; // Importar la página nueva

import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // Estado para guardar el rol
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Cargar sesión al iniciar
  useEffect(() => {
    const user = localStorage.getItem('usuario_actual');
    const role = localStorage.getItem('user_role'); // Leemos el rol guardado
    if (user) {
      setCurrentUser(user);
      setUserRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('usuario_actual');
    localStorage.removeItem('user_role');
    setCurrentUser(null);
    setUserRole(null);
    window.location.href = '/';
  };

  // Lógica del carrito (simplificada para el ejemplo)
  const handleAddToCart = (productToAdd) => {
      setCartItems(prevItems => {
        const isItemInCart = prevItems.find(item => item.id === productToAdd.id);
        if (isItemInCart) {
            return prevItems.map(item =>
                item.id === productToAdd.id
                    ? { ...item, cantidad: (item.cantidad || 1) + 1 }
                    : item
            );
        }
        return [...prevItems, { ...productToAdd, cantidad: 1 }];
    });
    alert(`"${productToAdd.nombre}" fue agregado al carrito!`);
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
          <Container>
            <Navbar.Brand as={Link} to="/">🎮 Level-Up Gamer</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/" end>Productos</Nav.Link>
                <Nav.Link as={NavLink} to="/checkout">Carrito ({cartItems.length})</Nav.Link>
                
                {/* Menú solo para ADMINISTRADOR (Gestión total) */}
                {userRole === 'ADMINISTRADOR' && (
                  <Nav.Link as={NavLink} to="/admin/productos">Administrar Productos</Nav.Link>
                )}

                {/* Menú para VENDEDOR y ADMIN (Ver Ventas) */}
                {(userRole === 'VENDEDOR' || userRole === 'ADMINISTRADOR') && (
                   <Nav.Link as={NavLink} to="/admin/ventas">Ver Ventas</Nav.Link>
                )}
              </Nav>
              <Nav>
                {currentUser ? (
                  <NavDropdown title={`👤 ${currentUser}`} id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/perfil">Mi Perfil</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>Cerrar Sesión</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <>
                    <Button variant="outline-primary" className="me-2" onClick={() => setShowRegister(true)}>📝 Registrarse</Button>
                    <Button variant="primary" onClick={() => setShowLogin(true)}>🔑 Ingresar</Button>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        
        <Container as="main" className="my-4 flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage onAddToCart={handleAddToCart} />} />
            <Route path="/producto/:id" element={<ProductDetailPage onAddToCart={handleAddToCart} />} />
            <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/pago-exitoso" element={<PaymentSuccessPage />} />
            <Route path="/perfil" element={<ProfilePage />} />

            {/* Rutas Protegidas */}
            {/* Solo Admin puede entrar a gestión de productos */}
            <Route path="/admin/productos" element={
                userRole === 'ADMINISTRADOR' ? <ProductAdminPage /> : <HomePage />
            } />
            <Route path="/admin/productos/nuevo" element={
                userRole === 'ADMINISTRADOR' ? <ProductEditPage /> : <HomePage />
            } />
            <Route path="/admin/productos/editar/:id" element={
                userRole === 'ADMINISTRADOR' ? <ProductEditPage /> : <HomePage />
            } />
            
            {/* Admin y Vendedor pueden ver ventas */}
            <Route path="/admin/ventas" element={
                (userRole === 'ADMINISTRADOR' || userRole === 'VENDEDOR') ? <SalesPage /> : <HomePage />
            } />
          </Routes>
        </Container>

        <Footer />

        <LoginForm show={showLogin} handleClose={() => setShowLogin(false)} />
        <RegisterForm show={showRegister} handleClose={() => setShowRegister(false)} />
      </div>
    </Router>
  );
}

export default App;