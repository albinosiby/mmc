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
import styles from './homepage.module.css';
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

const activityPhotoOverrides = {
  farming: {
    src: 'https://drive.google.com/thumbnail?id=1wAxIvFFDhPlB2RG-XLxo2qRmoyERgIIn&sz=w1000',
    alt: 'MMCS dairy farm supporting farming and livestock livelihoods',
  },
  processing: {
    src: 'https://drive.google.com/thumbnail?id=1Uj7-VzJeXPUJ8sLgJ0DrzKdN78BjthsY&sz=w1000',
    alt: 'MMCS food processing activity',
  },
  women: {
    src: 'https://drive.google.com/thumbnail?id=1BTM9EO65crXGgPg82CzJ_tJ9thHbGLrs&sz=w1000',
    alt: 'Women participating in an MMCS community programme',
  },
  training: {
    src: 'https://drive.google.com/thumbnail?id=1SHDIPK8Wii4XEEbBmhLBodD5H4IBQrzg&sz=w1000',
    alt: 'Skill development through local value-added production',
  },
  attire: {
    src: '/images/traditional-attire.jpg',
    alt: 'Traditional handwoven attire from Meghalaya',
  },
  household: {
    src: 'https://drive.google.com/thumbnail?id=1dE8Qy6xF5HfhPf5P_HgOrSiIHENgQ0WL&sz=w1000',
    alt: 'Handcrafted household products made by the MMCS community',
  },
} as const;

const mmcsArchiveImage = (path: string) =>
  `/images/MMCS/${path.split('/').map(encodeURIComponent).join('/')}`;

const executives = [
  {
    name: 'Mrs. Lipika A Sangma',
    role: 'President',
    image: mmcsArchiveImage('EXECUTIVE MEMBERS/1.Mrs Lipika A Sangma , President/DSC03056.jpg'),
  },
  {
    name: 'Fr Benoy Joseph',
    role: 'Managing Director & Secretary',
    image: mmcsArchiveImage('EXECUTIVE MEMBERS/2. Fr Benoy Joeph , Managing Director & Secretary/DSC00252..png'),
  },
  {
    name: 'Mr. Sandesh Bakshaka',
    role: 'Vice President',
    image: mmcsArchiveImage('EXECUTIVE MEMBERS/3.Sandesh Bakshaka , Vice President/DSC02996.jpg'),
  },
  {
    name: 'Mr. Batnang Momin',
    role: 'Joint Secretary',
    image: mmcsArchiveImage('EXECUTIVE MEMBERS/4.Batnang Momin , Joint Secretary/DSC02988.jpg'),
  },
  {
    name: 'Mr. Jema M Sangma',
    role: 'Member',
    image: mmcsArchiveImage('EXECUTIVE MEMBERS/5.Jema M Sangma ,Member/DSC02974.jpg'),
  },
  {
    name: 'Mrs. Rupali T Sangma',
    role: 'Member',
    image: mmcsArchiveImage('EXECUTIVE MEMBERS/6.Rupali .T Sangma ,Member/DSC03020.jpg'),
  },
  {
    name: 'Mr. Silseng Marak',
    role: 'Member',
    image: mmcsArchiveImage('EXECUTIVE MEMBERS/7.Silseng Marak , Member/SILSENG MARAK.jpeg'),
  },
  {
    name: 'Mrs. Sipswari Rabha',
    role: 'Member',
    image: mmcsArchiveImage('EXECUTIVE MEMBERS/8.Sipswari Rabha , Member/DSC03104.jpg'),
  },
] as const;
export default function Home() {
  return (
    <main id="main" className="reference-home">
      <section className="landscape-hero">
        <Image
          src="/images/home-hero-tea-picker.png"
          alt="A woman gathering tea leaves in Meghalaya"
          fill
          priority
          className="landscape-background"
        />
        <div className="landscape-wash" />
        <div className="wrap landscape-content">
          <div className="landscape-copy">
            <span className="hero-kicker">
              <span /> MMCS · MEGHALAYA · SINCE 2015
            </span>
            <h1>
              Livelihoods rooted
              <br />
              in people. <em>Built to grow together.</em>
            </h1>
            <p>
              MMCS works with tribal communities across the Garo Hills to grow
              livelihoods, strengthen local enterprise and create fairer
              opportunities for farmers, women and young people.
            </p>
            <div className="actions">
              <Link href="/our-work" className="button">
                Explore our work <ArrowRight size={17} />
              </Link>
              <Link href="/journey" className="button outline">
                <BookOpen size={17} /> Our journey
              </Link>
            </div>
            <div className="hero-metrics" aria-label="MMCS at a glance">
              <div>
                <strong>2,000+</strong>
                <span>Members reported during 2023–2026</span>
              </div>
              <div>
                <strong>2015</strong>
                <span>Working together since</span>
              </div>
            </div>
          </div>
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
        <div className="about-reference-image">
          <Image
            src="/images/about-mmcs-community.jpg"
            alt="A woman from a rural community in Meghalaya carrying a traditional basket"
            fill
            sizes="(max-width: 700px) 100vw, 32vw"
          />
        </div>
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
          <div className="about-facts" aria-label="MMCS at a glance">
            <div>
              <CalendarDays aria-hidden="true" />
              <span>
                <strong>Since 2015</strong>
                <small>Growing together</small>
              </span>
            </div>
            <div>
              <MapPin aria-hidden="true" />
              <span>
                <strong>West Garo Hills</strong>
                <small>Meghalaya</small>
              </span>
            </div>
            <div>
              <Users aria-hidden="true" />
              <span>
                <strong>2,000+</strong>
                <small>Members reported</small>
              </span>
            </div>
          </div>
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
            </div>
          </article>
        </div>
      </section>
      <section className={`executive-team ${styles.executiveTeam}`} aria-labelledby="executive-team-heading">
        <div className="wrap">
          <div className="executive-team-heading">
            <div>
              <span className="eyebrow">THE PEOPLE WHO LEAD MMCS</span>
              <h2 id="executive-team-heading">Guiding a shared purpose.</h2>
            </div>
            <p>
              The executive team brings experience, accountability and a shared
              commitment to stronger rural communities.
            </p>
          </div>
          <div className="executive-grid">
            {executives.map((executive) => (
              <article className="executive-card" key={executive.name}>
                <div className="executive-photo">
                  <img src={executive.image} alt={executive.name} />
                </div>
                <div className="executive-card-copy">
                  <span>{executive.role}</span>
                  <h3>{executive.name}</h3>
                </div>
              </article>
            ))}
          </div>
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
                <Image
                  src="/images/nokma-product-team.jpg"
                  alt="Nokma team member presenting jackfruit products"
                  fill
                  sizes="(max-width: 700px) 100vw, 50vw"
                  className="reference-brand-photo"
                />
                <div className="brand-photo-wash" />
                <div className="reference-logo">
                  <Image
                    src="/images/nokma-logo-orange.png"
                    alt="Nokma official logo"
                    width={115}
                    height={45}
                  />
                </div>
                <div className="reference-brand-copy">
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
                <Image
                  src="/images/megh-farm-pineapple-harvest.jpg"
                  alt="Farmer carrying freshly harvested pineapples in Meghalaya"
                  fill
                  sizes="(max-width: 700px) 100vw, 50vw"
                  className="reference-brand-photo"
                />
                <div className="brand-photo-wash" />
                <div className="reference-logo">
                  <Image
                    src="/images/megh-farm.webp"
                    alt="MeghFarm official logo"
                    width={44}
                    height={46}
                  />
                </div>
                <div className="reference-brand-copy">
                  <h3>MeghFarm</h3>
                  <strong>From Our Land to a Better Tomorrow.</strong>
                  <p>
                    MeghFarm supports agricultural processing and value
                    addition, connecting local harvests with products, packaging
                    and markets.
                  </p>
                  <Link
                    className="button white"
                    href="/organisations/megh-farm"
                  >
                    Explore MeghFarm <ArrowRight size={15} />
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
          {activities.map((a) => {
            const photo = activityPhotoOverrides[a.image as keyof typeof activityPhotoOverrides];
            return (
              <Link key={a.image} href={a.href}>
                {photo ? (
                <div className="reference-photo">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 700px) 45vw, 220px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ) : (
                <ReferencePhoto region={a.image} />
              )}
              <strong>{a.name}</strong>
              </Link>
            );
          })}
        </div>
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
