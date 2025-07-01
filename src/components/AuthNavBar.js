import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { FaUser, FaSignOutAlt, FaCog, FaHome, FaCalendar, FaList, FaUsers, FaUserMd, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';

const AuthNavBar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [open, setOpen] = useState(false);

  // Temporary debug log
  console.log('Auth data in AuthNavBar:', auth);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowProfileDropdown(false);
    setOpen(false);
  };

  const getNavLinks = () => {
    if (auth?.role === 'user') {
      return [
        { to: '/dashboard', label: 'Dashboard', icon: <FaHome /> },
        { to: '/services', label: 'Book Services', icon: <FaList /> },
        { to: '/appointments', label: 'My Appointments', icon: <FaCalendar /> }
      ];
    } else if (auth?.role === 'provider') {
      return [
        { to: '/provider/dashboard', label: 'Dashboard', icon: <FaHome /> },
        { to: '/provider/services', label: 'My Services', icon: <FaList /> },
        { to: '/provider/appointments', label: 'Appointments', icon: <FaCalendar /> }
      ];
    } else if (auth?.role === 'admin') {
      return [
        { to: '/admin/dashboard', label: 'Dashboard', icon: <FaHome /> },
        { to: '/admin/users', label: 'Users', icon: <FaUsers /> },
        { to: '/admin/providers', label: 'Providers', icon: <FaUserMd /> },
        { to: '/admin/appointments', label: 'Appointments', icon: <FaCalendar /> },
        { to: '/admin/services', label: 'Services', icon: <FaList /> }
      ];
    }
    return [];
  };

  const getProfileLink = () => {
    if (auth?.role === 'user') return '/profile';
    if (auth?.role === 'provider') return '/provider/profile';
    return '/admin/dashboard';
  };

  return (
    <nav className="bg-white border-b border-gray-200 text-gray-900 shadow-sm sticky top-0 z-50 w-full">
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
          {getNavLinks().map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 hover:bg-gray-800 hover:text-white text-gray-200"
              onClick={() => setOpen(false)}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg font-medium transition-colors duration-200 hover:bg-gray-800 hover:text-white text-gray-200"
          >
            <FaSignOutAlt className="text-red-400" /> Logout
          </button>
        </nav>
      </aside>
      {/* Desktop NavBar */}
      <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
        <Link to="/" className="flex items-center space-x-2 text-2xl md:text-3xl font-bold tracking-wide hover:text-blue-600 transition-colors duration-200">
          <span>Bookify</span>
        </Link>
        <div className="flex items-center space-x-2">
          {getNavLinks().map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
            >
              <span className="text-blue-600">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
        <div className="relative ml-4">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-sm border-2 border-white"
          >
            {auth?.profilePic || auth?.profile ? (
              <img 
                src={auth.profilePic || auth.profile} 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover border-2 border-white"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
            ) : null}
            <FaUser className={`text-white text-lg font-bold ${auth?.profilePic || auth?.profile ? 'hidden' : ''}`} />
          </button>
          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">
                  {auth?.name || auth?.email || 'User'}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {auth?.role || 'User'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200"
              >
                <FaSignOutAlt className="text-red-500" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AuthNavBar; 