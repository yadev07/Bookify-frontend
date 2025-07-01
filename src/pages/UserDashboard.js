import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import BackButton from '../components/BackButton';
import { FaUserEdit, FaCalendarCheck, FaListAlt, FaStar, FaBell } from 'react-icons/fa';

const cardClass =
  'flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition cursor-pointer border border-gray-100';

const UserDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/api/user/dashboard');
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
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-gradient-to-br from-green-50 to-blue-100 rounded-xl shadow-lg">
      <BackButton />
      <h2 className="text-3xl font-extrabold mb-2 text-center text-green-800">Welcome, User!</h2>
      <p className="text-center text-lg mb-8 text-gray-700">Take charge of your appointments and profile. Book services, track your bookings, and more!</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link to="/profile" className={cardClass}>
          <FaUserEdit className="text-3xl text-blue-600 mb-2" />
          <span className="font-semibold">Edit Profile</span>
        </Link>
        <Link to="/services" className={cardClass}>
          <FaListAlt className="text-3xl text-green-600 mb-2" />
          <span className="font-semibold">Browse & Book Services</span>
        </Link>
        <Link to="/appointments" className={cardClass}>
          <FaCalendarCheck className="text-3xl text-purple-600 mb-2" />
          <span className="font-semibold">My Appointments</span>
          <span className="text-sm text-gray-500 mt-1">{stats?.totalAppointments || 0} total</span>
        </Link>
        <div className={cardClass}>
          <FaStar className="text-3xl text-yellow-400 mb-2" />
          <span className="font-semibold">My Reviews</span>
          <span className="text-sm text-gray-500 mt-1">Coming soon</span>
        </div>
        <div className={cardClass}>
          <FaBell className="text-3xl text-red-400 mb-2" />
          <span className="font-semibold">Notifications</span>
          <span className="text-sm text-gray-500 mt-1">Coming soon</span>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 