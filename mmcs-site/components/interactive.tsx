'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Expand,
  ImageIcon,
  IceCreamBowl,
  GlassWater,
  Leaf,
  Package,
  Factory,
  HandHeart,
  ShoppingBasket,
  Sprout,
  Sun,
  Truck,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { photos, products, activityGroups, timeline } from '@/lib/content';

const journeyDetails: Record<string, string[]> = {
  '2015': [
    'MMCS was founded at Aitibi Village under the leadership of Rev. Fr. Benoy Joseph.',
    'Twenty women formed the beginning of the cooperative movement.',
    'Village awareness programmes focused on savings, cooperation, fair marketing and protection from middlemen.',
  ],
  '2016–2017': [
    'The Society progressed towards formal registration and institutional development.',
    'A legal cooperative framework was established to support a growing farmer and women-led membership base.',
  ],
  '2017': [
    'Membership reached approximately 550.',
    'The MMCS Grocery Shop opened at Tikrikilla Market on 10 October 2017.',
    'Candle-making began at Aitibi and home-based rosary production developed.',
    'Five women travelled to Kerala for umbrella-making and detergent-making training.',
  ],
  '2018–2020': [
    'Farmer mobilisation, savings and collective economic activities were strengthened.',
    'Women-led livelihood programmes and agricultural support expanded.',
    'Production, aggregation, processing and market linkages began to be treated as connected parts of rural development.',
  ],
  '2021–2023': [
    'Agriculture, horticulture, dairy and value-addition work expanded.',
    'Farmers were encouraged to explore processing, packaging, branding and direct marketing.',
    'The Society received the NCDC North East Award in 2023.',
  ],
  '2024': [
    'Megh Farm Processing Hub was established at Khamari and initiated on 10 February 2024.',
    'The hub was inaugurated by Meghalaya Chief Minister Shri Conrad K. Sangma.',
    'Fruit and vegetable processing, pineapple processing, juice, jam, squash, fruit pulp, packaging and branding progressed.',
    'Nokma brand development accelerated.',
  ],
  '2025': [
    'Agriculture, dairy, food processing and women’s livelihood programmes continued to expand.',
    'Collective farming and horticultural development grew.',
    'The history records recognition as Best Dairy Cooperative in Meghalaya.',
  ],
  '2026': [
    'Collective Farming Phase IV and high-value fruit sapling distribution were planned or initiated.',
    'Cold storage, pre-cooling, chilling, blast freezing, ripening and refrigerated logistics remained in development.',
    'The Nokma mineral water initiative is proposed.',
    'Administrative, conference and warehouse infrastructure was developed for the processing hub.',
  ],
};
const journeyImages = [
  '/images/community.webp',
  '/images/gathering.webp',
  '/images/hub-event.webp',
  '/images/inauguration.webp',
];

export function JourneyExplorer() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = timeline[selectedIndex];
  const image =
    selected.image ?? journeyImages[selectedIndex % journeyImages.length];
  return (
    <section className="journey-explorer">
      <div className="wrap">
        <div className="journey-explorer-heading">
          <div>
            <span className="eyebrow">2015 — 2026</span>
            <h2>A journey made together.</h2>
          </div>
          <p>
            Swipe through the documented stages, then open a card to explore
            what was recorded in that period.
          </p>
        </div>
        <div
          className="journey-card-rail"
          role="tablist"
          aria-label="MMCS journey years"
        >
          {timeline.map((entry, index) => (
            <button
              key={entry.year}
              id={`year-${entry.year}`}
              role="tab"
              aria-selected={selectedIndex === index}
              className={selectedIndex === index ? 'active' : ''}
              onClick={() => setSelectedIndex(index)}
            >
              <Image
                src={entry.image ?? journeyImages[index % journeyImages.length]}
                alt="Illustrative MMCS journey photograph"
                fill
                sizes="260px"
              />
              <span>{entry.year}</span>
              <strong>{entry.title}</strong>
            </button>
          ))}
        </div>
        <article className="journey-detail" aria-live="polite">
          <div className="journey-detail-image">
            <Image
              src={image}
              alt="MMCS documentation photograph"
              fill
              sizes="(max-width: 700px) 100vw, 42vw"
            />
          </div>
          <div className="journey-detail-copy">
            <span className="eyebrow">{selected.year}</span>
            <h3>{selected.title}</h3>
            <p>{selected.text}</p>
            <ul>
              {journeyDetails[selected.year].map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
        </article>
        <p className="journey-photo-note">
          Photographs are from supplied MMCS documentation; they illustrate the
          journey and are not assigned as records of every period.
        </p>
      </div>
    </section>
  );
}
export function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
export function Gallery({ preview = false }: { preview?: boolean }) {
  const [index, setIndex] = useState<number | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const displayedPhotos = preview ? photos.slice(0, 4) : photos;
  const selected = index === null ? null : displayedPhotos[index];
  const change = (direction: number) =>
    setIndex((current) =>
      current === null
        ? null
        : (current + direction + displayedPhotos.length) %
          displayedPhotos.length,
    );
  return (
    <>
      <div className="gallery-toolbar">
        <span className="muted-note">
          {displayedPhotos.length} photographs · 2024
        </span>
      </div>
      <div className={`gallery-grid ${preview ? 'gallery-preview' : ''}`}>
        {displayedPhotos.map((photo, i) => (
          <button
            className="gallery-item"
            key={photo.id}
            onClick={(e) => {
              trigger.current = e.currentTarget;
              setIndex(i);
            }}
            aria-label={`Open photograph: ${photo.caption}`}
          >
            <span className="gallery-image">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 700px) 100vw, 45vw"
              />
              <span className="expand-icon">
                <Expand size={18} />
              </span>
            </span>
            <span className="gallery-caption">
              <strong>{photo.caption}</strong>
              <small>{photo.detail}</small>
            </span>
          </button>
        ))}
      </div>
      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setIndex(null);
        }}
      >
        <DialogContent
          className="lightbox"
          finalFocus={trigger}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') {
              e.preventDefault();
              change(1);
            }
            if (e.key === 'ArrowLeft') {
              e.preventDefault();
              change(-1);
            }
          }}
        >
          {selected && (
            <>
              <DialogTitle className="lightbox-title">
                {selected.caption}
              </DialogTitle>
              <DialogDescription>{selected.detail}</DialogDescription>
              <div className="lightbox-image" key={selected.id}>
                <Image
                  src={selected.src}
                  alt={selected.alt}
                  fill
                  sizes="95vw"
                />
              </div>
              <div className="lightbox-controls">
                <button
                  className="icon-button"
                  aria-label="Previous photograph"
                  onClick={() => change(-1)}
                >
                  <ArrowLeft />
                </button>
                <span aria-live="polite">
                  {(index ?? 0) + 1} / {displayedPhotos.length}
                </span>
                <button
                  className="icon-button"
                  aria-label="Next photograph"
                  onClick={() => change(1)}
                >
                  <ArrowRight />
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
const productIcons = {
  ice: IceCreamBowl,
  glass: GlassWater,
  jar: Package,
  leaf: Leaf,
};
export function ProductCatalogue({ preview = false }: { preview?: boolean }) {
  const [category, setCategory] = useState('All');
  const categories = ['All', ...new Set(products.map((p) => p.category))];
  const filtered = (preview ? products.slice(0, 4) : products).filter(
    (p) => category === 'All' || p.category === category,
  );
  return (
    <>
      {!preview && (
        <div className="filter-row" aria-label="Filter products">
          {categories.map((c) => (
            <button
              className={category === c ? 'filter active' : 'filter'}
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              key={c}
            >
              {c}
            </button>
          ))}
        </div>
      )}
      <div className="product-grid">
        {filtered.map((p, i) => {
          const Icon = productIcons[p.icon as keyof typeof productIcons];
          return (
            <article className="product-card" key={p.id}>
              <div className={`product-art tone-${i % 4}`}>
                <Icon size={53} strokeWidth={1} />
                <span>PRODUCT PHOTOGRAPH TO FOLLOW</span>
              </div>
              <div className="product-copy">
                <span className="eyebrow">{p.category}</span>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <a
                  className="text-link"
                  href={
                    p.category === 'Community products'
                      ? '/contact'
                      : 'https://nokma.in/'
                  }
                  {...(p.category === 'Community products'
                    ? {}
                    : { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  {p.category === 'Community products'
                    ? 'Enquire with MMCS'
                    : 'Explore Nokma'}
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </article>
          );
        })}
      </div>
      {!preview && (
        <p className="catalogue-note">
          This is an informational showcase. For current product ranges and
          availability, visit{' '}
          <a href="https://nokma.in/" target="_blank" rel="noopener noreferrer">
            Nokma’s website <ArrowUpRight size={14} />
          </a>
          . The mineral water facility is a proposed initiative.
        </p>
      )}
    </>
  );
}
const activityIcons = {
  sprout: Sprout,
  factory: Factory,
  heart: HandHeart,
  basket: ShoppingBasket,
  sun: Sun,
  truck: Truck,
};
export function Activities({ preview = false }: { preview?: boolean }) {
  const [category, setCategory] = useState('All');
  const filtered = activityGroups.filter(
    (g) => category === 'All' || g.id === category,
  );
  return (
    <>
      {!preview && (
        <div className="filter-row" aria-label="Filter activities">
          <button
            className={category === 'All' ? 'filter active' : 'filter'}
            aria-pressed={category === 'All'}
            onClick={() => setCategory('All')}
          >
            All areas
          </button>
          {activityGroups.map((g) => (
            <button
              key={g.id}
              className={category === g.id ? 'filter active' : 'filter'}
              aria-pressed={category === g.id}
              onClick={() => setCategory(g.id)}
            >
              {g.name}
            </button>
          ))}
        </div>
      )}
      <div className="activity-grid">
        {filtered.map((g, i) => {
          const Icon = activityIcons[g.icon as keyof typeof activityIcons];
          return (
            <article id={g.id} className="activity-card" key={g.id}>
              <div className="activity-card-top">
                <span className="activity-icon">
                  <Icon size={29} strokeWidth={1.5} />
                </span>
                <span className="item-number">0{i + 1}</span>
              </div>
              <h3>{g.name}</h3>
              <p>{preview ? g.short : g.description}</p>
              {preview ? (
                <Link className="text-link" href={`/our-work#${g.id}`}>
                  Discover more <ArrowUpRight size={16} />
                </Link>
              ) : (
                <ul className="activity-list">
                  {g.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </article>
          );
        })}
      </div>
    </>
  );
}
export function ContactForm() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  return (
    <form
      className="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
        const d = new FormData(e.currentTarget);
        const text = (key: string) => {
          const value = d.get(key);
          return typeof value === 'string' ? value : '';
        };
        setMessage(
          `Name: ${text('name')}\nEmail: ${text('email')}\nPhone: ${text('phone') || 'Not provided'}\nSubject: ${text('subject')}\n\n${text('message')}`,
        );
        setStatus('Your enquiry is prepared below. It has not been sent.');
      }}
    >
      <span className="eyebrow">PREPARE AN ENQUIRY</span>
      <h2>Write to MMCS.</h2>
      <p id="form-note">
        Online message delivery is not connected yet. Prepare and copy your
        enquiry here; nothing is sent or stored.
      </p>
      <div className="form-row">
        <label>
          Your name
          <input name="name" autoComplete="name" required maxLength={100} />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Phone <span>(optional)</span>
          <input name="phone" type="tel" autoComplete="tel" maxLength={30} />
        </label>
        <label>
          Subject
          <input name="subject" required maxLength={160} />
        </label>
      </div>
      <label>
        Your message
        <textarea name="message" rows={5} required maxLength={5000} />
      </label>
      <button className="button" type="submit" aria-describedby="form-note">
        Prepare enquiry <ArrowRight size={18} />
      </button>
      <output className="form-status">{status}</output>
      {message && (
        <div className="enquiry-draft">
          <h3>Your enquiry draft</h3>
          <pre>{message}</pre>
          <button
            className="text-link"
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(message);
                setStatus('Copied. Your enquiry has not been sent.');
              } catch {
                setStatus(
                  'Copy is unavailable. Select and copy the draft text below.',
                );
              }
            }}
          >
            {status.startsWith('Copied') ? (
              <Check size={18} />
            ) : (
              <Copy size={18} />
            )}
            Copy enquiry
          </button>
        </div>
      )}
    </form>
  );
}
export function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <div className="photo-placeholder">
      <ImageIcon size={30} strokeWidth={1} />
      <strong>{label}</strong>
      <span>Project photograph to be supplied</span>
    </div>
  );
}
