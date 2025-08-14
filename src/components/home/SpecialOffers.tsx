import React from 'react';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/product';

interface SpecialOffersProps {
  products: Product[];
}

export const SpecialOffers: React.FC<SpecialOffersProps> = ({ products }) => {
  return (
    <div className="bg-blue-50 rounded-lg p-8 mb-12">
      <h2 className="text-3xl font-bold mb-4 text-center text-blue-800">Special Offers</h2>
      <p className="text-center text-blue-600 mb-8">
        Discover our exclusive deals on premium roofing materials
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            hasOffer={true}
          />
        ))}
      </div>
    </div>
  );
};