import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUserMd, FaUsers, FaClock, FaStar, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/20 to-purple-700/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Book <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Appointments</span>
              <br />
              <span className="text-4xl md:text-5xl">with Ease</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect with trusted service providers and book appointments instantly. 
              Save time, avoid waiting, and get the services you need when you need them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/get-started"
                className="group bg-gradient-to-r from-blue-700 to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Get Started
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="bg-white text-gray-700 px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Browse Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make appointment booking simple, fast, and reliable for everyone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaCalendarAlt className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Easy Booking</h3>
              <p className="text-gray-600">
                Book appointments in just a few clicks. No phone calls, no waiting on hold.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaUserMd className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Verified Providers</h3>
              <p className="text-gray-600">
                All service providers are verified and rated by our community.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaClock className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">24/7 Availability</h3>
              <p className="text-gray-600">
                Book appointments anytime, anywhere. Available round the clock.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaStar className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Reviews</h3>
              <p className="text-gray-600">
                Read real reviews and ratings from other customers before booking.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaCheckCircle className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Instant Confirmation</h3>
              <p className="text-gray-600">
                Get instant confirmation and reminders for your appointments.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Community Driven</h3>
              <p className="text-gray-600">
                Join our growing community of users and service providers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who have already simplified their appointment booking experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/user/register"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
            >
              Sign Up as User
            </Link>
            <Link
              to="/provider/register"
              className="bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-900 transform hover:scale-105 transition-all duration-300"
            >
              Join as Provider
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 