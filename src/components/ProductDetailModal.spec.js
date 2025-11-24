import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductDetailModal from './ProductDetailModal';

describe('Componente ProductDetailModal', () => {
 const mockProduct = {
 nombre: "Producto de Prueba",
  descripcion: "Esta es una descripción detallada.",
  precio: 10000,
  fabricante: "Fabricante de Prueba",
  categoria: "categoria-prueba"
 };

 it('no debe renderizarse si la prop "product" es nula', () => {
  const { container } = render(<ProductDetailModal product={null} handleClose={() => {}} />);
  expect(container.firstChild).toBeNull();
 });

 it('debe mostrar la descripción del producto cuando recibe la prop "product"', () => {
  render(<ProductDetailModal product={mockProduct} handleClose={() => {}} />);
  
  expect(screen.getByText('Esta es una descripción detallada.')).not.toBeNull();
 });
});