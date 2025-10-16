import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Send } from 'lucide-react';
import { products } from '../data/products';

export const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedGauge, setSelectedGauge] = useState('');
  const [selectedFinish, setSelectedFinish] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);

  const product = products.find(p => p.id === id);

  if (!product) return <div>Product not found</div>;

  const total = product.price * quantity;

  const handleOrder = () => {
    setShowReceipt(true);
  };

  const sendToWhatsApp = () => {
    const message = `
*New Order from Royal Mabati*
Product: ${product.name}
Gauge: ${selectedGauge}
Finish: ${selectedFinish}
Quantity: ${quantity}
Total: KSh ${total.toFixed(2)}
    `;
    
    const whatsappUrl = `https://wa.me/254736840769?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-lg" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          <div className="space-y-4 mb-6">
            {product.specifications?.gaugeOptions && (
              <div>
                <label className="block text-sm font-medium mb-2">Gauge</label>
                <select 
                  className="w-full border rounded-md p-2"
                  value={selectedGauge}
                  onChange={(e) => setSelectedGauge(e.target.value)}
                >
                  <option value="">Select Gauge</option>
                  {product.specifications.gaugeOptions.map(gauge => (
                    <option key={gauge} value={gauge}>{gauge}</option>
                  ))}
                </select>
              </div>
            )}

            {product.specifications?.finishOptions && (
              <div>
                <label className="block text-sm font-medium mb-2">Finish</label>
                <select 
                  className="w-full border rounded-md p-2"
                  value={selectedFinish}
                  onChange={(e) => setSelectedFinish(e.target.value)}
                >
                  <option value="">Select Finish</option>
                  {product.specifications.finishOptions.map(finish => (
                    <option key={finish} value={finish}>{finish}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full border rounded-md p-2"
              />
            </div>
          </div>

          <div className="text-2xl font-bold mb-6">
            Total: KSh {total.toFixed(2)}
          </div>

          <div className="space-y-4">
            <button
              onClick={handleOrder}
              className="w-full bg-blue-600 text-white py-3 rounded-md flex items-center justify-center gap-2 hover:bg-blue-700"
            >
              <ShoppingCart className="w-5 h-5" />
              Request Order
            </button>

            {showReceipt && (
              <div className="border rounded-md p-4">
                <h3 className="font-bold mb-2">Order Summary</h3>
                <p>Product: {product.name}</p>
                {selectedGauge && <p>Gauge: {selectedGauge}</p>}
                {selectedFinish && <p>Finish: {selectedFinish}</p>}
                <p>Quantity: {quantity}</p>
                <p>Total: KSh {total.toFixed(2)}</p>
                
                <button
                  onClick={sendToWhatsApp}
                  className="mt-4 w-full bg-green-600 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-green-700"
                >
                  <Send className="w-5 h-5" />
                  Send to WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};