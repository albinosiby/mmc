# Cloudflare Pages deployment

This website is a static Next.js export and can be deployed directly to Cloudflare Pages.

## Dashboard settings

- **Git repository:** `albinosiby/mmc`
- **Production branch:** `main`
- **Root directory:** `mmcs-site`
- **Build command:** `npm run build:cloudflare`
- **Build output directory:** `out`
- **Node.js version:** `22`

The generated `out` directory contains the complete website, including all routes and static images.

## CLI deployment

After installing dependencies inside `mmcs-site`:

```bash
npm run build:cloudflare
npm run deploy:cloudflare
```

The first CLI deployment may ask you to sign in to Cloudflare and confirm the Pages project name.
