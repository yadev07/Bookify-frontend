import React from 'react';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-32">
    <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-500 border-r-4 border-purple-500 border-l-4 border-yellow-400 shadow-lg"></div>
  </div>
);

export default LoadingSpinner; 