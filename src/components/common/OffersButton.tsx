import { Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { CONFIG } from '../../constants/config';
import { sendToWhatsApp } from '../../utils/whatsapp';

export const OffersButton = () => {
  const handleClick = () => {
    const message = `Hello Royal Mabati! 👋
I'm interested in learning more about your current special offers and promotions for roofing materials. Please share the best deals available.`;
    sendToWhatsApp(message, CONFIG.WHATSAPP_NUMBER);
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full shadow-lg flex items-center px-6 py-3 hover:bg-blue-700 transition-colors z-50 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
    >
      <motion.div
        className="absolute -top-12 right-0 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md pointer-events-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        Ask about special offers!
      </motion.div>
      <Tag className="w-5 h-5 mr-2" />
      <span className="font-medium">Special Offers</span>
    </motion.button>
  );
};