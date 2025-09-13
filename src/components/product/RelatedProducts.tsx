import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';

interface RelatedProductsProps {
  currentProductId: string;
  products: Product[];
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProductId, products }) => {
  const relatedProducts = products
    .filter(product => product.id !== currentProductId)
    .slice(0, 3);

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Special Offer
            </div>
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-500 line-through mr-2">
                    KSh {(product.price * 1.2).toFixed(2)}
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    KSh {product.price}
                  </span>
                </div>
                <Link
                  to={`/product/${product.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};