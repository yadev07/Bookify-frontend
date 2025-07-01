import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import BackButton from '../components/BackButton';
import { FaUserEdit, FaCalendarAlt, FaListUl, FaClock, FaStar, FaMoneyBillWave } from 'react-icons/fa';

const cardClass =
  'flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition cursor-pointer border border-gray-100';

const ProviderDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/api/provider/dashboard');
        setStats(data);
      } catch (err) {
        setStats(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-gradient-to-br from-blue-50 to-purple-100 rounded-xl shadow-lg">
      <BackButton />
      <h2 className="text-3xl font-extrabold mb-2 text-center text-blue-800">Welcome, Provider!</h2>
      <p className="text-center text-lg mb-8 text-gray-700">Empower your business. Manage your profile, services, appointments, and more from one place.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link to="/provider/profile" className={cardClass}>
          <FaUserEdit className="text-3xl text-blue-600 mb-2" />
          <span className="font-semibold">Edit Profile</span>
        </Link>
        <Link to="/provider/services" className={cardClass}>
          <FaListUl className="text-3xl text-green-600 mb-2" />
          <span className="font-semibold">Manage Services</span>
          <span className="text-sm text-gray-500 mt-1">{stats?.totalServices || 0} services</span>
        </Link>
        <Link to="/provider/appointments" className={cardClass}>
          <FaCalendarAlt className="text-3xl text-purple-600 mb-2" />
          <span className="font-semibold">View Appointments</span>
          <span className="text-sm text-gray-500 mt-1">{stats?.totalAppointments || 0} total</span>
        </Link>
        <Link to="/provider/availability" className={cardClass}>
          <FaClock className="text-3xl text-yellow-500 mb-2" />
          <span className="font-semibold">Set Availability</span>
        </Link>
        <div className={cardClass}>
          <FaStar className="text-3xl text-yellow-400 mb-2" />
          <span className="font-semibold">My Reviews</span>
          <span className="text-sm text-gray-500 mt-1">Coming soon</span>
        </div>
        <div className={cardClass}>
          <FaMoneyBillWave className="text-3xl text-green-500 mb-2" />
          <span className="font-semibold">Earnings</span>
          <span className="text-sm text-gray-500 mt-1">Coming soon</span>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard; 