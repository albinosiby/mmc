# Verification record — 5–6 September 2026

## Journey 2026 update — 22 November 2026

Fashion photographs addition: all five supplied photographs are now assigned to the existing fashion training activity in latest attachment order. Final production build/TypeScript and asset checks passed; the shared registry contains 23 unique, existing assets, with all previous activity counts unchanged. Browser review confirmed all five photographs loaded with matching desktop (337.60 × 225.06) and mobile (141.80 × 94.53) dimensions. Enlarged-view navigation wrapped from the first photo to the fifth lamp-lighting image within the fashion activity. Mobile autoplay advanced the five-photo row (4 → 156), with a 390px page width at a 390px viewport. The refreshed 4173 preview remains open on fashion training. Earlier deferred/text-only records below describe previous versions.

SLM visit and vehicle handover additions: final production build/TypeScript and source/asset checks passed. Both activities include all four supplied paragraphs and closing messages; the vehicle date displays 12 November 2026, and no SLM date was inferred. All seven supplied photographs loaded beneath the correct activities, with the same 337.60 × 225.06 desktop and 141.80 × 94.53 mobile thumbnail dimensions as existing photos. Enlarged-view navigation reached the fifth SLM photo and second vehicle photo within their own activity groups. The five-photo SLM row auto-scrolled on mobile (4 → 156); the two vehicle photos fit without horizontal overflow. The mobile page remains 390px wide at a 390px viewport. The shared registry contains 18 distinct, existing assets, while fashion photographs remain deferred. The refreshed static preview remains running on port 4173.

Fashion training text addition: production build/TypeScript and source checks passed. Browser review confirmed the full four-paragraph description and closing message under `SM Fashion Designer Training Program – 2026–27`, within the 2026 chapter. The period remains 2026–27. No photographs or placeholders are rendered, as explicitly requested while the client prepares the photos. Mobile page width equals its 390px viewport. Existing activity photographs remain unchanged, and the updated local preview is open on the new activity.

Rosary training addition: the final production build/TypeScript checks passed. The new 2026 activity includes the client's complete four-paragraph description and closing message, followed by all three supplied photos in attachment order. Source checks verified unique Journey IDs, all 11 2026 image assets, and unchanged existing activity counts (2 / 3 / 3) plus three new rosary photos. Browser checks confirmed matching 337.60 × 225.06 desktop thumbnails and 141.80 × 94.53 mobile thumbnails across all four activities, no mobile page overflow, the portrait thumbnail's face-preserving crop, and navigation to the second photo within the new activity's enlarged viewer. Mobile autoplay advanced the new row (4 → 152). The updated static preview remains running on port 4173 with 2026 selected.

Latest sizing review: all eight photos now have identical measured dimensions across the sports club, financial literacy and women's entrepreneurship sections: 337.60 × 225.06 at a 1440px viewport, and 141.80 × 94.53 at 390px. The final production build and TypeScript checks passed. Mobile page width matches its 390px viewport, the two-photo row fits, and a longer row advances and loops repeatedly (scroll positions 152 → 4 → 152). The visible pause/resume control remains removed. This shared sizing supersedes the earlier pair-specific adjustment below.

Follow-up sizing review: the women's entrepreneurship images were reduced from approximately 590 × 393 to 339 × 226 at a 1440px viewport. The rebuilt preview passed production build/TypeScript checks. At 390px, the pair fits its 302px content area without horizontal overflow, and click-to-enlarge still works.

Follow-up control removal: the client requested removing the visible automatic-scrolling pause/resume button. The final production build passed, and the refreshed mobile preview contains no pause/resume control. An overflowing row still advanced automatically (scroll position 4 → 273) with no page overflow. Interaction pauses and reduced-motion handling remain in place. The earlier explicit-pause test below describes the previous version.

- `npm run typecheck`: passed.
- `npm run build`: passed on the final source; 17 static pages generated.
- `git diff --check`: passed.
- All eight 2026 assets exist and are assigned exactly once to the requested activities (women’s entrepreneurship: first two; financial literacy: next three; sports club: last three).
- Browser review at 1440px and 390px: no page-level horizontal overflow, responsive activity photos, and no combined bottom gallery in 2026. All assigned photographs loaded. The two-photo row fits on mobile without scrolling.
- Mobile autoplay advanced an overflowing three-photo row after its interval. Explicit pause kept its scroll position unchanged across another interval.
- Enlarged-photo navigation advanced within the sports activity's three images; closing returned to the page. Browser console returned no warnings or errors in the checked flow.
- The 2015 chapter retains its two-photo bottom gallery.
- Reduced-motion handling was inspected in source; OS/browser preference emulation and physical-device touch testing were not performed.
- `npm run test:content` remains blocked by the existing `nokma needs 2–3 image slots` assertion. Running the original HEAD validator against the original content reproduced the same failure; the validator was not changed for this UI update.
- Installing the locked dependencies reported 21 audit findings (8 moderate, 9 high, 4 critical). Dependency manifests and lockfile were not changed; dependency remediation is outside this update.
- Validation covered the local production build and browser preview.

The records below describe earlier verification, not the current dependency audit or content-check status.

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
