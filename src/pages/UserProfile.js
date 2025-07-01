import React, { useEffect, useState, useRef, useContext } from 'react';
import api from '../api/axios';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';
import BackButton from '../components/BackButton';
import ImageCropper from '../components/ImageCropper';
import { AuthContext } from '../contexts/AuthContext';
import { FaUserCircle, FaCamera, FaSave, FaUser, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const UserProfile = () => {
  const { updateAuth } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    username: '',
    phone: '',
    age: '',
    gender: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
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
        const { data } = await api.get('/api/user/profile');
        setProfile(data);
        setForm({ 
          name: data.name || '', 
          email: data.email || '', 
          username: data.username || '',
          phone: data.phone || '',
          age: data.age || '',
          gender: data.gender || '',
          address: {
            street: data.address?.street || '',
            city: data.address?.city || '',
            state: data.address?.state || '',
            zipCode: data.address?.zipCode || '',
            country: data.address?.country || ''
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
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.put('/api/user/profile', form);
      setProfile(data);
      // Update auth context with new profile data
      updateAuth({
        name: data.name,
        email: data.email,
        username: data.username,
        phone: data.phone,
        age: data.age,
        gender: data.gender,
        address: data.address
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
      const { data } = await api.post('/api/user/profile/picture', formData, { 
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

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <div className="max-w-2xl mx-auto mt-10 p-8 bg-gradient-to-br from-blue-50 to-green-100 rounded-xl shadow-lg">
        <BackButton />
        <h2 className="text-2xl font-extrabold mb-2 text-center text-blue-800 flex items-center justify-center gap-2">
          <FaUserCircle /> Edit Your Profile
        </h2>
        <p className="text-center text-gray-600 mb-6">Keep your information up to date for a better experience!</p>
        
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 shadow" />
            ) : (
              <FaUserCircle className="w-28 h-28 text-gray-300 border-4 border-blue-200 rounded-full shadow" />
            )}
            <button
              className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition group-hover:scale-110"
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
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-700">
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
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300" 
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
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300" 
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
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300" 
                  required 
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
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300" 
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Age</label>
                <input 
                  type="number" 
                  name="age" 
                  value={form.age} 
                  onChange={handleChange} 
                  placeholder="Age" 
                  min="0" 
                  max="120"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300" 
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Gender</label>
                <select 
                  name="gender" 
                  value={form.gender} 
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
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

          {/* Address Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-700">
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
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300" 
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
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300" 
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
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300" 
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
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300" 
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
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300" 
                />
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 text-blue-700">Security</h3>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">New Password <span className="text-gray-400">(optional)</span></label>
              <input 
                type="password" 
                name="password" 
                value={form.password} 
                onChange={handleChange} 
                placeholder="New Password (leave blank to keep current)" 
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition text-lg" 
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

export default UserProfile; 