import { NextResponse } from 'next/server';

const BETTERSTACK_API_URL = 'https://status.zama.ai/index.json';
const CACHE_TTL = 30; // seconds

const NEXT_DATA_REGEX =
  /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/i;

type BetterstackLikePayload = {
  data: unknown;
  included: unknown[];
};

const htmlEntities: Record<string, string> = {
  '&quot;': '"',
  '&#34;': '"',
  '&amp;': '&',
  '&#38;': '&',
  '&lt;': '<',
  '&#60;': '<',
  '&gt;': '>',
  '&#62;': '>',
  '&#39;': "'",
  '&#x27;': "'",
  '&#x2F;': '/',
};

function decodeHtmlEntities(value: string) {
  return value.replace(/&quot;|&#34;|&amp;|&#38;|&lt;|&#60;|&gt;|&#62;|&#39;|&#x27;|&#x2F;/g, (entity) =>
    htmlEntities[entity] ?? entity
  );
}

function findBetterstackPayload(value: unknown): BetterstackLikePayload | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate = value as Record<string, unknown>;
  const dataField = candidate['data'];
  const includedField = candidate['included'];
  if (dataField && typeof dataField === 'object' && Array.isArray(includedField)) {
    return {
      data: dataField,
      included: includedField,
    };
  }

  for (const key of Object.keys(candidate)) {
    const nestedValue = candidate[key];
    if (!nestedValue) continue;

    if (Array.isArray(nestedValue)) {
      for (const item of nestedValue) {
        const nestedCandidate = findBetterstackPayload(item);
        if (nestedCandidate) {
          return nestedCandidate;
        }
      }
    } else if (typeof nestedValue === 'object') {
      const nestedCandidate = findBetterstackPayload(nestedValue);
      if (nestedCandidate) {
        return nestedCandidate;
      }
    }
  }

  return null;
}

function extractPayloadFromHtml(html: string): BetterstackLikePayload | null {
  const match = html.match(NEXT_DATA_REGEX);
  if (!match?.[1]) {
    return null;
  }

  try {
    const nextDataJson = decodeHtmlEntities(match[1]);
    const nextData = JSON.parse(nextDataJson);
    return findBetterstackPayload(nextData);
  } catch (error) {
    console.error('[Status API] Failed to parse __NEXT_DATA__ payload:', error);
    return null;
  }
}

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

    const contentType = response.headers.get('content-type') ?? '';
    const rawBody = await response.text();
    const isJsonContent = contentType.toLowerCase().includes('application/json');

    if (!isJsonContent) {
      console.warn(
        `[Status API] Unexpected content type: ${contentType || 'unknown'}. Attempting HTML fallback.`
      );
    }

    let data: unknown;
    try {
      data = JSON.parse(rawBody);
    } catch (parseError) {
      const preview = rawBody.slice(0, 2000);
      console.error('[Status API] Failed to parse upstream JSON:', parseError);
      console.error('[Status API] Response preview:', preview);

      const extracted = extractPayloadFromHtml(rawBody);
      if (!extracted) {
        throw new Error('Invalid JSON received from upstream API');
      }

      console.warn('[Status API] Extracted payload from HTML fallback.');
      data = extracted;
    }

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
