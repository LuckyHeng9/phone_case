// src/components/ProductGrid.js
import React from 'react';
import ProductCard from './ProductCard';

const Card = ({ products }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default Card;
