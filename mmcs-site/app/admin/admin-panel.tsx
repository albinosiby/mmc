'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './admin.module.css';

type AdminImageArea = 'gallery' | 'journey';

type AdminImageItem = {
  id: string;
  area: AdminImageArea;
  group: string;
  title: string;
  src: string;
  alt: string;
  source: 'static-site' | 'firebase-storage';
  storagePath?: string;
};

type ImageResponse = {
  ok: boolean;
  message?: string;
  firebase?: {
    configured: boolean;
    hasBucket: boolean;
    hasCredentials: boolean;
  };
  images?: Record<AdminImageArea, AdminImageItem[]>;
  totals?: Record<AdminImageArea, number>;
};

export function AdminPanel({
  initialAuthed,
  adminConfigured,
}: {
  initialAuthed: boolean;
  adminConfigured: boolean;
}) {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(initialAuthed);
  const [activeArea, setActiveArea] = useState<AdminImageArea>('gallery');
  const [data, setData] = useState<ImageResponse | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(adminConfigured ? '' : 'Admin login is waiting for ADMIN_PASSWORD and ADMIN_SESSION_SECRET.');
  const [isLoading, setIsLoading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function loadImages() {
    setIsLoading(true);
    setStatus('Loading image registry...');

    try {
      const response = await fetch('/api/admin/images', { cache: 'no-store' });
      const result = (await response.json()) as ImageResponse;

      if (!response.ok) {
        throw new Error(result.message ?? 'Could not load images.');
      }

      setData(result);
      setStatus(result.firebase?.configured ? 'Firebase is connected.' : 'Preview mode: Firebase Storage is not connected yet.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not load images.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (authed) void loadImages();
  }, [authed]);

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setStatus('Checking password...');

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const result = (await response.json()) as { ok: boolean; message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? 'Could not sign in.');
      }

      setPassword('');
      setAuthed(true);
      setStatus('Signed in.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not sign in.');
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    setAuthed(false);
    setData(null);
    setStatus('Signed out.');
  }

  async function replaceImage(item: AdminImageItem, file: File | null) {
    if (!file) return;

    const formData = new FormData();
    formData.append('id', item.id);
    formData.append('area', item.area);
    formData.append('storagePath', item.storagePath ?? item.id);
    formData.append('image', file);

    setBusyId(item.id);
    setStatus(`Preparing to replace ${item.title}...`);

    try {
      const response = await fetch('/api/admin/images', {
        method: 'POST',
        body: formData,
      });
      const result = (await response.json()) as ImageResponse;

      if (!response.ok) {
        throw new Error(result.message ?? 'Could not replace image.');
      }

      setStatus('Image replaced.');
      await loadImages();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not replace image.');
    } finally {
      setBusyId(null);
    }
  }

  async function deleteImage(item: AdminImageItem) {
    const confirmed = window.confirm(`Delete ${item.title}?`);
    if (!confirmed) return;

    setBusyId(item.id);
    setStatus(`Preparing to delete ${item.title}...`);

    try {
      const response = await fetch('/api/admin/images', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, area: item.area, storagePath: item.storagePath }),
      });
      const result = (await response.json()) as ImageResponse;

      if (!response.ok) {
        throw new Error(result.message ?? 'Could not delete image.');
      }

      setStatus('Image deleted.');
      await loadImages();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not delete image.');
    } finally {
      setBusyId(null);
    }
  }

  const activeImages = data?.images?.[activeArea] ?? [];
  const filteredImages = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return activeImages;

    return activeImages.filter((item) =>
      [item.title, item.group, item.src, item.alt]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [activeImages, query]);

  const groupedImages = useMemo(() => {
    return filteredImages.reduce<Record<string, AdminImageItem[]>>((groups, item) => {
      groups[item.group] ??= [];
      groups[item.group].push(item);
      return groups;
    }, {});
  }, [filteredImages]);

  if (!authed) {
    return (
      <section className={styles.loginShell}>
        <div className={styles.loginCard}>
          <span className={styles.eyebrow}>MMCS IMAGE ADMIN</span>
          <h1>Sign in to manage images.</h1>
          <p>
            This admin area is only for Gallery and Our Journey image updates. The public website image flow is unchanged for now.
          </p>
          <form onSubmit={login} className={styles.loginForm}>
            <label>
              Admin password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoComplete="current-password"
                disabled={!adminConfigured || isLoading}
              />
            </label>
            <button type="submit" disabled={!adminConfigured || isLoading}>
              {isLoading ? 'Checking...' : 'Enter admin'}
            </button>
          </form>
          <p className={styles.status} role="status">
            {status || 'Use the configured ADMIN_PASSWORD to continue.'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.shell}>
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>MMCS IMAGE ADMIN</span>
          <h1>Journey and Gallery images.</h1>
          <p>Preview the current static images and prepare Firebase Storage updates from one private panel.</p>
        </div>
        <button className={styles.secondaryButton} type="button" onClick={logout}>
          Sign out
        </button>
      </header>

      <div className={styles.notice} data-ready={data?.firebase?.configured ? 'true' : 'false'}>
        <strong>{data?.firebase?.configured ? 'Firebase connected' : 'Firebase not connected yet'}</strong>
        <span>
          {data?.firebase?.configured
            ? 'Upload and delete actions can write to Firebase Storage.'
            : 'The panel can preview all current images now. Upload/delete will activate after Firebase credentials are added.'}
        </span>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.tabs} role="tablist" aria-label="Image areas">
          {(['gallery', 'journey'] as const).map((area) => (
            <button
              key={area}
              type="button"
              role="tab"
              aria-selected={activeArea === area}
              className={activeArea === area ? styles.activeTab : ''}
              onClick={() => setActiveArea(area)}
            >
              {area === 'gallery' ? 'Gallery' : 'Our Journey'}
              <span>{data?.totals?.[area] ?? 0}</span>
            </button>
          ))}
        </div>
        <label className={styles.search}>
          Search images
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by year, path, title..."
          />
        </label>
      </div>

      <p className={styles.status} role="status">
        {status}
      </p>

      {isLoading ? (
        <div className={styles.emptyState}>Loading images...</div>
      ) : filteredImages.length === 0 ? (
        <div className={styles.emptyState}>No images match this search.</div>
      ) : (
        <div className={styles.groups}>
          {Object.entries(groupedImages).map(([group, items]) => (
            <section key={group} className={styles.group}>
              <div className={styles.groupHeading}>
                <h2>{group}</h2>
                <span>{items.length} images</span>
              </div>
              <div className={styles.grid}>
                {items.map((item) => (
                  <article key={item.id} className={styles.card}>
                    <div className={styles.imageWrap}>
                      <img src={item.src} alt={item.alt} loading="lazy" />
                    </div>
                    <div className={styles.cardBody}>
                      <h3>{item.title}</h3>
                      <p>{item.src}</p>
                      <span className={styles.sourceBadge}>{item.source === 'static-site' ? 'Current static image' : 'Firebase Storage'}</span>
                    </div>
                    <div className={styles.actions}>
                      <label className={styles.fileButton} aria-disabled={busyId === item.id}>
                        Replace
                        <input
                          type="file"
                          accept="image/*"
                          disabled={busyId === item.id}
                          onChange={(event) => {
                            void replaceImage(item, event.target.files?.[0] ?? null);
                            event.currentTarget.value = '';
                          }}
                        />
                      </label>
                      <button
                        className={styles.dangerButton}
                        type="button"
                        disabled={busyId === item.id}
                        onClick={() => void deleteImage(item)}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </section>
  );
}
