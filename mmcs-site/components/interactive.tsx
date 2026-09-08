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
import { photos, activityGroups, timeline } from '@/lib/content';

const journeyDetails: Record<string, string[]> = {
  '2015': [
    'MMCS was founded at Khamari Village under the leadership of Rev. Fr. Benoy Joseph.',
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
    'Candle-making began at Khamari and home-based rosary production developed.',
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
    'MeghFarm Processing Hub was established at Khamari and initiated on 10 February 2024.',
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
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = timeline[selectedIndex];
  const image = selected.image ?? journeyImages[selectedIndex % journeyImages.length];
  const chapter = String(selectedIndex + 1).padStart(2, '0');

  function selectChapter(index: number, focus = false) {
    const next = Math.max(0, Math.min(timeline.length - 1, index));
    setSelectedIndex(next);
    const tab = tabs.current[next];
    if (focus) tab?.focus({ preventScroll: true });
    tab?.scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
  }

  return (
    <section className="journey-explorer" aria-labelledby="journey-explorer-title">
      <div className="wrap">
        <div className="journey-explorer-heading">
          <div>
            <span className="eyebrow">OUR STORY, CHAPTER BY CHAPTER</span>
            <h2 id="journey-explorer-title">A journey made <span>together.</span></h2>
          </div>
          <div className="journey-explorer-intro">
            <p>Small beginnings. Shared ambition. Explore the moments that have shaped our cooperative since 2015.</p>
            <div className="journey-controls">
              <span>Explore the years <ArrowRight size={16} aria-hidden="true" /></span>
              <button type="button" aria-label="Previous chapter" disabled={selectedIndex === 0} onClick={() => selectChapter(selectedIndex - 1)}><ArrowLeft size={19} /></button>
              <button type="button" aria-label="Next chapter" disabled={selectedIndex === timeline.length - 1} onClick={() => selectChapter(selectedIndex + 1)}><ArrowRight size={19} /></button>
            </div>
          </div>
        </div>
        <div className="journey-card-rail" role="tablist" aria-label="MMCS journey years">
          {timeline.map((entry, index) => (
            <button
              type="button"
              key={entry.year}
              ref={(node) => { tabs.current[index] = node; }}
              id={`year-${entry.year}`}
              role="tab"
              aria-selected={selectedIndex === index}
              aria-controls={`chapter-panel-${index}`}
              tabIndex={selectedIndex === index ? 0 : -1}
              className={selectedIndex === index ? 'active' : ''}
              onClick={() => selectChapter(index)}
              onKeyDown={(event) => {
                const next = event.key === 'ArrowRight' ? (index + 1) % timeline.length
                  : event.key === 'ArrowLeft' ? (index - 1 + timeline.length) % timeline.length
                  : event.key === 'Home' ? 0 : event.key === 'End' ? timeline.length - 1 : null;
                if (next !== null) { event.preventDefault(); selectChapter(next, true); }
              }}
            >
              <div className="journey-card-photo">
                <Image src={entry.image ?? journeyImages[index % journeyImages.length]} alt="" fill sizes="280px" />
                <span className="journey-card-number">CHAPTER {String(index + 1).padStart(2, '0')}</span>
                <span className="journey-card-arrow"><ArrowUpRight size={20} aria-hidden="true" /></span>
              </div>
              <div className="journey-card-label">
                <span className="journey-card-year">{entry.year}</span>
                <strong>{entry.title}</strong>
              </div>
            </button>
          ))}
        </div>
        <div className="journey-progress" aria-hidden="true">
          <span>2015</span>
          <div><i style={{ width: `${((selectedIndex + 1) / timeline.length) * 100}%` }} /></div>
          <span>2026</span>
        </div>
        {timeline.map((entry, index) => (
          <div key={entry.year} id={`chapter-panel-${index}`} role="tabpanel" aria-labelledby={`year-${entry.year}`} hidden={selectedIndex !== index} tabIndex={0}>
            {selectedIndex === index && (
              <article className="journey-detail">
                <div className="journey-detail-image">
                  <Image src={image} alt="Illustrative photograph from MMCS documentation" fill sizes="(max-width: 700px) 100vw, 42vw" />
                  <div className="journey-image-caption"><span>ROOTED IN COMMUNITY</span><strong>{selected.year}</strong></div>
                </div>
                <div className="journey-detail-copy">
                  <div className="journey-chapter-meta"><span>CHAPTER {chapter}</span><span>{chapter} / {String(timeline.length).padStart(2, '0')}</span></div>
                  <h3>{selected.title}</h3>
                  <p>{selected.text}</p>
                  <ul>{journeyDetails[selected.year].map((detail, detailIndex) => (
                    <li key={detail} style={{ animationDelay: `${detailIndex * 65 + 120}ms` }}><span aria-hidden="true">{String(detailIndex + 1).padStart(2, '0')}</span>{detail}</li>
                  ))}</ul>
                  {selectedIndex < timeline.length - 1 && <button type="button" className="journey-next" onClick={() => selectChapter(selectedIndex + 1)}>Next chapter <span>{timeline[selectedIndex + 1].year} <ArrowRight size={17} /></span></button>}
                </div>
              </article>
            )}
          </div>
        ))}
        <p className="journey-photo-note">Photographs from MMCS documentation illustrate our journey; they are not records of every period.</p>
        <section className="journey-archive" aria-labelledby="journey-archive-title">
          <div className="journey-archive-intro">
            <span className="eyebrow">THE FULL PICTURE</span>
            <h3 id="journey-archive-title">From village action to a farmer-owned value chain.</h3>
            <p>
              MMCS began on 14 February 2015 at Aitibi Village, Tikrikilla Block,
              West Garo Hills. Its work has grown from awareness and savings into
              farming, women-led production, processing, branding and market access.
            </p>
          </div>
          <div className="journey-archive-facts">
            <div><strong>20</strong><span>Women at the beginning</span></div>
            <div><strong>550</strong><span>Members by 2017</span></div>
            <div><strong>2,000+</strong><span>Members reported by 2023–25</span></div>
            <div><strong>₹100</strong><span>Inclusive membership fee</span></div>
          </div>
          <div className="journey-activity-grid">
            {[
              ['Farming & livestock', 'Dairy, poultry, piggery, beekeeping and collective farming.'],
              ['Women-led enterprise', 'Tailoring, embroidery, traditional attire, candles, soap and home-care products.'],
              ['Community products', 'Nokma Plates, rosaries, umbrellas, the fair-price grocery shop and Nokma Book Room.'],
              ['Food & value addition', 'Areca nut, turmeric, fruit and vegetable processing, juices, jam, squash, pulp and ice cream.'],
              ['Skills & technology', 'Solar technician training, solar dryers and cookers, plus umbrella, detergent and craft training.'],
              ['Markets & infrastructure', 'Aggregation, packaging, branding, cold-chain, storage, logistics and farmer-market linkages.'],
            ].map(([title, text]) => (
              <article key={title}><span className="archive-mark">✦</span><div><h4>{title}</h4><p>{text}</p></div></article>
            ))}
          </div>
          <div className="journey-value-chain" aria-label="MMCS value chain">
            {['Mobilise', 'Farm', 'Aggregate', 'Process', 'Store', 'Brand', 'Market', 'Own'].map((item, index) => (
              <span key={item}><b>0{index + 1}</b>{item}</span>
            ))}
          </div>
          <div className="journey-archive-footer">
            <div><span className="eyebrow">THE PEOPLE WHO STARTED IT</span><p><strong>Rev. Fr. Benoy Joseph</strong> · Founder & Managing Director<br />Wilna Marak · First President &nbsp;|&nbsp; Nelco Sangma · First Secretary<br />Saro Sangma · Kajolish Marak · Rupali Sangma · Rita Marak</p></div>
            <div><span className="eyebrow">THE VISION AHEAD</span><p>Better farmer incomes, rural employment, tribal women entrepreneurs, reduced post-harvest losses, and locally owned cooperative enterprises across the Garo Hills.</p></div>
          </div>
        </section>
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
