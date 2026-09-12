export type JourneySection = {
  heading: string;
  introduction?: string;
  items?: string[];
  callout?: string;
};

export type JourneyEntry = {
  id: string;
  year: string;
  title: string;
  summary: string;
  heading: string;
  introduction: string;
  date?: string;
  location?: string;
  leadership?: {
    founder?: string;
    president?: string;
    secretary?: string;
    executiveMembers?: string[];
  };
  sections: JourneySection[];
  image?: string;
  periodNote?: string;
  sourceKey: string;
};

export const journeyTimeline: JourneyEntry[] = [
  {
    id: '2015',
    year: '2015',
    title: 'Twenty women. One shared vision.',
    summary:
      'Muktidata Multipurpose Cooperative Society began in 2015 with 20 women under the leadership of Rev. Fr. Benoy Joseph, creating a cooperative movement focused on farmer protection, women’s empowerment and economic self-reliance.',
    heading: 'Beginning of Muktidata Multipurpose Cooperative Society',
    introduction:
      'Muktidata Multipurpose Cooperative Society was conceived and initiated in 2015 with the vision of protecting farmers, empowering rural women and creating a cooperative platform through which poor and small farmers could improve their livelihoods.',
    date: '14 February 2015',
    location:
      'Aitibi Village, Tikrikilla Block, West Garo Hills District, Meghalaya',
    leadership: {
      founder: 'Rev. Fr. Benoy Joseph',
      president: 'Smt. Wilna Marak',
      secretary: 'Smt. Nelco Sangma',
      executiveMembers: [
        'Smt. Saro Sangma',
        'Smt. Kajolish Marak',
        'Smt. Rupali Sangma',
        'Smt. Rita Marak',
      ],
    },
    sections: [
      {
        heading: 'Beginning',
        introduction:
          'Under the leadership of Rev. Fr. Benoy Joseph, the initiative responded to the difficulties faced by farmers and rural families in the Garo Hills.',
        items: [
          'Dependence on middlemen and exploitation',
          'Distress sales and informal lending',
          'Traditional mortgage systems',
          'Loss of control over agricultural produce, land and agricultural resources',
        ],
      },
      {
        heading: 'Purpose of MMCS',
        items: [
          'Protect farmers from middlemen and reduce exploitative practices',
          'Promote fair and collective marketing',
          'Encourage savings and collective action',
          'Strengthen economic self-reliance',
          'Empower rural women and improve the economic position of farming families',
        ],
      },
      {
        heading: 'Initial membership',
        introduction:
          'MMCS began with 20 women. The contribution was intentionally kept very low so poor and marginal rural women could participate. The membership fee was later standardized at ₹100 per member.',
      },
      {
        heading: 'Significance',
        items: [
          'Farmer protection and women’s empowerment',
          'Savings and livelihood generation',
          'Community-based economic development',
        ],
      },
    ],
    sourceKey: 'history:2015',
  },
  {
    id: 'registration-2016-2017',
    year: '2016–2017',
    title: 'A cooperative takes shape.',
    summary:
      'Following its initial formation, MMCS progressed towards formal institutional development and registration, creating a legal cooperative framework for its rapidly growing membership.',
    heading: 'Registration and Expansion',
    introduction:
      'Following the initial formation and mobilisation of members, MMCS progressed towards formal institutional development. The Society was formally registered during the 2016–2017 period.',
    sections: [
      {
        heading: 'A legal cooperative framework',
        items: [
          'Expand its activities and serve more members',
          'Develop livelihood programmes',
          'Build institutional capacity',
          'Strengthen farmer participation',
        ],
      },
      {
        heading: 'Membership growth',
        introduction:
          'By 2017, membership had increased to approximately 550 members, demonstrating increasing confidence among farmers and women in the cooperative model.',
      },
    ],
    periodNote: 'Formal registration occurred during this period.',
    sourceKey: 'history:registration',
  },
  {
    id: 'livelihoods-2017',
    year: '2017',
    title: 'Skills, livelihoods and a place in the market.',
    summary:
      'Membership reached approximately 550, the MMCS Grocery Shop opened at Tikrikilla Market and new women-led livelihood activities expanded through training and home-based production.',
    heading: 'Livelihood Development and Market Activities',
    introduction:
      'Membership reached approximately 550 as MMCS developed market activities and practical livelihood opportunities for women.',
    sections: [
      {
        heading: 'MMCS Grocery Shop',
        introduction:
          'MMCS established its own grocery shop at Tikrikilla Market. It was formally inaugurated on 10 October 2017 by Shri Lemison Sangma, MLA of Raksamgre.',
        items: [
          'Created a commercial activity for MMCS',
          'Provided a platform for marketing products',
          'Helped generate resources',
          'Supported the Society’s developing livelihood ecosystem',
        ],
      },
      {
        heading: 'Candle-making initiative',
        introduction:
          'MMCS initiated candle-making at Aitibi to provide women with practical production skills, home-based livelihood opportunities and additional income.',
      },
      {
        heading: 'Women’s skill development',
        introduction:
          'Five women members were sent to Kerala for specialized training in umbrella making and detergent making.',
        items: [
          'Umbrella making',
          'Detergent making',
          'Rosary making',
          'Candle making',
        ],
      },
      {
        heading: 'Home-based rosary production',
        introduction:
          'The rosary-making initiative became an important example of decentralized women-led livelihoods.',
        items: [
          'Women produced rosaries from their homes',
          'Completed products were brought to MMCS for collection and marketing',
          'Women could generate income without leaving their villages for extended periods',
        ],
      },
    ],
    sourceKey: 'history:2017',
  },
  {
    id: 'consolidation-2018-2020',
    year: '2018–2020',
    title: 'Consolidation and growth.',
    summary:
      'MMCS strengthened its cooperative structure, expanded farmer and women’s livelihood programmes and developed a broader understanding of production, aggregation, processing and marketing.',
    heading: 'Consolidation and Growth',
    introduction:
      'During this period MMCS continued strengthening its cooperative structure and expanding engagement with farmers and rural women.',
    sections: [
      {
        heading: 'Focus areas',
        items: [
          'Mobilising farmers into cooperative groups',
          'Encouraging savings and collective economic activities',
          'Women’s participation in income-generating activities',
          'Developing market linkages and supporting agricultural production',
          'Reducing dependence on middlemen',
          'Creating opportunities for rural self-employment',
        ],
      },
      {
        heading: 'Evolution of MMCS’s development model',
        introduction:
          'Experience from the MMCS grocery shop, women’s production units and small-scale livelihood programmes showed that rural development required an interconnected system.',
        callout: 'Production → Aggregation → Processing → Marketing',
        items: [
          'MMCS gradually moved from small-scale livelihood activities towards cooperative enterprise development.',
        ],
      },
    ],
    periodNote: 'The source treats 2018–2020 as one development period.',
    sourceKey: 'history:consolidation',
  },
  {
    id: 'expansion-2021-2023',
    year: '2021–2023',
    title: 'From farmer to market.',
    summary:
      'Farmer participation expanded as MMCS increased its focus on agriculture, horticulture, dairy, women’s livelihoods and value addition while preparing for larger processing initiatives.',
    heading: 'Expansion of Farmer Membership and Livelihood Activities',
    introduction:
      'From 2021 onwards MMCS continued expanding membership and farmer-oriented activities across agriculture, horticulture, dairy, women’s livelihoods and value addition.',
    sections: [
      {
        heading: 'Moving beyond raw produce',
        items: [
          'Processing',
          'Packaging',
          'Branding',
          'Direct marketing',
        ],
      },
      {
        heading: 'Cooperative impact',
        items: [
          'Work collectively and improve bargaining power',
          'Find better markets',
          'Participate in value addition',
        ],
      },
      {
        heading: 'Institutional development',
        introduction:
          'MMCS strengthened its institutional capacity and developed foundations for larger processing and livelihood projects.',
        callout: 'Farmer → Producer → Processor → Market',
        items: [
          'This became an important long-term strategy for rural economic transformation.',
        ],
      },
      {
        heading: '2023 recognition',
        callout: 'NCDC Award — North East',
      },
    ],
    periodNote: 'The source treats 2021–2023 as one development period.',
    sourceKey: 'history:2021-2023',
  },
  {
    id: '2024',
    year: '2024',
    title: 'A new chapter at Megh Farm.',
    summary:
      'The Megh Farm Processing Hub was established at Khamari, opening a major new phase of agricultural processing, value addition, storage, branding and farmer market development.',
    heading: 'Establishment of Megh Farm Processing Hub',
    introduction:
      'A major milestone came in 2024 with the establishment of the Megh Farm Processing Hub at Khamari, initiated under the leadership of Rev. Fr. Benoy Joseph.',
    date: 'Unit started on 10 February 2024',
    location: 'Khamari',
    image: '/images/inauguration.webp',
    sections: [
      {
        heading: 'Purpose of the hub',
        introduction:
          'The hub was designed as a modern platform for agricultural processing, value addition, storage and marketing. It was subsequently inaugurated by Hon’ble Chief Minister of Meghalaya Shri Conrad K. Sangma.',
      },
      {
        heading: 'Major areas of activity',
        items: [
          'Fruit and vegetable processing',
          'Pineapple processing',
          'Juice, jam, squash and fruit pulp production',
          'Ice cream production',
          'Cold-chain development and agricultural aggregation',
          'Product packaging and branding',
          'Farmer market linkages',
        ],
      },
      {
        heading: 'Significance',
        introduction:
          'The hub marked MMCS’s evolution from primarily cooperative and livelihood activities towards an emerging farmer-owned agro-processing and value-addition enterprise.',
      },
      {
        heading: 'Nokma development',
        introduction:
          'Development of the Nokma brand strengthened the strategy of transforming locally produced agricultural commodities into marketable value-added products.',
      },
    ],
    sourceKey: 'history:hub',
  },
  {
    id: 'nokma-2024-2025',
    year: '2024–2025',
    title: 'From local produce to Nokma products.',
    summary:
      'Following the establishment of Megh Farm, MMCS accelerated the development of the Nokma brand to transform locally produced agricultural commodities into finished consumer products.',
    heading: 'Development of Nokma Brand and Value-Added Products',
    introduction:
      'The purpose of Nokma is to increase the value farmers receive by transforming local agricultural commodities into finished products.',
    sections: [
      {
        heading: 'Products and initiatives',
        items: [
          'Nokma Ice Cream',
          'Pineapple Juice and Passion Fruit Juice',
          'Nokma Jam and Squash',
          'Fruit pulp and processed fruit products',
          'Nokma Mineral Water initiative — in development or proposed during this period',
          'Other locally sourced value-added products',
        ],
      },
      {
        heading: 'Employment and supply-chain opportunities',
        items: [
          'Processing',
          'Packaging',
          'Distribution',
          'Marketing',
          'Retail',
          'More organised supply-chain participation for farmers',
        ],
      },
    ],
    sourceKey: 'history:nokma',
  },
  {
    id: 'recognition-2023-2025',
    year: '2023–2025',
    title: 'Recognition and institutional growth.',
    summary:
      'Major cooperative and dairy recognitions strengthened MMCS’s credibility as membership passed an important historical milestone during this period.',
    heading: 'Recognition and Institutional Development',
    introduction:
      'Recognition strengthened MMCS’s credibility and demonstrated its growing role in farmer support, cooperative development and rural enterprise development.',
    sections: [
      {
        heading: 'Recognition',
        items: [
          '2023 — NCDC Award, North East',
          '2025 — Best Dairy Cooperative in Meghalaya',
        ],
      },
      {
        heading: 'Membership growth',
        introduction:
          'During the 2023–2025 period, membership reached more than 2,000 members. This is a historical milestone for the period, not an exact present-day count. Membership subsequently continued expanding as additional farmers and women joined.',
      },
    ],
    sourceKey: 'history:recognition',
  },
  {
    id: 'livelihoods-2025',
    year: '2025',
    title: 'Growing livelihoods. Earning recognition.',
    summary:
      'MMCS expanded agriculture, dairy, food processing, women’s livelihoods, collective farming and market development while receiving recognition as a Best Dairy Cooperative in Meghalaya.',
    heading: 'Expansion of Farmer and Women’s Livelihood Programmes',
    introduction:
      'By 2025 MMCS had developed into a substantially larger cooperative working with a growing network of farmers and rural women.',
    sections: [
      {
        heading: 'Agriculture and horticulture',
        items: [
          'Collective farming',
          'Plantation development',
          'Agricultural inputs',
          'Market linkage',
          'Value addition',
        ],
      },
      {
        heading: 'Women empowerment',
        items: [
          'Processing and production',
          'Entrepreneurship and retail',
          'Cooperative enterprise activities',
        ],
      },
      {
        heading: 'Dairy development',
        introduction:
          'MMCS strengthened dairy-related activities and continued promoting cooperative-based dairy livelihoods.',
      },
      {
        heading: 'Food processing and markets',
        introduction:
          'Processing expanded around locally available fruits, agricultural commodities and value-added products. Greater emphasis was placed on direct markets so farmers could participate across the value chain rather than remain only raw-product producers.',
      },
    ],
    sourceKey: 'history:2025',
  },
  {
    id: 'collective-farming-2025-2026',
    year: '2025–2026',
    title: 'Collective farming for the next generation.',
    summary:
      'MMCS expanded collective farming and horticulture, promoting high-value fruit crops designed to diversify farmer income and create a reliable supply base for future processing.',
    heading: 'Expansion of Collective Farming',
    introduction:
      'Collective farming and horticulture plans focused on high-value crops and a more reliable future supply base.',
    sections: [
      {
        heading: 'High-value fruit crops',
        items: [
          'Rambutan',
          'Vietnam Jackfruit',
          'Avocado',
          'J33 Dang Suriya Jackfruit',
          'Nendran Banana',
          'Local Banana',
        ],
      },
      {
        heading: 'Collective Farming Programme — Phase IV',
        introduction:
          'The programme planned substantial distribution of saplings among farmers.',
        items: [
          'Diversify farmer income',
          'Encourage long-term plantation development',
          'Establish reliable agricultural supply',
          'Support future processing and marketing activities',
        ],
      },
    ],
    periodNote: 'Sapling distribution is described as planned; it is not presented as fully completed.',
    sourceKey: 'history:collective-farming',
  },
  {
    id: 'cold-chain-2025-2026',
    year: '2025–2026',
    title: 'Building an integrated cold chain.',
    summary:
      'MMCS began planning and developing integrated storage, cooling, processing and refrigerated logistics infrastructure to reduce post-harvest losses and strengthen farm-to-market connections.',
    heading: 'Integrated Agro-Processing and Cold-Chain Infrastructure',
    introduction:
      'MMCS began planning and developing connected infrastructure to preserve produce, support value addition and improve distribution.',
    sections: [
      {
        heading: 'Infrastructure in planning and development',
        items: [
          'Multi-commodity cold storage',
          'Pre-cooling facilities and chilling rooms',
          'Blast freezing facilities',
          'Ripening chambers',
          'Fruit and vegetable storage',
          'Processing facilities',
          'Solar power systems',
          'Refrigerated logistics and transportation',
        ],
      },
      {
        heading: 'Why this infrastructure matters',
        items: [
          'Reduce post-harvest losses and improve storage',
          'Preserve agricultural produce',
          'Allow farmers to wait for better market opportunities',
          'Support value addition and improve distribution',
          'Connect farmers directly to stronger markets',
        ],
      },
      {
        heading: 'Long-term farm-to-market model',
        callout:
          'Farmer → Aggregation → Storage → Processing → Branding → Logistics → Market → Consumer',
      },
    ],
    periodNote: 'These facilities are described as planned, proposed or in development.',
    sourceKey: 'history:cold-chain',
  },
  {
    id: 'mineral-water-2026',
    year: '2026',
    title: 'Nokma enters a new phase.',
    summary:
      'MMCS expanded its enterprise plans through the proposed Nokma Mineral Water facility and explored cooperative investment models involving farmers and tribal business communities.',
    heading: 'Nokma Mineral Water Initiative',
    introduction:
      'The client history describes development of the Nokma Mineral Water Plant at Khamari as a proposed modern automated mineral-water processing and packaging unit.',
    location: 'Khamari',
    sections: [
      {
        heading: 'Purpose',
        items: [
          'Diversify cooperative enterprise',
          'Generate employment and income',
          'Develop a strong local brand',
        ],
      },
      {
        heading: 'Cooperative investment model',
        introduction:
          'MMCS has explored a cooperative investment model allowing tribal business persons and farmer members to participate in enterprise development through cooperative shares.',
      },
    ],
    periodNote: 'Proposed / development initiative; commercial operation is not confirmed.',
    sourceKey: 'history:mineral-water',
  },
  {
    id: 'infrastructure-2026',
    year: '2026',
    title: 'Infrastructure for a growing cooperative.',
    summary:
      'New administrative, conference, warehouse and operational infrastructure was developed to support the expanding activities of the Megh Farm Processing Hub.',
    heading: 'Infrastructure for a Growing Cooperative',
    introduction:
      'A new building was constructed to support the expanding activities of the Megh Farm Processing Hub.',
    sections: [
      {
        heading: 'New building facilities',
        items: [
          'Administrative offices',
          'Conference facilities',
          'Warehouse facilities',
          'Storage facilities',
          'Additional operational space for the processing hub',
        ],
      },
      {
        heading: 'Purpose',
        items: [
          'Agricultural processing and administration',
          'Farmer services and storage',
          'Market operations',
          'Expansion of Megh Farm Processing Hub',
        ],
      },
      {
        heading: 'Support for expansion',
        introduction:
          'MMCS has been seeking institutional and government support to strengthen infrastructure and expand the Megh Farm Processing Hub.',
      },
    ],
    sourceKey: 'history:infrastructure',
  },
  {
    id: 'women-entrepreneurship-2026',
    year: '2026',
    title: 'From beneficiaries to entrepreneurs.',
    summary:
      'MMCS placed greater emphasis on enabling tribal women to become entrepreneurs, owners and active participants in rural enterprises.',
    heading: 'Vision for Tribal Women and Rural Entrepreneurship',
    introduction:
      'The focus increasingly moved towards enabling tribal women to become entrepreneurs rather than only beneficiaries.',
    sections: [
      {
        heading: 'Emerging and proposed areas',
        items: [
          'Women-owned retail outlets and kiosks',
          'Nokma product outlets',
          'Food and beverage enterprises',
          'Ice cream sales and distribution',
          'Digital livelihood opportunities',
          'Rural entrepreneurship and skill development',
          'Collective farming and agricultural processing',
          'Renewable-energy-based livelihoods',
          'Market-oriented cooperative enterprises',
        ],
      },
      {
        heading: 'Underlying philosophy',
        callout:
          'Economic empowerment should be built around ownership, skills, markets and sustainable income.',
      },
    ],
    periodNote: 'These areas are emerging or proposed directions.',
    sourceKey: 'history:women-entrepreneurship',
  },
];

export const journeyValueChain = [
  'Farmer Mobilization',
  'Collective Farming',
  'Aggregation',
  'Processing',
  'Cold Storage',
  'Branding',
  'Marketing',
  'Retail',
  'Consumer Market',
];

export const journeyFutureObjectives = [
  'Better income for farmers',
  'Sustainable employment for rural youth',
  'Entrepreneurship opportunities for tribal women',
  'Reduced dependence on middlemen',
  'Reduced post-harvest losses',
  'Greater value addition to local agricultural produce',
  'Stronger farmer-market linkages',
  'Modern agricultural infrastructure',
  'Locally owned brands and enterprises',
  'Sustainable cooperative businesses',
];

export const journeyOwnershipRoles = [
  'Owners',
  'Processors',
  'Entrepreneurs',
  'Marketers',
  'Shareholders',
];
