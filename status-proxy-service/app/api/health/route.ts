import { NextResponse } from 'next/server';

export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'zama-status-proxy',
    version: '1.0.0',
    uptime: process.uptime ? `${Math.floor(process.uptime())}s` : 'N/A',
  };

  return NextResponse.json(health, {
    status: 200,
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
}

// Use edge runtime for health checks too
export const runtime = 'edge';
