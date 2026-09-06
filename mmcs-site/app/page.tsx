import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Users,
  Sprout,
  GraduationCap,
  Leaf,
  House,
  Eye,
  Target,
  ChartNoAxesCombined,
  CalendarDays,
  MapPin,
  BookOpen,
} from 'lucide-react';
import { ReferencePhoto } from '@/components/reference-photo';
import { Reveal } from '@/components/interactive';
import { ConnectBanner } from '@/components/sections';
import { statements } from '@/lib/content';
export const metadata: Metadata = { alternates: { canonical: '/' } };
const focus = [
  { Icon: Users, title: 'Women Empowerment', href: '/our-work#women' },
  { Icon: Sprout, title: 'Farmer Support', href: '/our-work#agriculture' },
  { Icon: GraduationCap, title: 'Youth Development', href: '/our-work#skills' },
  { Icon: Leaf, title: 'Sustainable Livelihoods', href: '/our-work' },
  { Icon: House, title: 'Community Development', href: '/our-work#community' },
];
const activities = [
  {
    image: 'farming',
    name: 'Farming & Livestock',
    href: '/our-work#agriculture',
  },
  {
    image: 'processing',
    name: 'Food Processing',
    href: '/our-work#processing',
  },
  { image: 'women', name: 'Women Empowerment', href: '/our-work#women' },
  { image: 'training', name: 'Skill Development', href: '/our-work#skills' },
  { image: 'household', name: 'Household Products', href: '/our-work#women' },
  { image: 'attire', name: 'Traditional Attire', href: '/our-work#women' },
] as const;
export default function Home() {
  return (
    <main id="main" className="reference-home">
      <section className="landscape-hero">
        <Image
          src="/images/landscape-hero.webp"
          alt="Illustrative green hills and terraced fields"
          fill
          priority
          className="landscape-background"
        />
        <div className="landscape-wash" />
        <div className="wrap landscape-content">
          <div className="landscape-copy">
            <span className="eyebrow">
              PEOPLE TOGETHER
              <br />
              FOR A BETTER TOMORROW
            </span>
            <span className="eyebrow-line" />
            <h1>
              Sustainable
              <br />
              Livelihoods for
              <br />
              Stronger Communities
            </h1>
            <p>
              Muktidata Multipurpose Cooperative Society (MMCS) works for the
              economic and social upliftment of tribal communities through
              collective growth, sustainable livelihoods and equal opportunities
              for all.
            </p>
            <div className="actions">
              <Link href="/our-work" className="button">
                Explore Our Work <ArrowRight size={17} />
              </Link>
              <Link href="/journey" className="button outline">
                <BookOpen size={17} /> Our Story
              </Link>
            </div>
          </div>
          <aside className="landscape-stat">
            <Users size={32} fill="currentColor" />
            <strong>2,000+</strong>
            <span>Members</span>
            <small>Reported during 2023–2025</small>
            <hr />
            <p>
              Stronger People
              <br />
              Brighter Communities
            </p>
          </aside>
        </div>
      </section>
      <section className="reference-focus">
        <div className="wrap">
          {focus.map(({ Icon, title, href }) => (
            <Link href={href} key={title}>
              <Icon size={37} strokeWidth={2.3} />
              <span>{title}</span>
            </Link>
          ))}
        </div>
      </section>
      <section id="about" className="wrap reference-about">
        <ReferencePhoto region="about" className="about-reference-image" />
        <div className="about-reference-copy">
          <span className="eyebrow">ABOUT MMCS</span>
          <h2>
            Rooted in People.
            <br />
            Growing Together.
          </h2>
          <p>
            Muktidata Multipurpose Cooperative Society (MMCS) began in 2015 in
            Khamari Village, Tikrikilla Block, West Garo Hills, Meghalaya. We
            work towards protecting farmers from exploitation by middlemen,
            empowering women, creating livelihood opportunities and building a
            peaceful, self-sufficient and sustainable tribal society.
          </p>
          <Link className="button" href="/journey">
            Read Our Story <ArrowRight size={16} />
          </Link>
        </div>
        <div className="purpose-rail">
          <article>
            <span>
              <Eye size={23} />
            </span>
            <div>
              <h3>Our Vision</h3>
              <p>{statements.vision}</p>
            </div>
          </article>
          <article>
            <span>
              <Target size={23} />
            </span>
            <div>
              <h3>Our Mission</h3>
              <p>{statements.mission}</p>
            </div>
          </article>
          <article>
            <span>
              <ChartNoAxesCombined size={23} />
            </span>
            <div>
              <h3>Our Goals</h3>
              <p>
                Empower women, support farmers, develop youth and build stronger
                communities.
              </p>
              <Link href="/#about" className="rail-link">
                Read our full goals <ArrowRight size={12} />
              </Link>
            </div>
          </article>
        </div>
      </section>
      <section className="reference-projects">
        <div className="wrap">
          <div className="reference-heading">
            <div>
              <span className="eyebrow">OUR ORGANISATIONS</span>
              <h2>Our Family of Enterprises</h2>
            </div>
            <Link href="/organisations">
              View All Organisations <ArrowRight size={16} />
            </Link>
          </div>
          <div className="reference-brands">
            <Reveal>
              <article className="reference-brand nokma">
                <ReferencePhoto
                  region="nokma"
                  className="reference-brand-photo"
                />
                <div className="brand-photo-wash" />
                <div className="reference-brand-copy">
                  <div className="reference-logo">
                    <Image
                      src="/images/nokma.webp"
                      alt="Nokma official logo"
                      width={115}
                      height={45}
                    />
                  </div>
                  <h3>Nokma</h3>
                  <strong>Local produce. New possibilities.</strong>
                  <p>
                    Our product brand connects locally sourced produce with
                    value-added foods, from ice cream and beverages to jam,
                    squash and fruit pulp.
                  </p>
                  <Link className="button white" href="/organisations/nokma">
                    Explore Nokma <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            </Reveal>
            <Reveal>
              <article className="reference-brand megh">
                <ReferencePhoto
                  region="megh"
                  className="reference-brand-photo"
                />
                <div className="brand-photo-wash" />
                <div className="reference-brand-copy">
                  <div className="reference-logo">
                    <Image
                      src="/images/megh-farm.webp"
                      alt="Megh Farm official logo"
                      width={44}
                      height={46}
                    />
                  </div>
                  <h3>Megh Farm</h3>
                  <strong>From Our Land to a Better Tomorrow.</strong>
                  <p>
                    Megh Farm supports agricultural processing and value
                    addition, connecting local harvests with products, packaging
                    and markets.
                  </p>
                  <Link
                    className="button white"
                    href="/organisations/megh-farm"
                  >
                    Explore Megh Farm <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="wrap reference-activities">
        <div className="reference-heading">
          <div>
            <span className="eyebrow">OUR KEY ACTIVITIES</span>
            <h2>Creating Opportunities, Changing Lives</h2>
          </div>
          <Link href="/our-work">
            View All Activities <ArrowRight size={16} />
          </Link>
        </div>
        <div className="reference-activity-grid">
          {activities.map((a) => (
            <Link key={a.image} href={a.href}>
              <ReferencePhoto region={a.image} />
              <strong>{a.name}</strong>
            </Link>
          ))}
        </div>
        <p className="reference-imagery-note">
          Illustrative imagery from the supplied design reference. Actual
          project photographs will be updated.
        </p>
      </section>
      <section className="reference-impact">
        <Image
          src="/images/landscape-hero.webp"
          alt=""
          fill
          className="impact-reference-image"
        />
        <div className="wrap">
          {[
            {
              Icon: Users,
              value: '2,000+',
              label: 'Members',
              note: 'Reported during 2023–2025',
            },
            {
              Icon: CalendarDays,
              value: '2015',
              label: 'Year of Establishment',
              note: '',
            },
            {
              Icon: Sprout,
              value: '20',
              label: 'Women at the Beginning',
              note: '2015',
            },
            { Icon: MapPin, value: 'Meghalaya', label: 'Our Home', note: '' },
          ].map(({ Icon, value, label, note }) => (
            <div key={value}>
              <Icon size={30} />
              <strong>{value}</strong>
              <span>{label}</span>
              {note && <small>{note}</small>}
            </div>
          ))}
        </div>
      </section>
      <ConnectBanner />
    </main>
  );
}
