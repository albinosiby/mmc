import type { MetadataRoute } from 'next';
import { pageInfo, projects, siteUrl } from '@/lib/content';

export const dynamic = 'force-static';

const currentDate = new Date();

const pagePriorities: Record<string, number> = {
  '/': 1,
  '/about/': 0.85,
  '/organisations/': 0.85,
  '/our-work/': 0.9,
  '/projects/': 0.85,
  '/journey/': 0.85,
  '/gallery/': 0.75,
  '/contact/': 0.75,
  '/achievements/': 0.75,
};

const pageChangeFrequency: Record<string, MetadataRoute.Sitemap[number]['changeFrequency']> = {
  '/': 'weekly',
  '/gallery/': 'weekly',
  '/journey/': 'monthly',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '/',
    ...Object.keys(pageInfo).map((slug) => `/${slug}/`),
  ];

  const organisationPages = projects.map((project) => `/organisations/${project.id}/`);

  return [...staticPages, ...organisationPages].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: currentDate,
    changeFrequency: pageChangeFrequency[path] ?? 'monthly',
    priority: pagePriorities[path] ?? (path.startsWith('/organisations/') ? 0.8 : 0.7),
  }));
}
