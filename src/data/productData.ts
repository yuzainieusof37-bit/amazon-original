export interface ColorVariant {
  id: 'black' | 'white' | 'sentinels';
  name: string;
  asin: string;
  price: number;
  listPrice: number;
  stockCount: number | null;
  weightLabel: string;
  swatchHex: string;
  images: {
    id: string;
    src: string;
    alt: string;
    caption: string;
  }[];
}

export interface StyleOption {
  id: 'mouse-only' | 'grip-kit' | 'pro-bundle';
  label: string;
  description: string;
  priceDelta: number;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  title: string;
  date: string;
  location: string;
  variantLabel: string;
  verified: boolean;
  body: string;
  helpfulCount: number;
}

export interface BundleAccessory {
  id: string;
  title: string;
  price: number;
  image: string;
  asin: string;
}

export interface ComparisonProduct {
  id: string;
  name: string;
  asin: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  weight: string;
  sensor: string;
  pollingRate: string;
  batteryLife: string;
  shape: string;
  isCurrent?: boolean;
}

export const IMAGES = {
  blackMain: '/src/assets/images/razer_viper_black_main_1795665981640.jpg',
  whiteMain: '/src/assets/images/razer_viper_white_main_1795665982397.jpg',
  angleTopDongle: '/src/assets/images/razer_viper_angle_top_1795665982409.jpg',
  sentinelsMain: '/src/assets/images/razer_viper_sentinels_1795665983439.jpg',
  aplusBanner: '/src/assets/images/razer_aplus_banner_1795665984390.jpg',
  bundleAccessories: '/src/assets/images/razer_bundle_accessories_1795665984055.jpg',
};

export const COLOR_VARIANTS: ColorVariant[] = [
  {
    id: 'black',
    name: 'Black',
    asin: 'B0G5QBTC2Q',
    price: 199.0,
    listPrice: 234.9,
    stockCount: null,
    weightLabel: '54 g',
    swatchHex: '#18181B',
    images: [
      {
        id: 'blk-1',
        src: IMAGES.blackMain,
        alt: 'Razer Viper V3 Pro Ultralight Wireless Gaming Mouse in Matte Black front three-quarter view',
        caption: '54g Symmetrical Ultralight Chassis — Smooth-Touch Matte Black',
      },
      {
        id: 'blk-2',
        src: IMAGES.angleTopDongle,
        alt: 'Razer Viper V3 Pro top view alongside Razer HyperPolling 8000 Hz Wireless Dongle',
        caption: 'Included Razer HyperPolling Wireless Dongle (True 8000 Hz)',
      },
      {
        id: 'blk-3',
        src: IMAGES.aplusBanner,
        alt: 'Razer Viper V3 Pro resting on esports micro-weave desk mat with green studio rim lighting',
        caption: 'Engineered with Esports Pros for Zero-Latency Precision',
      },
      {
        id: 'blk-4',
        src: IMAGES.bundleAccessories,
        alt: 'Included braided USB Type-C Speedflex cable and accessories',
        caption: 'USB Type-A to Type-C Speedflex Cable & Wireless Adapter',
      },
    ],
  },
  {
    id: 'white',
    name: 'White',
    asin: 'B0G5QCK8M4',
    price: 205.0,
    listPrice: 234.9,
    stockCount: null,
    weightLabel: '55 g',
    swatchHex: '#F4F4F5',
    images: [
      {
        id: 'wht-1',
        src: IMAGES.whiteMain,
        alt: 'Razer Viper V3 Pro Ultralight Wireless Gaming Mouse in Matte White front three-quarter view',
        caption: '55g Symmetrical Ultralight Chassis — Matte White Edition',
      },
      {
        id: 'wht-2',
        src: IMAGES.angleTopDongle,
        alt: 'Razer Viper V3 Pro top silhouette and 8000 Hz HyperPolling Wireless Dongle',
        caption: 'Included Razer HyperPolling Wireless Dongle (True 8000 Hz)',
      },
      {
        id: 'wht-3',
        src: IMAGES.aplusBanner,
        alt: 'Razer Viper V3 Pro studio esports showcase',
        caption: 'Focus Pro 35K Optical Sensor Gen-2 with 99.8% Accuracy',
      },
      {
        id: 'wht-4',
        src: IMAGES.bundleAccessories,
        alt: 'Braided USB Type-C cable and esports cloth mat accessories',
        caption: 'USB Type-C Speedflex Charging Cable & Wireless Receiver',
      },
    ],
  },
  {
    id: 'sentinels',
    name: 'Sentinels Edition',
    asin: 'B0G5QDW9L2',
    price: 249.0,
    listPrice: 279.9,
    stockCount: 4,
    weightLabel: '54 g',
    swatchHex: '#B91C1C',
    images: [
      {
        id: 'sen-1',
        src: IMAGES.sentinelsMain,
        alt: 'Razer Viper V3 Pro Sentinels Edition in Metallic Crimson Red and Matte Black',
        caption: 'Sentinels Limited Edition — Metallic Crimson & Matte Black',
      },
      {
        id: 'sen-2',
        src: IMAGES.angleTopDongle,
        alt: 'Included Razer HyperPolling 8000 Hz Wireless Dongle',
        caption: 'True 8000 Hz Wireless HyperPolling Dongle Included',
      },
      {
        id: 'sen-3',
        src: IMAGES.aplusBanner,
        alt: 'Razer Viper V3 Pro dark studio esports showcase',
        caption: 'Tournament-Grade 90M Optical Switches Gen-3',
      },
      {
        id: 'sen-4',
        src: IMAGES.bundleAccessories,
        alt: 'Esports bundle cable and micro-weave cloth pad',
        caption: 'Braided Speedflex USB-C Cable & Esports Surface Ready',
      },
    ],
  },
];

export const STYLE_OPTIONS: StyleOption[] = [
  {
    id: 'mouse-only',
    label: 'Mouse Only',
    description: 'Includes HyperPolling Wireless Dongle, Speedflex USB-C Cable & Grip Tape',
    priceDelta: 0,
  },
  {
    id: 'grip-kit',
    label: 'With Extra PTFE Skates & Grip Kit',
    description: 'Includes spare 100% PTFE Esports mouse feet + pre-cut anti-slip grip tape',
    priceDelta: 19.0,
  },
  {
    id: 'pro-bundle',
    label: 'Pro Esports Bundle (+ Gigantus V2 Pad)',
    description: 'Paired with Razer Gigantus V2 Large Micro-Weave Cloth Gaming Mouse Mat',
    priceDelta: 39.0,
  },
];

export const PRODUCT_BULLETS: string[] = [
  '54g ULTRA-LIGHTWEIGHT DESIGN — Engineered in collaboration with world-class esports pros, the balanced 54g symmetrical shell enables effortless, hyper-accurate flicks and sustained control across marathon tournament sets.',
  'RAZER FOCUS PRO 35K OPTICAL SENSOR GEN-2 — Experience best-in-class tracking precision on glass and micro-weave cloth surfaces, featuring 1-DPI step adjustments, Smart Tracking, and Motion Sync.',
  'TRUE 8000 Hz WIRELESS HYPERPOLLING — Powered by Razer HyperSpeed Wireless and the included HyperPolling Wireless Dongle for ultra-low click latency and silky-smooth cursor updates on high-refresh monitors.',
  'RAZER OPTICAL MOUSE SWITCHES GEN-3 — Rated for a 90-million click lifecycle with crisp 0.2ms actuation and zero double-clicking issues or debounce delay.',
  'UP TO 95 HOURS OF BATTERY LIFE — Power through scrims and ranked grinds with up to 95 hours at 1000 Hz (or 17 hours at native 8000 Hz), plus fast USB-C charging.',
  'SMOOTH-TOUCH FINISH & LARGE 100% PTFE SKATES — Coated for confident claw and fingertip grip without chalky residue, paired with rounded virgin-grade PTFE feet for friction-free glide.',
];

export const PRODUCT_SPECS: { label: string; value: string }[] = [
  { label: 'Brand', value: 'Razer' },
  { label: 'Colour', value: 'Black / White / Sentinels Edition' },
  { label: 'Connectivity technology', value: 'Razer HyperSpeed 2.4 GHz Wireless, Wired USB-C' },
  { label: 'Movement detection', value: 'Focus Pro 35K Optical Sensor Gen-2' },
  { label: 'Polling rate', value: 'Up to 8000 Hz Wireless (Dongle Included)' },
  { label: 'Special features', value: '54g Ultralightweight, 90M Optical Switches Gen-3, 95h Battery' },
];

export const TECHNICAL_DETAILS: { label: string; value: string }[] = [
  { label: 'ASIN', value: 'B0G5QBTC2Q' },
  { label: 'Item Model Number', value: 'RZ01-05120100-R3A1' },
  { label: 'Product Dimensions', value: '12.71 x 6.39 x 3.99 cm; 54 g' },
  { label: 'Max Sensitivity (DPI)', value: '35,000 DPI (1-DPI Step Increment)' },
  { label: 'Max Speed (IPS) / Acceleration', value: '750 IPS / 70 G' },
  { label: 'Programmable Buttons', value: '6 (with underside DPI toggle)' },
  { label: 'Switch Lifecycle', value: '90 Million Clicks (Optical Gen-3)' },
  { label: 'Battery Type', value: '1 Lithium-Ion Rechargeable (USB-C)' },
  { label: 'Manufacturer', value: 'Razer Inc.' },
  { label: 'Warranty (Singapore)', value: '2-Year Official Razer Singapore Warranty' },
];

export const BUNDLE_ACCESSORIES: BundleAccessory[] = [
  {
    id: 'pad-gigantus',
    title: 'Razer Gigantus V2 Cloth Gaming Mouse Mat (Large) - Textured Micro-Weave Surface',
    price: 39.0,
    image: IMAGES.bundleAccessories,
    asin: 'B086RN5B9K',
  },
  {
    id: 'grip-ptfe',
    title: 'Razer Superglide PTFE Replacement Skates & Anti-Slip Grip Tape Kit for Viper V3 Pro',
    price: 19.0,
    image: IMAGES.angleTopDongle,
    asin: 'B0D2W4L9Q1',
  },
];

export const COMPARISON_PRODUCTS: ComparisonProduct[] = [
  {
    id: 'viper-v3-pro',
    name: 'Razer Viper V3 Pro (This Item)',
    asin: 'B0G5QBTC2Q',
    image: IMAGES.blackMain,
    price: 199.0,
    rating: 4.8,
    reviewCount: 1482,
    weight: '54 g',
    sensor: 'Focus Pro 35K Gen-2',
    pollingRate: '8000 Hz Wireless',
    batteryLife: 'Up to 95 hrs',
    shape: 'Symmetrical',
    isCurrent: true,
  },
  {
    id: 'viper-v3-white',
    name: 'Razer Viper V3 Pro (White Edition)',
    asin: 'B0G5QCK8M4',
    image: IMAGES.whiteMain,
    price: 205.0,
    rating: 4.8,
    reviewCount: 643,
    weight: '55 g',
    sensor: 'Focus Pro 35K Gen-2',
    pollingRate: '8000 Hz Wireless',
    batteryLife: 'Up to 95 hrs',
    shape: 'Symmetrical',
  },
  {
    id: 'viper-v3-sentinels',
    name: 'Razer Viper V3 Pro (Sentinels Ed.)',
    asin: 'B0G5QDW9L2',
    image: IMAGES.sentinelsMain,
    price: 249.0,
    rating: 4.9,
    reviewCount: 218,
    weight: '54 g',
    sensor: 'Focus Pro 35K Gen-2',
    pollingRate: '8000 Hz Wireless',
    batteryLife: 'Up to 95 hrs',
    shape: 'Symmetrical',
  },
  {
    id: 'deathadder-v3-pro',
    name: 'Razer DeathAdder V3 Pro + Pad Kit',
    asin: 'B0B6Y29W3M',
    image: IMAGES.bundleAccessories,
    price: 189.0,
    rating: 4.7,
    reviewCount: 2104,
    weight: '63 g',
    sensor: 'Focus Pro 30K',
    pollingRate: '4000 Hz / 8000 Hz Ready',
    batteryLife: 'Up to 90 hrs',
    shape: 'Ergonomic Right',
  },
];

export const RATING_DISTRIBUTION: { stars: number; percentage: number }[] = [
  { stars: 5, percentage: 86 },
  { stars: 4, percentage: 9 },
  { stars: 3, percentage: 3 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 1 },
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Marcus Tan',
    rating: 5,
    title: 'Endgame shape for claw grip — 54g feels unreal in Valorant',
    date: '14 November 2026',
    location: 'Singapore',
    variantLabel: 'Colour: Black | Style: Mouse Only',
    verified: true,
    body: 'Upgraded from a Viper V2 Pro and the hump redesign makes an immediate difference for relaxed claw grip. The matte coating stays grippy even in humid Singapore weather without needing AC blasted. 8000 Hz dongle works right out of the box and tracking on a glass pad is razor sharp. Delivered next morning by Amazon Prime SG.',
    helpfulCount: 47,
  },
  {
    id: 'rev-2',
    author: 'Cheryl Lim',
    rating: 5,
    title: 'Crisp Gen-3 switches and zero flex in the shell',
    date: '02 November 2026',
    location: 'Singapore',
    variantLabel: 'Colour: White | Style: Mouse Only',
    verified: true,
    body: 'Usually lightweight mice creak when you squeeze the sides, but this feels completely solid. The white finish looks super clean on my desk setup and has not stained at all after three weeks of daily CS2 and work use. Battery lasts easily over a week at 2000 Hz polling.',
    helpfulCount: 29,
  },
  {
    id: 'rev-3',
    author: 'Darren Ng',
    rating: 4,
    title: 'Incredible sensor & glide, 8K polling drains battery faster as expected',
    date: '19 October 2026',
    location: 'Singapore',
    variantLabel: 'Colour: Black | Style: Pro Esports Bundle (+ Gigantus V2 Pad)',
    verified: true,
    body: 'Best stock PTFE skates Razer has ever shipped. Dropping one star only because running native 8000 Hz wireless cuts battery down to ~17 hours, though Razer Synapse lets you auto-switch to 4K/8K only when a game launches which solves it nicely. Bundle with the Gigantus V2 pad was good value.',
    helpfulCount: 18,
  },
  {
    id: 'rev-4',
    author: 'Kenji Sato',
    rating: 5,
    title: 'Sentinels crimson finish is stunning in person',
    date: '08 October 2026',
    location: 'Singapore',
    variantLabel: 'Colour: Sentinels Edition | Style: Mouse Only',
    verified: true,
    body: 'The metallic red coating actually feels slightly tackier than the black matte shell, which I love. Side buttons are snappy with zero pre-travel. Local 2-year Razer SG warranty verified via serial number registration.',
    helpfulCount: 14,
  },
  {
    id: 'rev-5',
    author: 'Arjun Nair',
    rating: 3,
    title: 'Great mouse, wish DPI button was on top instead of underside',
    date: '25 September 2026',
    location: 'Singapore',
    variantLabel: 'Colour: Black | Style: Mouse Only',
    verified: true,
    body: 'Performance-wise it is flawless and ridiculously light. My only gripe is that the DPI cycle button sits on the bottom next to the sensor so you cannot toggle profiles mid-round quickly, though it prevents accidental presses. Overall still top tier.',
    helpfulCount: 9,
  },
];

export const QNA_ITEMS: { id: string; question: string; answer: string; author: string; votes: number }[] = [
  {
    id: 'qna-1',
    question: 'Does the Razer HyperPolling 8000 Hz Wireless Dongle come inside the box, or is it sold separately?',
    answer: 'Yes! Unlike the Viper V2 Pro, the Razer Viper V3 Pro includes the 8000 Hz HyperPolling Wireless Dongle directly inside the box along with a braided USB-C Speedflex cable and pre-cut grip tape.',
    author: 'Razer Official Store SG',
    votes: 34,
  },
  {
    id: 'qna-2',
    question: 'Is this covered by local Razer Singapore warranty?',
    answer: 'Yes, units sold by Razer Official Store SG and shipped by Amazon.sg carry the official 2-year Razer Singapore warranty. Keep your Amazon.sg tax invoice for serial registration.',
    author: 'Amazon SG Verified Buyer',
    votes: 21,
  },
  {
    id: 'qna-3',
    question: 'Can I use this mouse on a glass mousepad?',
    answer: 'Yes, the Focus Pro 35K Optical Sensor Gen-2 is specifically engineered to track accurately on glass surfaces (minimum 4mm thickness) as well as standard cloth and hybrid pads.',
    author: 'Razer Official Store SG',
    votes: 16,
  },
];
