import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/other', label: 'Other' },
    { to: '/user/login', label: 'Login', btn: true },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      {/* Hamburger for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-3 rounded-full shadow-lg focus:outline-none"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <FaBars size={22} />
      </button>
      {/* Mobile Slider */}
      <div className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity duration-300 ${open ? 'block' : 'hidden'}`}
        onClick={() => setOpen(false)}
      ></div>
      <aside className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-700 text-white flex flex-col py-8 px-4 shadow-lg z-50 transform transition-transform duration-300 md:static md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'} md:hidden`}
        style={{ minWidth: '16rem' }}
      >
        {/* Close button for mobile */}
        <button
          className="md:hidden absolute top-4 right-4 text-gray-300 hover:text-white text-2xl focus:outline-none"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <FaTimes />
        </button>
        <div className="mb-10 text-center">
          <div className="text-3xl font-bold tracking-tight">Bookify</div>
        </div>
        <nav className="flex-1 space-y-2">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${link.btn ? 'bg-blue-600 text-white shadow' : 'hover:bg-gray-800 hover:text-white text-gray-200'}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      {/* Desktop NavBar */}
      <div className="hidden md:flex flex-row justify-between items-center px-8 py-6 space-x-8 w-full">
        <Link to="/" className="text-gray-900 text-3xl font-bold tracking-wide hover:text-blue-600 transition-colors duration-200">
          Bookify
        </Link>
        <div className="flex flex-row gap-8 items-center w-auto">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-gray-700 text-lg font-medium transition-all duration-200 hover:scale-105 ${
                link.btn 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg shadow-sm font-semibold' 
                  : 'hover:text-blue-600 hover:bg-gray-50 px-4 py-2 rounded-lg'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

// Tailwind animation
// Add this to your tailwind.css:
// @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
// .animate-slideIn { animation: slideIn 0.3s ease-out; } 