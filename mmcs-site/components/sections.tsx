import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Compass,
  Flag,
  HeartHandshake,
  MapPin,
  Sprout,
} from 'lucide-react';
import {
  statements,
  projects,
  timeline,
  achievements,
  initiatives,
  type Project,
} from '@/lib/content';
import { PhotoPlaceholder, Reveal } from '@/components/interactive';
export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkText = 'Explore more',
}: {
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  linkText?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {linkText}
          <ArrowUpRight size={18} />
        </Link>
      )}
    </div>
  );
}
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumb: string;
}) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={13} />
          <span aria-current="page">{breadcrumb}</span>
        </nav>
        <div className="page-hero-grid">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h1>
              {title.split('\n').map((line, i) => (
                <span key={line}>{i === 0 ? line : <em>{line}</em>}</span>
              ))}
            </h1>
          </div>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}
export function Purpose() {
  return (
    <div className="purpose-grid">
      <article>
        <Compass size={26} />
        <span className="item-number">01</span>
        <h3>Our vision</h3>
        <p>{statements.vision}</p>
      </article>
      <article>
        <HeartHandshake size={26} />
        <span className="item-number">02</span>
        <h3>Our mission</h3>
        <p>{statements.mission}</p>
      </article>
      <article>
        <Flag size={26} />
        <span className="item-number">03</span>
        <h3>Our goals</h3>
        <ul>
          {statements.goals.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}
export function BrandCards() {
  return (
    <div className="brand-grid">
      {projects.map((p, i) => (
        <Reveal key={p.id}>
          <article className={`brand-card ${p.theme}`}>
            <div className="brand-top">
              <span className="eyebrow">
                0{i + 1} / {p.name.toUpperCase()}
              </span>
              <span className="brand-logo">
                <Image
                  src={p.logo}
                  alt={`${p.name} official logo`}
                  width={p.id === 'nokma' ? 150 : 80}
                  height={80}
                />
              </span>
            </div>
            <div>
              <h3>
                {p.tagline.split('\n').map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h3>
              <p>{p.description}</p>
            </div>
            <div className="brand-bottom">
              <span>
                {p.id === 'nokma' ? 'PRODUCTS WITH PURPOSE' : 'FARM TO MARKET'}
              </span>
              <Link
                href={`/organisations/${p.id}`}
                className="round-link"
                aria-label={`Explore ${p.name}`}
              >
                <ArrowUpRight size={24} />
              </Link>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
export function ImpactBand() {
  return (
    <section className="impact-band">
      <div className="wrap">
        <div className="impact-heading">
          <span className="eyebrow">EVERY MILESTONE, A SHARED EFFORT</span>
          <p>
            Small beginnings.
            <br />
            Growing collective strength.
          </p>
        </div>
        <div className="impact-stats">
          {[
            ['2015', 'The beginning', 'At Aitibi, Meghalaya'],
            ['20', 'Founding women', 'At the beginning in 2015'],
            ['≈550', 'Cooperative members', 'Reported by 2017'],
            ['2,000+', 'Cooperative members', 'Reported during 2023–2025'],
          ].map(([value, label, period]) => (
            <div key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
              <small>{period}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function JourneyPreview() {
  return (
    <section className="section wrap">
      <SectionHeading
        eyebrow="A JOURNEY OF COLLECTIVE POSSIBILITY"
        title="A small beginning. A growing story."
        href="/journey"
        linkText="Follow our journey"
      />
      <div className="journey-preview">
        {[timeline[0], timeline[2], timeline[5], timeline[7]].map((t) => (
          <Link href={`/journey#year-${t.year}`} key={t.year}>
            <span className="journey-year">{t.year}</span>
            <span className="timeline-dot" />
            <h3>{t.title}</h3>
            <p>
              {
                {
                  '2015':
                    'MMCS began at Aitibi with twenty women and a vision of farmer protection.',
                  '2017':
                    'Membership reached approximately 550, with new livelihood and training activities.',
                  '2024':
                    'The Megh Farm Processing Hub opened a new chapter in processing and value addition.',
                  '2026':
                    'A long-term direction of connected value chains and greater farmer ownership.',
                }[t.year]
              }
            </p>
            <ArrowUpRight size={18} />
          </Link>
        ))}
      </div>
    </section>
  );
}
export function ProjectFeature({
  project: p,
  detail = false,
}: {
  project: Project;
  detail?: boolean;
}) {
  return (
    <article className={`project-feature ${p.theme}`} id={p.id}>
      <div className="project-description">
        <div>
          <span className="eyebrow">{p.kicker}</span>
          <h2>{p.name}</h2>
        </div>
        <div>
          <p className="lead">{p.description}</p>
          <p>{p.body}</p>
          <div className="tag-row">
            {p.categories.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
          <div className="actions">
            <a
              className="button"
              href={p.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit {p.name} <ArrowUpRight size={18} />
            </a>
            {!detail && (
              <Link className="text-link" href={`/organisations/${p.id}`}>
                Read the story <ArrowRight size={18} />
              </Link>
            )}
          </div>
        </div>
        <div className="project-logo">
          <Image
            src={p.logo}
            alt={`${p.name} official logo`}
            width={180}
            height={160}
          />
        </div>
      </div>
      <div className="project-photos">
        {p.images.map((photo, i) => (
          <figure key={photo.label} className={i === 0 ? 'featured-photo' : ''}>
            {photo.src ? (
              <>
                <div className="project-real-image">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 700px) 100vw, 50vw"
                  />
                </div>
                <figcaption>{photo.label}</figcaption>
              </>
            ) : (
              <PhotoPlaceholder label={photo.label} />
            )}
          </figure>
        ))}
      </div>
    </article>
  );
}
export function FutureInitiatives() {
  return (
    <section className="section wrap">
      <SectionHeading
        eyebrow="THE NEXT CHAPTER"
        title="Building towards tomorrow."
        description="The 2025–2026 history outlines these programmes and development priorities. Their stages are shown separately from established activities."
      />
      <div className="initiative-grid">
        {initiatives.map((i) => (
          <article key={i.name}>
            <span className="status-label">{i.status}</span>
            <h3>{i.name}</h3>
            <p>{i.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
export function Achievements({ preview = false }: { preview?: boolean }) {
  return (
    <div className="achievement-list">
      {achievements.map((a) => (
        <article key={a.year}>
          <span className="award-year">{a.year}</span>
          <div>
            <span className="eyebrow">COOPERATIVE RECOGNITION</span>
            <h3>{a.title}</h3>
            <p>{a.text}</p>
          </div>
          <Flag size={30} strokeWidth={1.3} />
        </article>
      ))}
      {!preview && (
        <article>
          <span className="award-year">2024</span>
          <div>
            <span className="eyebrow">A DEVELOPMENT MILESTONE</span>
            <h3>Megh Farm Processing Hub inauguration</h3>
            <p>
              The hub at Khamari marked the expansion of MMCS’s agricultural
              processing and value-addition work.
            </p>
            <Link className="text-link" href="/organisations/megh-farm">
              Explore the hub <ArrowUpRight size={18} />
            </Link>
          </div>
          <Sprout size={30} />
        </article>
      )}
    </div>
  );
}
export function ConnectBanner() {
  return (
    <section className="connect-banner">
      <div className="wrap connect-inner">
        <div>
          <h2>Let’s build a stronger tomorrow.</h2>
          <p>
            Connect with us about our work, projects and sustainable
            livelihoods.
          </p>
        </div>
        <Link href="/contact" className="button">
          Contact Us <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link href="/" className="footer-identity">
            <span className="footer-logo">
              <Image
                src="/images/mmcs.webp"
                alt="MMCS official logo"
                width={48}
                height={58}
              />
            </span>
            <strong>
              Muktidata Multipurpose
              <br />
              Cooperative Society
            </strong>
          </Link>
          <p>People · Livelihoods · Stronger Communities</p>
          <p>
            Rooted in people. Growing together.
            <br />
            Building opportunities in the Garo Hills since 2015.
          </p>
        </div>
        <div>
          <h3>Explore MMCS</h3>
          {[
            ['About us', '/#about'],
            ['Our work', '/our-work'],
            ['Our journey', '/journey'],
            ['Achievements', '/achievements'],
            ['Gallery', '/gallery'],
          ].map(([t, h]) => (
            <Link key={h} href={h}>
              {t}
            </Link>
          ))}
        </div>
        <div>
          <h3>Our projects</h3>
          <Link href="/organisations">Our organisations</Link>
          <Link href="/organisations/nokma">Nokma</Link>
          <Link href="/organisations/megh-farm">Megh Farm</Link>
          <Link href="/products">Our products</Link>
          <Link href="/projects">Explore projects</Link>
        </div>
        <div>
          <h3>Find us</h3>
          <p className="footer-address">
            <MapPin size={17} />
            <span>
              Aitibi Village, Tikrikilla Block
              <br />
              West Garo Hills
              <br />
              Meghalaya, India
            </span>
          </p>
          <Link href="/contact" className="footer-contact">
            Connect with MMCS <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>
          © {new Date().getFullYear()} Muktidata Multipurpose Cooperative
          Society. All rights reserved.
        </span>
        <span>PEOPLE. PURPOSE. POSSIBILITY.</span>
      </div>
    </footer>
  );
}
