import type { MetadataRoute } from 'next';
import { pageInfo, projects, siteUrl } from '@/lib/content';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '/',
    ...Object.keys(pageInfo).map((s) => `/${s}/`),
    ...projects.map((p) => `/organisations/${p.id}/`),
  ].map((path) => ({
    url: siteUrl + path,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
