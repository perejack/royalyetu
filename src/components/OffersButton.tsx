import React from 'react';
import { MessageCircle, Tag } from 'lucide-react';
import { CONFIG } from '../constants/config';
import { sendToWhatsApp } from '../utils/whatsapp';

export const OffersButton = () => {
  const handleClick = () => {
    const message = `Hello Royal Mabati! 👋\nI'm interested in learning more about your current special offers and promotions for roofing materials. Please share the best deals available.`;
    sendToWhatsApp(message, CONFIG.WHATSAPP_NUMBER);
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-600 text-white rounded-full shadow-lg flex items-center gap-2 px-6 py-3 hover:bg-green-700 transition-colors z-50 group"
    >
      <div className="absolute -top-12 right-0 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
        Ask about special offers!
      </div>
      <Tag className="w-5 h-5" />
      <MessageCircle className="w-5 h-5" />
      <span className="font-medium">Special Offers</span>
    </button>
  );
};