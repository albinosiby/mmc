const archiveImage = (path: string) =>
  `/images/MMCS/${path.split('/').map(encodeURIComponent).join('/')}`;

const womenEntrepreneurshipImages = [
  archiveImage('2026/Vision for Tribal Women and Rural Entrepreneurship/tribal-women-rural-enterprise-01.jpg'),
  archiveImage('2026/Vision for Tribal Women and Rural Entrepreneurship/tribal-women-rural-enterprise-02.jpg'),
  archiveImage('2026/Vision for Tribal Women and Rural Entrepreneurship/tribal-women-rural-enterprise-03.jpg'),
] as const;

const financialLiteracyImages = [
  archiveImage('2026/NITI AYOG VISITING/NITI AYOG visiting at meghfarm.jpeg'),
  archiveImage('2026/NITI AYOG VISITING/WhatsApp Image 2026-09-07 at 4.51.59 PM.jpeg'),
] as const;

const cooperativeInfrastructureImages = [
  archiveImage('2026/Infrastructure for a Growing Cooperative/cooperative-infrastructure-01.jpg'),
  archiveImage('2026/Infrastructure for a Growing Cooperative/cooperative-infrastructure-02.jpg'),
  archiveImage('2026/Infrastructure for a Growing Cooperative/cooperative-infrastructure-03.jpg'),
  archiveImage('2026/Infrastructure for a Growing Cooperative/cooperative-infrastructure-04.jpg'),
] as const;

const sportsClubImages = [
  archiveImage('2026/meghfarm Football club devoloped/MFC1_1.1.1.png'),
  archiveImage('2026/meghfarm Football club devoloped/MFC4_1.6.1.png'),
  archiveImage('2026/meghfarm Football club devoloped/jhklhjlhui_1.6.2.png'),
] as const;

const rosaryTrainingImages = [
  archiveImage('2026/Rosary Making Training/rosary-making-training-01.webp'),
  archiveImage('2026/Rosary Making Training/rosary-making-training-02.webp'),
  archiveImage('2026/Rosary Making Training/rosary-making-training-03.webp'),
] as const;

const slmVisitImages = [
  archiveImage('2026/SLM Project Visit/slm-project-visit-01.webp'),
  archiveImage('2026/SLM Project Visit/slm-project-visit-02.webp'),
  archiveImage('2026/SLM Project Visit/slm-project-visit-03.webp'),
  archiveImage('2026/SLM Project Visit/slm-project-visit-04.webp'),
  archiveImage('2026/SLM Project Visit/slm-project-visit-05.webp'),
] as const;

const coldStorageVehicleImages = [
  archiveImage('2026/Cold Storage Vehicles/cold-storage-vehicles-01.webp'),
  archiveImage('2026/Cold Storage Vehicles/cold-storage-vehicles-02.webp'),
] as const;

const fashionTrainingImages = [
  archiveImage('2026/SM Fashion Designer Training/fashion-designer-training-01.webp'),
  archiveImage('2026/SM Fashion Designer Training/fashion-designer-training-02.webp'),
  archiveImage('2026/SM Fashion Designer Training/fashion-designer-training-03.webp'),
  archiveImage('2026/SM Fashion Designer Training/fashion-designer-training-04.webp'),
  archiveImage('2026/SM Fashion Designer Training/fashion-designer-training-05.webp'),
] as const;

export const journey2026Images = [
  ...womenEntrepreneurshipImages,
  ...financialLiteracyImages,
  ...cooperativeInfrastructureImages,
  ...sportsClubImages,
  ...rosaryTrainingImages,
  ...slmVisitImages,
  ...coldStorageVehicleImages,
  ...fashionTrainingImages,
] as const;

// Client-approved activity assignments, independent of the original folder labels.
const entryImages: Readonly<Record<string, readonly string[]>> = {
  'women-entrepreneurship-2026': womenEntrepreneurshipImages,
  'financial-literacy-camp-2026': financialLiteracyImages,
  'infrastructure-2026': cooperativeInfrastructureImages,
  'meghfarm-sports-club-2026': sportsClubImages,
  'rosary-making-training-2026': rosaryTrainingImages,
  'slm-project-officers-visit-2026': slmVisitImages,
  'cold-storage-vehicles-2026': coldStorageVehicleImages,
  'sm-fashion-designer-training-2026-2027': fashionTrainingImages,
};

type JourneyImageDetails = { alt: string; objectPosition?: string };

const imageDetails: Readonly<Record<string, JourneyImageDetails>> = {
  [cooperativeInfrastructureImages[0]]: {
    alt: 'Construction progressing on a multi-storey cooperative processing hub building',
  },
  [cooperativeInfrastructureImages[1]]: {
    alt: 'Overhead view of the cooperative building under construction',
  },
  [cooperativeInfrastructureImages[2]]: {
    alt: 'New covered processing facility with a steel roof and finished floor',
  },
  [cooperativeInfrastructureImages[3]]: {
    alt: 'Exterior view of the cooperative facility during construction',
  },
  [womenEntrepreneurshipImages[0]]: {
    alt: 'Tribal women carrying gathered firewood through a green rural landscape',
  },
  [womenEntrepreneurshipImages[1]]: {
    alt: 'Tribal women carrying firewood along a wooded village path',
  },
  [womenEntrepreneurshipImages[2]]: {
    alt: 'Two tribal women carrying firewood across a rural field',
  },
  [rosaryTrainingImages[0]]: {
    alt: 'Women practising rosary making together with beads and thread during the 2026 training programme',
  },
  [rosaryTrainingImages[1]]: {
    alt: 'Two women working with rosary beads during the 2026 training programme',
    objectPosition: 'center 20%',
  },
  [rosaryTrainingImages[2]]: {
    alt: 'Women assembling rosaries together during a practical training session in 2026',
  },
  [slmVisitImages[0]]: {
    alt: 'SLM visitors observing workers preparing pineapples at Megh Farm Processing Hub',
  },
  [slmVisitImages[1]]: {
    alt: 'SLM visitors wearing hairnets inside a food processing room at Megh Farm',
  },
  [slmVisitImages[2]]: {
    alt: 'Visitors watching pineapple preparation and processing during the SLM project visit',
  },
  [slmVisitImages[3]]: {
    alt: 'SLM visitors and community members gathered for a group photograph',
    objectPosition: 'center 65%',
  },
  [slmVisitImages[4]]: {
    alt: 'Visitors walking through the processing facility during the SLM project visit',
    objectPosition: 'center 35%',
  },
  [coldStorageVehicleImages[0]]: {
    alt: 'A cold storage vehicle being flagged off during the Meghalaya government handover',
  },
  [coldStorageVehicleImages[1]]: {
    alt: 'Another view of the refrigerated vehicle flag-off at the Meghalaya government handover',
  },
  [fashionTrainingImages[0]]: {
    alt: 'A speaker addressing participants during the SM Fashion Designer Training Program',
  },
  [fashionTrainingImages[1]]: {
    alt: 'Fashion training participants standing beside sewing machines and fabric-cutting tables',
  },
  [fashionTrainingImages[2]]: {
    alt: 'Participants gathered around a fabric-cutting table in the fashion training classroom',
  },
  [fashionTrainingImages[3]]: {
    alt: 'Participants seated during a fashion training programme presentation',
  },
  [fashionTrainingImages[4]]: {
    alt: 'Ceremonial lamp lighting during the SM Fashion Designer Training Program',
  },
};

export function getJourneyEntryImages(entryId: string): readonly string[] {
  return entryImages[entryId] ?? [];
}

export function getJourneyImageDetails(src: string): JourneyImageDetails | undefined {
  return imageDetails[src];
}
