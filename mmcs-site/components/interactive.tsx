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
import { photos, activityGroups, initiatives } from '@/lib/content';
import {
  journeyFutureObjectives,
  journeyOwnershipRoles,
  journeyTimeline,
} from '@/lib/journey-content';
import { Coverflow } from '@/components/coverflow';
const journeyImages = [
  '/images/community.webp',
  '/images/gathering.webp',
  '/images/hub-event.webp',
  '/images/inauguration.webp',
];

function asParagraph(items: string[]) {
  return `${items.map((item) => item.replace(/[.;]$/, '')).join('; ')}.`;
}

function cardYear(entry: { id: string; year: string }) {
  if (entry.id === 'nokma-2024-2025') return '2025';
  return entry.year.split(/[–—-]/, 1)[0].trim();
}

export function JourneyExplorer() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = journeyTimeline[selectedIndex];
  const image = selected.image ?? journeyImages[selectedIndex % journeyImages.length];
  const chapter = String(selectedIndex + 1).padStart(2, '0');

  function selectChapter(index: number, focus = false) {
    const next = (index + journeyTimeline.length) % journeyTimeline.length;
    setSelectedIndex(next);
    const tab = tabs.current[next];
    if (focus) tab?.focus({ preventScroll: true });
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
              <button type="button" aria-label="Previous chapter" onClick={() => selectChapter(selectedIndex - 1)}><ArrowLeft size={19} /></button>
              <button type="button" aria-label="Next chapter" onClick={() => selectChapter(selectedIndex + 1)}><ArrowRight size={19} /></button>
            </div>
          </div>
        </div>
        <div className="journey-card-stage">
          <Coverflow
            items={journeyTimeline}
            activeIndex={selectedIndex}
            getKey={(entry) => entry.id}
            onChange={selectChapter}
            ariaLabel="MMCS journey years"
            renderItem={(entry, index) => (
            <button
              type="button"
              ref={(node) => { tabs.current[index] = node; }}
              id={`year-${entry.id}`}
              role="tab"
              aria-selected={selectedIndex === index}
              aria-controls={`chapter-panel-${index}`}
              tabIndex={selectedIndex === index ? 0 : -1}
              className={selectedIndex === index ? 'active' : ''}
              onClick={() => selectChapter(index)}
              onKeyDown={(event) => {
                const next = event.key === 'ArrowRight' ? (index + 1) % journeyTimeline.length
                  : event.key === 'ArrowLeft' ? (index - 1 + journeyTimeline.length) % journeyTimeline.length
                  : event.key === 'Home' ? 0 : event.key === 'End' ? journeyTimeline.length - 1 : null;
                if (next !== null) { event.preventDefault(); selectChapter(next, true); }
              }}
            >
              <div className="journey-card-photo">
                <Image src={entry.image ?? journeyImages[index % journeyImages.length]} alt="" fill sizes="280px" />
                <span className="journey-card-number">CHAPTER {String(index + 1).padStart(2, '0')}</span>
                <span className="journey-card-arrow"><ArrowUpRight size={20} aria-hidden="true" /></span>
              </div>
              <div className="journey-card-label">
                <span className="journey-card-year">{cardYear(entry)}</span>
                <strong>{entry.title}</strong>
                <p>{entry.summary}</p>
              </div>
            </button>
            )}
          />
        </div>
        <div className="journey-progress" aria-hidden="true">
          <span>2015</span>
          <div><i style={{ width: `${((selectedIndex + 1) / journeyTimeline.length) * 100}%` }} /></div>
          <span>2026</span>
        </div>
        {journeyTimeline.map((entry, index) => (
          <div key={entry.id} id={`chapter-panel-${index}`} role="tabpanel" aria-labelledby={`year-${entry.id}`} hidden={selectedIndex !== index} tabIndex={0}>
            {selectedIndex === index && (
              <article className="journey-detail">
                <div className="journey-detail-image">
                  <Image src={image} alt="Illustrative photograph from MMCS documentation" fill sizes="(max-width: 700px) 100vw, 42vw" />
                  <div className="journey-image-caption"><span>ROOTED IN COMMUNITY</span><strong>{selected.year}</strong></div>
                </div>
                <div className="journey-detail-copy">
                  <div className="journey-chapter-meta"><span>CHAPTER {chapter}</span><span>{chapter} / {String(journeyTimeline.length).padStart(2, '0')}</span></div>
                  <span className="journey-detail-period">{selected.year}</span>
                  <h3>{selected.heading}</h3>
                  <p>{selected.introduction}</p>
                  {(selected.date || selected.location) && (
                    <dl className="journey-facts">
                      {selected.date && <div><dt>Date</dt><dd>{selected.date}</dd></div>}
                      {selected.location && <div><dt>Location</dt><dd>{selected.location}</dd></div>}
                    </dl>
                  )}
                  {selected.leadership && (
                    <section className="journey-detail-section" aria-labelledby={`leadership-${selected.id}`}>
                      <h4 id={`leadership-${selected.id}`}>Founding leadership</h4>
                      <dl className="journey-leadership">
                        {selected.leadership.founder && <div><dt>Founder</dt><dd>{selected.leadership.founder}</dd></div>}
                        {selected.leadership.president && <div><dt>First President</dt><dd>{selected.leadership.president}</dd></div>}
                        {selected.leadership.secretary && <div><dt>First Secretary</dt><dd>{selected.leadership.secretary}</dd></div>}
                        {selected.leadership.executiveMembers && <div><dt>Founding Executive Members</dt><dd>{selected.leadership.executiveMembers.join(', ')}</dd></div>}
                      </dl>
                    </section>
                  )}
                  {selected.sections.map((section) => (
                    <section className="journey-detail-section" key={section.heading}>
                      <h4>{section.heading}</h4>
                      {section.introduction && <p>{section.introduction}</p>}
                      {section.callout && <p className="journey-callout">{section.callout}</p>}
                      {section.items && <p className="journey-section-items">{asParagraph(section.items)}</p>}
                    </section>
                  ))}
                  {selected.periodNote && <p className="journey-period-note"><strong>Status:</strong> {selected.periodNote}</p>}
                  <button type="button" className="journey-next" onClick={() => selectChapter(selectedIndex + 1)}>Next chapter <span>{journeyTimeline[(selectedIndex + 1) % journeyTimeline.length].year} <ArrowRight size={17} /></span></button>
                </div>
              </article>
            )}
          </div>
        ))}
        <p className="journey-photo-note">Photographs from MMCS documentation illustrate our journey; they are not records of every period.</p>
      </div>
    </section>
  );
}

export function JourneyConclusion() {
  return (
    <>
      <section className="journey-next-chapter" aria-labelledby="journey-next-chapter-title">
        <div className="wrap">
          <div className="journey-next-chapter-heading">
            <span className="eyebrow">THE NEXT CHAPTER</span>
            <h2 id="journey-next-chapter-title">Building towards tomorrow.</h2>
            <p>The 2025–2026 history outlines these programmes and development priorities. Their stages are shown separately from established activities.</p>
          </div>
          <div className="initiative-grid">
            {initiatives.map((initiative) => (
              <article key={initiative.name}>
                <span className="status-label">{initiative.status}</span>
                <h3>{initiative.name}</h3>
                <p>{initiative.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="journey-vision" aria-labelledby="journey-vision-title">
        <div className="wrap journey-vision-grid">
          <div>
            <span className="eyebrow">THE FUTURE VISION OF MMCS</span>
            <h2 id="journey-vision-title">A farmer-owned and women-inclusive cooperative economy.</h2>
            <p>Particularly in Meghalaya and the Garo Hills, MMCS aims to build an integrated ecosystem where farmers can produce, aggregate, process, store, brand and market their own products.</p>
          </div>
          <div>
            <h3>Future Objectives</h3>
            <ul>{journeyFutureObjectives.map((objective) => <li key={objective}><span aria-hidden="true">•</span>{objective}</li>)}</ul>
          </div>
        </div>
      </section>
      <section className="journey-closing">
        <div className="wrap">
          <span className="eyebrow">THE NEXT GENERATION OF OWNERSHIP</span>
          <div className="journey-closing-grid">
            <h2>From 20 Women to a Growing Farmer Cooperative</h2>
            <div>
              <p>MMCS’s story is one of collective action and gradual transformation. What began in 2015 with 20 women and the objective of protecting farmers has grown into a cooperative movement involving farmers and rural families.</p>
              <p>Through the Megh Farm Processing Hub, Nokma products, collective farming, cold-chain development and cooperative enterprises, farmers can participate in more of the value they create.</p>
              <p>Farmers should increasingly become:</p>
              <ul className="journey-ownership-roles">{journeyOwnershipRoles.map((role) => <li key={role}>{role}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>
    </>
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
