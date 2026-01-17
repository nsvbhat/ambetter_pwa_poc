'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';

export default function Home() {
  const [stats, setStats] = useState({
    logoUpdates: 0,
    fieldChanges: 0,
    newServices: 0,
  });

  useEffect(() => {
    // Simulate fetching update counts from server
    setStats({
      logoUpdates: 3,
      fieldChanges: 5,
      newServices: 2,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Ambetter Health PWA
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
            A Progressive Web App that showcases how mobile apps can deliver dynamic content, 
            field changes, and new services without requiring marketplace redeployment.
          </p>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">🖼️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Dynamic Assets
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Update images, logos, and branding on the server without app redeployment.
            </p>
            <Link
              href="/scenario-1"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              View Scenario →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Schema Updates
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Change field names and data structure on the server while keeping the app in stores.
            </p>
            <Link
              href="/scenario-2"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              View Scenario →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">✨</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              New Services
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Add entirely new features and services without pushing app updates.
            </p>
            <Link
              href="/scenario-3"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              View Scenario →
            </Link>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            Live Updates (This Session)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">
                {stats.logoUpdates}
              </div>
              <p className="text-gray-600 mt-2">Logo/Image Changes</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">
                {stats.fieldChanges}
              </div>
              <p className="text-gray-600 mt-2">Field Name Changes</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">
                {stats.newServices}
              </div>
              <p className="text-gray-600 mt-2">New Services Added</p>
            </div>
          </div>
        </div>

        {/* Technical Explanation */}
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            How It Works
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                1. Dynamic Image Updates
              </h3>
              <p className="text-gray-600">
                The app fetches the logo URL from the server at runtime. Change the image URL in 
                your server configuration or database, and the PWA will display the new logo without 
                requiring any app update. Perfect for seasonal branding or quick visual updates.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                2. Field Name Changes
              </h3>
              <p className="text-gray-600">
                Instead of hardcoding field names in the app, fetch the form schema from your API. 
                This allows you to rename fields (e.g., 'phoneNumber' → 'contactNumber') on the 
                server without touching the mobile app code. The client renders forms dynamically 
                based on the schema received from the server.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                3. New Services & Pages
              </h3>
              <p className="text-gray-600">
                Maintain a dynamic services list on your server. Add new services with their routes 
                and metadata. The app fetches this list at startup and can dynamically route users 
                or display new service cards without a code update. The web-based nature of PWAs 
                means new pages can be added to your server and immediately accessible.
              </p>
            </div>
          </div>
        </div>

        {/* PWA Features */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8 rounded-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            PWA Features Included
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-green-500 font-bold text-lg sm:text-xl flex-shrink-0">✓</span>
              <span className="text-gray-700 text-xs sm:text-sm">Service Worker for offline support</span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-green-500 font-bold text-lg sm:text-xl flex-shrink-0">✓</span>
              <span className="text-gray-700 text-xs sm:text-sm">Web App Manifest for installability</span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-green-500 font-bold text-lg sm:text-xl flex-shrink-0">✓</span>
              <span className="text-gray-700 text-xs sm:text-sm">Install prompts for iOS & Android</span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-green-500 font-bold text-lg sm:text-xl flex-shrink-0">✓</span>
              <span className="text-gray-700 text-xs sm:text-sm">Responsive design for all devices</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
