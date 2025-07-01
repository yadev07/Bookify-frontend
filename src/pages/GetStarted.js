import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaUserMd, FaArrowRight, FaCalendarAlt, FaStar, FaUsers } from 'react-icons/fa';

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Role</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* User Card */}
            <button
              onClick={() => navigate('/user/login')}
              className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 group"
              aria-label="Login as User"
            >
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FaUser className="text-white text-3xl" />
              </div>
              <span className="text-2xl font-bold mb-2">I'm a User</span>
              <span className="mb-4 text-white text-opacity-80 text-center">Book appointments and services from trusted providers.</span>
              <span className="inline-flex items-center gap-2 font-semibold mt-2">
                Login as User <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            {/* Provider Card */}
            <button
              onClick={() => navigate('/provider/login')}
              className="flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300 group"
              aria-label="Login as Provider"
            >
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FaUserMd className="text-white text-3xl" />
              </div>
              <span className="text-2xl font-bold mb-2">I'm a Provider</span>
              <span className="mb-4 text-white text-opacity-80 text-center">Offer your services and manage appointments with clients.</span>
              <span className="inline-flex items-center gap-2 font-semibold mt-2">
                Login as Provider <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
          <div className="mt-10 text-center">
            <span className="text-gray-600">Don't have an account?</span>
            <button
              onClick={() => navigate('/user/register')}
              className="ml-2 text-blue-600 hover:text-blue-800 font-semibold underline"
            >
              Sign up as User
            </button>
            <span className="mx-2 text-gray-400">|</span>
            <button
              onClick={() => navigate('/provider/register')}
              className="text-purple-600 hover:text-purple-800 font-semibold underline"
            >
              Sign up as Provider
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted; 