import { motion } from 'framer-motion';
import { Carousel } from '../components/Carousel';
import { products } from '../data/products';
import { Features } from '../components/home/Features';
import { SpecialOffers } from '../components/home/SpecialOffers';
import { ProductGrid } from '../components/product/ProductGrid';
import { applyStaggeredAnimation, useParallaxEffect } from '../utils/animations';
import { PromoHeader } from '../components/common/PromoHeader';

export const Home = () => {
  // Apply staggered animation to product cards
  applyStaggeredAnimation('.product-card', 100, 50);
  
  // Apply parallax effect to the hero section with a reduced effect
  useParallaxEffect('.parallax-bg', 0.1);
  
  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0 },
    in: { 
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeInOut' }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="exit"
      variants={pageVariants}
    >
      {/* Hero Section with Carousel - now without the parallax effect that was causing issues */}
      <Carousel />
      
      {/* PromoHeader with Mabati section - now positioned after the Carousel */}
      <PromoHeader />
      
      {/* Main Content */}
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Main Heading */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-5 text-blue-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Our Range of Roofing Solutions
            </motion.h1>
            <motion.div 
              className="h-1 w-24 bg-blue-600 mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            />
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
            
            </motion.p>
          </motion.div>

          {/* Features Section with Motion */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <Features />
          </motion.div>

          {/* Special Offers Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="my-20"
          >
            <SpecialOffers products={products.slice(0, 3)} />
          </motion.div>

          {/* All Products Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <ProductGrid title="All Products" products={products} />
          </motion.div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      <motion.button
        className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg z-50 hover:bg-blue-700 transition-colors"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </motion.button>
    </motion.div>
  );
};