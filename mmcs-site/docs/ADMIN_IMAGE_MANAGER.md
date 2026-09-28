# MMCS Image Admin Setup

The `/admin` route is reserved for managing Gallery and Our Journey images. The public website still reads the existing static images until the Firebase-backed flow is enabled later.

## Required admin environment variables

Set these in the deployment environment:

```bash
ADMIN_PASSWORD="<the private admin password>"
ADMIN_SESSION_SECRET="<a long random secret>"
```

Generate a strong session secret locally with:

```bash
openssl rand -hex 32
```

The password is intentionally not hardcoded in the repository.

## Firebase variables to prepare

Set the Firebase Storage details when you are ready to connect storage:

```bash
FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"service_account", ... }'
```

Alternative credential option:

```bash
GOOGLE_APPLICATION_CREDENTIALS="/secure/path/to/service-account.json"
```

For hosted environments, prefer `FIREBASE_SERVICE_ACCOUNT_JSON` as a secret environment variable.

## Current behavior

- `/admin` opens a private image manager.
- It lists the current static Gallery images.
- It lists the current Our Journey image groups.
- Replace and Delete buttons are wired to the admin API shape.
- Until Firebase credentials and write handlers are enabled, write actions return a setup message instead of changing the public site.

## Later Firebase flow

When the site is ready to move fully to Firebase:

1. Add the Firebase Admin SDK dependency.
2. Enable the upload and delete handlers in `app/api/admin/images/route.ts`.
3. Store image metadata by area and group, for example `gallery` and `journey/2024`.
4. Update Gallery and Our Journey components to read Firebase image URLs instead of static arrays.
5. Remove static image dependencies only after the Firebase image list is verified.

This keeps the current landing page and public image pages unchanged until that final switch is requested.
