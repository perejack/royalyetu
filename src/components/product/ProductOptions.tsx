import React from 'react';
import { ProductSpecifications } from '../../types/product';

interface ProductOptionsProps {
  specifications?: ProductSpecifications;
  selectedGauge: string;
  selectedFinish: string;
  onGaugeChange: (gauge: string) => void;
  onFinishChange: (finish: string) => void;
}

export const ProductOptions: React.FC<ProductOptionsProps> = ({
  specifications,
  selectedGauge,
  selectedFinish,
  onGaugeChange,
  onFinishChange
}) => {
  if (!specifications) return null;

  return (
    <div className="space-y-4">
      {specifications.gaugeOptions && (
        <div>
          <label className="block text-sm font-medium mb-2">Gauge</label>
          <select 
            className="w-full border rounded-md p-2"
            value={selectedGauge}
            onChange={(e) => onGaugeChange(e.target.value)}
          >
            <option value="">Select Gauge</option>
            {specifications.gaugeOptions.map(gauge => (
              <option key={gauge} value={gauge}>{gauge}</option>
            ))}
          </select>
        </div>
      )}

      {specifications.finishOptions && (
        <div>
          <label className="block text-sm font-medium mb-2">Finish</label>
          <select 
            className="w-full border rounded-md p-2"
            value={selectedFinish}
            onChange={(e) => onFinishChange(e.target.value)}
          >
            <option value="">Select Finish</option>
            {specifications.finishOptions.map(finish => (
              <option key={finish} value={finish}>{finish}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};