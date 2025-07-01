import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import AdminLayout from '../components/AdminLayout';
import { FaUsers, FaUserMd, FaConciergeBell, FaCalendarAlt } from 'react-icons/fa';

const statCards = [
  { label: 'Users', icon: <FaUsers className="text-blue-500 text-3xl" />, color: 'from-blue-100 to-blue-50', key: 'totalUsers', link: '/admin/users' },
  { label: 'Providers', icon: <FaUserMd className="text-green-500 text-3xl" />, color: 'from-green-100 to-green-50', key: 'totalProviders', link: '/admin/providers' },
  { label: 'Appointments', icon: <FaCalendarAlt className="text-purple-500 text-3xl" />, color: 'from-purple-100 to-purple-50', key: 'totalAppointments', link: '/admin/appointments' },
  { label: 'Services', icon: <FaConciergeBell className="text-yellow-500 text-3xl" />, color: 'from-yellow-100 to-yellow-50', key: 'totalServices', link: '/admin/services' },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/api/admin/dashboard');
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
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome, Admin!</h1>
        <p className="text-lg text-gray-600 mb-4">This is your management dashboard. Use the sidebar to navigate between users, providers, services, and appointments. All actions are logged for security.</p>
        <div className="bg-gray-100 rounded-lg p-4 text-gray-700 text-sm">
          <strong>Tip:</strong> Regularly review user and provider activity to ensure platform security and quality.
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map(card => (
          <a
            key={card.label}
            href={card.link}
            className={`bg-gradient-to-br ${card.color} rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400`}
            style={{ textDecoration: 'none' }}
          >
            {card.icon}
            <div className="text-lg font-semibold mt-2">{card.label}</div>
            <div className="text-3xl font-bold mt-1">{stats?.[card.key] || 0}</div>
          </a>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard; 