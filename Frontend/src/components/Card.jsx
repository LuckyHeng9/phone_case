import React from 'react';
import ProductCard from './ProductCard';

const Card = ({ products }) => {
  return (
    <div className="flex flex-wrap justify-center gap-16 pb-10 p-20">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default Card;
