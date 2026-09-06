import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { pageInfo, projects, siteUrl } from '@/lib/content';
import {
  PageHero,
  SectionHeading,
  Purpose,
  BrandCards,
  ImpactBand,
  ProjectFeature,
  WorkPage,
  FutureInitiatives,
  Achievements,
  ConnectBanner,
} from '@/components/sections';
import {
  JourneyExplorer,
  Gallery,
  ContactForm,
  Reveal,
} from '@/components/interactive';
export function generateStaticParams() {
  return Object.keys(pageInfo).map((slug) => ({ slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = pageInfo[slug];
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/${slug}/` },
    openGraph: {
      title: `${p.title} | MMCS`,
      description: p.description,
      url: `${siteUrl}/${slug}/`,
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = pageInfo[slug];
  if (!p) notFound();
  return (
    <main id="main">
      {slug !== 'contact' && (
        <PageHero
          eyebrow={p.eyebrow}
          title={p.heading}
          description={p.description}
          breadcrumb={p.title}
          imageSrc={
            slug === 'our-work'
              ? '/images/hub-event.webp'
              : slug === 'journey'
                ? '/images/journey-hero.png'
                : undefined
          }
          imageAlt={
            slug === 'our-work'
              ? 'Community gathering at the MeghFarm Processing Hub inauguration'
              : undefined
          }
          variant={slug === 'journey' ? 'journey' : undefined}
        />
      )}
      {slug === 'about' ? (
        <>
          <section className="section wrap story-grid about-story">
            <div className="story-photo">
              <Image
                src="/images/community.webp"
                alt="Community and guests gathered at the processing hub inauguration in 2024"
                fill
                sizes="(max-width:700px) 100vw, 48vw"
              />
              <span>TOGETHER, WE GO FURTHER · 2024</span>
            </div>
            <div>
              <span className="eyebrow">WHY WE BEGAN</span>
              <h2>
                A fairer future
                <br />
                for rural families.
              </h2>
              <p className="lead">
                Our journey began on 14 February 2015 in Khamari Village,
                Tikrikilla, West Garo Hills.
              </p>
              <p>
                Founded under the leadership of Rev. Fr. Benoy Joseph, MMCS
                responded to the difficulties faced by small and marginal
                farmers: dependence on middlemen, distress sales and
                exploitative mortgage practices.
              </p>
              <p>
                Village awareness programmes introduced savings, cooperation and
                collective marketing. Twenty women formed the beginning of a
                community effort to protect farmers and create opportunities for
                economic self-reliance.
              </p>
              <Link href="/journey" className="text-link">
                Read the complete journey <ArrowUpRight size={18} />
              </Link>
            </div>
          </section>
          <section className="section about-purpose-section">
            <div className="wrap">
              <SectionHeading
                eyebrow="WHAT GUIDES US"
                title="A purpose we share."
              />
              <Purpose />
            </div>
          </section>
          <section className="section wrap about-founders-section">
            <SectionHeading
              eyebrow="THE FOUNDING TEAM"
              title="A beginning built on commitment."
            />
            <div className="founders-grid">
              {[
                ['Rev. Fr. Benoy Joseph', 'Founder'],
                ['Wilna Marak', 'First President'],
                ['Nelco Sangma', 'First Secretary'],
              ].map(([name, role]) => (
                <article key={name}>
                  <span className="eyebrow">{role}</span>
                  <h3>{name}</h3>
                  <p>Founding leadership · 2015</p>
                </article>
              ))}
            </div>
            <p className="catalogue-note">
              Founding executive members recorded in the history: Saro Sangma,
              Kajolish Marak, Rupali Sangma and Rita Marak.
            </p>
          </section>
          <ImpactBand />
          <section className="section wrap">
            <SectionHeading
              eyebrow="OUR LONG-TERM DIRECTION"
              title="From the farm to the market."
              description="A connected value chain gives rural communities more opportunities to participate in the value they create."
            />
            <div className="value-chain">
              {[
                'Farmer mobilisation',
                'Collective farming',
                'Aggregation',
                'Processing',
                'Storage',
                'Branding',
                'Marketing',
                'Retail',
                'Consumer market',
              ].map((t, i) => (
                <div key={t}>
                  <small>0{i + 1}</small>
                  <strong>{t}</strong>
                  {i < 8 && <ArrowRight size={17} />}
                </div>
              ))}
            </div>
            <p className="catalogue-note">
              The source history sets out this integrated model as MMCS’s
              development direction. Individual infrastructure components are at
              different stages.
            </p>
          </section>
        </>
      ) : slug === 'organisations' ? (
        <>
          <section className="section wrap organisation-intro">
            <Image
              src="/images/mmcs.webp"
              alt="Muktidata Multipurpose Cooperative Society official logo"
              width={130}
              height={160}
            />
            <div>
              <span className="eyebrow">THE COOPERATIVE AT THE HEART</span>
              <h2>
                Muktidata Multipurpose
                <br />
                Cooperative Society
              </h2>
              <p>
                MMCS works towards farmer protection, women’s economic
                participation and sustainable livelihoods. Nokma and MeghFarm
                give expression to its work in processing, value addition and
                market access.
              </p>
              <Link href="/#about" className="text-link">
                About MMCS <ArrowUpRight size={18} />
              </Link>
            </div>
          </section>
          <section className="section soft-section">
            <div className="wrap">
              <SectionHeading
                eyebrow="MEET OUR PROJECTS"
                title="Two expressions of a shared purpose."
              />
              <BrandCards />
            </div>
          </section>
        </>
      ) : slug === 'our-work' ? (
        <WorkPage />
      ) : slug === 'projects' ? (
        <section className="wrap projects-list">
          {projects.map((project) => (
            <Reveal key={project.id}>
              <ProjectFeature project={project} />
            </Reveal>
          ))}
        </section>
      ) : slug === 'achievements' ? (
        <>
          <section className="section wrap">
            <Achievements />
          </section>
          <section className="section soft-section">
            <div className="wrap story-grid">
              <div>
                <span className="eyebrow">MORE THAN A MILESTONE</span>
                <h2>
                  Opening doors
                  <br />
                  to new possibilities.
                </h2>
                <p className="lead">
                  The establishment of MeghFarm Processing Hub in 2024
                  connected a cooperative vision with a new platform for value
                  addition.
                </p>
                <Link href="/journey#year-2024" className="text-link">
                  Explore the story <ArrowUpRight size={18} />
                </Link>
              </div>
              <div className="story-photo">
                <Image
                  src="/images/inauguration.webp"
                  alt="The MeghFarm inauguration plaque and gathered attendees"
                  fill
                  sizes="(max-width:700px) 100vw, 48vw"
                />
              </div>
            </div>
          </section>
        </>
      ) : slug === 'journey' ? (
        <>
          <JourneyExplorer />
          <FutureInitiatives />
          <section className="journey-closing">
            <div className="wrap">
              <span className="eyebrow">THE NEXT GENERATION OF OWNERSHIP</span>
              <div className="journey-closing-grid">
                <h2>From 20 women to a growing farmer cooperative.</h2>
                <div>
                  <p>
                    What began in 2015 as a village-level effort to protect
                    farmers has grown into a cooperative movement connecting
                    farmers, rural women, processing, collective farming and
                    market access.
                  </p>
                  <p>
                    MMCS looks ahead to farmer-owned enterprises in which
                    communities can participate not only as producers, but as
                    owners, processors, entrepreneurs and shareholders across
                    the value chain.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : slug === 'gallery' ? (
        <section className="section wrap">
          <Gallery />
        </section>
      ) : slug === 'contact' ? (
        <section className="section wrap contact-simple">
          <div className="contact-simple-copy">
            <span className="eyebrow">CONTACT MMCS</span>
            <h1>Let’s start a conversation.</h1>
            <p>
              Reach out to learn more about MMCS, our work and the communities
              we support.
            </p>
          </div>
          <ContactForm />
        </section>
      ) : null}
      {slug !== 'contact' && <ConnectBanner />}
    </main>
  );
}
