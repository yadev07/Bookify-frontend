import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
    >
      &larr; Back
    </button>
  );
};

export default BackButton; 