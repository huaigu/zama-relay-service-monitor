import { NextResponse } from 'next/server';

const BETTERSTACK_API_URL = 'https://status.zama.ai/index.json';
const CACHE_TTL = 30; // seconds

export async function GET() {
  try {
    const response = await fetch(BETTERSTACK_API_URL, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Zama-Status-Proxy/1.0',
      },
      // Enable Next.js caching with revalidation
      next: { revalidate: CACHE_TTL },
    });

    if (!response.ok) {
      console.error(`[Status API] HTTP error! status: ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Return with CORS headers and caching
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': `public, s-maxage=${CACHE_TTL}, stale-while-revalidate=${CACHE_TTL * 2}`,
        'X-Cache-Status': 'HIT',
      },
    });
  } catch (error) {
    console.error('[Status API] Error fetching status:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch service status',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache',
        },
      }
    );
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

// Set runtime to edge for faster response times
export const runtime = 'edge';
