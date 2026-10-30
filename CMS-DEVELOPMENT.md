# Unified CMS development branch

This branch is for the proposed shared MMC/Nokma content management integration.

## Production safety
- Do not merge into main or deploy to the production domain without explicit approval.
- Use an isolated development Supabase project and preview deployment.
- Never point preview code at production database, storage, or secrets.
- CMS login must validate ADMIN_EMAIL and ADMIN_PASSWORD server-side, using secure sessions; never expose these secrets in browser bundles.

## Planned integration
- Shared CMS schema: sites, pages, page_sections, media_assets, media_placements, products, product_variants, categories, albums, projects, articles, site_settings, content_revisions.
- MMC: homepage, about, gallery, activities, projects, achievements, timeline, contact.
- Nokma: homepage, flavours and catalogue, product media, blog, brand content, contact.
- Preserve existing site design and hardcoded content until preview testing passes.
- Publish only after a separate approval step.

## Next steps
1. Audit current components and assets.
2. Provision separate development backend.
3. Build admin application in separate repository.
4. Connect this branch to development CMS, with fallback to existing content.
5. Test preview and create PR without merging.
