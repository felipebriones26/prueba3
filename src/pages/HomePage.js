import React, { useState, useMemo, useEffect } from 'react';
import ProductList from '../components/ProductList';
import FilterBar from '../components/FilterBar';
import BlogSection from '../components/BlogSection';
import EventsMap from '../components/EventsMap';
import ProductDetailModal from '../components/ProductDetailModal';
import { getProducts } from '../services/api'; 

function HomePage({ onAddToCart }) {
  const [products, setProducts] = useState([]); 
  const [filters, setFilters] = useState({ term: '', category: '', sort: 'pop' });
  
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleShowDetails = (product) => setSelectedProduct(product);
  const handleCloseDetails = () => setSelectedProduct(null);

  
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await getProducts(); 
        console.log("Productos cargados desde MySQL:", data); 
        setProducts(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };
    cargarDatos();
  }, []); 

  const filteredProducts = useMemo(() => {
    if (!products) return []; 

    let filtered = [...products];

    if (filters.term) {
      filtered = filtered.filter(p =>
        p.nombre.toLowerCase().includes(filters.term.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter(p => p.categoria?.nombre === filters.category);
    }

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
      {}
      <FilterBar filters={filters} setFilters={setFilters} />
      
      <h1 className="mt-4">Catálogo de Productos</h1>

      {}
      <ProductList 
        products={filteredProducts} 
        onAddToCart={onAddToCart}
        onShowDetails={handleShowDetails} 
      />
      
      <hr className="my-5" />
      
      {}
      <BlogSection />
      <EventsMap />

      {}
      <ProductDetailModal 
        product={selectedProduct}
        handleClose={handleCloseDetails}
      />
    </div>
  );
}

export default HomePage;