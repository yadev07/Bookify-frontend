import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';
import BackButton from '../components/BackButton';

const ProviderServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // {type: 'add'|'edit', service: {}}
  const [form, setForm] = useState({ title: '', category: '', description: '', price: '', duration: '' });
  const [saving, setSaving] = useState(false);

  const categoryOptions = ['Dental', 'Eye Care', 'General', 'Therapy', 'Other'];

  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/api/provider/services');
      setServices(data);
    } catch (err) {
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const openModal = (type, service = null) => {
    setModal({ type, service });
    setForm(service ? { ...service } : { title: '', category: '', description: '', price: '', duration: '' });
  };

  const closeModal = () => { setModal(null); setForm({ title: '', category: '', description: '', price: '', duration: '' }); };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      if (modal.type === 'add') {
        await api.post(`${process.env.REACT_APP_API_URL}/api/provider/services`, form);
        toast.success('Service added');
      } else {
        await api.put(`/api/provider/services/${modal.service._id}`, form);
        toast.success('Service updated');
      }
      closeModal();
      fetchServices();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await api.delete(`/api/provider/services/${id}`);
      toast.success('Service deleted');
      fetchServices();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-3xl shadow-2xl border border-purple-100">
      <BackButton />
      <h2 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-600 drop-shadow-lg">Manage My Services</h2>
      <button className="mb-8 py-3 px-6 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-xl shadow hover:from-green-600 hover:to-blue-600 hover:scale-105 transition-all text-lg" onClick={() => openModal('add')}>Add Service</button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {services.map(service => (
          <div key={service._id} className="p-6 bg-white/80 rounded-2xl shadow-xl border border-gray-100 hover:scale-105 hover:shadow-2xl transition-transform duration-200 flex flex-col justify-between">
            <div>
              <div className="font-bold text-2xl text-purple-700 mb-2 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse"></span>
                {service.title}
              </div>
              <div className="text-base text-gray-600 mb-2">{service.description}</div>
              <div className="text-sm text-blue-600 mb-1">Category: <span className="font-semibold">{service.category}</span></div>
              <div className="text-sm text-gray-700">Price: <span className="font-semibold">₹{service.price}</span> | Duration: <span className="font-semibold">{service.duration} min</span></div>
            </div>
            <div className="flex gap-2 mt-6 justify-end">
              <button className="py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all text-lg" onClick={() => openModal('edit', service)}>Edit</button>
              <button className="py-3 px-6 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl shadow hover:from-red-600 hover:to-pink-600 hover:scale-105 transition-all text-lg" onClick={() => handleDelete(service._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition-all">
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl max-w-md w-full border border-blue-200 relative animate-fadeIn">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold" onClick={closeModal}>&times;</button>
            <h3 className="text-2xl font-bold mb-4 text-blue-700">{modal.type === 'add' ? 'Add Service' : 'Edit Service'}</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <label className="block font-semibold">Title</label>
              <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg" required />
              <label className="block font-semibold">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-lg"
                required
              >
                <option value="">Select category</option>
                {categoryOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
                <option value={form.category} hidden>{form.category}</option>
              </select>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Or enter custom category"
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-lg mt-2"
              />
              <label className="block font-semibold">Description</label>
              <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg" />
              <label className="block font-semibold">Price</label>
              <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg" required />
              <label className="block font-semibold">Duration (min)</label>
              <input type="number" name="duration" value={form.duration} onChange={handleChange} placeholder="Duration (min)" className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg" required />
              <div className="flex gap-4 justify-end">
                <button type="submit" className="py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all text-lg" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
                <button type="button" className="py-3 px-6 bg-gray-300 rounded-xl font-semibold text-gray-700 shadow hover:bg-gray-400 transition-all text-lg" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderServices; 