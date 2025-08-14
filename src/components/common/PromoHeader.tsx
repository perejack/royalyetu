import { Phone, AlertTriangle } from 'lucide-react';
import { CONFIG } from '../../constants/config';
import { sendToWhatsApp } from '../../utils/whatsapp';

export const PromoHeader = () => {
  const handleOfferClick = () => {
    const message = `Hi, I'm interested in learning more about your current special offers and promotions for roofing materials.`;
    sendToWhatsApp(message, CONFIG.WHATSAPP_NUMBER);
  };

  return (
    <div className="bg-blue-700 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              Mabati
            </h2>
            <p className="text-xl md:text-2xl mb-6 text-blue-100">
              Premium Quality Roofing Solutions at Unbeatable Prices
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-yellow-300 mr-3" />
                <span>Special Offers on Selected Products</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-yellow-300 mr-3" />
                <span>254784555661</span>
              </div>
            </div>
            <button
              onClick={handleOfferClick}
              className="px-6 py-3 bg-yellow-500 text-blue-900 font-medium rounded-md hover:bg-yellow-400 transition-colors inline-block"
            >
              Ask About Current Offers
            </button>
          </div>
          <div className="hidden md:block">
            <img
              src="https://www.royalmabati.com/cdn/shop/t/1/assets/logo.png?v=55664835011193329101704270125"
              alt="Royal Mabati Logo"
              className="mx-auto"
              onError={(e) => {
                // Fallback if the image doesn't exist
                e.currentTarget.src = "https://pinnacleconsultingroup.co.ke/wp-content/uploads/2023/08/Royal-Mabati-logo-300x202.webp";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};