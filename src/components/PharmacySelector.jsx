import React from 'react';
import { Building2 } from 'lucide-react';

function PharmacySelector({ pharmacies, selected, onSelect }) {
  return (
    <div className="flex items-center space-x-2">
      <Building2 className="w-5 h-5 text-gray-500" />
      <select
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 font-medium cursor-pointer hover:border-gray-400 transition"
      >
        {pharmacies.map((pharmacy) => (
          <option key={pharmacy} value={pharmacy}>
            {pharmacy}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PharmacySelector;

