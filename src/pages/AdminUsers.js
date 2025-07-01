import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';
import AdminLayout from '../components/AdminLayout';
import DetailsModal from '../components/DetailsModal';

const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?name=User&background=eee&color=888&size=128';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/api/admin/user', { params: { page } });
      setUsers(data.results);
      setTotalPages(data.totalPages);
    } catch (err) {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, [page]);

  const handleBlock = async (id, block) => {
    try {
      await api.put(`/api/admin/users/${id}/${block ? 'block' : 'unblock'}`);
      toast.success(block ? 'User blocked' : 'User unblocked');
      fetchUsers();
    } catch (err) {
      toast.error('Action failed');
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await api.delete(`/api/admin/users/${id}`);
      toast.success('User deleted');
      fetchUsers();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Users</h1>
        <p className="text-gray-600 mb-4">View, block, or delete users. Use these controls to maintain a safe and active user base.</p>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 text-blue-800 rounded">
          <strong>Tip:</strong> Blocked users cannot log in or book services. Deletion is permanent.
        </div>
      </div>
      <div className="space-y-4">
        {users.map(user => {
          const imgSrc = user.profilePic || user.profile || DEFAULT_AVATAR;
          return (
            <div key={user._id} className="p-6 bg-white border rounded-xl shadow flex justify-between items-center hover:shadow-md transition-shadow cursor-pointer min-h-[110px]" onClick={() => handleUserClick(user)}>
              <div className="flex items-center gap-4">
                <img
                  src={imgSrc}
                  alt={user.name + ' avatar'}
                  className="w-14 h-14 rounded-full object-cover border border-gray-200 shadow-sm"
                  onError={e => { e.target.onerror = null; e.target.src = DEFAULT_AVATAR; }}
                />
                <div>
                  <div className="font-bold text-lg text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.email}</div>
                  <div className="mt-1">
                    <span className={`inline-block px-2 py-1 text-xs rounded font-semibold ${user.isBlocked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {user.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                <button className="py-2 px-4 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition" onClick={() => handleBlock(user._id, !user.isBlocked)}>{user.isBlocked ? 'Unblock' : 'Block'}</button>
                <button className="py-2 px-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition" onClick={() => handleDelete(user._id)}>Delete</button>
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
      <DetailsModal open={modalOpen} onClose={() => setModalOpen(false)} title={selectedUser?.name || 'User Details'} details={selectedUser || {}} />
    </AdminLayout>
  );
};

export default AdminUsers; 