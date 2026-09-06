import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, MapPin, ArrowRight } from 'lucide-react';
import { pageInfo, projects, timeline, siteUrl } from '@/lib/content';
import {
  PageHero,
  SectionHeading,
  Purpose,
  BrandCards,
  ImpactBand,
  ProjectFeature,
  FutureInitiatives,
  Achievements,
  ConnectBanner,
} from '@/components/sections';
import {
  Activities,
  ProductCatalogue,
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
      <PageHero
        eyebrow={p.eyebrow}
        title={p.heading}
        description={p.description}
        breadcrumb={p.title}
      />
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
                Our journey began on 14 February 2015 in Aitibi Village,
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
                participation and sustainable livelihoods. Nokma and Megh Farm
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
        <>
          <section className="wrap work-page-intro">
            <div>
              <span className="eyebrow">FROM NEED TO OPPORTUNITY</span>
              <h2>Work that stays close to community.</h2>
            </div>
            <p>
              MMCS brings practical support together across farming, processing,
              skills and market access. Explore each area below.
            </p>
          </section>
          <section className="section wrap work-page-catalogue">
            <Activities />
          </section>
        </>
      ) : slug === 'products' ? (
        <>
          <section className="wrap products-page-intro">
            <Image
              src="/images/nokma.webp"
              alt="Nokma official logo"
              width={150}
              height={60}
            />
            <div>
              <span className="eyebrow">DISCOVER THE RANGE</span>
              <h2>Products with a local story.</h2>
              <p>
                The range reflects MMCS’s work to add value closer to where
                produce is grown and made.
              </p>
            </div>
            <a
              href="https://nokma.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Visit Nokma <ArrowUpRight size={18} />
            </a>
          </section>
          <section className="section wrap products-page-catalogue">
            <ProductCatalogue />
          </section>
        </>
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
                  The establishment of Megh Farm Processing Hub in 2024
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
                  alt="The Megh Farm inauguration plaque and gathered attendees"
                  fill
                  sizes="(max-width:700px) 100vw, 48vw"
                />
              </div>
            </div>
          </section>
        </>
      ) : slug === 'journey' ? (
        <>
          <section className="section wrap timeline-layout">
            <nav className="year-nav" aria-label="Journey years">
              {timeline.map((t) => (
                <a href={`#year-${t.year}`} key={t.year}>
                  {t.year}
                  <ArrowUpRight size={14} />
                </a>
              ))}
            </nav>
            <div className="timeline-full">
              {timeline.map((t) => (
                <Reveal key={t.year}>
                  <article id={`year-${t.year}`}>
                    <span className="timeline-dot" />
                    <span className="eyebrow">{t.year}</span>
                    <h2>{t.title}</h2>
                    <p>{t.text}</p>
                    {t.image && (
                      <figure>
                        <Image
                          src={t.image}
                          alt="Megh Farm Processing Hub inauguration gathering"
                          width={960}
                          height={540}
                        />
                        <figcaption>
                          Megh Farm Processing Hub inauguration · Khamari · 2024
                        </figcaption>
                      </figure>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
          <FutureInitiatives />
        </>
      ) : slug === 'gallery' ? (
        <section className="section wrap">
          <Gallery />
        </section>
      ) : slug === 'contact' ? (
        <section className="section wrap contact-layout">
          <div className="contact-details">
            <span className="eyebrow">VISIT OUR COMMUNITY</span>
            <h2>
              Rooted in
              <br />
              the Garo Hills.
            </h2>
            <div className="address-card">
              <MapPin size={25} />
              <address>
                Aitibi Village, Tikrikilla Block
                <br />
                West Garo Hills
                <br />
                Meghalaya, India
              </address>
            </div>
            <div className="brand-contact">
              <h3>For project & product enquiries</h3>
              <p>
                Visit the dedicated project websites for their contact channels
                and current information.
              </p>
              <a
                className="text-link"
                href="https://nokma.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Nokma <ArrowUpRight size={17} />
              </a>
              <a
                className="text-link"
                href="https://themeghfarm.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Megh Farm <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <ContactForm />
        </section>
      ) : null}
      {slug !== 'contact' && <ConnectBanner />}
    </main>
  );
}
