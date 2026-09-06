# MMCS public website — design proposal

Status: proposed for design approval, 5 September 2026. No application code has been generated.

## Product analysis

The website should explain how Muktidata Multipurpose Cooperative Society connects farmer protection, women's livelihoods, processing and market access. Its primary audiences are rural members and prospective members, product buyers, institutional partners and visitors seeking reliable organisational information.

Core scope: a responsive public website with organisation profiles, activities, an informational product catalogue, project statuses, achievements, history, gallery and contact information. No account, admin interface, database, checkout or message-delivery backend in this phase. The attached design specification's admin/Firebase sections describe a different phase and are excluded from this proposal.

Optional features remain conditional: real impact stories, video, membership instructions, official social links and product photographs. No invented testimonials, product packaging or membership process.

Competitive positioning: this is a design comparison of approaches, not a researched competitor audit. NGO-style sites foreground appeals; commercial catalogues foreground products; institutional sites foreground notices. MMCS needs a people-first introduction followed by tangible enterprise evidence and easy product discovery. Retain that distinction without adding donation or commerce flows.

Main risks are sparse photography, conflicting historical figures, unclear present-day project status, inconsistent leadership names and unavailable contact channels. Slow connections favour static pages and small image downloads. A lengthy homepage needs compact summaries and clear links to full pages.

## Source review and content decisions

Reviewed: both history documents, the v2 design specification, supplied brief, all three logos and all four photographs inside the inauguration ZIP. The project directory was empty. No separate reference screenshot was found; the design specification has no embedded media. The visual direction below therefore follows the written reference description.

| Item | Proposed treatment |
| --- | --- |
| Founding | 2015; 20 women at the beginning. Detailed story may use 14 February 2015 from the history. |
| Registration | Preserve the source's 2016–2017 range; do not invent a precise registration date. |
| Membership | Approximately 550 by 2017; more than 2,000 reported in the 2023–2025 history section. Do not describe either as today's count. Older undated 1,400+ text is not a current headline. |
| Vision, mission, goals | Preserve the original history wording, including all four goals; do not silently substitute rewritten text from the design specification. |
| Hub inauguration | Documents support a 2024 inauguration. The visible plaque in grr_1.1.4.jpg states 10 February 2024; the narrative says the unit started then and was subsequently inaugurated. Use 2024 publicly until the exact wording is reconciled. |
| Awards | Present the source-reported NCDC North East recognition in 2023 and Best Dairy Cooperative recognition in 2025. No fabricated certificate or official badge. |
| Nokma | Describe as a brand associated with MMCS's products. Avoid a legal subsidiary claim. |
| Megh Farm | Describe the processing hub at Khamari and its documented activities. |
| Mineral water | Planned/proposed initiative in the detailed 2026 history; not an available product. |
| Cold-chain facilities | Planning and development, with individual operational statuses unconfirmed. |
| Phase IV | Planned sapling distribution; do not invent distribution totals or completion. |
| New building | History reports a constructed administrative/conference/warehouse building. Do not infer commissioning of every associated facility. |
| Leadership | Founding roles can be historical; conflicting spellings/current roles need confirmation before a current leadership roster. |
| Membership fee | Historical ₹100 figure does not establish a current application fee. |
| Contact | Use the supplied Aitibi/Tikrikilla/West Garo Hills/Meghalaya address. Omit unprovided phone, email, precise map pin and social links. |
| Unsupported claims | Omit “biggest cooperative” and similar rankings without evidence. Omit tax identifiers from general storytelling. |

## Frontend design

Design concept: **Rooted in people. Growing together.** Warm editorial spacing, confident navy headings, forest-green actions and real documentary photography. Preserve official logos without recolouring or reconstruction. Place logos on light surfaces, including light panels within the dark footer and brand cards.

Tokens: primary #0B6B3A, hover #07552F, soft green #E8F3EC, heading #102A43, dark #071C2C, cream #FAF8F2, orange #B85C38, text #1F2933, muted #667085, border #D9DEE5. Orange is reserved for Megh Farm accents. Use Manrope, 60px desktop/40px mobile hero headings, 40px/30px section headings and 17px body text. Content width 1240px; gutters 24px mobile and 48px desktop; 8px spacing scale; restrained 16–20px corner radii.

Header: white, sticky, official logo plus readable organisation name; Home, About, Organisations, Our Work, Products, Gallery, Contact. Secondary pages remain accessible through dropdowns and footer. Membership enquiry CTA routes to contact with its purpose stated. Use a mobile menu before the desktop navigation becomes cramped.

Homepage composition:

1. Cream split hero, large text left and a documentary milestone photograph right. Proposed heading: “Sustainable livelihoods. Stronger communities.” Buttons: “Explore our work” and “Read our story”. Label the photograph as a hub inauguration image; do not suggest it depicts farming. Floating card: “20 women / Where our story began · 2015”.
2. Five compact focus areas with green line icons and short descriptions.
3. Founding story with an oversized 2015 marker, concise narrative and vision/mission/goals. Keep all official statements readable; avoid squeezing long goals into a narrow rail.
4. MMCS introduction followed by distinct Nokma and Megh Farm cards. Use “Our brands and initiatives” to avoid unsupported corporate hierarchy.
5. Six activity summaries. Use icons and typography where authentic activity photographs are absent, rather than repeating inauguration images as farming or training imagery.
6. Navy historical milestones band with year-labelled values.
7. Short journey preview, with 2024 photograph and a link to the full timeline.
8. Product showcase with official brand identity and text-led product cards until actual product images exist. No fake package renders. Mineral water appears under planned initiatives.
9. Exactly two project features: Nokma and Megh Farm, each with a description, official website link and two or three images. Follow with a small four-photo gallery and source-supported recognitions.
10. Membership/contact invitation, supplied address and dark four-column footer. Keep homepage contact concise; the dedicated page carries the full interface.

Keep every requested topic, but avoid making all 17 proposed sections equally large. The homepage is an overview; inner pages carry detail. Do not add a nonfunctional search icon, unsupported story carousel or empty gallery categories.

| Route | Screen content |
| --- | --- |
| / | Homepage overview |
| /about | Founding story, purpose, official statements, cooperative model |
| /organisations | MMCS, Nokma and Megh Farm overview |
| /organisations/nokma | Brand purpose, documented product categories |
| /organisations/megh-farm | Hub story, processing activities, milestones and plans |
| /our-work | Six categories and complete source-supported activity list |
| /products | Informational catalogue; category filters if useful |
| /projects | Exactly two project features: Nokma and Megh Farm; description, official website and 2–3 images each |
| /achievements | Chronological recognitions and milestones |
| /journey | Complete 2015–2026 history; desktop year navigation, mobile vertical timeline |
| /gallery | Four supplied photos, captions, keyboard-accessible lightbox |
| /contact | Supplied address, membership enquiry context, honest form availability |

No separate membership application page until rules exist. Privacy/terms need approved content before legal links are published; no dead placeholder links.

User flows: learn about MMCS → explore work → contact; discover Nokma → browse products → contact; read milestones → inspect project status; gallery → lightbox → return to same thumbnail. Membership CTA leads to an enquiry context without implying registration.

Component structure: SiteHeader, DesktopNavigation, MobileMenu, SiteFooter, PageHero, Breadcrumbs, SectionHeading, BrandCard, ActivityCard, ProductCard, ProjectCard, StatusLabel, HistoricalStat, Timeline, GalleryGrid, Lightbox and ContactPanel. Keep menu/filter/lightbox/form state local to its component. No global state library is needed.

Accessibility: semantic landmarks, one H1 per page, visible focus, skip link, 44px touch targets, adequate contrast, labelled fields and reduced-motion support. Dialogs close on Escape, manage focus and return focus to the opening thumbnail. All timeline entries remain accessible without animation or dragging.

## Animation and motion design

User requested animations. Add restrained motion consistently across the public website:

- Hero: one short fade and 12px upward entrance for supporting content, with a slight stagger between text and actions. Keep the main heading and primary photograph immediately visible so motion does not delay reading or the largest contentful paint.
- Sections: subtle 12–16px fade/up reveal on first entry into view, approximately 350–450ms. Content remains visible when JavaScript is unavailable; only enable reveal behaviour after enhancement is ready.
- Project and activity cards: 150–200ms border/shadow transition and at most 3px lift on hover-capable devices. Give keyboard focus equivalent visual emphasis. Project photographs may scale up to 1.025 within an overflow-hidden frame.
- Buttons and links: 150–200ms colour transition; small arrow movement on hover/focus. Avoid changes that shift surrounding layout.
- Navigation: 180–220ms dropdown/mobile-menu opacity and position transition. Keep focus management, Escape dismissal and accessibility state in sync; closed items must not remain focusable.
- Timeline: smooth navigation to year anchors with sticky-header offsets. Keep year labels and historical numbers static and readable; no animated counters for membership figures.
- Gallery: 180–220ms lightbox fade with a small scale transition; gentle crossfade between photographs. Maintain keyboard controls and focus restoration without waiting on long animations.
- Project image placeholders: static labelled panels; no shimmer that suggests photographs are loading when they have not been supplied.

Use CSS transitions/keyframes and a small IntersectionObserver enhancement; no animation framework is required for this scope. Animate opacity and transforms, avoiding layout properties. Run entrance effects once, avoid scroll-jacking, autoplay carousels, parallax and continuous decorative loops. Respect prefers-reduced-motion by showing all content immediately and disabling movement, smooth scrolling and nonessential transitions. Touch users must not depend on hover to discover actions.

Verification includes reduced-motion mode, keyboard focus during menu/lightbox transitions, mobile scrolling, no-JavaScript content visibility and absence of layout shift from animation.

## Asset plan

### Updated project scope — user clarification

The user supplied https://nokma.in/ and https://themeghfarm.com/ and specified that there are currently two projects, each requiring a description and two or three images. This proposal interprets those projects as Nokma and Megh Farm. Other documented programmes remain supporting activities or future initiatives within the relevant descriptions; they are not additional top-level project cards.

Each project feature uses its official logo, a short description, a link to its dedicated profile, an external “Visit website” link and three replaceable image slots (one large landscape image plus two smaller supporting images). The layout also supports two images without an empty third slot. On mobile, images stack in reading order. Logos do not count toward the requested project photograph total.

- **Nokma** — Proposed description: “Nokma is a product brand by MeghFarm, bringing locally sourced produce into a range of value-added food products. Its product families include ice cream, beverages, chips and spices.” Website: https://nokma.in/. Its live homepage, reviewed on 5 September 2026, supports this brand relationship and these categories. Planned photo slots: product range, product detail and production/team context.
- **Megh Farm** — Proposed description: “Megh Farm Processing Hub at Khamari supports agricultural processing, value addition and market linkages. Its documented activities include fruit processing, juice, jam, squash and fruit pulp, alongside the development of broader farm-to-market infrastructure.” Website: https://themeghfarm.com/. Description is grounded in the supplied history; the initial website fetch failed, so no additional website claims are assumed. Planned photo slots: processing hub, processing activity and inauguration/community milestone.

For design previews, missing images use neutral, clearly labelled placeholders such as “Nokma — project photo to be supplied”. The user will provide the real project photographs later. Do not invent packaging or documentary scenes. Existing inauguration images may fill relevant Megh Farm milestone slots; do not relabel them as Nokma production images. Replace placeholders through each project's media list, keeping layout independent of filenames; update alt text and captions with the actual photographs. Final publication should replace or omit any remaining placeholder slots.

The Nokma site lists MeghFarm contact channels. These may support brand-specific links, but should not automatically become MMCS's general contact details.

| Asset | Placement |
| --- | --- |
| Mutidata LOGO final1.png | Header, About and footer light-backed panel; preserve full mark and proportions |
| Nokma Logo green.png | Brand profile and product identity on cream/white |
| PNG.F3.png | Megh Farm profile and initiative card, preserving tagline |
| grr_1.1.4.jpg | Main inauguration evidence, journey and hub feature; preserve plaque where legible |
| T1_1.5.1.jpg | Group photograph for event feature/gallery |
| T4_1.6.1.jpg | Wider inauguration photograph/gallery |
| AB1_1.6.2.jpg | Supporting event photograph/gallery |

All four photos show the inauguration setting. They do not establish separate farming, training or product albums. Use captions describing the visible setting and source-supported event, without identifying people from faces. Preserve originals; produce appropriately sized web copies during implementation. Do not use image generation to invent MMCS documentary evidence.

## System architecture

Use the requested Next.js App Router, TypeScript, Tailwind and a consistent Lucide icon set. Pin compatible stable versions and a lockfile during implementation. Keep route composition, reusable presentation and structured content separate; apply architecture proportionately to a static website.

Data flow: approved local content and media → typed content accessors → build-time page rendering → static output → CDN → browser. Client JavaScript handles the small interactive features. Content updates rebuild the site. All finite detail routes are generated at build time.

Static export fits the scope. Next.js documents that default runtime image optimisation is unavailable for a static export, so use preprocessed image assets with an export-compatible image configuration, retaining next/image for layout and sizing. Reference: https://nextjs.org/docs/app/guides/static-exports

Authentication flow: not applicable; every route is public. Scalability comes primarily from static hosting, caching, limited JavaScript and correctly sized assets. A future CMS can replace content accessors without changing presentation contracts; no CMS is installed now.

## Database design

No database, tables or database indexes are required in this version. Use structured content collections for organisations, activities, products, projects, timeline entries, achievements and media. Relationships use stable IDs such as organisationId and mediaIds. Content records carry title, slug, summary, source reference, period where applicable and publication eligibility. Projects also carry status and its supporting source.

Validation rules: unique IDs/slugs, resolvable relationships, valid image paths, required alt text, supported categories, explicit historical period for numeric claims, and no publication of records lacking source support. Small in-memory ID maps are sufficient; no search/index service is needed.

## API design

No HTTP API endpoints or network submission are proposed. Internal accessors include getActivities, getProducts, getProjects and getTimeline; these return local typed records. Example contract in plain language: requesting the projects collection returns a list containing a project ID, title, organisation ID, description, status, period and media IDs. Missing detail identifiers render the site's 404 page; missing optional imagery yields a designed text card.

Contact form: before an email channel is supplied, visibly state that online enquiries are unavailable. A preview may allow validation and show “Your message has not been sent”; it must not clear the entered message or show a delivered success state. Prefer a disabled send action with that explanation to a misleading simulated success. No transmission or persistent storage of personal information. A future delivery service requires a separate scope decision.

## Security

No authentication or role system is needed. Public-content-only access is the authorisation model. Do not place source DOCX files, tax identifiers, private notes or credentials in public assets. Render content as plain text/typed structures rather than arbitrary HTML. Limit external dependencies and embeds; apply appropriate hosting security headers. Avoid logging form values or storing them in localStorage. Verify dependency advisories during setup and keep the lockfile reproducible.

## Development plan

Indicative engineering estimate after approval: 5–7 working days, excluding delays for content and publication decisions.

| Milestone | Work | Estimate |
| --- | --- | --- |
| 1 — Content foundation | Asset preparation, typed content, source/status decisions, project setup | 1 day |
| 2 — Design foundation | Responsive header/footer, tokens, homepage and shared primitives | 1–2 days |
| 3 — Complete public site | All inner routes, catalogue, project labels, timeline and gallery | 2 days |
| 4 — Verification and handoff | Accessibility/browser checks, build, content review, deployment documentation | 1–2 days |

Priority: factual integrity and navigation first; core layouts second; all route content and interactions third; motion and visual refinement last. This fits one implementation sprint with a final release checkpoint. No application implementation starts before design approval under the user's supplied AGENTS.md instruction.

## Testing

Unit checks focus on meaningful data failures: unresolved media/organisation references, duplicate slugs, missing periods for statistics and invalid project statuses. Integration checks cover category filtering, modal focus restoration and contact availability behaviour. End-to-end checks cover every route and nav link, mobile menu, timeline links, gallery next/previous/Escape, 404 page and empty filter state.

Review representative mobile, tablet and desktop widths for overflow, readable type, complete logos and sensible photo crops. Verify all four supplied photos and three logos appear appropriately. Check unique metadata, sitemap, robots, alt text, heading hierarchy, contrast, reduced motion and keyboard operation. Run build, TypeScript and lint checks; investigate browser errors. Performance goals include avoiding layout shift, lazy-loading below-fold media and limiting the initial image payload. Report measured results after implementation rather than claiming untested scores.

## DevOps

Produce a static build suitable for CDN hosting; retain the Next.js architecture. Preview the finished site before publishing. Confirm the real domain before generating canonical and production sitemap URLs. CI proposal: locked dependency installation → content validation → type/lint checks → build → interaction checks → preview; release the same reviewed output. Do not create CI-provider accounts or external integrations in this design phase.

Monitoring: hosting availability and deployment/build failures; optional privacy-conscious client error monitoring only if configured later. Backup and recovery: version source/content and original assets securely, retain a previously working deployment and verify rollback after hosting is selected. No database backup procedure is necessary.

## Documentation

Deliver a setup README with tested install/dev/build commands, environment and image-export notes; a content editing guide mapping collections to pages; an asset/source register; a route/component map; verification results; and deployment/rollback instructions. API documentation explicitly records that no public backend API exists. User guidance explains browsing work/products, using the gallery and how contact/membership enquiries are available in the released version.

## Approval requested

Approve this public-only architecture and the visual direction above so implementation can begin. Missing screenshot and additional photography do not prevent this design from being built. Current contact details, membership count, leadership details and final project statuses can remain omitted or conservatively labelled until supplied. Public launch copy should be reviewed separately from design approval.
