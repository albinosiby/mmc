import { photos } from './content';
import { journeyTimeline } from './journey-content';

export type AdminImageArea = 'gallery' | 'journey';

export type AdminImageItem = {
  id: string;
  area: AdminImageArea;
  group: string;
  title: string;
  src: string;
  alt: string;
  source: 'static-site' | 'firebase-storage';
  storagePath?: string;
};

const mmcsImage = (path: string) => `/images/MMCS/${path.split('/').map(encodeURIComponent).join('/')}`;

export const journeyImageGroups = [
  {
    id: '2015',
    label: '2015',
    images: [
      mmcsImage('2015/begininng of mmcs 3.JPG'),
      mmcsImage('2015/beginning of mmcs 2.JPG'),
    ],
  },
  {
    id: '2016-2017',
    label: '2016-2017',
    images: [
      mmcsImage('2016-2017/ARCA PLATE MAKING/WhatsApp Image 2026-09-07 at 4.34.06 PM.jpeg'),
      mmcsImage('2016-2017/CANDLE MAKING/WhatsApp Image 2026-09-13 at 11.54.08 AM.jpeg'),
      mmcsImage('2016-2017/CANDLE MAKING/WhatsApp Image 2026-09-13 at 11.54.09 AM (1).jpeg'),
      mmcsImage('2016-2017/CANDLE MAKING/WhatsApp Image 2026-09-13 at 11.54.09 AM.jpeg'),
      mmcsImage('2016-2017/CANDLE MAKING/WhatsApp Image 2026-09-13 at 11.54.10 AM (1).jpeg'),
      mmcsImage('2016-2017/CANDLE MAKING/WhatsApp Image 2026-09-13 at 11.54.10 AM.jpeg'),
      mmcsImage('2016-2017/DETERGENT MAKING/WhatsApp Image 2026-09-13 at 11.54.12 AM.jpeg'),
      mmcsImage('2016-2017/DETERGENT MAKING/WhatsApp Image 2026-09-13 at 11.54.13 AM.jpeg'),
      mmcsImage('2016-2017/DETERGENT MAKING/WhatsApp Image 2026-09-13 at 11.54.14 AM (1).jpeg'),
      mmcsImage('2016-2017/MMCS Grocery Shop Established at Tikrikilla Market/DSC_0031.JPG'),
    ],
  },
  {
    id: '2018-2020',
    label: '2018-2020',
    images: [
      mmcsImage('2018-20/WhatsApp Image 2026-09-07 at 4.34.07 PM.jpeg'),
      mmcsImage('2018-20/WhatsApp Image 2026-09-07 at 4.38.28 PM.jpeg'),
      mmcsImage('2018-20/WhatsApp Image 2026-09-13 at 11.54.10 AM (2).jpeg'),
      mmcsImage('2018-20/WhatsApp Image 2026-09-13 at 11.54.11 AM (1).jpeg'),
      mmcsImage('2018-20/WhatsApp Image 2026-09-13 at 11.54.11 AM.jpeg'),
      mmcsImage('2018-20/WhatsApp Image 2026-09-13 at 11.54.13 AM (1).jpeg'),
    ],
  },
  {
    id: '2021-2023',
    label: '2021-2023',
    images: [
      mmcsImage('2021-23/AW44DSC01857.jpg'),
      mmcsImage('2021-23/DSC03901.JPG'),
      mmcsImage('2021-23/WhatsApp Image 2026-09-07 at 4.39.19 PM.jpeg'),
      mmcsImage('2021-23/WhatsApp Image 2026-09-07 at 4.39.25 PM (1).jpeg'),
      mmcsImage('2021-23/WhatsApp Image 2026-09-07 at 4.39.25 PM.jpeg'),
      mmcsImage('2021-23/WhatsApp Image 2026-09-12 at 11.01.50 AM.jpeg'),
      mmcsImage('2021-23/g8_1.5.1.jpg'),
      mmcsImage('2021-23/ghjhjj_1.22.1.jpg'),
      mmcsImage('2021-23/gstret_1.46.2.jpg'),
      mmcsImage('2021-23/xbxcb_1.168.4.jpg'),
    ],
  },
  {
    id: '2024',
    label: '2024',
    images: [
      mmcsImage('2024/MEGHFARM PROCCCESING HUB ESTABLISHMENT/A24_1.3.1.jpg'),
      mmcsImage('2024/BEST COOPERATIVE MEMBER AWARD -2024/MATHEW AWARD.jpeg'),
      mmcsImage('2024/INAGRATION OF MRGHFARM/WhatsApp Image 2026-09-07 at 4.41.44 PM.jpeg'),
      mmcsImage('2024/INAGRATION OF MRGHFARM/WhatsApp Image 2026-09-07 at 4.41.48 PM.jpeg'),
      mmcsImage('2024/MEGHFARM PROCCCESING HUB ESTABLISHMENT/A22_1.2.2.jpg'),
      mmcsImage('2024/MEGHFARM PROCCCESING HUB ESTABLISHMENT/A28_1.3.1.jpg'),
      mmcsImage('2024/MEGHFARM PROCCCESING HUB ESTABLISHMENT/D1_1.2.3.jpg'),
      mmcsImage('2024/MEGHFARM PROCCCESING HUB ESTABLISHMENT/G4_1.4.1.jpg'),
      mmcsImage('2024/nokma BRAND devoloped accelerated/A DSC01259.jpg'),
      mmcsImage('2024/nokma BRAND devoloped accelerated/DSC03304.JPG'),
      mmcsImage('2024/nokma BRAND devoloped accelerated/WhatsApp Image 2026-09-07 at 4.34.37 PM.jpeg'),
      mmcsImage('2024/nokma BRAND devoloped accelerated/WhatsApp Image 2026-09-07 at 4.38.31 PM.jpeg'),
      mmcsImage('2024/nokma BRAND devoloped accelerated/WhatsApp Image 2026-09-07 at 4.50.35 PM (1).jpeg'),
      mmcsImage('2024/nokma BRAND devoloped accelerated/WhatsApp Image 2026-09-07 at 4.50.35 PM.jpeg'),
      mmcsImage('2024/nokma BRAND devoloped accelerated/fdrtr_2.1.1.jpg'),
      mmcsImage('2024/nokma BRAND devoloped accelerated/rtyry_3.1.2.jpg'),
    ],
  },
  {
    id: '2025',
    label: '2025',
    images: [
      mmcsImage('2025/Expansionof collective farming & Holticulture devolopment/IMG_20250503_145841158.jpg'),
      mmcsImage('2025/PA.Togen Nengminza Award for best social worker.   HIGHEST CIVILIAN AWARD OF GOVT. OF MEGHALAYA/Fr Benoy Photo 4_1.4.4.jpg'),
      mmcsImage('2025/expansion of agri,dairy,food,women/DSC02359.JPG'),
      mmcsImage('2025/expansion of agri,dairy,food,women/DSC02502.JPG'),
      mmcsImage('2025/expansion of agri,dairy,food,women/IMG_20250531_141100016.jpg'),
      mmcsImage('2025/free medical camp @ MEGHFARM/DSC04698.JPG'),
      mmcsImage('2025/free medical camp @ MEGHFARM/DSC04747.JPG'),
      mmcsImage('2025/free medical camp @ MEGHFARM/DSC04808.JPG'),
    ],
  },
  {
    id: '2026',
    label: '2026',
    images: [
      mmcsImage('2026/Financial & Digital Financial Literacy Camp/DSC06682.JPG'),
      mmcsImage('2026/Financial & Digital Financial Literacy Camp/DSC07066.JPG'),
      mmcsImage('2026/Financial & Digital Financial Literacy Camp/DSC07112.JPG'),
      mmcsImage('2026/NITI AYOG VISITING/NITI AYOG visiting at meghfarm.jpeg'),
      mmcsImage('2026/NITI AYOG VISITING/WhatsApp Image 2026-09-07 at 4.51.59 PM.jpeg'),
      mmcsImage('2026/meghfarm Football club devoloped/MFC1_1.1.1.png'),
      mmcsImage('2026/meghfarm Football club devoloped/MFC4_1.6.1.png'),
      mmcsImage('2026/meghfarm Football club devoloped/jhklhjlhui_1.6.2.png'),
    ],
  },
] as const;

function uniqueItems(items: AdminImageItem[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    if (seen.has(item.src)) return false;
    seen.add(item.src);
    return true;
  });
}

export function getAdminImageRegistry() {
  const galleryImages: AdminImageItem[] = photos.map((photo, index) => ({
    id: photo.id,
    area: 'gallery',
    group: 'Gallery',
    title: photo.caption || `Gallery image ${index + 1}`,
    src: photo.src,
    alt: photo.alt,
    source: 'static-site',
    storagePath: `gallery/${photo.id}`,
  }));

  const journeyMainImages: AdminImageItem[] = journeyTimeline
    .filter((entry) => entry.image)
    .map((entry) => ({
      id: `journey-${entry.id}-main`,
      area: 'journey',
      group: entry.year,
      title: `${entry.year} main image`,
      src: entry.image as string,
      alt: `${entry.heading} main image`,
      source: 'static-site',
      storagePath: `journey/${entry.id}/main`,
    }));

  const journeyArchiveImages: AdminImageItem[] = journeyImageGroups.flatMap((group) =>
    group.images.map((src, index) => ({
      id: `journey-${group.id}-${index + 1}`,
      area: 'journey' as const,
      group: group.label,
      title: `${group.label} image ${index + 1}`,
      src,
      alt: `MMCS Journey ${group.label} image ${index + 1}`,
      source: 'static-site' as const,
      storagePath: `journey/${group.id}/${index + 1}`,
    })),
  );

  return {
    gallery: galleryImages,
    journey: uniqueItems([...journeyMainImages, ...journeyArchiveImages]),
  };
}
