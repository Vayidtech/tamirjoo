import type { ServiceId, Technician, TileId } from "./types";

export const SERVICES: { id: ServiceId; label: string }[] = [
  { id: "plumbing", label: "لوله‌کشی" },
  { id: "electric", label: "برق‌کشی" },
  { id: "ac", label: "کولر و تهویه" },
  { id: "appliance", label: "لوازم خانگی" },
  { id: "carpentry", label: "نجاری" },
  { id: "paint", label: "نقاشی ساختمان" },
  { id: "locksmith", label: "قفل و کلید" },
  { id: "heating", label: "پکیج و شوفاژ" },
];

export const SERVICE_LABEL: Record<ServiceId, string> = Object.fromEntries(
  SERVICES.map((s) => [s.id, s.label]),
) as Record<ServiceId, string>;

export const CATEGORY_TREE: {
  id: string;
  label: string;
  children: ServiceId[];
}[] = [
  {
    id: "building",
    label: "ساختمان",
    children: ["plumbing", "electric", "carpentry", "paint", "heating"],
  },
  {
    id: "objects",
    label: "تعمیرات اشیا",
    children: ["appliance", "ac"],
  },
  {
    id: "other",
    label: "سایر خدمات",
    children: ["locksmith"],
  },
];

export const TILES: {
  id: TileId;
  label: string;
  url: string;
  subdomains?: string[];
  attribution: string;
  maxZoom: number;
}[] = [
  {
    id: "google",
    label: "گوگل",
    url: "https://mt{s}.google.com/vt/lyrs=m&hl=fa&x={x}&y={y}&z={z}",
    subdomains: ["0", "1", "2", "3"],
    attribution: "نقشه گوگل",
    maxZoom: 21,
  },
  {
    id: "googleHybrid",
    label: "ماهواره",
    url: "https://mt{s}.google.com/vt/lyrs=y&hl=fa&x={x}&y={y}&z={z}",
    subdomains: ["0", "1", "2", "3"],
    attribution: "نقشه گوگل",
    maxZoom: 21,
  },
  {
    id: "esri",
    label: "ESRI",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: "Esri",
    maxZoom: 19,
  },
];

export const TECHNICIANS: Technician[] = [
  {
    id: "t1",
    name: "علی رضایی",
    initials: "ع ر",
    photo: "/avatars/t1.jpg",
    hue: 168,
    rating: 4.9,
    reviews: 128,
    services: ["plumbing", "heating"],
    lat: 36.2974,
    lng: 59.6057,
    online: true,
    experienceYears: 8,
    completed: 342,
    visitFee: 350_000,
    about: "لوله‌کشی ساختمان و رفع نشتی. قطعات اصلی و ضمانت کار.",
  },
  {
    id: "t2",
    name: "محمد حسینی",
    initials: "م ح",
    photo: "/avatars/t2.jpg",
    hue: 210,
    rating: 4.7,
    reviews: 89,
    services: ["electric"],
    lat: 36.318,
    lng: 59.578,
    online: true,
    experienceYears: 12,
    completed: 510,
    visitFee: 400_000,
    about: "برق‌کار ساختمان و تابلو برق. عیب‌یابی سریع.",
  },
  {
    id: "t3",
    name: "رضا کریمی",
    initials: "ر ک",
    photo: "/avatars/t3.jpg",
    hue: 195,
    rating: 4.8,
    reviews: 156,
    services: ["ac", "appliance"],
    lat: 36.287,
    lng: 59.616,
    online: true,
    experienceYears: 6,
    completed: 278,
    visitFee: 450_000,
    about: "سرویس کولر گازی و یخچال. شارژ گاز و قطعات اورجینال.",
  },
  {
    id: "t4",
    name: "حسین محمدی",
    initials: "ح م",
    photo: "/avatars/t4.jpg",
    hue: 32,
    rating: 4.6,
    reviews: 64,
    services: ["carpentry"],
    lat: 36.31,
    lng: 59.599,
    online: true,
    experienceYears: 10,
    completed: 190,
    visitFee: 300_000,
    about: "کابینت، در و پنجره چوبی. اندازه‌گیری دقیق.",
  },
  {
    id: "t5",
    name: "امیر نوری",
    initials: "ا ن",
    photo: "/avatars/t5.jpg",
    hue: 250,
    rating: 4.5,
    reviews: 42,
    services: ["paint"],
    lat: 36.276,
    lng: 59.632,
    online: false,
    experienceYears: 5,
    completed: 95,
    visitFee: 250_000,
    about: "نقاشی ساختمان و کاغذ دیواری. کار تمیز.",
  },
  {
    id: "t6",
    name: "سعید اکبری",
    initials: "س ا",
    photo: "/avatars/t6.jpg",
    hue: 145,
    rating: 4.9,
    reviews: 203,
    services: ["plumbing", "electric"],
    lat: 36.325,
    lng: 59.548,
    online: true,
    experienceYears: 15,
    completed: 680,
    visitFee: 380_000,
    about: "تعمیرات عمومی ساختمان. لوله و برق با ضمانت.",
  },
  {
    id: "t7",
    name: "کامران یوسفی",
    initials: "ک ی",
    photo: "/avatars/t7.jpg",
    hue: 12,
    rating: 4.8,
    reviews: 71,
    services: ["locksmith"],
    lat: 36.26,
    lng: 59.615,
    online: true,
    experienceYears: 9,
    completed: 220,
    visitFee: 280_000,
    about: "باز کردن قفل، تعویض سیلندر و کلیدسازی سیار.",
  },
  {
    id: "t8",
    name: "مجید شریفی",
    initials: "م ش",
    photo: "/avatars/t8.jpg",
    hue: 85,
    rating: 4.4,
    reviews: 38,
    services: ["heating", "ac"],
    lat: 36.34,
    lng: 59.58,
    online: true,
    experienceYears: 7,
    completed: 150,
    visitFee: 420_000,
    about: "پکیج، شوفاژ و تهویه مطبوع. سرویس دوره‌ای.",
  },
];

export const MASHHAD_CENTER: [number, number] = [36.2974, 59.6057];
