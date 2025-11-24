
import React from 'react';
import { useParams } from 'react-router-dom';

function CategoryPage({ onAddToCart }) {
  const { categoryName } = useParams();

  return (
    <div>
      <h1>Categoría: {categoryName}</h1>
      <p>Aquí se mostrarán los productos de esta categoría.</p>
    </div>
  );
}

export default CategoryPage;