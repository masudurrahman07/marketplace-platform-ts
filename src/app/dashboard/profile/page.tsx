'use client';

import { useEffect, useState, useRef } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSave, FaCamera, FaTimes } from 'react-icons/fa';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    avatar: '', 
  });

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      const emailMatch = document.cookie.match(/userEmail=([^;]+)/);
      const email = emailMatch ? decodeURIComponent(emailMatch[1]) : '';
      setProfile(prev => ({
        ...prev,
        email: email,
        name: email ? email.split('@')[0] : 'User',
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarClick = () => {
    if (editMode) fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');
    try {
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('userProfile', JSON.stringify(profile));
      
      setMessage('Profile updated successfully!');
      setEditMode(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your identity and contact details.</p>
        </div>
        <button
          onClick={() => setEditMode(!editMode)}
          className={`px-5 py-2 rounded-lg font-medium transition-all ${
            editMode 
            ? 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300' 
            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-none'
          }`}>
          {editMode ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-xl border animate-in slide-in-from-top-2 ${
          message.includes('success') 
          ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400' 
          : 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'
        }`}>
          {message}
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
       
        <div className="h-32 bg-linear-to-r from-blue-600 to-indigo-700"></div>
        
        <div className="px-8 pb-8">
          <div className="relative -mt-12 mb-6 flex flex-col md:flex-row md:items-end gap-6">
           
            <div className="relative group">
              <div 
                onClick={handleAvatarClick}
                className={`w-32 h-32 rounded-2xl border-4 border-white dark:border-gray-900 bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden shadow-md transition-all ${
                  editMode ? 'cursor-pointer ring-4 ring-blue-500/20' : ''
                }`}>
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-bold text-blue-600">
                    {profile.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                )}
                
                {editMode && (
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaCamera size={24} />
                    <span className="text-xs font-medium mt-1">Change</span>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*" />
            </div>

            <div className="pb-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.name}</h2>
              <p className="text-gray-500 dark:text-gray-400">{profile.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField 
              label="Full Name" 
              icon={<FaUser />} 
              name="name" 
              value={profile.name} 
              editMode={editMode} 
              onChange={handleChange} />
            <InputField 
              label="Email" 
              icon={<FaEnvelope />} 
              name="email" 
              value={profile.email} 
              editMode={false} 
              onChange={handleChange}/>
            <InputField 
              label="Phone" 
              icon={<FaPhone />} 
              name="phone" 
              value={profile.phone} 
              editMode={editMode} 
              onChange={handleChange} 
              placeholder="+1 234 567 890"/>
            <InputField 
              label="Street Address" 
              icon={<FaMapMarkerAlt />} 
              name="address" 
              value={profile.address} 
              editMode={editMode} 
              onChange={handleChange} 
              placeholder="123 Web Dev Lane"/>
            <InputField 
              label="City" 
              name="city" 
              value={profile.city} 
              editMode={editMode} 
              onChange={handleChange} 
              placeholder="Dhaka"/>
            <InputField 
              label="Country" 
              name="country" 
              value={profile.country} 
              editMode={editMode} 
              onChange={handleChange} 
              placeholder="Bangladesh"/>
          </div>

          {editMode && (
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200 dark:shadow-none">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <FaSave />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-6 border border-red-100 dark:border-red-900/30 flex justify-between items-center">
        <div>
          <h3 className="text-red-800 dark:text-red-400 font-bold">Security</h3>
          <p className="text-red-600/70 dark:text-red-400/60 text-sm">Manage your account password and privacy settings.</p>
        </div>
        <button className="px-4 py-2 bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 rounded-lg text-sm font-semibold border border-red-200 dark:border-red-900/50 hover:bg-red-50 transition-colors">Change Password</button>
      </div>
    </div>
  );
}

function InputField({ label, icon, name, value, editMode, onChange, placeholder }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
        {icon} {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        disabled={!editMode}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border transition-all ${
          editMode 
          ? 'bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-900 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500' 
          : 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800 text-gray-500 cursor-not-allowed'
        } dark:text-white outline-none`}
      />
    </div>
  );
}