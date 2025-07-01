import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';
import AdminLayout from '../components/AdminLayout';
import DetailsModal from '../components/DetailsModal';

const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?name=Provider&background=eee&color=888&size=128';

const AdminProviders = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/api/admin/providers', { params: { page } });
      setProviders(data.results);
      setTotalPages(data.totalPages);
    } catch (err) {
      setProviders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProviders(); }, [page]);

  const handleBlock = async (id, block) => {
    try {
      await api.put(`/api/admin/providers/${id}/${block ? 'block' : 'unblock'}`);
      toast.success(block ? 'Provider blocked' : 'Provider unblocked');
      fetchProviders();
    } catch (err) {
      toast.error('Action failed');
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this provider?')) return;
    try {
      await api.delete(`/api/admin/providers/${id}`);
      toast.success('Provider deleted');
      fetchProviders();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const handleProviderClick = (provider) => {
    setSelectedProvider(provider);
    setModalOpen(true);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Providers</h1>
        <p className="text-gray-600 mb-4">View, block, or delete providers. Ensure only qualified professionals are active on the platform.</p>
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4 text-green-800 rounded">
          <strong>Tip:</strong> Blocked providers cannot offer services or receive bookings. Deletion is permanent.
        </div>
      </div>
      <div className="space-y-4">
        {providers.map(provider => {
          const imgSrc = provider.profilePic || provider.profile || DEFAULT_AVATAR;
          return (
            <div key={provider._id} className="p-6 bg-white border rounded-xl shadow flex justify-between items-center hover:shadow-md transition-shadow cursor-pointer min-h-[110px]" onClick={() => handleProviderClick(provider)}>
              <div className="flex items-center gap-4">
                <img
                  src={imgSrc}
                  alt={provider.name + ' avatar'}
                  className="w-14 h-14 rounded-full object-cover border border-gray-200 shadow-sm"
                  onError={e => { e.target.onerror = null; e.target.src = DEFAULT_AVATAR; }}
                />
                <div>
                  <div className="font-bold text-lg text-gray-900">{provider.name}</div>
                  <div className="text-sm text-gray-600">{provider.email}</div>
                  <div className="mt-1">
                    <span className={`inline-block px-2 py-1 text-xs rounded font-semibold ${provider.isBlocked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {provider.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                <button className="py-2 px-4 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition" onClick={() => handleBlock(provider._id, !provider.isBlocked)}>{provider.isBlocked ? 'Unblock' : 'Block'}</button>
                <button className="py-2 px-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition" onClick={() => handleDelete(provider._id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-8">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="px-4 py-2 bg-gray-200 rounded-lg font-semibold disabled:opacity-50">Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="px-4 py-2 bg-gray-200 rounded-lg font-semibold disabled:opacity-50">Next</button>
      </div>
      <DetailsModal open={modalOpen} onClose={() => setModalOpen(false)} title={selectedProvider?.name || 'Provider Details'} details={selectedProvider || {}} />
    </AdminLayout>
  );
};

export default AdminProviders;