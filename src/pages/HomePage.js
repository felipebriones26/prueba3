// src/pages/HomePage.js
import React, { useState, useMemo, useEffect } from 'react';
import ProductList from '../components/ProductList';
import FilterBar from '../components/FilterBar';
import BlogSection from '../components/BlogSection';
import EventsMap from '../components/EventsMap';
import ProductDetailModal from '../components/ProductDetailModal';
import { getProducts } from '../services/api'; // Importamos la función que conecta con el Backend

function HomePage({ onAddToCart }) {
  const [products, setProducts] = useState([]); // Estado para guardar los productos de la BD
  const [filters, setFilters] = useState({ term: '', category: '', sort: 'pop' });
  
  // --- LÓGICA DEL MODAL (Detalle del producto) ---
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleShowDetails = (product) => setSelectedProduct(product);
  const handleCloseDetails = () => setSelectedProduct(null);

  // --- EFECTO DE CARGA (Se ejecuta al iniciar la página) ---
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await getProducts(); // Petición al Backend (Spring Boot)
        console.log("Productos cargados desde MySQL:", data); // Mensaje de control en consola
        setProducts(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };
    cargarDatos();
  }, []); 

  // --- LÓGICA DE FILTRADO ---
  const filteredProducts = useMemo(() => {
    if (!products) return []; // Protección por si la lista está vacía

    let filtered = [...products];

    // 1. Filtro por búsqueda (Nombre)
    if (filters.term) {
      filtered = filtered.filter(p =>
        p.nombre.toLowerCase().includes(filters.term.toLowerCase())
      );
    }

    // 2. Filtro por Categoría (CORREGIDO)
    if (filters.category) {
      // Como el Backend devuelve un OBJETO categoría (ej: {id:1, nombre:'juegos'}),
      // debemos acceder a la propiedad .nombre.
      // El ?. es para evitar errores si algún producto no tuviera categoría asignada.
      filtered = filtered.filter(p => p.categoria?.nombre === filters.category);
    }

    // 3. Ordenamiento
    switch (filters.sort) {
      case 'precioAsc': filtered.sort((a, b) => a.precio - b.precio); break;
      case 'precioDesc': filtered.sort((a, b) => b.precio - a.precio); break;
      case 'ratingDesc': filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      default: break;
    }
    return filtered;
  }, [products, filters]);

  return (
    <div>
      {/* Barra de filtros y búsqueda */}
      <FilterBar filters={filters} setFilters={setFilters} />
      
      <h1 className="mt-4">Catálogo de Productos</h1>

      {/* Lista de Productos (Usamos la lista filtrada) */}
      <ProductList 
        products={filteredProducts} 
        onAddToCart={onAddToCart}
        onShowDetails={handleShowDetails} 
      />
      
      <hr className="my-5" />
      
      {/* Secciones extra */}
      <BlogSection />
      <EventsMap />

      {/* Modal de detalle */}
      <ProductDetailModal 
        product={selectedProduct}
        handleClose={handleCloseDetails}
      />
    </div>
  );
}

export default HomePage;