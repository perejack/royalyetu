import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../../types/product';

interface ProductImagesProps {
  product: Product;
}

export const ProductImages = ({ product }: ProductImagesProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  
  // Create an array of images - the main product image plus color variants
  const colorImages = product.specifications?.colors?.map((color) => ({
    src: product.image, // In a real app, each color would have its own image
    alt: `${product.name} - ${color}`,
    color: color
  })) || [];
  
  const images = [
    { src: product.image, alt: product.name, color: 'Main' },
    ...colorImages
  ];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square group">
        {/* Image Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}
        
        {/* Zoom Toggle Button */}
        <button 
          onClick={toggleZoom}
          className="absolute top-2 right-2 z-10 bg-white/80 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={isZoomed ? "Zoom out" : "Zoom in"}
        >
          {isZoomed ? (
            <ZoomOut className="w-5 h-5 text-gray-700" />
          ) : (
            <ZoomIn className="w-5 h-5 text-gray-700" />
          )}
        </button>
        
        {/* Current Image with Zoom Effect */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <div 
              className={`relative w-full h-full overflow-hidden ${
                isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={toggleZoom}
            >
              <motion.img 
                src={images[currentImageIndex].src} 
                alt={images[currentImageIndex].alt}
                className="w-full h-full object-cover"
                initial={false}
                animate={{
                  scale: isZoomed ? 1.5 : 1,
                  transition: { duration: 0.3 }
                }}
                style={{ 
                  transformOrigin: 'center center' 
                }}
                draggable="false"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Current Color Label */}
        <div className="absolute bottom-2 left-2 z-10 bg-white/80 px-3 py-1 rounded-full text-xs font-medium text-gray-700">
          {images[currentImageIndex].color}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image) => (
            <button
              key={image.src}
              onClick={() => setCurrentImageIndex(images.indexOf(image))}
              className={`relative aspect-square border rounded-md overflow-hidden transition-all ${
                images.indexOf(image) === currentImageIndex 
                  ? 'border-blue-600 ring-2 ring-blue-200' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              aria-label={`View ${image.color} variant`}
            >
              <img 
                src={image.src} 
                alt={`Thumbnail for ${image.alt}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                <span className="text-xs font-medium text-center">
                  {image.color}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};