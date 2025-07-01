import React, { useEffect, useState, useRef, useContext } from 'react';
import api from '../api/axios';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';
import BackButton from '../components/BackButton';
import ImageCropper from '../components/ImageCropper';
import { AuthContext } from '../contexts/AuthContext';
import { FaUserMd, FaCamera, FaSave, FaUser, FaPhone, FaMapMarkerAlt, FaClock, FaInfoCircle } from 'react-icons/fa';

const ProviderProfile = () => {
  const { updateAuth } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    username: '',
    phone: '',
    dob: '',
    gender: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    bio: '',
    specialization: '',
    experience: '',
    contactInfo: '',
    available: {
      monday: { start: '09:00', end: '17:00', isAvailable: true },
      tuesday: { start: '09:00', end: '17:00', isAvailable: true },
      wednesday: { start: '09:00', end: '17:00', isAvailable: true },
      thursday: { start: '09:00', end: '17:00', isAvailable: true },
      friday: { start: '09:00', end: '17:00', isAvailable: true },
      saturday: { start: '09:00', end: '14:00', isAvailable: true },
      sunday: { start: '00:00', end: '00:00', isAvailable: false }
    },
    password: '' 
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  const [showCropper, setShowCropper] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInput = useRef();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/api/provider/profile');
        setProfile(data);
        setForm({ 
          name: data.name || '', 
          email: data.email || '', 
          username: data.username || '',
          phone: data.phone || '',
          dob: data.dob ? data.dob.slice(0, 10) : '',
          gender: data.gender || '',
          address: {
            street: data.address?.street || '',
            city: data.address?.city || '',
            state: data.address?.state || '',
            zipCode: data.address?.zipCode || '',
            country: data.address?.country || ''
          },
          bio: data.bio || '',
          specialization: data.specialization || '',
          experience: data.experience || '',
          contactInfo: data.contactInfo || '',
          available: data.available || {
            monday: { start: '09:00', end: '17:00', isAvailable: true },
            tuesday: { start: '09:00', end: '17:00', isAvailable: true },
            wednesday: { start: '09:00', end: '17:00', isAvailable: true },
            thursday: { start: '09:00', end: '17:00', isAvailable: true },
            friday: { start: '09:00', end: '17:00', isAvailable: true },
            saturday: { start: '09:00', end: '14:00', isAvailable: true },
            sunday: { start: '00:00', end: '00:00', isAvailable: false }
          },
          password: '' 
        });
        setProfilePic(data.profilePic || data.profile || '');
      } catch (err) {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setForm(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else if (name.startsWith('available.')) {
      const [day, field] = name.split('.').slice(1);
      setForm(prev => ({
        ...prev,
        available: {
          ...prev.available,
          [day]: {
            ...prev.available[day],
            [field]: field === 'isAvailable' ? value === 'true' : value
          }
        }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.put('/api/provider/profile', form);
      setProfile(data);
      // Update auth context with new profile data
      updateAuth({
        name: data.name,
        email: data.email,
        username: data.username,
        phone: data.phone,
        dob: data.dob,
        gender: data.gender,
        address: data.address,
        bio: data.bio,
        specialization: data.specialization,
        experience: data.experience,
        contactInfo: data.contactInfo,
        available: data.available
      });
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }
    
    setSelectedImage(file);
    setShowCropper(true);
  };

  const handleCropComplete = async (croppedFile) => {
    setShowCropper(false);
    setSelectedImage(null);
    
    const formData = new FormData();
    formData.append('profilePic', croppedFile);
    
    try {
      const { data } = await api.post('/api/provider/profile/picture', formData, { 
        headers: { 'Content-Type': 'multipart/form-data' } 
      });
      setProfilePic(data.profilePic);
      // Update auth context with new profile picture
      updateAuth({
        profilePic: data.profilePic,
        profile: data.profilePic
      });
      toast.success('Profile picture updated successfully!');
    } catch (err) {
      toast.error('Failed to upload profile picture');
    }
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setSelectedImage(null);
    if (fileInput.current) {
      fileInput.current.value = '';
    }
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <div className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-br from-purple-50 to-blue-100 rounded-xl shadow-lg">
        <BackButton />
        <h2 className="text-2xl font-extrabold mb-2 text-center text-purple-800 flex items-center justify-center gap-2">
          <FaUserMd /> Edit Provider Profile
        </h2>
        <p className="text-center text-gray-600 mb-6">Keep your professional details up to date for your clients!</p>
        
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-purple-200 shadow" />
            ) : (
              <FaUserMd className="w-28 h-28 text-gray-300 border-4 border-purple-200 rounded-full shadow" />
            )}
            <button
              className="absolute bottom-2 right-2 bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition group-hover:scale-110"
              onClick={() => fileInput.current.click()}
              title="Change profile picture"
            >
              <FaCamera />
            </button>
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInput} 
              onChange={handleImageSelect} 
              className="hidden" 
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-purple-700">
              <FaUser /> Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  placeholder="Full Name" 
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300" 
                  required 
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Username *</label>
                <input 
                  type="text" 
                  name="username" 
                  value={form.username} 
                  onChange={handleChange} 
                  placeholder="Username" 
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300" 
                  required 
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Email *</label>
                <input 
                  type="email" 
                  name="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  placeholder="Email Address" 
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300" 
                  required 
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                  <FaPhone /> Contact Info
                </label>
                <input 
                  type="text" 
                  name="contactInfo" 
                  value={form.contactInfo} 
                  onChange={handleChange} 
                  placeholder="Contact Information" 
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300" 
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Phone</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={form.phone} 
                  onChange={handleChange} 
                  placeholder="Phone Number" 
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300" 
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Date of Birth</label>
                <input 
                  type="date" 
                  name="dob" 
                  value={form.dob} 
                  onChange={handleChange} 
                  placeholder="Date of Birth" 
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300" 
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Gender</label>
                <select 
                  name="gender" 
                  value={form.gender} 
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-purple-700">
              <FaInfoCircle /> About You
            </h3>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Bio</label>
              <textarea 
                name="bio" 
                value={form.bio} 
                onChange={handleChange} 
                placeholder="Tell clients about yourself, your experience, and expertise..." 
                rows="4"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300" 
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-1">Specialization</label>
              <input 
                type="text" 
                name="specialization" 
                value={form.specialization} 
                onChange={handleChange} 
                placeholder="e.g. Dentist, Optometrist, Therapist..." 
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300" 
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-1">Experience (years)</label>
              <input 
                type="number" 
                name="experience" 
                value={form.experience} 
                onChange={handleChange} 
                placeholder="Years of experience" 
                min="0" 
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300" 
              />
            </div>
          </div>

          {/* Address Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-purple-700">
              <FaMapMarkerAlt /> Address Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-1">Street Address</label>
                <input 
                  type="text" 
                  name="address.street" 
                  value={form.address.street} 
                  onChange={handleChange} 
                  placeholder="Street Address" 
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300" 
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">City</label>
                <input 
                  type="text" 
                  name="address.city" 
                  value={form.address.city} 
                  onChange={handleChange} 
                  placeholder="City" 
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300" 
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">State</label>
                <input 
                  type="text" 
                  name="address.state" 
                  value={form.address.state} 
                  onChange={handleChange} 
                  placeholder="State" 
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300" 
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">ZIP Code</label>
                <input 
                  type="text" 
                  name="address.zipCode" 
                  value={form.address.zipCode} 
                  onChange={handleChange} 
                  placeholder="ZIP Code" 
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300" 
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Country</label>
                <input 
                  type="text" 
                  name="address.country" 
                  value={form.address.country} 
                  onChange={handleChange} 
                  placeholder="Country" 
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300" 
                />
              </div>
            </div>
          </div>

          {/* Availability Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-purple-700">
              <FaClock /> Weekly Availability
            </h3>
            <div className="space-y-4">
              {days.map(day => (
                <div key={day} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        name={`available.${day}.isAvailable`}
                        checked={form.available[day].isAvailable}
                        onChange={(e) => handleChange({
                          target: { name: `available.${day}.isAvailable`, value: e.target.checked.toString() }
                        })}
                        className="mr-2"
                      />
                      <span className="font-semibold capitalize">{day}</span>
                    </label>
                  </div>
                  {form.available[day].isAvailable && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Start Time</label>
                        <input 
                          type="time" 
                          name={`available.${day}.start`}
                          value={form.available[day].start} 
                          onChange={handleChange}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300" 
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm mb-1">End Time</label>
                        <input 
                          type="time" 
                          name={`available.${day}.end`}
                          value={form.available[day].end} 
                          onChange={handleChange}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300" 
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Password Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 text-purple-700">Security</h3>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">New Password <span className="text-gray-400">(optional)</span></label>
              <input 
                type="password" 
                name="password" 
                value={form.password} 
                onChange={handleChange} 
                placeholder="New Password (leave blank to keep current)" 
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-purple-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-purple-700 transition text-lg" 
            disabled={saving}
          >
            <FaSave /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>

      {/* Image Cropper Modal */}
      {showCropper && selectedImage && (
        <ImageCropper
          image={selectedImage}
          onCrop={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}
    </>
  );
};

export default ProviderProfile; 