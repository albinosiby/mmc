'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
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

type ImageRegistry = Record<AdminImageArea, AdminImageItem[]>;

export function AdminPanel({
  images,
  previewPasswordConfigured,
}: {
  images: ImageRegistry;
  previewPasswordConfigured: boolean;
}) {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [activeArea, setActiveArea] = useState<AdminImageArea>('gallery');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(
    previewPasswordConfigured
      ? 'Enter the preview admin password to continue.'
      : 'Set NEXT_PUBLIC_ADMIN_PREVIEW_PASSWORD to enable this static preview panel.',
  );
  const [busyId, setBusyId] = useState<string | null>(null);

  function login(event: { preventDefault: () => void }) {
    event.preventDefault();
    const expectedPassword = process.env.NEXT_PUBLIC_ADMIN_PREVIEW_PASSWORD;

    if (!expectedPassword) {
      setStatus('Admin preview password is not configured yet.');
      return;
    }

    if (password !== expectedPassword) {
      setStatus('Incorrect admin password.');
      return;
    }

    setPassword('');
    setAuthed(true);
    setStatus('Preview mode: Firebase Storage is not connected yet.');
  }

  function logout() {
    setAuthed(false);
    setStatus('Signed out.');
  }

  function replaceImage(item: AdminImageItem, file: File | null) {
    if (!file) return;

    setBusyId(item.id);
    window.setTimeout(() => {
      setBusyId(null);
      setStatus(
        `Selected ${file.name} for ${item.title}. Firebase upload will be enabled in the backend step.`,
      );
    }, 250);
  }

  function deleteImage(item: AdminImageItem) {
    setBusyId(item.id);
    window.setTimeout(() => {
      setBusyId(null);
      setStatus(`Delete is prepared for ${item.title}. Firebase deletion will be enabled in the backend step.`);
    }, 250);
  }

  const activeImages = useMemo(() => images[activeArea] ?? [], [activeArea, images]);
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
                disabled={!previewPasswordConfigured}
              />
            </label>
            <button type="submit" disabled={!previewPasswordConfigured}>
              Enter admin
            </button>
          </form>
          <output className={styles.status}>{status}</output>
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

      <div className={styles.notice} data-ready="false">
        <strong>Firebase not connected yet</strong>
        <span>
          This is a static preview panel so the current build stays safe. Upload/delete will activate after the Firebase backend is enabled.
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
              <span>{images[area]?.length ?? 0}</span>
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

      <output className={styles.status}>{status}</output>

      {filteredImages.length === 0 ? (
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
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={640}
                        height={480}
                        sizes="(max-width: 700px) 100vw, 280px"
                      />
                    </div>
                    <div className={styles.cardBody}>
                      <h3>{item.title}</h3>
                      <p>{item.src}</p>
                      <span className={styles.sourceBadge}>Current static image</span>
                    </div>
                    <div className={styles.actions}>
                      <label className={styles.fileButton} aria-disabled={busyId === item.id}>
                        Replace
                        <input
                          type="file"
                          accept="image/*"
                          disabled={busyId === item.id}
                          onChange={(event) => {
                            replaceImage(item, event.target.files?.[0] ?? null);
                            event.currentTarget.value = '';
                          }}
                        />
                      </label>
                      <button
                        className={styles.dangerButton}
                        type="button"
                        disabled={busyId === item.id}
                        onClick={() => deleteImage(item)}
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
