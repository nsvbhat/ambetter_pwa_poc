import { NextResponse } from 'next/server';

// Scenario 1: Dynamic scenarios list that can be updated on server
export async function GET() {
  const scenarios = [
    {
      id: 1,
      title: 'Scenario 1',
      description: 'Dynamic Image Update',
      link: '/scenario-1',
    },
    {
      id: 2,
      title: 'Scenario 2',
      description: 'Field Name Change',
      link: '/scenario-2',
    },
    {
      id: 3,
      title: 'Scenario 3',
      description: 'New Service/Page',
      link: '/scenario-3',
    },
  ];

  return NextResponse.json({
    scenarios,
    timestamp: new Date().toISOString(),
  });
}
