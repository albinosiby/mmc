'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import Image from 'next/image';
import { getJourneyImageDetails } from '@/lib/journey-images';
import styles from './journey-entry-photos.module.css';

type JourneyEntryPhotosProps = {
  images: readonly string[];
  heading: string;
  lightboxOpen: boolean;
  onOpen: (event: MouseEvent<HTMLButtonElement>, index: number) => void;
};

export function JourneyEntryPhotos({
  images,
  heading,
  lightboxOpen,
  onOpen,
}: JourneyEntryPhotosProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canAutoScroll, setCanAutoScroll] = useState(false);
  const [visible, setVisible] = useState(false);
  const [interacting, setInteracting] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || images.length < 3) return;

    const mobile = window.matchMedia('(max-width: 700px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setCanAutoScroll(
        mobile.matches && !reducedMotion.matches && track.scrollWidth > track.clientWidth + 1,
      );
    };
    const resizeObserver = new ResizeObserver(update);
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.5 },
    );

    update();
    resizeObserver.observe(track);
    visibilityObserver.observe(track);
    mobile.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      mobile.removeEventListener('change', update);
      reducedMotion.removeEventListener('change', update);
    };
  }, [images.length]);

  useEffect(() => {
    if (!canAutoScroll || !visible || interacting || lightboxOpen) return;

    const timer = window.setInterval(() => {
      const track = trackRef.current;
      if (!track || document.hidden || track.parentElement?.contains(document.activeElement)) return;

      const photos = Array.from(track.children) as HTMLButtonElement[];
      const first = photos[0];
      const step = photos[1].offsetLeft - first.offsetLeft;
      const maxScroll = track.scrollWidth - track.clientWidth;
      const nextLeft = track.scrollLeft >= maxScroll - 1
        ? 0
        : Math.min(track.scrollLeft + step, maxScroll);
      track.scrollTo({ left: nextLeft, behavior: 'smooth' });
    }, 4500);

    return () => window.clearInterval(timer);
  }, [canAutoScroll, visible, interacting, lightboxOpen]);

  if (images.length === 0) return null;

  return (
    <div
      className={styles.photos}
      role="group"
      aria-label={`${heading} photographs`}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') setInteracting(true);
      }}
      onPointerLeave={() => setInteracting(false)}
      onPointerDown={() => setInteracting(true)}
      onPointerUp={() => setInteracting(false)}
      onPointerCancel={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false);
      }}
    >
      <div
        ref={trackRef}
        className={styles.track}
      >
        {images.map((src, index) => (
          <button
            type="button"
            className={styles.photo}
            key={src}
            onClick={(event) => onOpen(event, index)}
            aria-label={`Enlarge ${heading} photograph ${index + 1} of ${images.length}`}
          >
            <Image
              src={src}
              alt={getJourneyImageDetails(src)?.alt ?? `${heading}, photograph ${index + 1}`}
              style={{ objectPosition: getJourneyImageDetails(src)?.objectPosition }}
              fill
              sizes="(max-width: 700px) 42vw, 340px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
