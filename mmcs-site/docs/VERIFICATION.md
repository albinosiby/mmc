# Verification record — 5–6 September 2026

- Production Next.js static export: passed, 12 public pages plus 404, icon, robots and sitemap.
- TypeScript: passed in production build and standalone typecheck.
- Authored-code lint: passed after corrections. Vendored shadcn catalog and starter hooks are excluded from lint; imported components remain typechecked.
- Content/export validator: 2 projects, 3 photo positions each, unique IDs, valid real assets, alt text, dated timeline, proposed mineral-water status, one H1 per route, unique page titles, descriptions, all local page links and anchors.
- Dependency audit after compatible fixes: zero vulnerabilities reported.
- In-app browser: desktop homepage at 1440px, mobile views at 390px, tablet timeline at 768px. No horizontal overflow in the checked layouts; all 12 public routes opened across the browser checks.
- Desktop project dropdown: opens and navigates to the projects page.
- Projects page: exactly Nokma and Megh Farm; 3 image positions each.
- Mobile menu: opens as a labelled modal sheet, navigates and closes.
- Product filter: Beverages shows pineapple juice, passion fruit juice and fruit squash.
- Activity filter: Food processing shows the matching category only.
- Gallery filter: Community shows 2 photographs. Lightbox next/previous, Escape dismissal and return of focus to the opening photograph verified.
- Timeline year link: navigates to the 2024 entry.
- Contact: a test enquiry was validated and prepared locally; the visible response explicitly says it was not sent. No delivery integration exists.
- Reduced motion: stylesheet disables animations, movement and smooth scrolling under prefers-reduced-motion. This rule was inspected in source; operating-system preference emulation was not performed.
- No-JavaScript visibility: content is server-rendered and reveal animations do not hide unrevealed sections. A separate browser JavaScript-disabled run was not performed.

## Intentional limitations

Project and product photo placeholders remain as explicitly requested pending the user's real images. Contact does not deliver messages. Current MMCS phone/email, final legal copy remain unsupplied. No automated Lighthouse score or comprehensive third-party accessibility certification is claimed.

## Reference-layout revision checks

Production export, standalone typecheck and authored-code lint passed. The export validator checks all 12 routes and forbids membership recruitment controls and anchors. Desktop (1440px) and mobile (390px) homepage review found no horizontal overflow; all images loaded. Mobile navigation opens and links to Contact. Existing photo slots remain three per project. Reference imagery and generated landscape are documented as illustrative placeholders. Subtle reveal and hover effects retain reduced-motion rules.
