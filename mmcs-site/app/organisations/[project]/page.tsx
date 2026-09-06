import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects, siteUrl } from '@/lib/content';
import {
  PageHero,
  ProjectFeature,
  FutureInitiatives,
  ConnectBanner,
} from '@/components/sections';
export function generateStaticParams() {
  return projects.map((p) => ({ project: p.id }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ project: string }>;
}): Promise<Metadata> {
  const { project } = await params;
  const p = projects.find((p) => p.id === project);
  return p
    ? {
        title: p.name,
        description: p.description,
        alternates: { canonical: `/organisations/${p.id}/` },
        openGraph: {
          title: `${p.name} | MMCS`,
          description: p.description,
          url: `${siteUrl}/organisations/${p.id}/`,
        },
      }
    : {};
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project } = await params;
  const p = projects.find((p) => p.id === project);
  if (!p) notFound();
  return (
    <main id="main">
      <PageHero
        eyebrow={p.kicker}
        title={p.tagline}
        description={p.description}
        breadcrumb={p.name}
        imageSrc={
          p.id === 'nokma'
            ? '/images/nokma-product-team.jpg'
            : '/images/megh-farm-pineapple-harvest.jpg'
        }
        imageAlt={
          p.id === 'nokma'
            ? 'Nokma team member presenting jackfruit products'
            : 'Farmer carrying freshly harvested pineapples in Meghalaya'
        }
        variant={p.id === 'nokma' ? 'nokma' : p.id === 'megh-farm' ? 'megh-farm' : undefined}
      />
      <div className="wrap">
        <ProjectFeature project={p} detail />
      </div>
      {p.id === 'megh-farm' && <FutureInitiatives />}
      <ConnectBanner />
    </main>
  );
}
