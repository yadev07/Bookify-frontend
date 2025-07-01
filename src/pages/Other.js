import React from 'react';
import { Link } from 'react-router-dom';
import { FaNewspaper, FaLightbulb, FaRocket, FaUsers, FaCalendarAlt, FaStar } from 'react-icons/fa';

const Other = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">News</span> & Updates
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest features, tips, and insights about our appointment booking platform.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Articles
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover helpful tips, industry insights, and platform updates.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Article 1 */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <FaRocket className="text-white text-4xl group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <FaCalendarAlt />
                  <span>December 15, 2024</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  New Features Released
                </h3>
                <p className="text-gray-600 mb-4">
                  We've just launched exciting new features including advanced scheduling, video consultations, and improved mobile experience.
                </p>
                <Link
                  to="#"
                  className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-2"
                >
                  Read More
                  <FaNewspaper />
                </Link>
              </div>
            </div>

            {/* Article 2 */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
              <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                <FaLightbulb className="text-white text-4xl group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <FaCalendarAlt />
                  <span>December 10, 2024</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  Tips for Service Providers
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn how to optimize your profile, manage appointments efficiently, and grow your business with our platform.
                </p>
                <Link
                  to="#"
                  className="text-green-600 hover:text-green-700 font-semibold inline-flex items-center gap-2"
                >
                  Read More
                  <FaNewspaper />
                </Link>
              </div>
            </div>

            {/* Article 3 */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                <FaUsers className="text-white text-4xl group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <FaCalendarAlt />
                  <span>December 5, 2024</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  Community Success Stories
                </h3>
                <p className="text-gray-600 mb-4">
                  Discover how our community members are using the platform to transform their businesses and improve client relationships.
                </p>
                <Link
                  to="#"
                  className="text-purple-600 hover:text-purple-700 font-semibold inline-flex items-center gap-2"
                >
                  Read More
                  <FaNewspaper />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Platform Statistics
            </h2>
            <p className="text-xl text-gray-600">
              See how our platform is growing and helping people connect.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10K+</h3>
              <p className="text-gray-600">Active Users</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-white text-2xl" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Service Providers</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCalendarAlt className="text-white text-2xl" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">50K+</h3>
              <p className="text-gray-600">Appointments Booked</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-white text-2xl" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">4.8★</h3>
              <p className="text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Subscribe to our newsletter for the latest updates, tips, and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Quick Links
            </h2>
            <p className="text-xl text-gray-600">
              Find what you're looking for quickly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/services"
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600">Browse Services</h3>
              <p className="text-gray-600">Find and book services from trusted providers.</p>
            </Link>
            
            <Link
              to="/get-started"
              className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600">Get Started</h3>
              <p className="text-gray-600">Join our platform and start booking appointments.</p>
            </Link>
            
            <Link
              to="/about"
              className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600">About Us</h3>
              <p className="text-gray-600">Learn more about our mission and values.</p>
            </Link>
            
            <Link
              to="/contact"
              className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600">Contact Us</h3>
              <p className="text-gray-600">Get in touch with our support team.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Other; 