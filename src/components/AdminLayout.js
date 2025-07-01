import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaUserMd, FaConciergeBell, FaCalendarAlt, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
  { to: '/admin/users', label: 'Users', icon: <FaUsers /> },
  { to: '/admin/providers', label: 'Providers', icon: <FaUserMd /> },
  { to: '/admin/services', label: 'Services', icon: <FaConciergeBell /> },
  { to: '/admin/appointments', label: 'Appointments', icon: <FaCalendarAlt /> },
];

const AdminLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile Hamburger */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-3 rounded-full shadow-lg focus:outline-none"
        onClick={() => setOpen(true)}
        aria-label="Open admin menu"
      >
        <FaBars size={22} />
      </button>
      {/* Mobile Slider */}
      <div className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity duration-300 ${open ? 'block' : 'hidden'}`}
        onClick={() => setOpen(false)}
      ></div>
      {/* Sidebar only on mobile */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-700 text-white flex flex-col py-8 px-4 shadow-lg z-50 transform transition-transform duration-300 md:hidden ${open ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ minWidth: '16rem' }}
      >
        {/* Close button for mobile */}
        <button
          className="md:hidden absolute top-4 right-4 text-gray-300 hover:text-white text-2xl focus:outline-none"
          onClick={() => setOpen(false)}
          aria-label="Close admin menu"
        >
          <FaTimes />
        </button>
        <div className="mb-10 text-center">
          <div className="text-3xl font-bold tracking-tight">Admin Panel</div>
          <div className="text-xs text-gray-300 mt-1">Management Console</div>
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  isActive ? 'bg-gray-800 text-white shadow' : 'hover:bg-gray-800 hover:text-white text-gray-200'
                }`
              }
              onClick={() => setOpen(false)}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto pt-8 border-t border-gray-700 text-center">
          <a href="/" className="flex items-center justify-center gap-2 text-gray-300 hover:text-white text-sm">
            <FaSignOutAlt /> Back to Site
          </a>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout; 