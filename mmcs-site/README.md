# MMCS public website

Responsive Next.js App Router website for Muktidata Multipurpose Cooperative Society, with Nokma and Megh Farm project features. Public content only: no CMS, authentication, database, checkout or message-delivery backend.

## Local setup

Use Node.js 22.13+ and npm. Tested with Node 24 and Next.js 16.3.4. In this directory:

```sh
npm ci
npm run dev
```

The development server prints its URL (normally http://127.0.0.1:3000). Manrope is bundled locally; visitors do not need Google Fonts requests.

## Production and validation

```sh
npm run lint
npm run typecheck
npm run build
npm run test:content
npm start
```

Build uses Next.js's webpack production compiler and exports to `out/`. `npm start` serves that static export locally at http://127.0.0.1:4173; it is only a preview utility. The website itself has no server endpoints. Lint applies to authored code; the supplied shadcn component catalog and starter hooks are excluded from project lint, while TypeScript still checks imported components.

## Pages

Home; About; Our Organisations; Nokma; Megh Farm; Our Work; Products; Projects; Achievements; Journey; Gallery; Contact; plus a 404 page, sitemap and robots file. `/projects/` has exactly two project descriptions, each with three replaceable photograph positions.

## Architecture

- `lib/content.ts`: typed local content, projects, product/activity categories, photo captions and history.
- `app/page.tsx`: homepage composition.
- `app/[slug]/page.tsx`: static public page composition and metadata.
- `app/organisations/[project]/page.tsx`: the two project profiles.
- `components/sections.tsx`: shared layout sections, cards, timeline preview, project gallery and footer.
- `components/navigation.tsx`: accessible desktop dropdown and mobile sheet.
- `components/interactive.tsx`: local filters, lightbox, section reveals and enquiry preparation.
- `app/globals.css`: responsive design tokens and reduced-motion-aware animation.
- `scripts/check-content.mjs`: source/media validation and exported-page link/heading/metadata checks.

No public APIs exist. Future content providers can replace the local content accessors without requiring a visual redesign. Official statements retain the history's wording.

## Enquiries

The contact interface validates and prepares a copyable draft. It explicitly says no message has been sent; it performs no network submission or persistent storage. Nokma and Megh Farm link to their supplied websites. Current official MMCS phone/email details were not supplied.

## Deploy to Render

This is a static Next.js export. The repository includes `render.yaml`, so Render can create the correct static site configuration from the repository.

1. Push this project to a GitHub, GitLab, or Bitbucket repository.
2. In Render, select **New** → **Blueprint**, connect the repository, and select its default branch.
3. Confirm the detected service, then choose **Apply**. Render will run `npm ci && npm run build` and publish the generated `out` directory.
4. After the first deployment succeeds, use **Settings** → **Custom Domains** in Render to connect the approved MMCS domain. Complete the DNS records Render displays at your domain provider.

If you choose **New** → **Static Site** instead of a Blueprint, use `npm ci && npm run build` as the build command and `out` as the publish directory. No start command or environment variables are required.

## Images and editing

See `docs/CONTENT-SOURCES.md` for source decisions, asset mapping and how to replace dummy project images. The user explicitly requested temporary photo placeholders pending real imagery. Product panels also identify missing photographs. Do not relabel inauguration photographs as unrelated farming/training activities.

## Deployment

`.openai/hosting.json` points to the privately provisioned Sites project and `out` static directory. Publish only the successful static export through Sites. For another static host, upload the contents of `out/`, serve directory `index.html` files, use `404.html` for unknown routes, and enable HTTPS. Do not upload source documents or source configuration files as public assets.

Before a public domain launch, replace `siteUrl` in `lib/content.ts` and `metadataBase` in `app/layout.tsx`, rebuild, and verify canonical/sitemap URLs. No environment secrets are needed. A proposed CI sequence is `npm ci`, lint, typecheck, build, content checks, then an authorised preview/release. CI-provider integrations have not been created.

For rollback, retain the last verified source commit and hosted version. Re-deploy that saved version through the hosting provider. Version content and web assets; keep original documents and photographs backed up outside the public directory.

## Pending launch decisions

Replace the photo placeholders; confirm general contact details, current membership/leadership and project status changes; approve any privacy/terms copy; select the final domain and audience. Historical figures are dated, planned initiatives are labelled, and unsupported current claims are omitted.
