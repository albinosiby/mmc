import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  // Render builds a static export. Keeping development mode dynamic lets unknown
  // local paths resolve to the site's 404 page instead of failing before routing.
  ...(process.env.NODE_ENV === 'production' ? { output: 'export' } : {}),
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};
export default nextConfig;
