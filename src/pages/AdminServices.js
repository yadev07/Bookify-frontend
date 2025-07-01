import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';
import AdminLayout from '../components/AdminLayout';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/api/admin/services', { params: { page } });
      setServices(data.results);
      setTotalPages(data.totalPages);
    } catch (err) {
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, [page]);

  const handleDelete = async id => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await api.delete(`/api/admin/services/${id}`);
      toast.success('Service deleted');
      fetchServices();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Services</h1>
        <p className="text-gray-600 mb-4">View and delete services. Ensure all listed services meet platform standards.</p>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 text-yellow-800 rounded">
          <strong>Tip:</strong> Deleting a service will remove it from all provider and user listings.
        </div>
      </div>
      <div className="space-y-4">
        {services.map(service => (
          <div key={service._id} className="p-6 bg-white border rounded-xl shadow flex justify-between items-center hover:shadow-md transition-shadow">
            <div>
              <div className="font-bold text-lg text-gray-900">{service.title}</div>
              <div className="text-sm text-gray-600">{service.description}</div>
              <div className="text-sm">Category: <span className="font-semibold text-yellow-700">{service.category}</span></div>
              <div className="text-sm">Price: <span className="font-semibold text-green-700">₹{service.price}</span> | Duration: <span className="font-semibold text-blue-700">{service.duration} min</span></div>
            </div>
            <button className="py-2 px-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition" onClick={() => handleDelete(service._id)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-8">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="px-4 py-2 bg-gray-200 rounded-lg font-semibold disabled:opacity-50">Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="px-4 py-2 bg-gray-200 rounded-lg font-semibold disabled:opacity-50">Next</button>
      </div>
    </AdminLayout>
  );
};

export default AdminServices; 