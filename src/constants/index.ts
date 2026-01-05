import type { SelectOption } from "@/types";

// ===========================================
// Business Constants
// ===========================================
export const BUSINESS_CATEGORY_LABELS: Record<string, string> = {
  restaurant: "مطعم",
  shop: "محل",
  pharmacy: "صيدلية",
  bank: "بنك",
  hotel: "فندق",
  service: "خدمات",
  other: "أخرى",
};

export const BUSINESS_CATEGORY_ICONS: Record<string, string> = {
  restaurant: "🍽️",
  shop: "🛒",
  pharmacy: "💊",
  bank: "🏦",
  hotel: "🏨",
  service: "🔧",
  other: "🏢",
};

export const BUSINESS_CATEGORIES: SelectOption[] = [
  { value: "all", label: "جميع الفئات" },
  { value: "restaurant", label: "مطاعم" },
  { value: "shop", label: "محلات" },
  { value: "pharmacy", label: "صيدليات" },
  { value: "bank", label: "بنوك" },
  { value: "hotel", label: "فنادق" },
  { value: "service", label: "خدمات" },
  { value: "other", label: "أخرى" },
];

// ===========================================
// Event Constants
// ===========================================
export const EVENT_CATEGORY_LABELS: Record<string, string> = {
  sports: "رياضة",
  cultural: "ثقافي",
  religious: "ديني",
  educational: "تعليمي",
  community: "مجتمعي",
  other: "أخرى",
};

export const EVENT_CATEGORY_ICONS: Record<string, string> = {
  sports: "⚽",
  cultural: "🎭",
  religious: "🕌",
  educational: "📚",
  community: "👥",
  other: "📅",
};

export const EVENT_CATEGORIES: SelectOption[] = [
  { value: "all", label: "جميع الفعاليات" },
  { value: "sports", label: "رياضة" },
  { value: "cultural", label: "ثقافة" },
  { value: "religious", label: "ديني" },
  { value: "educational", label: "تعليمي" },
  { value: "community", label: "مجتمعي" },
];

// ===========================================
// Mosque Constants
// ===========================================
export const PRAYER_NAMES: Record<string, string> = {
  fajr: "الفجر",
  dhuhr: "الظهر",
  asr: "العصر",
  maghrib: "المغرب",
  isha: "العشاء",
  jumua: "الجمعة",
};

export const MOSQUE_FACILITY_LABELS: Record<string, string> = {
  parking: "موقف سيارات",
  wudu: "مكان للوضوء",
  women_section: "قسم النساء",
  library: "مكتبة",
  quran_school: "مدرسة قرآنية",
  air_conditioning: "تكييف",
  heating: "تدفئة",
  wheelchair_access: "وصول لذوي الإعاقة",
};

// ===========================================
// Medical Constants
// ===========================================
export const MEDICAL_TYPE_LABELS: Record<string, string> = {
  hospital: "مستشفى",
  clinic: "عيادة",
  pharmacy: "صيدلية",
  laboratory: "مختبر",
  dentist: "طبيب أسنان",
  specialist: "أخصائي",
  other: "أخرى",
};

export const MEDICAL_TYPE_ICONS: Record<string, string> = {
  hospital: "🏥",
  clinic: "🩺",
  pharmacy: "💊",
  laboratory: "🔬",
  dentist: "🦷",
  specialist: "👨‍⚕️",
  other: "🏨",
};

export const MEDICAL_TYPES: SelectOption[] = [
  { value: "all", label: "الكل" },
  { value: "hospital", label: "مستشفيات" },
  { value: "clinic", label: "عيادات" },
  { value: "pharmacy", label: "صيدليات" },
  { value: "laboratory", label: "مختبرات" },
  { value: "dentist", label: "أطباء أسنان" },
  { value: "specialist", label: "أخصائيون" },
];

// ===========================================
// Emergency Constants
// ===========================================
export const EMERGENCY_TYPE_COLORS: Record<string, string> = {
  police: "bg-blue-600",
  fire: "bg-orange-600",
  ambulance: "bg-red-600",
  hospital: "bg-red-600",
  municipality: "bg-emerald-600",
  utility: "bg-yellow-600",
  gendarmerie: "bg-emerald-600",
};

export const DEFAULT_EMERGENCY_CONTACTS = [
  { type: "police", name: "الشرطة", phone: "17", color: "blue" },
  { type: "fire", name: "الحماية المدنية", phone: "14", color: "orange" },
  { type: "ambulance", name: "الإسعاف", phone: "14", color: "red" },
  {
    type: "gendarmerie",
    name: "الدرك الوطني",
    phone: "1055",
    color: "emerald",
  },
] as const;

// ===========================================
// Common Constants
// ===========================================
export const DEFAULT_PAGE_SIZE = 12;

export const THEME_COLORS = {
  business: "emerald",
  event: "purple",
  mosque: "amber",
  medical: "red",
  emergency: "red",
} as const;
