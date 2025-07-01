import React, { useEffect, useState, useCallback } from 'react';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';
import BackButton from '../components/BackButton';
import AdminLayout from '../components/AdminLayout';

const statusColors = {
  upcoming: 'bg-blue-100 text-blue-700',
  confirmed: 'bg-green-100 text-green-700',
  completed: 'bg-gray-100 text-gray-700',
  cancelled: 'bg-red-100 text-red-700',
};

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState(''); // Separate state for input
  const [startDate, setStartDate] = useState('');

  // Debounced search function
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId;
      return (searchTerm) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setSearch(searchTerm);
          setPage(1); // Reset to first page when searching
        }, 5000); // Wait 500ms after user stops typing
      };
    })(),
    []
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value); // Update input immediately for UI responsiveness
    debouncedSearch(value); // Debounce the actual search
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
        console.log('Frontend sending params:', params); // Debug log
        
        const { data } = await api.get('/api/admin/appointments', { params });
        console.log('API Response:', data); // Debug log
        setAppointments(data.results);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error('API Error:', err); // Debug log
        setAppointments([]);
        toast.error('Failed to fetch appointments');
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [page, status, search, startDate]);

  const handleDelete = async id => {
    if (!window.confirm('Delete this appointment?')) return;
    try {
      await api.delete(`/api/admin/appointments/${id}`);
      toast.success('Appointment deleted');
      setAppointments(appointments => appointments.filter(a => a._id !== id));
    } catch (err) {
      toast.error('Delete failed');
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
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Appointments</h1>
        <p className="text-gray-600 mb-4">View, filter, and delete appointments. Use filters to quickly find appointments by status, date, or service.</p>
        <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-4 text-purple-800 rounded">
          <strong>Tip:</strong> Deleting an appointment is permanent. Use filters to find specific records quickly.
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 p-6 bg-white rounded shadow">
        <BackButton />
        <h2 className="text-2xl font-bold mb-4">Manage Appointments</h2>
        
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
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {search || status || startDate ? 
                `No appointments found with current filters${search ? ` for service "${search}"` : ''}` : 
                'No appointments found'
              }
            </div>
          ) : (
            appointments.map(app => (
              <div key={app._id} className="p-6 bg-white border rounded-xl shadow hover:shadow-md transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Service Information */}
                  <div>
                    <h3 className="font-semibold text-lg text-blue-600">
                      {app.service?.title || 'Service Not Found'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {app.service?.description || 'No description'}
                    </p>
                    <p className="text-base font-medium text-gray-700">Price: ₹{app.service?.price || 'N/A'}</p>
                  </div>

                  {/* User Information */}
                  <div>
                    <h4 className="font-semibold text-gray-800">Customer</h4>
                    <p className="text-sm">{app.user?.name || 'User Not Found'}</p>
                    <p className="text-sm text-gray-600">{app.user?.email || 'No email'}</p>
                  </div>

                  {/* Provider Information */}
                  <div>
                    <h4 className="font-semibold text-gray-800">Provider</h4>
                    <p className="text-sm">{app.provider?.name || 'Provider Not Found'}</p>
                    <p className="text-sm text-gray-600">{app.provider?.email || 'No email'}</p>
                    <p className="text-sm text-gray-600">{app.provider?.contactInfo || 'No contact info'}</p>
                  </div>

                  {/* Appointment Details */}
                  <div>
                    <h4 className="font-semibold text-gray-800">Appointment Details</h4>
                    <p className="text-sm">
                      Date: {new Date(app.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm">
                      Time: {new Date(app.date).toLocaleTimeString()}
                    </p>
                    <span className={`inline-block px-2 py-1 text-xs rounded font-semibold mt-2 ${statusColors[app.status] || 'bg-gray-100 text-gray-700'}`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex justify-end">
                  <button 
                    className="py-2 px-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors" 
                    onClick={() => handleDelete(app._id)}
                  >
                    Delete Appointment
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <button 
              disabled={page <= 1} 
              onClick={() => setPage(page - 1)} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page {page} of {totalPages} ({appointments.length} appointments)
            </span>
            <button 
              disabled={page >= totalPages} 
              onClick={() => setPage(page + 1)} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminAppointments; 