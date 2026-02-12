import React from 'react';
import { Activity } from 'lucide-react';

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mb-4"></div>
        <div className="flex items-center justify-center space-x-2">
          <Activity className="w-6 h-6 text-primary-600 animate-pulse" />
          <h2 className="text-xl font-semibold text-gray-900">Loading pharmacy data...</h2>
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;

