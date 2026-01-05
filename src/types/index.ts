// ===========================================
// Business Types
// ===========================================
export interface Business {
  _id: string;
  name: string;
  nameAr?: string;
  nameFr?: string;
  description?: string;
  descriptionAr?: string;
  descriptionFr?: string;
  category: BusinessCategory;
  address: string;
  addressAr?: string;
  latitude?: number;
  longitude?: number;
  phones: string[];
  email?: string;
  website?: string;
  hours?: string;
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type BusinessCategory =
  | "restaurant"
  | "shop"
  | "pharmacy"
  | "bank"
  | "hotel"
  | "service"
  | "other";

// ===========================================
// Event Types
// ===========================================
export interface Event {
  _id: string;
  title: string;
  titleAr?: string;
  titleFr?: string;
  description?: string;
  descriptionAr?: string;
  descriptionFr?: string;
  category: EventCategory;
  startDate: string;
  endDate?: string;
  location: string;
  locationAr?: string;
  latitude?: number;
  longitude?: number;
  organizer?: string;
  contactPhone?: string;
  contactEmail?: string;
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export type EventCategory =
  | "sports"
  | "cultural"
  | "religious"
  | "educational"
  | "community"
  | "other";

// ===========================================
// Mosque Types
// ===========================================
export interface PrayerTimes {
  fajr?: string;
  dhuhr?: string;
  asr?: string;
  maghrib?: string;
  isha?: string;
  jumua?: string;
}

export interface Mosque {
  _id: string;
  name: string;
  nameAr?: string;
  nameFr?: string;
  description?: string;
  descriptionAr?: string;
  address: string;
  addressAr?: string;
  latitude?: number;
  longitude?: number;
  imam?: string;
  phone?: string;
  prayerTimes?: PrayerTimes;
  facilities: string[];
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type MosqueFacility =
  | "parking"
  | "wudu"
  | "women_section"
  | "library"
  | "quran_school"
  | "air_conditioning"
  | "heating"
  | "wheelchair_access";

// ===========================================
// Medical Types
// ===========================================
export interface Medical {
  _id: string;
  name: string;
  nameAr?: string;
  nameFr?: string;
  type: MedicalType;
  specialty?: string;
  specialtyAr?: string;
  description?: string;
  descriptionAr?: string;
  address: string;
  addressAr?: string;
  latitude?: number;
  longitude?: number;
  phones: string[];
  emergencyPhone?: string;
  email?: string;
  website?: string;
  hours?: string;
  isEmergency24h: boolean;
  doctors?: string[];
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type MedicalType =
  | "hospital"
  | "clinic"
  | "pharmacy"
  | "laboratory"
  | "dentist"
  | "specialist"
  | "other";

// ===========================================
// Emergency Types
// ===========================================
export interface EmergencyContact {
  _id: string;
  name: string;
  nameAr?: string;
  type: EmergencyType;
  phone: string;
  alternatePhone?: string;
  address?: string;
  description?: string;
  isAvailable24h: boolean;
}

export type EmergencyType =
  | "police"
  | "fire"
  | "ambulance"
  | "hospital"
  | "municipality"
  | "utility"
  | "gendarmerie";

// ===========================================
// Common Types
// ===========================================
export interface SelectOption {
  value: string;
  label: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  pagination?: PaginationInfo;
  success?: boolean;
  error?: string;
}

// ===========================================
// Prayer Times Types (Aladhan API)
// ===========================================
export interface PrayerTimeDisplay {
  name: string;
  nameAr: string;
  time: string;
  icon: React.ReactNode;
}

export interface AladhanTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface AladhanResponse {
  data: {
    timings: AladhanTimings;
    date: {
      hijri: {
        day: string;
        month: { ar: string };
        year: string;
      };
      gregorian: {
        day: string;
        month: { en: string };
        year: string;
      };
    };
  };
}
