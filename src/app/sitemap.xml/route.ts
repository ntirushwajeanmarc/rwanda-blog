const FALLBACK_SITE_URL = 'https://blog.circuitnotion.com';
const FALLBACK_API_URL = 'https://blog.circuitnotion.com';

function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL).replace(/\/$/, '');
}

function getApiUrl(): string {
  return (process.env.NEXT_PUBLIC_API_URL || FALLBACK_API_URL).replace(/\/$/, '');
}

export async function GET() {
  const siteUrl = getSiteUrl();
  const apiUrl = getApiUrl();
  const now = new Date().toISOString();
  
  // Static routes
  let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

  try {
    // Fetch blog posts from API
    const response = await fetch(`${apiUrl}/blogs?skip=0&limit=100`, {
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      const blogs = await response.json();
      
      // Add each blog post to sitemap
      if (Array.isArray(blogs)) {
        blogs.forEach((blog: { id: number; updated_at?: string; created_at?: string }) => {
          const lastMod = blog.updated_at || blog.created_at || now;
          xmlContent += `  <url>
    <loc>${siteUrl}/blog/${blog.id}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
        });
      }
    }
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error);
  }
  
  // Close sitemap
  xmlContent += `</urlset>`;
  
  // Return XML with proper headers
  return new Response(xmlContent, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
}