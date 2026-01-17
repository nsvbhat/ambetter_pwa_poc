'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  url: string;
  isNew: boolean;
}

export default function Scenario3() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    fetch('/api/services/list')
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services);
        setLoading(false);
      });
  }, []);

  const newServices = services.filter((s) => s.isNew);
  const existingServices = services.filter((s) => !s.isNew);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 sm:mb-6 inline-block text-sm sm:text-base">
          ← Back to Home
        </Link>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
          Scenario 3: New Services & Pages
        </h1>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            ✨ Add New Services on Server → Instantly Available (No App Redeployment)
          </h2>
          <p className="text-gray-700 text-xs sm:text-sm">
            Maintain a dynamic services list on your server. Add new services with their metadata 
            and routes. The PWA fetches this list at startup and can display new services or dynamically 
            route users without requiring any app marketplace update.
          </p>
        </div>

        {/* Live Demo */}
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Available Health Services</h3>

          {loading ? (
            <div className="text-center py-8 text-xs sm:text-sm">Loading services...</div>
          ) : (
            <>
              {/* Existing Services */}
              {existingServices.length > 0 && (
                <div className="mb-6 sm:mb-8">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Core Services</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {existingServices.map((service) => (
                      <a
                        key={service.id}
                        href={service.url}
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Navigation to: ${service.url}\n\nThis service is part of your app.`);
                        }}
                        className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer"
                      >
                        <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{service.icon}</div>
                        <h5 className="font-semibold text-gray-900 text-xs sm:text-sm">{service.name}</h5>
                        <p className="text-gray-600 text-xs sm:text-sm">{service.description}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Newly Added Services */}
              {newServices.length > 0 && (
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                    🆕 Recently Added Services
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {newServices.map((service) => (
                      <a
                        key={service.id}
                        href={service.url}
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Navigation to: ${service.url}\n\nThis is a newly added service!`);
                        }}
                        className="border-2 border-green-300 bg-green-50 rounded-lg p-3 sm:p-4 hover:shadow-lg transition-all cursor-pointer relative"
                      >
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          NEW
                        </div>
                        <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{service.icon}</div>
                        <h5 className="font-semibold text-gray-900 text-xs sm:text-sm">{service.name}</h5>
                        <p className="text-gray-600 text-xs sm:text-sm">{service.description}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 sm:mt-6 text-center text-gray-600 text-xs sm:text-sm">
                Total services available: <strong>{services.length}</strong>
              </div>
            </>
          )}
        </div>

        {/* How to Test */}
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">How to Test This</h3>
          <ol className="space-y-3 sm:space-y-4 list-decimal list-inside text-gray-700 text-xs sm:text-sm">
            <li>
              <strong>Add a new service:</strong>
              <p className="ml-6 text-sm text-gray-600 mt-1">
                Edit <code className="bg-gray-100 px-2 py-1 rounded">/api/services/list/route.ts</code>
              </p>
              <p className="ml-6 text-sm text-gray-600 mt-1">
                Add a new service object to the services array with isNew: true
              </p>
            </li>
            <li>
              <strong>Refresh the page:</strong> The new service will appear in the list immediately.
            </li>
            <li>
              <strong>Create the new page:</strong> Add <code className="bg-gray-100 px-2 py-1 rounded">/app/services/new-service/page.tsx</code> for the new service
            </li>
            <li>
              <strong>No marketplace update:</strong> Installed users will see the new service on next app visit.
            </li>
          </ol>
        </div>

        {/* Advantages */}
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Why This Matters for PWAs</h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex gap-2 sm:gap-4">
              <div className="text-xl sm:text-2xl flex-shrink-0">🚀</div>
              <div>
                <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">Faster Feature Releases</h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Add new features and services without waiting for app store approval or user updates.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-2xl">🌍</div>
              <div>
                <h4 className="font-semibold text-gray-900">Global Rollouts</h4>
                <p className="text-gray-600 text-sm">
                  Roll out new services to all users at the same time, without version fragmentation.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-2xl">📊</div>
              <div>
                <h4 className="font-semibold text-gray-900">A/B Testing & Gradual Rollout</h4>
                <p className="text-gray-600 text-sm">
                  Test new services with a percentage of users before full release.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-2xl">💰</div>
              <div>
                <h4 className="font-semibold text-gray-900">Cost Effective</h4>
                <p className="text-gray-600 text-sm">
                  No app store review fees or delays. Deploy at your own pace.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Implementation */}
        <div className="bg-white p-8 rounded-lg shadow">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Implementation Details</h3>

          <button
            onClick={() => setShowCode(!showCode)}
            className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700"
          >
            {showCode ? 'Hide Code' : 'Show Code'}
          </button>

          {showCode && (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">API Route: /api/services/list</h4>
                <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`export async function GET() {
  return NextResponse.json({
    services: [
      {
        id: 'primary-care',
        name: 'Primary Care',
        description: 'Find and manage your primary care physician',
        icon: '👨‍⚕️',
        url: '/services/primary-care',
        isNew: false
      },
      {
        id: 'telehealth',
        name: 'Telehealth Visits',
        description: 'Schedule virtual doctor visits',
        icon: '💻',
        url: '/services/telehealth',
        isNew: true  // Newly added!
      }
      // ... more services
    ]
  });
}`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Client Component: Dynamic Services List</h4>
                <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`const [services, setServices] = useState<Service[]>([]);

useEffect(() => {
  fetch('/api/services/list')
    .then((res) => res.json())
    .then((data) => setServices(data.services));
}, []);

// Render services:
{services.map((service) => (
  <Link 
    key={service.id}
    href={service.url}
    className={service.isNew ? 'new-service' : ''}
  >
    <span>{service.icon}</span>
    <h5>{service.name}</h5>
  </Link>
))}`}
                </pre>
              </div>
            </div>
          )}

          <div className="mt-6 bg-green-50 border border-green-200 rounded p-4">
            <h4 className="font-semibold text-green-900 mb-2">✓ Key Benefits</h4>
            <ul className="space-y-2 text-green-800 text-sm">
              <li>• Add new services without app marketplace approval</li>
              <li>• Instant availability to all installed users</li>
              <li>• No version fragmentation</li>
              <li>• Supports A/B testing and gradual rollouts</li>
              <li>• Web pages can be added dynamically to your server</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
