import React, { useEffect, useState, useCallback } from 'react';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';
import BackButton from '../components/BackButton';

const ProviderAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');

  // Debounced search function
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId;
      return (searchTerm) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setSearch(searchTerm);
          setPage(1);
        }, 5000);
      };
    })(),
    []
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  // Handle search button click
  const handleSearchClick = () => {
    setSearch(searchInput);
    setPage(1);
  };

  // Handle Enter key press
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const params = { page, status, search, startDate };
        const { data } = await api.get('/api/provider/appointments', { params });
        setAppointments(data.results);
        setTotalPages(data.totalPages);
      } catch (err) {
        setAppointments([]);
        toast.error('Failed to fetch appointments');
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [page, status, search, startDate]);

  const handleConfirm = async (id) => {
    try {
      await api.put(`/api/provider/appointments/${id}/confirm`);
      toast.success('Appointment confirmed');
      setAppointments(appointments => appointments.map(a => a._id === id ? { ...a, status: 'confirmed' } : a));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Confirm failed');
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this appointment?')) return;
    try {
      await api.put(`/api/provider/appointments/${id}/cancel`);
      toast.success('Appointment cancelled');
      setAppointments(appointments => appointments.map(a => a._id === id ? { ...a, status: 'cancelled', isCancelled: true } : a));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Cancel failed');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'text-blue-600';
      case 'confirmed': return 'text-green-600';
      case 'completed': return 'text-gray-600';
      case 'cancelled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const clearFilters = () => {
    setSearchInput('');
    setSearch('');
    setStatus('');
    setStartDate('');
    setPage(1);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto mt-12 p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl shadow-2xl border border-blue-100">
      <BackButton />
      <h2 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 drop-shadow-lg">My Appointments</h2>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="flex gap-2 items-center">
          <input 
            type="text" 
            value={searchInput} 
            onChange={handleSearchChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base w-full"
            placeholder="Search..."
          />
        </div>
        <select 
          value={status} 
          onChange={e => { setStatus(e.target.value); setPage(1); }} 
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-base transition-all"
        >
          <option value="">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <input 
          type="date" 
          value={startDate} 
          onChange={e => { setStartDate(e.target.value); setPage(1); }} 
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-base transition-all"
        />
        <button 
          onClick={clearFilters}
          className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-sm hover:bg-gray-600 transition-all text-base"
        >
          Clear
        </button>
      </div>
      {/* Appointments List */}
      <div className="space-y-6">
        {appointments.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-xl font-semibold">
            {search || status || startDate ? 
              `No appointments found with current filters${search ? ` for service \"${search}\"` : ''}` : 
              'No appointments found'
            }
          </div>
        ) : (
          appointments.map(app => {
            console.log('Customer User Object:', app.user);
            return (
              <div key={app._id} className="p-8 bg-white/80 rounded-2xl shadow-xl border border-gray-100 hover:scale-[1.02] hover:shadow-2xl transition-transform duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
                  {/* Service Information */}
                  <div>
                    <h3 className="font-bold text-2xl text-blue-700 mb-1 flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></span>
                      {app.service?.title || 'Service Not Found'}
                    </h3>
                    <p className="text-base text-gray-600 mb-1">{app.service?.description || 'No description'}</p>
                    <p className="text-base font-medium text-gray-700">Price: ₹{app.service?.price || 'N/A'}</p>
                  </div>
                  {/* Customer Information */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Customer</h4>
                    <div className="flex items-center gap-3 mb-1">
                      <img
                        src={
                          app.user && app.user.profilePic
                            ? app.user.profilePic
                            : app.user && app.user.profile
                            ? app.user.profile
                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(app.user?.name || 'User')}`
                        }
                        alt="Customer"
                        className="w-20 h-20 rounded-full object-cover border-2 border-blue-200 shadow"
                        onError={e => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(app.user?.name || 'User')}`;
                        }}
                      />
                      <div>
                        <p className="text-base font-semibold">{app.user?.name || 'User Not Found'}</p>
                        <p className="text-base text-gray-600">{app.user?.email || 'No email'}</p>
                      </div>
                    </div>
                  </div>
                  {/* Appointment Details */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Appointment Details</h4>
                    <p className="text-base">Date: <span className="font-semibold">{new Date(app.date).toLocaleDateString()}</span></p>
                    <p className="text-base">Time: <span className="font-semibold">{new Date(app.date).toLocaleTimeString()}</span></p>
                    <span className={`inline-block mt-2 px-3 py-1 text-sm rounded-full font-bold shadow ${getStatusColor(app.status)} bg-opacity-10 border border-current`}>Status: {app.status.charAt(0).toUpperCase() + app.status.slice(1)}</span>
                  </div>
                  {/* Actions */}
                  <div className="flex flex-col gap-4 items-end">
                    {app.status === 'upcoming' && (
                      <button 
                        className="py-3 px-6 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-xl shadow hover:from-green-600 hover:to-blue-600 hover:scale-105 transition-all text-lg" 
                        onClick={() => handleConfirm(app._id)}
                      >
                        Confirm
                      </button>
                    )}
                    {app.status !== 'cancelled' && (
                      <button 
                        className="py-3 px-6 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl shadow hover:from-red-600 hover:to-pink-600 hover:scale-105 transition-all text-lg" 
                        onClick={() => handleCancel(app._id)}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-10">
          <button 
            disabled={page <= 1} 
            onClick={() => setPage(page - 1)} 
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-lg"
          >
            Previous
          </button>
          <span className="text-lg text-gray-600">Page {page} of {totalPages} ({appointments.length} appointments)</span>
          <button 
            disabled={page >= totalPages} 
            onClick={() => setPage(page + 1)} 
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-lg"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProviderAppointments; 