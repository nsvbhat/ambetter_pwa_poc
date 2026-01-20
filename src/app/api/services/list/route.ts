import { NextResponse } from 'next/server';

// Scenario 3: New services can be added on the server
// The client will fetch the latest services list without requiring app marketplace updates
// This demonstrates PWA's key advantage: deploy new features to backend without app redeployment
export async function GET() {
  return NextResponse.json({
    services: [
      {
        id: 'id-card',
        name: 'ID Card',
        description: 'View & download your insurance ID card',
        icon: '📇',
        url: '/id-card',
        color: '#ec4899', // pink
        isNew: false,
      },
      {
        id: 'find-care',
        name: 'Find Care',
        description: 'Search doctors & facilities in-network',
        icon: '🏥',
        url: '/find-care',
        color: '#2563eb', // blue
        isNew: false,
      },
      {
        id: 'payments',
        name: 'Payments',
        description: 'View & pay your premium',
        icon: '💳',
        url: '/payments',
        color: '#16a34a', // green
        isNew: false,
      },
      {
        id: 'prescriptions',
        name: 'Prescriptions',
        description: 'Manage & refill prescriptions',
        icon: '💊',
        url: '/prescriptions',
        color: '#9333ea', // purple
        isNew: false,
      },
      {
        id: 'enrollment',
        name: 'Enrollment',
        description: 'Manage your enrollment & plan',
        icon: '📝',
        url: '/enrollment',
        color: '#f97316', // orange
        isNew: false,
      },
      {
        id: 'health-info',
        name: 'Health Info',
        description: 'View your health records & history',
        icon: '❤️',
        url: '/health-info',
        color: '#eab308', // yellow
        isNew: false,
      },
      {
        id: 'support',
        name: 'Support & FAQ',
        description: 'Get help & answers to common questions',
        icon: '💬',
        url: '/support',
        color: '#ef4444', // red
        isNew: false,
      },
      {
        id: 'telehealth',
        name: 'Telehealth Visits',
        description: 'Schedule virtual doctor visits',
        icon: '💻',
        url: '/health-info',
        color: '#06b6d4', // cyan
        isNew: true,
      },
    ],
    totalServices: 9,
    timestamp: new Date().toISOString(),
  });
}
