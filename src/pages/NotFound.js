import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="mx-auto h-32 w-32 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-6">
            <FaExclamationTriangle className="text-white text-6xl" />
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-6">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <FaHome />
            Go to Homepage
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-full font-semibold border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <FaArrowLeft />
              Go Back
            </button>
            
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-full font-semibold border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <FaSearch />
              Browse Services
            </Link>
          </div>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              to="/about"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Contact Support
            </Link>
            <Link
              to="/get-started"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Get Started
            </Link>
            <Link
              to="/user/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 