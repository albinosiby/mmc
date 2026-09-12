'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

type CoverflowProps<T> = {
  items: readonly T[];
  activeIndex: number;
  getKey: (item: T) => string;
  onChange: (index: number) => void;
  renderItem: (item: T, index: number) => ReactNode;
  ariaLabel: string;
};

function circularOffset(index: number, activeIndex: number, length: number) {
  let offset = index - activeIndex;
  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;
  return offset;
}

export function Coverflow<T>({
  items,
  activeIndex,
  getKey,
  onChange,
  renderItem,
  ariaLabel,
}: CoverflowProps<T>) {
  const reduceMotion = useReducedMotion();
  const lastWheelAt = useRef(0);
  const pointerStart = useRef<{ index: number; x: number; y: number } | null>(null);

  function move(direction: -1 | 1) {
    onChange((activeIndex + direction + items.length) % items.length);
  }

  return (
    <motion.div
      className="coverflow"
      role="tablist"
      aria-label={ariaLabel}
      drag={reduceMotion ? false : 'x'}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.12}
      dragSnapToOrigin
      style={{ pointerEvents: 'none' }}
      onDragEnd={(_, info) => {
        if (info.offset.x < -55 || info.velocity.x < -450) move(1);
        if (info.offset.x > 55 || info.velocity.x > 450) move(-1);
      }}
      onWheel={(event) => {
        if (Math.abs(event.deltaX) < 35 || Math.abs(event.deltaX) < Math.abs(event.deltaY)) return;
        const now = Date.now();
        if (now - lastWheelAt.current < 450) return;
        lastWheelAt.current = now;
        move(event.deltaX > 0 ? 1 : -1);
      }}
    >
      {items.map((item, index) => {
        const offset = circularOffset(index, activeIndex, items.length);
        const distance = Math.abs(offset);
        const direction = Math.sign(offset);
        const visibleDistance = Math.min(distance, 2.45);
        const transform = distance === 0
          ? { x: 0, z: 0, scale: 1, rotateY: 0, opacity: 1, boxShadow: '0 30px 64px rgba(20, 62, 48, 0.3)' }
          : distance === 1
            ? { x: `calc(var(--coverflow-step) * ${direction})`, z: -100, scale: 0.88, rotateY: -10 * direction, opacity: 0.86, boxShadow: '0 20px 42px rgba(20, 62, 48, 0.2)' }
            : distance === 2
              ? { x: `calc(var(--coverflow-step) * ${2 * direction})`, z: -200, scale: 0.75, rotateY: -18 * direction, opacity: 0.62, boxShadow: '0 13px 28px rgba(20, 62, 48, 0.13)' }
              : { x: `calc(var(--coverflow-step) * ${visibleDistance * direction})`, z: -260, scale: 0.68, rotateY: -20 * direction, opacity: 0, boxShadow: '0 8px 18px rgba(20, 62, 48, 0)' };

        return (
          <motion.div
            className="coverflow-item"
            key={getKey(item)}
            animate={transform}
            initial={false}
            transition={reduceMotion ? { duration: 0 } : {
              type: 'spring',
              stiffness: 180,
              damping: 24,
              mass: 0.8,
            }}
            style={{
              zIndex: 10 - Math.min(distance, 9),
              pointerEvents: distance <= 2 ? 'auto' : 'none',
            }}
            onPointerDown={(event) => {
              pointerStart.current = { index, x: event.clientX, y: event.clientY };
            }}
            onPointerUp={(event) => {
              const start = pointerStart.current;
              pointerStart.current = null;
              if (!start || start.index !== index || distance === 0 || distance > 2) return;
              if (Math.hypot(event.clientX - start.x, event.clientY - start.y) <= 8) onChange(index);
            }}
            onPointerCancel={() => { pointerStart.current = null; }}
          >
            {renderItem(item, index)}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
