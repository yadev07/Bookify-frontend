import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/NavBar';
import AuthNavBar from './components/AuthNavBar';
import Footer from './components/Footer';
import { useLocation } from 'react-router-dom';

function AppContent() {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  
  return (
    <>
      {/* Persistent Bookify logo at top right (mobile only) */}
      <div className="fixed top-4 right-6 z-50 select-none md:hidden">
        <span className="text-2xl font-bold tracking-wide text-blue-600 drop-shadow-lg cursor-pointer">Bookify</span>
      </div>
      {auth ? <AuthNavBar /> : <NavBar />}
      {/* Main content wrapper for mobile, now for all pages including admin */}
      <div className="bg-white md:bg-transparent rounded-b-2xl md:rounded-none shadow md:shadow-none mt-16 md:mt-0 px-2 md:px-0 pb-2 md:pb-0 min-h-[calc(100vh-120px)] transition-all duration-300">
        <AppRoutes />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App; 