import React from 'react';

const getProfileImage = (details) => {
  // Try common keys for profile image
  return (
    details.profilePic ||
    details.profile ||
    details.avatar ||
    null
  );
};

const DetailsModal = ({ open, onClose, title, details }) => {
  if (!open) return null;
  const profileImg = getProfileImage(details);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-2xl w-[80%] max-w-3xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-900 text-2xl font-bold focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">{title}</h2>
        {profileImg && (
          <div className="flex justify-center mb-4">
            <img
              src={profileImg}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 shadow"
              onError={e => { e.target.style.display = 'none'; }}
            />
          </div>
        )}
        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
          {Object.entries(details).map(([key, value]) => {
            if (key.toLowerCase().includes('password')) return null;
            if (["profilePic", "profile", "avatar"].includes(key)) return null;
            if (typeof value === 'object' && value !== null) return null;
            return (
              <div key={key} className="flex justify-between border-b pb-1">
                <span className="font-semibold text-gray-700 capitalize text-sm">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="text-gray-900 break-all text-right text-sm">{String(value)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DetailsModal; 