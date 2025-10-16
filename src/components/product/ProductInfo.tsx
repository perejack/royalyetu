import React from 'react';
import { Product } from '../../types/product';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-600">{product.description}</p>
    </div>
  );
};