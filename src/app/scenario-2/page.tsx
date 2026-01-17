'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

interface Field {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  helpText?: string;
  options?: string[];
}

interface FormData {
  [key: string]: string;
}

export default function Scenario2() {
  const [fields, setFields] = useState<Field[]>([]);
  const [exampleData, setExampleData] = useState<FormData>({});
  const [loading, setLoading] = useState(true);
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    fetch('/api/schema/fields')
      .then((res) => res.json())
      .then((data) => {
        setFields(data.schema.fields);
        setExampleData(data.exampleData);
        setLoading(false);
      });
  }, []);

  const handleChange = (fieldId: string, value: string) => {
    setExampleData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 sm:mb-6 inline-block text-sm sm:text-base">
          ← Back to Home
        </Link>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
          Scenario 2: Field Name Changes
        </h1>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            🔄 Change Field Names on Server → Client Adapts (No App Redeployment)
          </h2>
          <p className="text-gray-700 text-xs sm:text-sm">
            Instead of hardcoding field names in the app, fetch the form schema from your API. 
            Rename fields on the server (e.g., 'phoneNumber' → 'contactNumber') and the app 
            will automatically render the updated labels without requiring any code changes or marketplace updates.
          </p>
        </div>

        {/* Live Demo */}
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Live Form with Dynamic Schema</h3>

          {loading ? (
            <div className="text-center py-8 text-xs sm:text-sm">Loading schema...</div>
          ) : (
            <form className="space-y-6">
              {fields.map((field) => (
                <div key={field.id}>
                  <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-1">
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.helpText && (
                    <p className="text-xs text-gray-500 mb-2 leading-tight">{field.helpText}</p>
                  )}

                  {field.type === 'select' ? (
                    <select
                      value={exampleData[field.id] || ''}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select an option</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={exampleData[field.id] || ''}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      placeholder={field.label}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              ))}

              <button
                type="button"
                className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-700 font-medium text-xs sm:text-sm mt-2"
              >
                Submit Form
              </button>
            </form>
          )}
        </div>

        {/* How to Test */}
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">How to Test This</h3>
          <ol className="space-y-3 sm:space-y-4 list-decimal list-inside text-gray-700 text-xs sm:text-sm">
            <li>
              <strong>Update the API schema:</strong>
              <p className="ml-6 text-sm text-gray-600 mt-1">
                Edit <code className="bg-gray-100 px-2 py-1 rounded">/api/schema/fields/route.ts</code>
              </p>
              <p className="ml-6 text-sm text-gray-600 mt-1">
                Change field names like 'contactNumber' → 'primaryPhone' or add new fields
              </p>
            </li>
            <li>
              <strong>Refresh the page:</strong> The form will immediately show the new field names and structure.
            </li>
            <li>
              <strong>No app update needed:</strong> Installed PWA users will see the updated form on next visit.
            </li>
          </ol>
        </div>

        {/* Use Cases */}
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Real-World Use Cases</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="border-l-4 border-blue-600 pl-3 sm:pl-4">
              <h4 className="font-semibold text-gray-900 mb-2 text-xs sm:text-sm">Regulatory Changes</h4>
              <p className="text-gray-600 text-xs sm:text-sm">
                Rename fields to comply with new regulations or data collection requirements 
                without pushing app updates.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-4">
              <h4 className="font-semibold text-gray-900 mb-2">A/B Testing</h4>
              <p className="text-gray-600 text-sm">
                Test different field labels or form structures server-side to optimize conversion 
                without code deployments.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-4">
              <h4 className="font-semibold text-gray-900 mb-2">Localization</h4>
              <p className="text-gray-600 text-sm">
                Change field labels and help text based on user locale served from the API.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-4">
              <h4 className="font-semibold text-gray-900 mb-2">Dynamic Forms</h4>
              <p className="text-gray-600 text-sm">
                Add/remove fields conditionally based on user type or business logic without 
                app updates.
              </p>
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
                <h4 className="font-semibold text-gray-900 mb-2">API Route: /api/schema/fields</h4>
                <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`export async function GET() {
  return NextResponse.json({
    schema: {
      fields: [
        {
          id: 'contactNumber',
          label: 'Contact Number',
          type: 'tel',
          required: true,
          helpText: 'Your primary contact number'
        },
        // ... more fields
      ]
    },
    exampleData: { /* ... */ }
  });
}`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Client Component: Dynamic Form Rendering</h4>
                <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`const [fields, setFields] = useState<Field[]>([]);

useEffect(() => {
  fetch('/api/schema/fields')
    .then((res) => res.json())
    .then((data) => setFields(data.schema.fields));
}, []);

// Render fields dynamically:
{fields.map((field) => (
  <input 
    key={field.id}
    type={field.type}
    placeholder={field.label}
    // ... rest of input props
  />
))}`}
                </pre>
              </div>
            </div>
          )}

          <div className="mt-6 bg-green-50 border border-green-200 rounded p-4">
            <h4 className="font-semibold text-green-900 mb-2">✓ Key Benefits</h4>
            <ul className="space-y-2 text-green-800 text-sm">
              <li>• Change field names without touching app code</li>
              <li>• Update form structure server-side</li>
              <li>• Add/remove fields dynamically</li>
              <li>• No marketplace redeployment required</li>
              <li>• Changes are instantly visible to users</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
