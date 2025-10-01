const FALLBACK_SITE_URL = 'https://blog.circuitnotion.com';

function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL).replace(/\/$/, '');
}

export async function GET() {
  const siteUrl = getSiteUrl();
  
  const robotsContent = `User-agent: *
Allow: /
Disallow: /login
Disallow: /register
Disallow: /create
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml
`;

  return new Response(robotsContent, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  });
}