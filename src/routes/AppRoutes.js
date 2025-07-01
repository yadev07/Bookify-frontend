import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import UserLogin from '../pages/UserLogin';
import UserRegister from '../pages/UserRegister';
import ProviderLogin from '../pages/ProviderLogin';
import ProviderRegister from '../pages/ProviderRegister';
import AdminLogin from '../pages/AdminLogin';
import UserDashboard from '../pages/UserDashboard';
import UserProfile from '../pages/UserProfile';
import BrowseServices from '../pages/BrowseServices';
import MyAppointments from '../pages/MyAppointments';
import ProviderDashboard from '../pages/ProviderDashboard';
import ProviderProfile from '../pages/ProviderProfile';
import ProviderServices from '../pages/ProviderServices';
import ProviderAppointments from '../pages/ProviderAppointments';
import AdminDashboard from '../pages/AdminDashboard';
import AdminUsers from '../pages/AdminUsers';
import AdminProviders from '../pages/AdminProviders';
import AdminAppointments from '../pages/AdminAppointments';
import AdminServices from '../pages/AdminServices';
import NotFound from '../pages/NotFound';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Other from '../pages/Other';
import GetStarted from '../pages/GetStarted';
import { AuthContext } from '../contexts/AuthContext';
// Import dashboard and other pages as implemented

// Simple route protection
const PrivateRoute = ({ children, role }) => {
  const { auth } = useContext(AuthContext);
  if (!auth || (role && auth.role !== role)) return <Navigate to="/login" />;
  return children;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<UserLogin />} />
    <Route path="/register" element={<UserRegister />} />
    <Route path="/user/login" element={<UserLogin />} />
    <Route path="/user/register" element={<UserRegister />} />
    <Route path="/provider/login" element={<ProviderLogin />} />
    <Route path="/provider/register" element={<ProviderRegister />} />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/other" element={<Other />} />
    <Route path="/get-started" element={<GetStarted />} />
    {/* User protected routes */}
    <Route path="/dashboard" element={<PrivateRoute role="user"><UserDashboard /></PrivateRoute>} />
    <Route path="/profile" element={<PrivateRoute role="user"><UserProfile /></PrivateRoute>} />
    <Route path="/services" element={<PrivateRoute role="user"><BrowseServices /></PrivateRoute>} />
    <Route path="/appointments" element={<PrivateRoute role="user"><MyAppointments /></PrivateRoute>} />
    {/* Provider protected routes */}
    <Route path="/provider/dashboard" element={<PrivateRoute role="provider"><ProviderDashboard /></PrivateRoute>} />
    <Route path="/provider/profile" element={<PrivateRoute role="provider"><ProviderProfile /></PrivateRoute>} />
    <Route path="/provider/services" element={<PrivateRoute role="provider"><ProviderServices /></PrivateRoute>} />
    <Route path="/provider/appointments" element={<PrivateRoute role="provider"><ProviderAppointments /></PrivateRoute>} />
    {/* Admin protected routes */}
    <Route path="/admin/dashboard" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
    <Route path="/admin/users" element={<PrivateRoute role="admin"><AdminUsers /></PrivateRoute>} />
    <Route path="/admin/providers" element={<PrivateRoute role="admin"><AdminProviders /></PrivateRoute>} />
    <Route path="/admin/appointments" element={<PrivateRoute role="admin"><AdminAppointments /></PrivateRoute>} />
    <Route path="/admin/services" element={<PrivateRoute role="admin"><AdminServices /></PrivateRoute>} />
    {/* Add provider and admin routes here */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes; 