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

// MMCS documentation archive, grouped by the year shown in the Journey.
const driveImage = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w1200`;

const journeyImagesByYear: Record<string, string[]> = {
  '2015': [driveImage('1E1S8hg50csm1VwrqxlIBqUATbejqdDAi'), driveImage('1DS5eb1KiDwzEwPx_fnXIqh_mzqr_neIB')],
  '2016': [driveImage('1DS5eb1KiDwzEwPx_fnXIqh_mzqr_neIB'), driveImage('1E1S8hg50csm1VwrqxlIBqUATbejqdDAi')],
  '2017': [
    driveImage('1bFKfF9LWxD0Y8rzsMACEB1tUucS9DMCW'), driveImage('1HLV6qv_cdDKLGYHxZcnS7Y5OHrTpA7Aj'),
    driveImage('1SNACVHQaISlWYzGdOaUkNlEXpmp0q-G8'), driveImage('1dE8Qy6xF5HfhPf5P_HgOrSiIHENgQ0WL'),
    driveImage('1yNwTEZpCL9Y--NA6gitz5Q9X5AhXohOF'), driveImage('1JFj0dCw0n57XUIEqI9t1IYiZo9WMPkpj'),
    driveImage('1jApsVyORYpI3Fulu5n_Zm2r1x-2-re80'), driveImage('1dtShoQdGJq2kyjdnSnJ2jV_h1uNW_occ'),
    driveImage('1_rjDW070pvoYENBRyoBMGGZb0jdJDDVt'), driveImage('1risQoiGKkknuqUfp9pKYofDTye0DxOEN'),
    driveImage('1-_zHbCYpq7ya3BD1BQMXWw1BvS4jXfUl'), driveImage('1AC4PNb0-pGVRt5B20nIG8XYn2_kD10cN'),
  ],
  '2018': [driveImage('14BVzHaUTvHlhLO5cl098PyRmxR7oleDn'), driveImage('10h39NQ-7GndhH6lea1OQwgF34_IpgBF3')],
  '2019': [driveImage('1jNhsclZImA8wjRE3h8NmFN4Uf3zD8rEK'), driveImage('1v3RTP3mgyOE6bsXFUlOO_P1j-3Pp-b00')],
  '2020': [driveImage('1Idq9Yj8Vy8i1oJr4FO3UhyH3_AhIUO08'), driveImage('1gT3VRFWM2haUNC9YJ4cdKGkdapXE6Yej'), driveImage('1SwUacbfM6SqhQzJzG93vQsVgxF8Sh7Lq')],
  '2021': [driveImage('1BFPU5j-0ibdIvjEENV2PBItjd7XTebws'), driveImage('1sx24NXaggfqwRFnEZC1qYKV_AFoZfb8M')],
  '2022': [driveImage('127JJSDfRVaCk3qcq2X3_6XhTiPbnNDe3'), driveImage('1mWqkQBMo_WQA8xGrqc5xCCMxamoT806z')],
  '2023': [driveImage('19fOveshwj5k2buWJ2WwQlOIrwmw4suDx'), driveImage('1F9fhpNbAUnDwd7iDpsk1kRH4a5hWN__S'), driveImage('1p-rwhKEqlN7QTBZVhlogxNm9kO4wKtJ6')],
  '2024': [
    driveImage('1V6R-MJ4271b8QvUuV_SRIG0BPR7-0N3T'), driveImage('1oauHSYAf_QROPLX229_Jq0toBBk27l8s'),
    driveImage('1UwvzbHU7TzB6v_aypZk_x1QeLPt2J__T'), driveImage('1P-walzhKZTX-011k20ptT9eyQKQ3OhbC'),
    driveImage('1l_ZfNUyiO-lte7DgeQQ1eS1OHqR2gmiH'), driveImage('1xu-cZ4BnSPXLfEEtxxvAOxy0L2B3pb0c'),
    driveImage('1stkF60n8-njfV2d8peRufMQhGzt8Su_Q'), driveImage('1xEar5MavN66DTPwr8ysSonW-Cz9P7wYY'),
    driveImage('13ht9GIUB_HZfqgeFGER7GIxlvoeM0Lcd'), driveImage('1B8ZTR5MP7KUbtTiMf36mJOpV3EYS60rh'),
  ],
  '2025': [
    driveImage('17HjQVQEj_Bpxw-lRUea8OLIHpCXMp3Lt'), driveImage('13U8SitTVpNMQiQl5maCuzzf2ocBSz0ay'),
    driveImage('1Z1To0NDFAAYEtiG4pBHjJJndeyP_WUam'), driveImage('1Y8HyVoYMKCuvuqAHB6CnK-IvQxjc1orG'),
    driveImage('1pd1-hkEVFPzAD8d-7DNxJUUzASNKTKyX'), driveImage('1WPhBN6fwZZcX6UhqEd5aTOH4k5kT-6JA'),
    driveImage('13P7TZNSKbHT_baORiDiQSLGbvmaYQeeX'),
  ],
  '2026': [
    driveImage('1gWNJkscAabb4ueuG38DtzCIi-MqjPAuC'), driveImage('1tRKHNtMR59daQQvRuu3zJY4vQdmPSlFq'),
    driveImage('1N9z9hzjcedHCxjn5yLnNSztLtyXMNHwa'), driveImage('1ZEVUSkufN4FdjT4PLfR0p7rhknDhjEYq'),
    driveImage('14qED-11iGgXobTKzazYfB_GKhdnnmptx'), driveImage('1a6QJ7az4OseHc-kHR2GUnLAIRaU0T8Lo'),
    driveImage('13clDFULETkB-nPoG7ovsQkpqqHdk_klS'), driveImage('1zZPpFk6q8HLeWToycXf81ZJ3EainxxLz'),
    driveImage('1yZkEkpgnCtGgsvh5Mz_z5WP9W31X-RAM'), driveImage('1g7HQksLv9DRVpxM3bC97R9Ik8RXYGGq1'),
  ],
};

function journeyImagesFor(year: string, entry: JourneyEntry, index: number) {
  return journeyImagesByYear[year] ?? [entry.image ?? journeyImages[index % journeyImages.length]];
}

function journeyImageFor(year: string, entry: JourneyEntry, index: number) {
  return journeyImagesFor(year, entry, index)[0];
}

function asParagraph(items: string[]) {
  return `${items.map((item) => item.replace(/[.;]$/, '')).join('; ')}.`;
}

type JourneyEntry = (typeof journeyTimeline)[number];

function entryYears(entry: JourneyEntry) {
  const years = entry.year.match(/\d{4}/g)?.map(Number) ?? [];
  return { start: years[0] ?? 0, end: years.at(-1) ?? years[0] ?? 0 };
}

const journeyYears = Array.from({ length: 12 }, (_, index) => 2015 + index).map((year) => {
  const entries = journeyTimeline.filter((entry) => {
    const range = entryYears(entry);
    return year >= range.start && year <= range.end;
  });
  const primary = entries.find((entry) => entry.year === String(year))
    ?? entries.find((entry) => entryYears(entry).start === year)
    ?? entries[0];

  if (!primary) throw new Error(`Missing Journey content for ${year}`);

  return { year: String(year), entries, primary };
});

export function JourneyExplorer() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = journeyYears[selectedIndex];
  const selectedEntry = selected.primary;
  const selectedYearImages = journeyImagesFor(selected.year, selectedEntry, selectedIndex);\n  const image = selectedYearImages[0];
  const chapter = String(selectedIndex + 1).padStart(2, '0');

  function selectChapter(index: number, focus = false) {
    const next = (index + journeyYears.length) % journeyYears.length;
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
              <button type="button" aria-label="Previous year" onClick={() => selectChapter(selectedIndex - 1)}><ArrowLeft size={19} /></button>
              <button type="button" aria-label="Next year" onClick={() => selectChapter(selectedIndex + 1)}><ArrowRight size={19} /></button>
            </div>
          </div>
        </div>
        <div className="journey-card-stage">
          <Coverflow
            items={journeyYears}
            activeIndex={selectedIndex}
            getKey={(entry) => entry.year}
            onChange={selectChapter}
            ariaLabel="MMCS journey years"
            renderItem={(entry, index) => (
            <button
              type="button"
              ref={(node) => { tabs.current[index] = node; }}
              id={`year-${entry.year}`}
              role="tab"
              aria-selected={selectedIndex === index}
              aria-controls={`chapter-panel-${index}`}
              tabIndex={selectedIndex === index ? 0 : -1}
              className={selectedIndex === index ? 'active' : ''}
              onClick={() => selectChapter(index)}
              onKeyDown={(event) => {
                const next = event.key === 'ArrowRight' ? (index + 1) % journeyYears.length
                  : event.key === 'ArrowLeft' ? (index - 1 + journeyYears.length) % journeyYears.length
                  : event.key === 'Home' ? 0 : event.key === 'End' ? journeyYears.length - 1 : null;
                if (next !== null) { event.preventDefault(); selectChapter(next, true); }
              }}
            >
              <div className="journey-card-photo">
                <Image src={journeyImageFor(entry.year, entry.primary, index)} alt="" fill sizes="280px" />
                <span className="journey-card-number">YEAR {String(index + 1).padStart(2, '0')}</span>
                <span className="journey-card-arrow"><ArrowUpRight size={20} aria-hidden="true" /></span>
              </div>
              <div className="journey-card-label">
                <span className="journey-card-year">{entry.year}</span>
                <strong>{entry.primary.title}</strong>
                <p>{entry.primary.summary}</p>
              </div>
            </button>
            )}
          />
        </div>
        <div className="journey-progress" aria-hidden="true">
          <span>2015</span>
          <div><i style={{ width: `${((selectedIndex + 1) / journeyYears.length) * 100}%` }} /></div>
          <span>2026</span>
        </div>
        {journeyYears.map((entry, index) => (
          <div key={entry.year} id={`chapter-panel-${index}`} role="tabpanel" aria-labelledby={`year-${entry.year}`} hidden={selectedIndex !== index} tabIndex={0}>
            {selectedIndex === index && (
              <article className="journey-detail">
                <div className="journey-detail-image">
                  <Image src={image} alt="Illustrative photograph from MMCS documentation" fill sizes="(max-width: 700px) 100vw, 42vw" />
                  <div className="journey-image-caption"><span>ROOTED IN COMMUNITY</span><strong>{selected.year}</strong></div>
                </div>
                <div className="journey-detail-copy">
                  <div className="journey-chapter-meta"><span>YEAR {chapter}</span><span>{chapter} / {String(journeyYears.length).padStart(2, '0')}</span></div>
                  <span className="journey-detail-period">{selected.year}</span>
                  <h3>{selectedEntry.heading}</h3>
                  <p>{selectedEntry.introduction}</p>
                  {(selectedEntry.date || selectedEntry.location) && (
                    <dl className="journey-facts">
                      {selectedEntry.date && <div><dt>Date</dt><dd>{selectedEntry.date}</dd></div>}
                      {selectedEntry.location && <div><dt>Location</dt><dd>{selectedEntry.location}</dd></div>}
                    </dl>
                  )}
                  {selectedEntry.leadership && (
                    <section className="journey-detail-section" aria-labelledby={`leadership-${selectedEntry.id}`}>
                      <h4 id={`leadership-${selectedEntry.id}`}>Founding leadership</h4>
                      <dl className="journey-leadership">
                        {selectedEntry.leadership.founder && <div><dt>Founder</dt><dd>{selectedEntry.leadership.founder}</dd></div>}
                        {selectedEntry.leadership.president && <div><dt>First President</dt><dd>{selectedEntry.leadership.president}</dd></div>}
                        {selectedEntry.leadership.secretary && <div><dt>First Secretary</dt><dd>{selectedEntry.leadership.secretary}</dd></div>}
                        {selectedEntry.leadership.executiveMembers && <div><dt>Founding Executive Members</dt><dd>{selectedEntry.leadership.executiveMembers.join(', ')}</dd></div>}
                      </dl>
                    </section>
                  )}
                  {selectedEntry.sections.map((section) => (
                    <section className="journey-detail-section" key={section.heading}>
                      <h4>{section.heading}</h4>
                      {section.introduction && <p>{section.introduction}</p>}
                      {section.callout && <p className="journey-callout">{section.callout}</p>}
                      {section.items && <p className="journey-section-items">{asParagraph(section.items)}</p>}
                    </section>
                  ))}
                  {selectedEntry.periodNote && <p className="journey-period-note"><strong>Status:</strong> {selectedEntry.periodNote}</p>}
                  <section className="journey-year-gallery" aria-labelledby={`year-gallery-${selected.year}`}>
                    <div className="journey-year-gallery-heading">
                      <span className="eyebrow">YEAR IN PHOTOGRAPHS</span>
                      <h4 id={`year-gallery-${selected.year}`}>{selected.year} archive</h4>
                      <p>{selectedYearImages.length} photographs from MMCS documentation.</p>
                    </div>
                    <div className="journey-year-gallery-grid">
                      {selectedYearImages.map((src, imageIndex) => (
                        <div className="journey-year-gallery-item" key={src}>
                          <Image src={src} alt={`MMCS documentation from ${selected.year}, photograph ${imageIndex + 1}`} fill sizes="(max-width: 700px) 48vw, 200px" />
                        </div>
                      ))}
                    </div>
                  </section>
                  {selected.entries.filter((item) => item.id !== selectedEntry.id).map((item) => (
                    <section className="journey-additional-entry" key={item.id}>
                      <span>{item.year}</span>
                      <h4>{item.heading}</h4>
                      <p>{item.introduction}</p>
                      {(item.date || item.location) && (
                        <dl className="journey-facts">
                          {item.date && <div><dt>Date</dt><dd>{item.date}</dd></div>}
                          {item.location && <div><dt>Location</dt><dd>{item.location}</dd></div>}
                        </dl>
                      )}
                      {item.sections.map((section) => (
                        <div className="journey-additional-section" key={section.heading}>
                          <h5>{section.heading}</h5>
                          {section.introduction && <p>{section.introduction}</p>}
                          {section.callout && <p className="journey-callout">{section.callout}</p>}
                          {section.items && <p>{asParagraph(section.items)}</p>}
                        </div>
                      ))}
                      {item.periodNote && <p className="journey-period-note"><strong>Status:</strong> {item.periodNote}</p>}
                    </section>
                  ))}
                  <button type="button" className="journey-next" onClick={() => selectChapter(selectedIndex + 1)}>Next year <span>{journeyYears[(selectedIndex + 1) % journeyYears.length].year} <ArrowRight size={17} /></span></button>
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
