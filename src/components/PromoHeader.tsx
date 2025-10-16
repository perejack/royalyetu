import React from 'react';
import { Phone, Mail, Tag } from 'lucide-react';
import { CONFIG } from '../constants/config';
import { sendToWhatsApp } from '../utils/whatsapp';

export const PromoHeader = () => {
  const handleOfferClick = () => {
    const message = `Hi, I'm interested in learning more about your current special offers and promotions for roofing materials.`;
    sendToWhatsApp(message, CONFIG.WHATSAPP_NUMBER);
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">
              Transform Your Roof with Royal Mabati
            </h1>
            <p className="text-xl mb-6">
              Premium Quality Roofing Solutions at Unbeatable Prices
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-yellow-400" />
                <span>Special Offers on Selected Products</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-yellow-400" />
                <span>{CONFIG.WHATSAPP_NUMBER}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-yellow-400" />
                <span>{CONFIG.COMPANY_EMAIL}</span>
              </div>
            </div>
            <button
              onClick={handleOfferClick}
              className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors"
            >
              Ask About Current Offers
            </button>
          </div>
          <div className="hidden md:block">
            <img
              src="https://pinnacleconsultingroup.co.ke/wp-content/uploads/2023/08/Royal-Mabati-logo-300x202.webp"
              alt="Royal Mabati Logo"
              className="w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};