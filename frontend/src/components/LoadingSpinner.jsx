import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Loader2 className={`animate-spin text-blue-400 ${sizeClasses[size]}`} />
      <p className="mt-2 text-gray-400 text-sm">{message}</p>
    </div>
  );
};

export default LoadingSpinner;