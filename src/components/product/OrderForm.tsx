import React from 'react';
import { Send } from 'lucide-react';
import { ProductSpecifications } from '../../types/product';

interface OrderFormProps {
  productName: string;
  specifications?: ProductSpecifications;
  selectedGauge: string;
  selectedFinish: string;
  quantity: number;
  total: number;
  onGaugeChange: (gauge: string) => void;
  onFinishChange: (finish: string) => void;
  onQuantityChange: (quantity: number) => void;
  onSubmit: () => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({
  productName,
  specifications,
  selectedGauge,
  selectedFinish,
  quantity,
  total,
  onGaugeChange,
  onFinishChange,
  onQuantityChange,
  onSubmit,
}) => {
  return (
    <div className="space-y-6">
      {specifications?.gaugeOptions && (
        <div>
          <label className="block text-sm font-medium mb-2">Gauge</label>
          <select 
            className="w-full border rounded-md p-2"
            value={selectedGauge}
            onChange={(e) => onGaugeChange(e.target.value)}
            required
          >
            <option value="">Select Gauge</option>
            {specifications.gaugeOptions.map(gauge => (
              <option key={gauge} value={gauge}>{gauge}</option>
            ))}
          </select>
        </div>
      )}

      {specifications?.finishOptions && (
        <div>
          <label className="block text-sm font-medium mb-2">Finish</label>
          <select 
            className="w-full border rounded-md p-2"
            value={selectedFinish}
            onChange={(e) => onFinishChange(e.target.value)}
            required
          >
            <option value="">Select Finish</option>
            {specifications.finishOptions.map(finish => (
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
          onChange={(e) => onQuantityChange(parseInt(e.target.value))}
          className="w-full border rounded-md p-2"
          required
        />
      </div>

      <div className="text-2xl font-bold">
        Total: KSh {total.toFixed(2)}
      </div>

      <button
        onClick={onSubmit}
        className="w-full bg-green-600 text-white py-3 rounded-md flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
      >
        <Send className="w-5 h-5" />
        Request Order via WhatsApp
      </button>
    </div>
  );
};