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
import { photos, products, activityGroups } from '@/lib/content';
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
  const [category, setCategory] = useState('All');
  const [index, setIndex] = useState<number | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const filtered = photos.filter(
    (p) => category === 'All' || p.category === category,
  );
  const selected = index === null ? null : filtered[index];
  const change = (direction: number) =>
    setIndex((current) =>
      current === null
        ? null
        : (current + direction + filtered.length) % filtered.length,
    );
  return (
    <>
      <div className="gallery-toolbar">
        {!preview && (
          <div className="filter-row" aria-label="Filter photographs">
            {['All', 'Megh Farm', 'Community'].map((c) => (
              <button
                key={c}
                className={category === c ? 'filter active' : 'filter'}
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        )}
        <span className="muted-note">{filtered.length} photographs · 2024</span>
      </div>
      <div className={`gallery-grid ${preview ? 'gallery-preview' : ''}`}>
        {filtered.map((photo, i) => (
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
                  {(index ?? 0) + 1} / {filtered.length}
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
      <span className="eyebrow">PREPARE YOUR ENQUIRY</span>
      <h2>Start a conversation.</h2>
      <p id="form-note">
        Online message delivery is not connected yet. You can prepare and copy
        your enquiry here; nothing is sent or stored.
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
