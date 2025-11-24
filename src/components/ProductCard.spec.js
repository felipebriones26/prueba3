import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';

describe('Componente ProductCard', () => {
 const mockProduct = {
  id: "catan",
  nombre: "Catan",
  precio: 29990,
  rating: 4.7,
  fabricante: "Catan Studio"
 };
 
 let mockOnAddToCart;
 let mockOnShowDetails;

 beforeEach(() => {
  mockOnAddToCart = jasmine.createSpy('onAddToCart');
  mockOnShowDetails = jasmine.createSpy('onShowDetails');
 });

 // --- PRUEBA 1 (Simple) ---
 it('debe mostrar el nombre y precio del producto pasados por props', () => {
  render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} onShowDetails={mockOnShowDetails} />);
  
  expect(screen.getByText('Catan')).not.toBeNull();

  const priceRegex = /\$\s*29[.,]990\s*CLP/;
  expect(screen.getByText(priceRegex)).not.toBeNull();
 });
});