/** Approved public content. Source keys refer to docs/CONTENT-SOURCES.md. */
import { journeyTimeline } from './journey-content';

export { journeyTimeline as timeline } from './journey-content';
export const siteUrl = 'https://mmcs-community.tatos.chatgpt.site';
export const statements = {
  vision:
    'Every Tribal Person is entitled to live with dignity and equality in a safe and secure environment.',
  mission:
    'To build up a Peaceful, Economically Self-sufficient, Sustained Democratic Tribal Society with harmony and respect.',
  goals: [
    'To make every individual pro active to compete with rest of the world',
    'To Empower the women and make them economically self-sufficient.',
    'To Save the Farmers from Exploitation by the Middle men',
    'To make Youth aware that every person is unique individual with strength, abilities and values.',
  ],
};
const galleryImage = (name: string) =>
  `/images/gallery/${encodeURIComponent(name)}`;
const mmcsImage = (path: string) =>
  `/images/MMCS/${path.split('/').map(encodeURIComponent).join('/')}`;

const normalGalleryImages = [
  "A1_1.12.1.jpg",
  "AW44DSC01857.jpg",
  "DSC03470.JPG",
  "DSC03536.JPG",
  "DSC03588.JPG",
  "DSC03615.JPG",
  "DSC03657.JPG",
  "DSC03658.JPG",
  "DSC03697.JPG",
  "DSC03699.JPG",
  "DSC03710.JPG",
  "DSC03849.JPG",
  "DSC03881.JPG",
  "DSC03887.JPG",
  "DSC03901.JPG",
  "DSC03907.JPG",
  "DSC03915.JPG",
  "DSC03921.JPG",
  "DSC05208.JPG",
  "GDFSGDS_1.30.2.jpg",
  "WhatsApp Image 2026-09-07 at 4.41.37 PM.jpeg",
  "WhatsApp Image 2026-09-07 at 4.41.51 PM.jpeg",
  "WhatsApp Image 2026-09-12 at 10.59.29 AM.jpeg",
  "WhatsApp Image 2026-09-12 at 11.00.26 AM.jpeg",
  "WhatsApp Image 2026-09-12 at 11.01.35 AM.jpeg",
  "WhatsApp Image 2026-09-12 at 11.02.04 AM.jpeg",
  "WhatsApp Image 2026-09-12 at 11.02.44 AM.jpeg",
  "g10_1.3.1.jpg",
  "g11_1.2.1.jpg",
  "g12_1.1.1.jpg",
  "g1_1.11.1.jpg",
  "g2_1.10.1.jpg",
  "g3_1.9.1.jpg",
  "g6_1.7.1.jpg",
  "g7_1.6.1.jpg",
  "g8_1.5.1.jpg",
  "g9_1.4.1.jpg",
  "rtyry_3.1.2.jpg",
  "vgdfgds_1.49.1.jpg",
] as const;

export const photos = normalGalleryImages.map((name, index) => ({
  id: `mmcs-gallery-${index + 1}`,
  src: galleryImage(name),
  alt: `MMCS community documentation photograph ${index + 1}`,
  caption: `MMCS community photograph ${String(index + 1).padStart(2, '0')}`,
  detail: 'MMCS documentation archive',
  category: 'MMCS',
}));
export type ProjectImage = { src?: string; alt: string; label: string };
export type Project = {
  id: string;
  name: string;
  kicker: string;
  tagline: string;
  description: string;
  body: string;
  website: string;
  logo: string;
  theme: string;
  categories: string[];
  images: ProjectImage[];
  source: string;
};
export const projects: Project[] = [
  {
    id: 'nokma',
    name: 'Nokma',
    kicker: 'LOCAL PRODUCE. NEW POSSIBILITIES.',
    tagline: 'A taste of Meghalaya.\nA world of possibility.',
    description:
      'Nokma brings locally sourced produce into a growing family of value-added food products, connecting the work of farmers with everyday moments of enjoyment.',
    body: 'A product brand by MeghFarm, Nokma is part of a wider effort to help farmers participate in processing, packaging, branding and markets. The source history describes ice cream, pineapple and passion fruit juice, jam, squash and fruit pulp. The Nokma website also introduces chips and spice powders.',
    website: 'https://nokma.in/',
    logo: '/images/nokma-logo-orange.png',
    theme: 'green',
    categories: ['Ice cream', 'Beverages', 'Jam & squash', 'Fruit pulp'],
    images: [
      {
        src: '/images/nokma-product-team.jpg',
        alt: 'Nokma team member presenting jackfruit products',
        label: 'Nokma products and the team behind them',
      },
      {
        src: '/images/nokma-catalogue.jpg',
        alt: 'Nokma ice cream product range',
        label: 'The Nokma ice cream collection',
      },
      {
        src: '/images/nokma-ice-cream-lineup.jpg',
        alt: 'Nokma ice cream cups arranged in a product display',
        label: 'A closer look at the ice cream range',
      },
      {
        src: mmcsImage('2024/nokma BRAND devoloped accelerated/A DSC01259.jpg'),
        alt: 'Nokma product development activity',
        label: 'Nokma product development activity',
      },
      {
        src: mmcsImage('2024/nokma BRAND devoloped accelerated/DSC03304.JPG'),
        alt: 'Nokma product development activity',
        label: 'Nokma product development activity',
      },
      {
        src: mmcsImage('2024/nokma BRAND devoloped accelerated/WhatsApp Image 2026-09-07 at 4.34.37 PM.jpeg'),
        alt: 'Nokma product development activity',
        label: 'Nokma product development activity',
      },
      {
        src: mmcsImage('2024/nokma BRAND devoloped accelerated/WhatsApp Image 2026-09-07 at 4.38.31 PM.jpeg'),
        alt: 'Nokma product development activity',
        label: 'Nokma product development activity',
      },
      {
        src: mmcsImage('2024/nokma BRAND devoloped accelerated/WhatsApp Image 2026-09-07 at 4.50.35 PM (1).jpeg'),
        alt: 'Nokma product development activity',
        label: 'Nokma product development activity',
      },
      {
        src: mmcsImage('2024/nokma BRAND devoloped accelerated/WhatsApp Image 2026-09-07 at 4.50.35 PM.jpeg'),
        alt: 'Nokma product development activity',
        label: 'Nokma product development activity',
      },
      {
        src: mmcsImage('2024/nokma BRAND devoloped accelerated/fdrtr_2.1.1.jpg'),
        alt: 'Nokma product development activity',
        label: 'Nokma product development activity',
      },
      {
        src: mmcsImage('2024/nokma BRAND devoloped accelerated/rtyry_3.1.2.jpg'),
        alt: 'Nokma product development activity',
        label: 'Nokma product development activity',
      },
    ],
    source: 'history:nokma; nokma.in:2026-09-05',
  },
  {
    id: 'megh-farm',
    name: 'MeghFarm',
    kicker: 'FRESH FROM MEGHALAYA',
    tagline: 'From the farm.\nFor a better future.',
    description:
      'At Khamari, the MeghFarm Processing Hub brings agricultural processing, value addition and market connections closer to the farming communities of the Garo Hills.',
    body: 'Established in 2024, the hub marks an important chapter in MMCS’s journey. Its documented activities include fruit and vegetable processing, pineapple processing, juice, jam, squash and fruit pulp, alongside packaging, branding and farmer market linkages. Further cold-chain and logistics infrastructure is described as planning and development in the 2025–2026 history.',
    website: 'https://themeghfarm.com/',
    logo: '/images/megh-farm.webp',
    theme: 'earth',
    categories: [
      'Fruit processing',
      'Value addition',
      'Packaging',
      'Market linkages',
    ],
    images: [
      {
        src: '/images/megh-farm-team.png',
        alt: 'MeghFarm team gathered in front of the Meghalaya hills',
        label: 'The people behind a greener tomorrow',
      },
      {
        src: galleryImage('AW44DSC01857.jpg'),
        alt: 'MeghFarm community activity',
        label: 'MeghFarm community activity',
      },
      {
        src: galleryImage('WhatsApp Image 2026-09-12 at 11.02.44 AM.jpeg'),
        alt: 'MeghFarm programme photograph',
        label: 'MeghFarm programme photograph',
      },
      {
        src: galleryImage('WhatsApp Image 2026-09-12 at 11.00.26 AM.jpeg'),
        alt: 'MeghFarm programme photograph',
        label: 'MeghFarm programme photograph',
      },
      {
        src: galleryImage('WhatsApp Image 2026-09-12 at 10.59.29 AM.jpeg'),
        alt: 'MeghFarm programme photograph',
        label: 'MeghFarm programme photograph',
      },
      {
        src: galleryImage('vgdfgds_1.49.1.jpg'),
        alt: 'MeghFarm community activity',
        label: 'MeghFarm community activity',
      },
      {
        src: mmcsImage('2024/MEGHFARM PROCCCESING HUB ESTABLISHMENT/A22_1.2.2.jpg'),
        alt: 'MeghFarm Processing Hub establishment',
        label: 'MeghFarm Processing Hub establishment',
      },
      {
        src: mmcsImage('2024/MEGHFARM PROCCCESING HUB ESTABLISHMENT/A24_1.3.1.jpg'),
        alt: 'MeghFarm Processing Hub establishment',
        label: 'MeghFarm Processing Hub establishment',
      },
      {
        src: mmcsImage('2024/MEGHFARM PROCCCESING HUB ESTABLISHMENT/A28_1.3.1.jpg'),
        alt: 'MeghFarm Processing Hub establishment',
        label: 'MeghFarm Processing Hub establishment',
      },
      {
        src: mmcsImage('2024/MEGHFARM PROCCCESING HUB ESTABLISHMENT/D1_1.2.3.jpg'),
        alt: 'MeghFarm Processing Hub establishment',
        label: 'MeghFarm Processing Hub establishment',
      },
      {
        src: mmcsImage('2024/MEGHFARM PROCCCESING HUB ESTABLISHMENT/G4_1.4.1.jpg'),
        alt: 'MeghFarm Processing Hub establishment',
        label: 'MeghFarm Processing Hub establishment',
      },
    ],
    source: 'history:hub',
  },
];
export const activityGroups = [
  {
    id: 'agriculture',
    name: 'Agriculture & livestock',
    short: 'Better opportunities begin at the farm.',
    description:
      'Supporting agricultural production, collective farming and diverse rural livelihoods.',
    icon: 'sprout',
    items: [
      'Dairy farming',
      'Poultry farming',
      'Piggery farming',
      'Collective farming',
      'Ginger and turmeric',
      'Passion fruit',
      'Rambutan and avocado',
      'Vietnam and J33 Dang Suriya jackfruit',
      'Nendran and local banana',
    ],
  },
  {
    id: 'processing',
    name: 'Food processing',
    short: 'More value from every harvest.',
    description:
      'Connecting local produce with processing, packaging and new markets.',
    icon: 'factory',
    items: [
      'Fruit and vegetable processing',
      'Pineapple processing',
      'Juice production',
      'Jam and squash',
      'Fruit pulp',
      'Ice cream',
      'Turmeric powder',
      'Areca nut processing',
    ],
  },
  {
    id: 'women',
    name: 'Women-led production',
    short: 'Skills that grow into independence.',
    description:
      'Supporting practical skills and opportunities for women to earn through production.',
    icon: 'heart',
    items: [
      'Tailoring and embroidery',
      'Traditional attire',
      'Candle making',
      'Soap making',
      'Washing powder',
      'Dish wash powder',
      'Phenyl',
      'Toilet cleaner',
      'Hand wash',
    ],
  },
  {
    id: 'community',
    name: 'Community products',
    short: 'Everyday needs. Collective enterprise.',
    description:
      'Local production and retail activities that connect members with their communities.',
    icon: 'basket',
    items: [
      'Areca leaf plates (Nokma Plate)',
      'Rosary making',
      'Fair price grocery shop',
      'Umbrella making',
      'Nokma book room',
    ],
  },
  {
    id: 'skills',
    name: 'Skills & training',
    short: 'Learning today. Creating tomorrow.',
    description:
      'From home-based crafts to technical skills, practical learning supports self-reliance.',
    icon: 'sun',
    items: [
      'Umbrella and detergent training',
      'Rosary and candle training',
      'Beekeeping box supply',
      'Solar technician training',
      'Solar dryer and cooker making',
    ],
  },
  {
    id: 'markets',
    name: 'Infrastructure & markets',
    short: 'Connecting farmers to possibilities.',
    description:
      'A longer-term farm-to-market approach, with further cold-chain infrastructure in development.',
    icon: 'truck',
    items: [
      'Agricultural aggregation',
      'Packaging and branding',
      'Farmer market linkages',
      'Cold storage — development',
      'Pre-cooling and chilling — development',
      'Blast freezing and ripening — development',
      'Refrigerated logistics — development',
    ],
  },
];
export const achievements = [
  {
    year: '2023',
    title: 'NCDC North East Award',
    text: 'Recognition recorded in MMCS’s history for its cooperative and agricultural work.',
  },
  {
    year: '2025',
    title: 'Best Dairy Cooperative in Meghalaya',
    text: 'The Society’s history records recognition for its cooperative-based dairy development.',
  },
];
export const initiatives = [
  {
    name: 'Collective Farming — Phase IV',
    status: 'Planned distribution',
    text: 'Fruit saplings are planned to help diversify farmer incomes and support a future processing supply base.',
  },
  {
    name: 'Integrated cold-chain infrastructure',
    status: 'Planning & development',
    text: 'Cold storage, pre-cooling, chilling, blast freezing, ripening and refrigerated logistics are described in the 2025–2026 development direction.',
  },
  {
    name: 'Nokma mineral water facility',
    status: 'Proposed',
    text: 'A planned automated processing and packaging facility at Khamari. Product availability is not confirmed.',
  },
  {
    name: 'Administrative & warehouse building',
    status: 'Construction reported · 2026',
    text: 'The history reports a new building for administration, conference facilities, storage and operational space.',
  },
  {
    name: 'Women’s entrepreneurship',
    status: 'Future direction',
    text: 'Emerging ideas include women-owned retail outlets, food enterprises and rural entrepreneurship opportunities.',
  },
];
export const pageInfo: Record<
  string,
  { title: string; eyebrow: string; heading: string; description: string }
> = {
  about: {
    title: 'About MMCS',
    eyebrow: 'OUR ROOTS. OUR REASON.',
    heading: 'People at the heart\nof every possibility.',
    description:
      'From a small beginning at Aitibi Village to a growing cooperative movement across the Garo Hills.',
  },
  organisations: {
    title: 'Our Organisations',
    eyebrow: 'ONE SHARED PURPOSE',
    heading: 'Collective strength.\nConnected possibilities.',
    description:
      'Meet MMCS and the brands and initiatives connecting community, production and markets.',
  },
  'our-work': {
    title: 'Our Work',
    eyebrow: 'LIVELIHOODS IN ACTION',
    heading: 'Small opportunities.\nMeaningful change.',
    description:
      'Practical work across agriculture, production, skills and markets, rooted in the needs of our communities.',
  },
  projects: {
    title: 'Our Projects',
    eyebrow: 'OUR TWO PROJECTS',
    heading: 'Local ideas.\nLasting possibilities.',
    description:
      'Nokma and MeghFarm connect the efforts of our farmers with processing, products and new opportunities.',
  },
  achievements: {
    title: 'Achievements',
    eyebrow: 'MOMENTS OF RECOGNITION',
    heading: 'A shared effort.\nA recognised difference.',
    description:
      'Milestones and recognitions recorded along MMCS’s cooperative journey.',
  },
  journey: {
    title: 'Our Journey',
    eyebrow: '2015 — 2026',
    heading: 'From twenty women\nto a shared movement.',
    description:
      'A story of collective action, growing skills and the belief that rural communities can shape their own future.',
  },
  gallery: {
    title: 'Gallery',
    eyebrow: 'MOMENTS THAT MATTER',
    heading: 'Our journey,\nin photographs.',
    description:
      'A glimpse of the MeghFarm Processing Hub inauguration and the people who came together to mark it.',
  },
  contact: {
    title: 'Contact MMCS',
    eyebrow: 'LET’S GROW TOGETHER',
    heading: 'Every connection\nis a new beginning.',
    description:
      'Explore our work or connect with the people behind our projects.',
  },
};
export const getProjects = () => projects;
export const getActivities = () => activityGroups;
export const getTimeline = () => journeyTimeline;
