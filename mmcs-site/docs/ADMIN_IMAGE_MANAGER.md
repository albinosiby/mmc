# MMCS Image Admin Setup

The `/admin` route is reserved for Gallery and Our Journey image management. The public website still reads the existing static images until the Firebase-backed flow is enabled later.

## Current static-safe setup

The project currently uses `output: 'export'`, so it is deployed as a static site. Because of that, this first admin pass is a build-safe preview panel:

- `/admin` opens outside the public curtain/nav/footer shell.
- It lists the current static Gallery images.
- It lists the current Our Journey image groups.
- Replace and Delete controls show the intended flow but do not write files yet.
- The public landing page and public image rendering are unchanged.

Set this environment variable to enable the preview password gate:

```bash
NEXT_PUBLIC_ADMIN_PREVIEW_PASSWORD="<the private preview password>"
```

Important: any `NEXT_PUBLIC_` value is shipped to the browser. Use this only as a preview gate while writes are disabled. Do not use it as the final security model for Firebase writes.

## Firebase variables to prepare later

When the backend write flow is enabled, set Firebase Storage details as server-only secrets:

```bash
FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"service_account", ... }'
```

Alternative credential option:

```bash
GOOGLE_APPLICATION_CREDENTIALS="/secure/path/to/service-account.json"
```

For hosted environments, prefer `FIREBASE_SERVICE_ACCOUNT_JSON` as a secret environment variable.

## Backend mode needed for real writes

Real upload/delete needs a server runtime, because Firebase service-account credentials must never be exposed to the browser. When you say to fully connect it, the next step is:

1. Move the site from pure static export to a server-capable deployment or add a separate backend/worker.
2. Add the Firebase Admin SDK dependency.
3. Add secure cookie/session auth with server-only `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`.
4. Enable upload and delete handlers for Firebase Storage.
5. Store image metadata by area and group, for example `gallery` and `journey/2024`.
6. Update Gallery and Our Journey components to read Firebase image URLs instead of static arrays.
7. Remove static image dependencies only after the Firebase image list is verified.

This keeps the current public site stable until the full Firebase switch is requested.
