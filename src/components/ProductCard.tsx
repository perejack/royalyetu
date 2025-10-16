import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, Truck, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  hasOffer?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  description,
  hasOffer = Math.random() > 0.5 // Randomly show offers for demo
}) => {
  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden relative h-full flex flex-col shadow-md hover:shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ 
        duration: 0.5,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      {/* Favorite Button */}
      <button 
        className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all duration-300 backdrop-blur-sm"
        aria-label="Add to favorites"
      >
        <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
      </button>

      {/* Product Image with Gradient Overlay */}
      <div className="relative overflow-hidden group h-56">
        {hasOffer && (
          <motion.div 
            className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-600 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Special Offer
          </motion.div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        
        {/* Quick View Button that appears on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <Link
            to={`/product/${id}`}
            className="bg-white text-gray-900 px-4 py-2 rounded-md font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            Quick View
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <Tag className="w-4 h-4 text-blue-600" />
          <h3 className="text-lg font-semibold line-clamp-1">{name}</h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{description}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <Truck className="w-4 h-4 text-green-600" />
          <span className="text-sm text-green-600">Free Delivery</span>
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="flex flex-col">
            {hasOffer && (
              <span className="text-sm text-gray-500 line-through">
                KSh {(price * 1.2).toFixed(2)}
              </span>
            )}
            <span className="text-xl font-bold text-blue-600">
              KSh {price.toFixed(2)}
            </span>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={`/product/${id}`}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-md hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md"
            >
              Buy Now
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};