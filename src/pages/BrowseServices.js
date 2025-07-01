import React, { useEffect, useState, useRef } from 'react';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';
import BackButton from '../components/BackButton';

const BrowseServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [booking, setBooking] = useState(null); // service to book
  const [appointmentDateTime, setAppointmentDateTime] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentTab, setPaymentTab] = useState('card');
  const [fakeCard, setFakeCard] = useState('');
  const [fakeName, setFakeName] = useState('');
  const [fakeExpiry, setFakeExpiry] = useState('');
  const [fakeCVV, setFakeCVV] = useState('');
  const [fakeUPI, setFakeUPI] = useState('');
  const [fakeWallet, setFakeWallet] = useState('Paytm');
  const [fakeWalletMobile, setFakeWalletMobile] = useState('');
  const [fakeBank, setFakeBank] = useState('SBI');
  const [fakeBankName, setFakeBankName] = useState('');
  const searchTimeout = useRef();

  // Debounced search effect
  useEffect(() => {
    setLoading(true);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      const fetchServices = async () => {
        try {
          const { data } = await api.get('/api/services/search', { params: { q: search, page, limit: 4 } });
          setServices(data.results);
          setTotalPages(data.totalPages);
        } catch (err) {
          setServices([]);
        } finally {
          setLoading(false);
        }
      };
      fetchServices();
    }, 400); // 400ms debounce
    return () => clearTimeout(searchTimeout.current);
  }, [search, page]);

  const handleBook = async (service) => {
    setBooking(service);
    setAppointmentDateTime('');
  };

  const handlePayClick = (e) => {
    e.preventDefault();
    if (!appointmentDateTime) {
      toast.error('Please select date and time');
      return;
    }
    setShowPayment(true);
  };

  const resetPaymentFields = () => {
    setFakeCard(''); setFakeName(''); setFakeExpiry(''); setFakeCVV('');
    setFakeUPI(''); setFakeWallet('Paytm'); setFakeWalletMobile('');
    setFakeBank('SBI'); setFakeBankName(''); setPaymentTab('card');
  };

  const handleFakePayment = async (e) => {
    e.preventDefault();
    if (paymentTab === 'card') {
      if (!fakeCard || !fakeName || !fakeExpiry || !fakeCVV) {
        toast.error('Please fill all card details');
        return;
      }
    } else if (paymentTab === 'upi') {
      if (!fakeUPI) {
        toast.error('Please enter UPI ID');
        return;
      }
    } else if (paymentTab === 'wallet') {
      if (!fakeWallet || !fakeWalletMobile) {
        toast.error('Please select wallet and enter mobile number');
        return;
      }
    } else if (paymentTab === 'netbank') {
      if (!fakeBank || !fakeBankName) {
        toast.error('Please select bank and enter account holder name');
        return;
      }
    }
    setBookingLoading(true);
    try {
      // Parse date and time
      const dt = new Date(appointmentDateTime);
      const date = dt.toISOString().slice(0, 10); // YYYY-MM-DD
      const startTime = dt.toTimeString().slice(0, 5); // HH:mm
      // Set endTime as 1 hour after startTime
      const endDt = new Date(dt.getTime() + 60 * 60 * 1000);
      const endTime = endDt.toTimeString().slice(0, 5);
      await api.post('/api/user/appointments', {
        provider: booking.provider,
        service: booking._id,
        date,
        startTime,
        endTime,
      });
      toast.success('Appointment booked!');
      setBooking(null);
      setShowPayment(false);
      resetPaymentFields();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Booking failed');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl w-full mx-auto mt-12 p-4 md:p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl shadow-2xl border border-blue-100">
      <BackButton />
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 drop-shadow-lg">Browse & Book Services</h2>
      <div className="flex flex-col md:flex-row items-center mb-8 gap-4">
        <input
          type="text"
          placeholder="Search for amazing services..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="flex-1 px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg w-full md:w-auto"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 min-h-[200px]">
        {loading ? (
          <div className="col-span-full flex justify-center items-center min-h-[200px]">
            <LoadingSpinner />
          </div>
        ) : services.length > 0 ? (
          services.map(service => {
            console.log('Provider Address:', service.provider && service.provider.address);
            return (
              <div key={service._id} className="p-6 bg-white/80 rounded-2xl shadow-xl border border-gray-100 hover:scale-105 hover:shadow-2xl transition-transform duration-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    {/* Provider Image */}
                    {service.provider && (service.provider.profilePic || service.provider.profile) ? (
                      <div className="flex flex-col items-center mr-4">
                        <img
                          src={service.provider.profilePic || service.provider.profile}
                          alt="Provider"
                          className="w-20 h-20 rounded-full object-cover border-2 border-blue-200 shadow"
                          onError={e => { e.target.onerror = null; e.target.src = 'https://ui-avatars.com/api/?name=Provider'; }}
                        />
                        {service.provider.name && (
                          <span className="mt-2 text-lg font-semibold text-blue-700 text-center">{service.provider.name}</span>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center mr-4">
                        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold text-3xl border-2 border-blue-200 shadow">
                          P
                        </div>
                        {service.provider && service.provider.name && (
                          <span className="mt-2 text-lg font-semibold text-blue-700 text-center">{service.provider.name}</span>
                        )}
                      </div>
                    )}
                    <div className="font-bold text-2xl text-blue-700 flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></span>
                      {service.title}
                    </div>
                  </div>
                  <div className="text-base text-gray-600 mb-2">{service.description}</div>
                  <div className="text-sm text-purple-600 mb-1">Category: <span className="font-semibold">{service.category}</span></div>
                  <div className="text-sm text-gray-700">Price: <span className="font-semibold">₹{service.price}</span> | Duration: <span className="font-semibold">{service.duration} min</span></div>
                  {/* Provider Address */}
                  <div className="text-sm text-gray-500 mt-1">
                    <span className="font-semibold">Address:</span> {service.provider && service.provider.address && (service.provider.address.street || service.provider.address.city || service.provider.address.state || service.provider.address.zipCode || service.provider.address.country)
                      ? `${service.provider.address.street || ''}${service.provider.address.street ? ', ' : ''}${service.provider.address.city || ''}${service.provider.address.city ? ', ' : ''}${service.provider.address.state || ''}${service.provider.address.state ? ', ' : ''}${service.provider.address.zipCode || ''}${service.provider.address.zipCode ? ', ' : ''}${service.provider.address.country || ''}`.replace(/, $/, '')
                      : 'N/A'}
                  </div>
                </div>
                <button className="mt-6 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all text-lg" onClick={() => handleBook(service)}>Book Now</button>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-gray-500 py-8">No services found.</div>
        )}
      </div>
      <div className="flex justify-between items-center mt-8">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="px-6 py-2 bg-gray-200 rounded-full font-semibold text-gray-700 shadow hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition">Prev</button>
        <span className="text-lg text-gray-600">Page {page} of {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="px-6 py-2 bg-gray-200 rounded-full font-semibold text-gray-700 shadow hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition">Next</button>
      </div>
      {/* Booking Modal */}
      {booking && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition-all">
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl max-w-md w-full border border-blue-200 relative animate-fadeIn">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold" onClick={() => { setBooking(null); setShowPayment(false); resetPaymentFields(); }}>&times;</button>
            <h3 className="text-2xl font-bold mb-4 text-blue-700">Book: {booking.title}</h3>
            {!showPayment ? (
              <form className="space-y-6">
                <input
                  type="datetime-local"
                  value={appointmentDateTime}
                  onChange={e => setAppointmentDateTime(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg"
                  required
                />
                <div className="flex gap-4 justify-end">
                  <button onClick={handlePayClick} className="py-3 px-6 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-xl shadow hover:from-green-600 hover:to-blue-600 hover:scale-105 transition-all text-lg" disabled={bookingLoading}>{bookingLoading ? 'Processing...' : 'Pay'}</button>
                  <button type="button" className="py-3 px-6 bg-gray-300 rounded-xl font-semibold text-gray-700 shadow hover:bg-gray-400 transition-all text-lg" onClick={() => { setBooking(null); setShowPayment(false); resetPaymentFields(); }}>Cancel</button>
                </div>
              </form>
            ) : (
              <form className="space-y-6" onSubmit={handleFakePayment}>
                {/* Payment Tabs */}
                <div className="flex mb-4">
                  <button type="button" className={`flex-1 py-2 rounded-l-xl font-semibold border ${paymentTab==='card' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`} onClick={()=>setPaymentTab('card')}>Card</button>
                  <button type="button" className={`flex-1 py-2 font-semibold border-t border-b ${paymentTab==='upi' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`} onClick={()=>setPaymentTab('upi')}>UPI</button>
                  <button type="button" className={`flex-1 py-2 font-semibold border-t border-b ${paymentTab==='wallet' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`} onClick={()=>setPaymentTab('wallet')}>Wallet</button>
                  <button type="button" className={`flex-1 py-2 rounded-r-xl font-semibold border ${paymentTab==='netbank' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`} onClick={()=>setPaymentTab('netbank')}>Net Banking</button>
                </div>
                {/* Card Payment Form */}
                {paymentTab==='card' && (
                  <>
                    <input
                      type="text"
                      value={fakeCard}
                      onChange={e => setFakeCard(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg"
                      placeholder="Card Number"
                      maxLength={19}
                      required
                    />
                    <input
                      type="text"
                      value={fakeName}
                      onChange={e => setFakeName(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg"
                      placeholder="Cardholder Name"
                      required
                    />
                    <div className="flex gap-4">
                      <input
                        type="text"
                        value={fakeExpiry}
                        onChange={e => setFakeExpiry(e.target.value)}
                        className="w-1/2 px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg"
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                      />
                      <input
                        type="password"
                        value={fakeCVV}
                        onChange={e => setFakeCVV(e.target.value)}
                        className="w-1/2 px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg"
                        placeholder="CVV"
                        maxLength={4}
                        required
                      />
                    </div>
                  </>
                )}
                {/* UPI Payment Form */}
                {paymentTab==='upi' && (
                  <>
                    <input
                      type="text"
                      value={fakeUPI}
                      onChange={e => setFakeUPI(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg"
                      placeholder="Enter UPI ID (e.g. name@upi)"
                      required
                    />
                  </>
                )}
                {/* Wallet Payment Form */}
                {paymentTab==='wallet' && (
                  <>
                    <select
                      value={fakeWallet}
                      onChange={e => setFakeWallet(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg"
                      required
                    >
                      <option value="Paytm">Paytm</option>
                      <option value="PhonePe">PhonePe</option>
                      <option value="AmazonPay">Amazon Pay</option>
                      <option value="Mobikwik">Mobikwik</option>
                    </select>
                    <input
                      type="text"
                      value={fakeWalletMobile}
                      onChange={e => setFakeWalletMobile(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg"
                      placeholder="Mobile Number"
                      maxLength={10}
                      required
                    />
                  </>
                )}
                {/* Net Banking Payment Form */}
                {paymentTab==='netbank' && (
                  <>
                    <select
                      value={fakeBank}
                      onChange={e => setFakeBank(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg"
                      required
                    >
                      <option value="SBI">SBI</option>
                      <option value="HDFC">HDFC</option>
                      <option value="ICICI">ICICI</option>
                      <option value="Axis">Axis</option>
                      <option value="Kotak">Kotak</option>
                      <option value="PNB">PNB</option>
                    </select>
                    <input
                      type="text"
                      value={fakeBankName}
                      onChange={e => setFakeBankName(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg"
                      placeholder="Account Holder Name"
                      required
                    />
                  </>
                )}
                <div className="flex gap-4 justify-end">
                  <button type="submit" className="py-3 px-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl shadow hover:from-purple-600 hover:to-blue-600 hover:scale-105 transition-all text-lg" disabled={bookingLoading}>{bookingLoading ? 'Paying...' : 'Pay Now'}</button>
                  <button type="button" className="py-3 px-6 bg-gray-300 rounded-xl font-semibold text-gray-700 shadow hover:bg-gray-400 transition-all text-lg" onClick={() => { setShowPayment(false); resetPaymentFields(); }}>Back</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseServices; 