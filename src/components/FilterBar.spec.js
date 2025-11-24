import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from './FilterBar';

describe('Componente FilterBar', () => {
  let mockSetFilters; // Declarar la variable aquí
  const filters = { term: '', category: '', sort: 'pop' };

  // Definir el mock antes de cada prueba
  beforeEach(() => {
    mockSetFilters = jasmine.createSpy('setFilters');
  });

  // --- PRUEBA 2 (Simple) ---
  it('debe renderizarse correctamente sin errores', () => {
    render(<FilterBar filters={filters} setFilters={mockSetFilters} />);
    
    expect(screen.getByPlaceholderText('Buscar producto...')).not.toBeNull();
  });

  // --- PRUEBA 3 (Simple) ---
  it('debe llamar a setFilters cuando el usuario cambia la categoría', () => {
    render(<FilterBar filters={filters} setFilters={mockSetFilters} />);
    const categorySelect = screen.getByDisplayValue('Todas las categorías');
    
    fireEvent.change(categorySelect, { target: { value: 'juegos' } });
    
    expect(mockSetFilters).toHaveBeenCalled();
  });
});