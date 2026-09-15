'use client';

import { useEffect } from 'react';

export function CacheRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Caching is an optional performance enhancement.
      });
    }
  }, []);

  return null;
}
