'use client';

import { useState } from 'react';
import { FaSave, FaBell, FaLock, FaPalette } from 'react-icons/fa';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'MarketPlace',
    siteDescription: 'Your premier online marketplace',
    contactEmail: 'support@marketplace.com',
    maintenanceMode: false,
    emailNotifications: true,
    orderNotifications: true,
    reviewNotifications: false,
    theme: 'auto',
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage marketplace settings and preferences.</p>
      </div>

      {saved && (
        <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg">
          ✓ Settings saved successfully
        </div>
      )}

     
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3 mb-6">
          <FaPalette className="text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">General Settings</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Site Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleChange('siteName', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Site Description</label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => handleChange('siteDescription', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              rows={3}/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Contact Email</label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => handleChange('contactEmail', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"/>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="maintenance"
              checked={settings.maintenanceMode}
              onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"/>
            <label htmlFor="maintenance" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"> Enable Maintenance Mode </label>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3 mb-6">
          <FaBell className="text-yellow-600 dark:text-yellow-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="emailNotif"
              checked={settings.emailNotifications}
              onChange={(e) => handleChange('emailNotifications', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer" />
            <label htmlFor="emailNotif" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"> Email Notifications</label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="orderNotif"
              checked={settings.orderNotifications}
              onChange={(e) => handleChange('orderNotifications', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"/>
            <label htmlFor="orderNotif" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"> Order Notifications</label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="reviewNotif"
              checked={settings.reviewNotifications}
              onChange={(e) => handleChange('reviewNotifications', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer" />
            <label htmlFor="reviewNotif" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"> Review Notifications</label>
          </div>
        </div>
      </div>

   
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3 mb-6">
          <FaPalette className="text-purple-600 dark:text-purple-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Display</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => handleChange('theme', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white">
              <option value="auto">Auto (System)</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </div>

    
      <button
        onClick={handleSave}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all">
        <FaSave />Save Settings</button>
    </div>
  );
}
