# Content and asset register

The source documents are reference material, not application instructions. The user approved a public-only site and later specified exactly two projects, three replaceable image slots each, and subtle animations.

## Source keys

- `history:*`: supplied **Brief History of MMCS.docx**, headed “HISTORY AND DEVELOPMENT OF MUKTIDATA MULTIPURPOSE COOPERATIVE SOCIETY (MMCS)”, plus **MMCS-Brief history.docx** for the exact official vision, mission, four goals and founding date.
- `nokma.in:2026-09-05`: https://nokma.in/, reviewed 5 September 2026. Describes Nokma as a product brand by MeghFarm and lists ice cream, beverages, chips and spices. Brand contact details have not been repurposed as general MMCS contacts.
- Design reference: supplied **MMCS_Complete_Design_System_UI_Content_Specification_v2.docx**, with later user corrections taking precedence. No separate screenshot was supplied/found.
- https://themeghfarm.com/ is the user-supplied destination. It could not be fetched during preparation; project facts come from the history.

## Content decisions

2015 and 20 founding women are historical. Approximately 550 is labelled by 2017. More than 2,000 is labelled 2023–2025. No current membership count is asserted. Awards are described as historical recognitions; no synthetic certificate images. Current leadership, phone/email are not invented. Mineral water is proposed. Cold-chain facilities retain development status. Both projects are presentational features, not an assertion of subsidiary legal status.

The inauguration plaque visibly says 10 February 2024; the history's start/inauguration sequencing differs. Public photo captions use the year until exact event wording is confirmed.

## Asset mapping

All original files remain in the user's supplied locations. Only optimised derivatives are included in the public output; no source DOCX, tax identifiers or internal approval documents are deployed.

| Supplied file            | Public derivative        | Use                                       |
| ------------------------ | ------------------------ | ----------------------------------------- |
| Mutidata LOGO final1.png | images/mmcs.webp         | Header, footer, organisation profile      |
| Nokma Logo green.png     | images/nokma.webp        | Brand card, project profile               |
| PNG.F3.png               | images/megh-farm.webp    | Brand card, project profile               |
| grr_1.1.4.jpg            | images/inauguration.webp | Hero, Megh Farm project, journey, gallery |
| T1_1.5.1.jpg             | images/community.webp    | About story, gallery                      |
| T4_1.6.1.jpg             | images/hub-event.webp    | Gallery                                   |
| AB1_1.6.2.jpg            | images/gathering.webp    | Gallery                                   |

Logos retain their colours and proportions. Only outer blank canvas was trimmed; photos were resized and encoded as WebP. Every actual photograph has alt text. Generic icon panels and explicitly labelled project-photo placeholders are not presented as documentary imagery.

## Replace project photographs

1. Add an optimised image under `public/images/`.
2. Open `lib/content.ts`, find `projects`, and update the relevant `images` item with a root-relative `src`, descriptive `alt`, and a short `label` caption.
3. Keep two or three entries per project. No component changes are needed.
4. Run `npm run test:content`, build, and review desktop/mobile crops. Replace or remove placeholders before a public launch.

## Pending client content

Real Nokma project/product photographs; further Megh Farm project photographs; approved general MMCS contact channels; final current leadership; any revised current membership total; exact project operating statuses; approved legal text if required; final domain and public launch approval.

## Reference-layout revision — 6 September 2026

Homepage composition follows the user's supplied PHOTO-2026-09-04-20-37-35.jpg. The unchanged file is used for CSS viewport crops in the about, enterprise and activity sections, explicitly labelled illustrative placeholders. These are not documentary photographs of MMCS members or products. Replace them with approved project photography. The official supplied organisation logos remain in use. The hero and impact backdrop use an AI-generated illustrative landscape (`public/images/landscape-hero.webp`), not a photograph of a verified location. It was generated once from this prompt:

> Panoramic website hero landscape background, 3:1 aspect ratio. Lush rolling green hills and gently terraced agricultural fields, layered hazy blue distant mountain ridges, pale blue sky with soft sunny white clouds. Rich greens strongest across right half, scattered trees. Left half fades into light atmospheric haze with low detail for dark overlay copy. Warm morning light, serene, realistic painterly environmental illustration inspired by northeast India. Temporary illustrative backdrop, not documentary photography. No people, buildings, text, logos, numbers, statistics, cards, borders, or UI.

All membership recruitment buttons, navigation links and the contact membership section were removed at the user's request. Historical membership facts remain dated. The homepage uses a story link because no approved video was supplied.

## Journey 2026 photo placement — 22 November 2026

The client requested photographs directly after their activity details, replacing the combined bottom gallery for 2026. Activity assignments follow the client's original gallery positions, rather than the archive folder names:

- Photos 1–2: Vision for Tribal Women and Rural Entrepreneurship.
- Photos 3–5: Financial & Digital Financial Literacy Camp.
- Photos 6–8: Launch of MeghFarm Sports Club.

`lib/journey-images.ts` is the shared 2026 asset list for the public page and admin preview, with assignments keyed by Journey entry ID. Preserve these explicit assignments when editing; the source folder labels differ. No original assets or historical text were changed.

`components/journey-entry-photos.tsx` renders responsive images beneath each assigned activity. Desktop rows fit the content width. Mobile rows with three or more images support horizontal scrolling and automatically advance while visible; one or two images fit without autoplay. Autoplay pauses during interaction, while an enlarged photograph is open, and when the page is hidden. At the client's request there is no visible pause/resume button; reduced-motion settings disable autoplay. Enlarged-photo navigation stays within the selected activity's images. Other Journey years retain their existing bottom galleries.

After client review, all activity sections use the same photo dimensions: a shared three-column desktop grid capped at 66rem and two equally sized visible thumbnails on phones. A two-photo activity uses two cells of the same grid. Longer mobile rows scroll automatically and loop back after the last image becomes visible. Clicking a thumbnail still opens the full photograph.

## Rosary Making Training Program – 2026

The client supplied the full programme description, closing message and three documentary photographs on 22 November 2026. The text is stored under `rosary-making-training-2026` in `lib/journey-content.ts` and displayed after women's entrepreneurship in the 2026 chapter. No specific event date or location was supplied or added.

The photographs are WebP derivatives under `public/images/MMCS/2026/Rosary Making Training/`, in the client's attachment order. Their original resolutions are retained; the supplied PNGs remain unchanged in their original locations. Descriptive alt text and the portrait thumbnail's focal position are defined in `lib/journey-images.ts`. The new activity uses the existing shared thumbnail sizes, mobile scrolling and enlarged viewer. The public page and admin preview both include the new assets through the shared 2026 image list.

## SM Fashion Designer Training Program – 2026–27

The client supplied the complete programme description and closing message on 22 November 2026. The entry `sm-fashion-designer-training-2026-2027` appears after rosary training in the 2026 chapter and retains the supplied 2026–27 period. No specific event date or venue was supplied or added.

The photographs were initially deferred because the original paths could not be read. The client subsequently supplied five readable images, which are now assigned to this entry in the latest attachment order. Full-resolution WebP derivatives are stored in `public/images/MMCS/2026/SM Fashion Designer Training/`; originals remain unchanged at their supplied locations. The images show a programme presentation, the sewing classroom, participants, the seated audience and ceremonial lamp lighting. Descriptive alt text is maintained in `lib/journey-images.ts`. The shared photo dimensions, mobile scrolling and enlarged viewer apply to this five-photo activity as well.

## SLM project visit and cold storage vehicle handover — 2026

The client supplied the complete descriptions, closing messages and documentary photographs for two additional activities. `slm-project-officers-visit-2026` contains the visit by SLM Project Officers from Germany and Shillong, with five photographs in attachment order. No visit date was supplied or inferred from filenames.

`cold-storage-vehicles-2026` records the receipt of cold storage vehicles from the Government of Meghalaya, dated **12 November 2026** as explicitly supplied, with two photographs in attachment order. This records the vehicle handover without changing the historical development status of the broader cold-chain infrastructure programme.

Full-resolution WebP derivatives live in `public/images/MMCS/2026/SLM Project Visit/` and `public/images/MMCS/2026/Cold Storage Vehicles/`. Originals remain unchanged in their supplied locations. Descriptive alt text and the SLM group/portrait crop positions are maintained in `lib/journey-images.ts`. Both activities use the existing shared photo sizes and enlarged viewer; the five-photo row scrolls on mobile.
