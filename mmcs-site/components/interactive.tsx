'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import journeyLightbox from './journey-lightbox.module.css';
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

// Local MMCS archive, organised by Journey period in public/images/MMCS.
const mmcsImage = (path: string) => `/images/MMCS/${path.split('/').map(encodeURIComponent).join('/')}`;

const journeyImagesByYear: Record<string, string[]> = {
  '2015': [mmcsImage("2015/begininng of mmcs 3.JPG"), mmcsImage("2015/beginning of mmcs 2.JPG")],
  '2016': [mmcsImage("2016-2017/ARCA PLATE MAKING/WhatsApp Image 2026-09-07 at 4.34.06 PM.jpeg"), mmcsImage("2016-2017/CANDLE MAKING/WhatsApp Image 2026-09-13 at 11.54.08 AM.jpeg"), mmcsImage("2016-2017/CANDLE MAKING/WhatsApp Image 2026-09-13 at 11.54.09 AM (1).jpeg"), mmcsImage("2016-2017/CANDLE MAKING/WhatsApp Image 2026-09-13 at 11.54.09 AM.jpeg"), mmcsImage("2016-2017/CANDLE MAKING/WhatsApp Image 2026-09-13 at 11.54.10 AM (1).jpeg"), mmcsImage("2016-2017/CANDLE MAKING/WhatsApp Image 2026-09-13 at 11.54.10 AM.jpeg"), mmcsImage("2016-2017/DETERGENT MAKING/WhatsApp Image 2026-09-13 at 11.54.12 AM (1).jpeg"), mmcsImage("2016-2017/DETERGENT MAKING/WhatsApp Image 2026-09-13 at 11.54.12 AM.jpeg"), mmcsImage("2016-2017/DETERGENT MAKING/WhatsApp Image 2026-09-13 at 11.54.13 AM.jpeg"), mmcsImage("2016-2017/DETERGENT MAKING/WhatsApp Image 2026-09-13 at 11.54.14 AM (1).jpeg"), mmcsImage("2016-2017/MMCS Grocery Shop Established at Tikrikilla Market/DSC_0031.JPG"), mmcsImage("2016-2017/MMCS Grocery Shop Established at Tikrikilla Market/DSC_0032.JPG")],
  '2017': [],
  '2018': [mmcsImage("2018-20/WhatsApp Image 2026-09-07 at 4.34.07 PM.jpeg"), mmcsImage("2018-20/WhatsApp Image 2026-09-07 at 4.38.28 PM.jpeg"), mmcsImage("2018-20/WhatsApp Image 2026-09-13 at 11.54.10 AM (2).jpeg"), mmcsImage("2018-20/WhatsApp Image 2026-09-13 at 11.54.11 AM (1).jpeg"), mmcsImage("2018-20/WhatsApp Image 2026-09-13 at 11.54.11 AM.jpeg"), mmcsImage("2018-20/WhatsApp Image 2026-09-13 at 11.54.13 AM (1).jpeg"), mmcsImage("2018-20/WhatsApp Image 2026-09-13 at 11.54.14 AM.jpeg")],
  '2019': [],
  '2020': [],
  '2021': [mmcsImage("2021-23/AW44DSC01857.jpg"), mmcsImage("2021-23/DSC03901.JPG"), mmcsImage("2021-23/WhatsApp Image 2026-09-07 at 4.39.19 PM.jpeg"), mmcsImage("2021-23/WhatsApp Image 2026-09-07 at 4.39.25 PM (1).jpeg"), mmcsImage("2021-23/WhatsApp Image 2026-09-07 at 4.39.25 PM.jpeg"), mmcsImage("2021-23/WhatsApp Image 2026-09-12 at 11.01.50 AM.jpeg"), mmcsImage("2021-23/g8_1.5.1.jpg"), mmcsImage("2021-23/ghjhjj_1.22.1.jpg"), mmcsImage("2021-23/gstret_1.46.2.jpg"), mmcsImage("2021-23/xbxcb_1.168.4.jpg"), mmcsImage("2021-23/xczvxcv_1.15.2.jpg")],
  '2022': [],
  '2023': [],
  '2024': [mmcsImage("2024/BEST COOPERATIVE MEMBER AWARD -2024/MATHEW AWARD.jpeg"), mmcsImage("2024/INAGRATION OF MRGHFARM/WhatsApp Image 2026-09-07 at 4.41.44 PM.jpeg"), mmcsImage("2024/INAGRATION OF MRGHFARM/WhatsApp Image 2026-09-07 at 4.41.48 PM.jpeg"), mmcsImage("2024/MEGHFARM PROCCCESING HUB ESTABLISHMENT/A22_1.2.2.jpg"), mmcsImage("2024/MEGHFARM PROCCCESING HUB ESTABLISHMENT/A24_1.3.1.jpg"), mmcsImage("2024/MEGHFARM PROCCCESING HUB ESTABLISHMENT/A28_1.3.1.jpg"), mmcsImage("2024/MEGHFARM PROCCCESING HUB ESTABLISHMENT/D1_1.2.3.jpg"), mmcsImage("2024/MEGHFARM PROCCCESING HUB ESTABLISHMENT/G4_1.4.1.jpg"), mmcsImage("2024/nokma BRAND devoloped accelerated/A DSC01259.jpg"), mmcsImage("2024/nokma BRAND devoloped accelerated/DSC03304.JPG"), mmcsImage("2024/nokma BRAND devoloped accelerated/WhatsApp Image 2026-09-07 at 4.34.37 PM.jpeg"), mmcsImage("2024/nokma BRAND devoloped accelerated/WhatsApp Image 2026-09-07 at 4.38.31 PM.jpeg"), mmcsImage("2024/nokma BRAND devoloped accelerated/WhatsApp Image 2026-09-07 at 4.50.35 PM (1).jpeg"), mmcsImage("2024/nokma BRAND devoloped accelerated/WhatsApp Image 2026-09-07 at 4.50.35 PM.jpeg"), mmcsImage("2024/nokma BRAND devoloped accelerated/fdrtr_2.1.1.jpg"), mmcsImage("2024/nokma BRAND devoloped accelerated/rtyry_3.1.2.jpg")],
  '2025': [mmcsImage("2025/Expansionof collective farming & Holticulture devolopment/IMG_20250503_145841158.jpg"), mmcsImage("2025/PA.Togen Nengminza Award for best social worker.   HIGHEST CIVILIAN AWARD OF GOVT. OF MEGHALAYA/Fr Benoy Photo 4_1.4.4.jpg"), mmcsImage("2025/expansion of agri,dairy,food,women/DSC02359.JPG"), mmcsImage("2025/expansion of agri,dairy,food,women/DSC02502.JPG"), mmcsImage("2025/expansion of agri,dairy,food,women/IMG_20250531_141100016.jpg"), mmcsImage("2025/free medical camp @ MEGHFARM/DSC04698.JPG"), mmcsImage("2025/free medical camp @ MEGHFARM/DSC04747.JPG"), mmcsImage("2025/free medical camp @ MEGHFARM/DSC04808.JPG")],
  '2026': [mmcsImage("2026/Financial & Digital Financial Literacy Camp/DSC06682.JPG"), mmcsImage("2026/Financial & Digital Financial Literacy Camp/DSC07066.JPG"), mmcsImage("2026/Financial & Digital Financial Literacy Camp/DSC07112.JPG"), mmcsImage("2026/NITI AYOG VISITING/NITI AYOG visiting at meghfarm.jpeg"), mmcsImage("2026/NITI AYOG VISITING/WhatsApp Image 2026-09-07 at 4.51.57 PM (1).jpeg"), mmcsImage("2026/NITI AYOG VISITING/WhatsApp Image 2026-09-07 at 4.51.57 PM.jpeg"), mmcsImage("2026/NITI AYOG VISITING/WhatsApp Image 2026-09-07 at 4.51.59 PM.jpeg"), mmcsImage("2026/meghfarm Football club devoloped/MFC1_1.1.1.png"), mmcsImage("2026/meghfarm Football club devoloped/MFC4_1.6.1.png"), mmcsImage("2026/meghfarm Football club devoloped/jhklhjlhui_1.6.2.png")],
};

function journeyImagesFor(years: readonly string[], entry: JourneyEntry, index: number) {
  const images = [...new Set(years.flatMap((year) => journeyImagesByYear[year] ?? []))];
  return images.length > 0
    ? images
    : [entry.image ?? journeyImages[index % journeyImages.length]];
}

function journeyImageFor(years: readonly string[], entry: JourneyEntry, index: number) {
  return journeyImagesFor(years, entry, index)[0];
}

function asParagraph(items: string[]) {
  return `${items.map((item) => item.replace(/[.;]$/, '')).join('; ')}.`;
}

type JourneyEntry = (typeof journeyTimeline)[number];

type JourneyChapter = {
  id: string;
  year: string;
  years: readonly string[];
  entries: JourneyEntry[];
  primary: JourneyEntry;
};

const journeyChapterDefinitions = [
  { id: '2015', year: '2015', years: ['2015'], entryIds: ['2015'] },
  { id: '2016-2017', year: '2016–2017', years: ['2016', '2017'], entryIds: ['registration-2016-2017', 'livelihoods-2017'] },
  { id: '2018-2020', year: '2018–2020', years: ['2018', '2019', '2020'], entryIds: ['consolidation-2018-2020'] },
  { id: '2021-2023', year: '2021–2023', years: ['2021', '2022', '2023'], entryIds: ['expansion-2021-2023'] },
  { id: '2024', year: '2024', years: ['2024'], entryIds: ['2024', 'nokma-2024-2025'] },
  { id: '2025', year: '2025', years: ['2025'], entryIds: ['livelihoods-2025', 'collective-farming-2025-2026', 'cold-chain-2025-2026', 'recognition-2023-2025'] },
  { id: '2026', year: '2026', years: ['2026'], entryIds: ['mineral-water-2026', 'infrastructure-2026', 'women-entrepreneurship-2026'] },
] as const;

const journeyYears: JourneyChapter[] = journeyChapterDefinitions.map((chapter) => {
  const entries = chapter.entryIds.map((id) => journeyTimeline.find((entry) => entry.id === id));
  if (entries.some((entry) => !entry)) {
    throw new Error(`Missing Journey content for ${chapter.year}`);
  }

  return {
    ...chapter,
    entries: entries as JourneyEntry[],
    primary: entries[0] as JourneyEntry,
  };
});

export function JourneyExplorer() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const imageTrigger = useRef<HTMLButtonElement | null>(null);
  const selected = journeyYears[selectedIndex];
  const selectedEntry = selected.primary;
  const selectedYearImages = journeyImagesFor(selected.years, selectedEntry, selectedIndex);
  const selectedImage = selectedImageIndex === null ? null : selectedYearImages[selectedImageIndex];
  const chapter = String(selectedIndex + 1).padStart(2, '0');

  function selectChapter(index: number, focus = false) {
    const next = (index + journeyYears.length) % journeyYears.length;
    setSelectedImageIndex(null);
    setSelectedIndex(next);
    const tab = tabs.current[next];
    if (focus) tab?.focus({ preventScroll: true });
  }

  function changeSelectedImage(direction: number) {
    setSelectedImageIndex((current) =>
      current === null ? null : (current + direction + selectedYearImages.length) % selectedYearImages.length,
    );
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
            className={journeyLightbox.wideCoverflow}
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
                <Image
                  src={journeyImageFor(entry.years, entry.primary, index)}
                  alt=""
                  fill
                  sizes="280px"
                  style={{
                    objectPosition:
                      entry.year === '2016–2017' || entry.year === '2021–2023'
                        ? 'center top'
                        : 'center',
                  }}
                />
                <span className="journey-card-number">YEAR {String(index + 1).padStart(2, '0')}</span>
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
              <article className="journey-detail" style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
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
                    <div className="journey-year-gallery-grid">
                      {selectedYearImages.map((src, imageIndex) => (
                        <button
                          type="button"
                          className={journeyLightbox.item}
                          key={src}
                          onClick={(event) => {
                            imageTrigger.current = event.currentTarget;
                            setSelectedImageIndex(imageIndex);
                          }}
                          aria-label={`Open photograph ${imageIndex + 1} from ${selected.year}`}
                        >
                          <Image src={src} alt={`MMCS documentation from ${selected.year}, photograph ${imageIndex + 1}`} fill sizes="(max-width: 700px) 48vw, 200px" />
                          <span className={journeyLightbox.expand} aria-hidden="true"><Expand size={18} /></span>
                        </button>
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
        <Dialog open={selectedImage !== null} onOpenChange={(open) => { if (!open) setSelectedImageIndex(null); }}>
          <DialogContent
            className="lightbox journey-image-lightbox"
            finalFocus={imageTrigger}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight') {
                event.preventDefault();
                changeSelectedImage(1);
              }
              if (event.key === 'ArrowLeft') {
                event.preventDefault();
                changeSelectedImage(-1);
              }
            }}
          >
            {selectedImage && (
              <>
                <div className="lightbox-image">
                  <Image src={selectedImage} alt={`MMCS documentation from ${selected.year}`} fill sizes="95vw" />
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
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
