import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // A fully static export works on Cloudflare Pages, Render and any CDN host.
  // All dynamic routes provide generateStaticParams.
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'drive.google.com' }],
  },
  poweredByHeader: false,
};

export default nextConfig;
