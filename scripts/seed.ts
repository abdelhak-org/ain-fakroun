// Seed script for Ain Fakroun city portal
// Run with: npx ts-node --compiler-options '{"module":"commonjs"}' scripts/seed.ts
// Or: npx tsx scripts/seed.ts

import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/ainfakroun";

// Define schemas inline to avoid import issues
const BusinessSchema = new mongoose.Schema(
  {
    name: String,
    nameAr: String,
    nameFr: String,
    description: String,
    descriptionAr: String,
    category: String,
    address: String,
    addressAr: String,
    latitude: Number,
    longitude: Number,
    phones: [String],
    email: String,
    website: String,
    hours: String,
    images: [String],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const EventSchema = new mongoose.Schema(
  {
    title: String,
    titleAr: String,
    description: String,
    descriptionAr: String,
    category: String,
    startDate: Date,
    endDate: Date,
    location: String,
    locationAr: String,
    latitude: Number,
    longitude: Number,
    organizer: String,
    contactPhone: String,
    images: [String],
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const MosqueSchema = new mongoose.Schema(
  {
    name: String,
    nameAr: String,
    description: String,
    descriptionAr: String,
    address: String,
    addressAr: String,
    latitude: Number,
    longitude: Number,
    imam: String,
    phone: String,
    prayerTimes: {
      fajr: String,
      dhuhr: String,
      asr: String,
      maghrib: String,
      isha: String,
      jumua: String,
    },
    facilities: [String],
    images: [String],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const MedicalSchema = new mongoose.Schema(
  {
    name: String,
    nameAr: String,
    type: String,
    specialty: String,
    specialtyAr: String,
    description: String,
    address: String,
    addressAr: String,
    latitude: Number,
    longitude: Number,
    phones: [String],
    emergencyPhone: String,
    hours: String,
    isEmergency24h: { type: Boolean, default: false },
    doctors: [String],
    images: [String],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const EmergencyContactSchema = new mongoose.Schema(
  {
    name: String,
    nameAr: String,
    type: String,
    phone: String,
    alternatePhone: String,
    address: String,
    addressAr: String,
    description: String,
    isAvailable24h: { type: Boolean, default: false },
    priority: { type: Number, default: 10 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Sample data for Ain Fakroun
const businesses = [
  {
    name: "Supermarket El Baraka",
    nameAr: "سوبر ماركت البركة",
    description:
      "Large supermarket with groceries, household items, and fresh produce",
    category: "shop",
    address: "Centre Ville, Ain Fakroun",
    addressAr: "وسط المدينة، عين فكرون",
    latitude: 35.967,
    longitude: 6.867,
    phones: ["+213 32 XX XX XX"],
    hours: "08:00 - 21:00",
  },
  {
    name: "Restaurant El Waha",
    nameAr: "مطعم الواحة",
    description: "Traditional Algerian cuisine and grilled specialties",
    category: "restaurant",
    address: "Rue Principale, Ain Fakroun",
    addressAr: "الشارع الرئيسي، عين فكرون",
    latitude: 35.9665,
    longitude: 6.866,
    phones: ["+213 32 XX XX XX"],
    hours: "11:00 - 23:00",
  },
  {
    name: "Pharmacy El Amel",
    nameAr: "صيدلية الأمل",
    description:
      "Full-service pharmacy with prescription and over-the-counter medications",
    category: "pharmacy",
    address: "Avenue de la République, Ain Fakroun",
    addressAr: "شارع الجمهورية، عين فكرون",
    latitude: 35.9675,
    longitude: 6.868,
    phones: ["+213 32 XX XX XX"],
    hours: "08:00 - 20:00",
  },
  {
    name: "Café El Nour",
    nameAr: "مقهى النور",
    description: "Traditional coffee house with tea and light refreshments",
    category: "restaurant",
    address: "Place du Marché, Ain Fakroun",
    addressAr: "ساحة السوق، عين فكرون",
    latitude: 35.9668,
    longitude: 6.8665,
    phones: ["+213 32 XX XX XX"],
    hours: "06:00 - 22:00",
  },
  {
    name: "Banque Nationale d'Algérie",
    nameAr: "البنك الوطني الجزائري",
    description: "Banking services, ATM, and currency exchange",
    category: "bank",
    address: "Centre Ville, Ain Fakroun",
    latitude: 35.9672,
    longitude: 6.8675,
    phones: ["+213 32 XX XX XX"],
    hours: "08:30 - 15:30 (Sun-Thu)",
  },
  {
    name: "Boutique Mode Elegance",
    nameAr: "بوتيك موضة الأناقة",
    description: "Men and women clothing store",
    category: "shop",
    address: "Rue du Commerce, Ain Fakroun",
    latitude: 35.966,
    longitude: 6.8655,
    phones: ["+213 32 XX XX XX"],
    hours: "09:00 - 19:00",
  },
];

const mosques = [
  {
    name: "Grand Mosque of Ain Fakroun",
    nameAr: "المسجد الكبير عين فكرون",
    description:
      "Main mosque of the city, hosts Friday prayers and religious events",
    address: "Centre Ville, Ain Fakroun",
    addressAr: "وسط المدينة، عين فكرون",
    latitude: 35.9667,
    longitude: 6.8667,
    prayerTimes: {
      fajr: "05:30",
      dhuhr: "12:45",
      asr: "15:30",
      maghrib: "18:15",
      isha: "19:45",
      jumua: "12:30",
    },
    facilities: ["Ablution area", "Women section", "Parking"],
  },
  {
    name: "Mosque El Taqwa",
    nameAr: "مسجد التقوى",
    description: "Neighborhood mosque serving the eastern district",
    address: "Quartier Est, Ain Fakroun",
    addressAr: "الحي الشرقي، عين فكرون",
    latitude: 35.968,
    longitude: 6.87,
    prayerTimes: {
      fajr: "05:30",
      dhuhr: "12:45",
      asr: "15:30",
      maghrib: "18:15",
      isha: "19:45",
    },
    facilities: ["Ablution area"],
  },
  {
    name: "Mosque El Rahma",
    nameAr: "مسجد الرحمة",
    description: "Mosque with Quran school for children",
    address: "Quartier Ouest, Ain Fakroun",
    addressAr: "الحي الغربي، عين فكرون",
    latitude: 35.9655,
    longitude: 6.864,
    prayerTimes: {
      fajr: "05:30",
      dhuhr: "12:45",
      asr: "15:30",
      maghrib: "18:15",
      isha: "19:45",
    },
    facilities: ["Ablution area", "Quran school", "Library"],
  },
];

const medicalFacilities = [
  {
    name: "Hospital of Ain Fakroun",
    nameAr: "مستشفى عين فكرون",
    type: "hospital",
    description: "Public hospital with emergency services",
    address: "Route de Constantine, Ain Fakroun",
    addressAr: "طريق قسنطينة، عين فكرون",
    latitude: 35.969,
    longitude: 6.872,
    phones: ["+213 32 XX XX XX"],
    emergencyPhone: "+213 32 XX XX XX",
    hours: "24/7",
    isEmergency24h: true,
  },
  {
    name: "Polyclinic Centre",
    nameAr: "العيادة المتعددة الخدمات",
    type: "clinic",
    description: "General medicine and specialist consultations",
    address: "Centre Ville, Ain Fakroun",
    latitude: 35.9665,
    longitude: 6.866,
    phones: ["+213 32 XX XX XX"],
    hours: "08:00 - 16:00",
    isEmergency24h: false,
  },
  {
    name: "Pharmacy de Garde El Chifa",
    nameAr: "صيدلية الشفاء",
    type: "pharmacy",
    description: "Night pharmacy for emergency medications",
    address: "Avenue Principale, Ain Fakroun",
    latitude: 35.967,
    longitude: 6.8665,
    phones: ["+213 32 XX XX XX"],
    hours: "20:00 - 08:00",
    isEmergency24h: true,
  },
  {
    name: "Dr. Ahmed Dental Clinic",
    nameAr: "عيادة الدكتور أحمد لطب الأسنان",
    type: "dentist",
    specialty: "General Dentistry",
    address: "Rue de la Santé, Ain Fakroun",
    latitude: 35.9662,
    longitude: 6.8658,
    phones: ["+213 32 XX XX XX"],
    hours: "09:00 - 17:00",
    isEmergency24h: false,
  },
  {
    name: "Laboratory El Hayat",
    nameAr: "مختبر الحياة للتحاليل",
    type: "laboratory",
    description: "Medical analysis and blood tests",
    address: "Centre Ville, Ain Fakroun",
    latitude: 35.9668,
    longitude: 6.867,
    phones: ["+213 32 XX XX XX"],
    hours: "07:00 - 15:00",
    isEmergency24h: false,
  },
];

const events = [
  {
    title: "Annual Cultural Festival",
    titleAr: "المهرجان الثقافي السنوي",
    description:
      "Celebration of local culture with music, poetry, and traditional crafts",
    category: "cultural",
    startDate: new Date("2026-03-15T10:00:00"),
    endDate: new Date("2026-03-17T22:00:00"),
    location: "City Center, Ain Fakroun",
    locationAr: "وسط المدينة، عين فكرون",
    latitude: 35.9667,
    longitude: 6.8667,
    organizer: "Municipality of Ain Fakroun",
    isFeatured: true,
  },
  {
    title: "Youth Football Tournament",
    titleAr: "دوري كرة القدم للشباب",
    description: "Inter-neighborhood football competition for youth ages 15-20",
    category: "sports",
    startDate: new Date("2026-02-01T14:00:00"),
    endDate: new Date("2026-02-01T18:00:00"),
    location: "Municipal Stadium, Ain Fakroun",
    latitude: 35.97,
    longitude: 6.865,
    organizer: "Sports Association",
    isFeatured: false,
  },
  {
    title: "Ramadan Nights",
    titleAr: "ليالي رمضان",
    description:
      "Evening gatherings during Ramadan with religious talks and community iftar",
    category: "religious",
    startDate: new Date("2026-03-01T19:00:00"),
    location: "Grand Mosque, Ain Fakroun",
    latitude: 35.9667,
    longitude: 6.8667,
    organizer: "Grand Mosque Committee",
    isFeatured: true,
  },
  {
    title: "Local Market Day",
    titleAr: "يوم السوق الأسبوعي",
    description: "Weekly market featuring local produce, crafts, and goods",
    category: "community",
    startDate: new Date("2026-01-05T07:00:00"),
    endDate: new Date("2026-01-05T14:00:00"),
    location: "Market Square, Ain Fakroun",
    latitude: 35.966,
    longitude: 6.866,
    organizer: "Merchants Association",
    isFeatured: false,
  },
];

const emergencyContacts = [
  {
    name: "Police Station Ain Fakroun",
    nameAr: "مركز الشرطة عين فكرون",
    type: "police",
    phone: "+213 32 XX XX XX",
    alternatePhone: "17",
    address: "Centre Ville, Ain Fakroun",
    isAvailable24h: true,
    priority: 1,
  },
  {
    name: "Civil Protection (Fire/Rescue)",
    nameAr: "الحماية المدنية",
    type: "fire",
    phone: "+213 32 XX XX XX",
    alternatePhone: "14",
    address: "Route Nationale, Ain Fakroun",
    isAvailable24h: true,
    priority: 2,
  },
  {
    name: "Hospital Emergency",
    nameAr: "طوارئ المستشفى",
    type: "hospital",
    phone: "+213 32 XX XX XX",
    address: "Hospital of Ain Fakroun",
    isAvailable24h: true,
    priority: 3,
  },
  {
    name: "Municipality (APC)",
    nameAr: "البلدية",
    type: "municipality",
    phone: "+213 32 XX XX XX",
    address: "Mairie, Centre Ville",
    isAvailable24h: false,
    priority: 5,
  },
  {
    name: "Sonelgaz (Electricity)",
    nameAr: "سونلغاز",
    type: "utility",
    phone: "+213 32 XX XX XX",
    description: "Report power outages and electrical emergencies",
    isAvailable24h: true,
    priority: 6,
  },
  {
    name: "Algérie Télécom",
    nameAr: "اتصالات الجزائر",
    type: "utility",
    phone: "100",
    description: "Phone and internet service issues",
    isAvailable24h: false,
    priority: 7,
  },
];

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Create models
    const Business =
      mongoose.models.Business || mongoose.model("Business", BusinessSchema);
    const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);
    const Mosque =
      mongoose.models.Mosque || mongoose.model("Mosque", MosqueSchema);
    const Medical =
      mongoose.models.Medical || mongoose.model("Medical", MedicalSchema);
    const EmergencyContact =
      mongoose.models.EmergencyContact ||
      mongoose.model("EmergencyContact", EmergencyContactSchema);

    // Clear existing data
    console.log("Clearing existing data...");
    await Promise.all([
      Business.deleteMany({}),
      Event.deleteMany({}),
      Mosque.deleteMany({}),
      Medical.deleteMany({}),
      EmergencyContact.deleteMany({}),
    ]);

    // Insert seed data
    console.log("Inserting seed data...");
    await Promise.all([
      Business.insertMany(businesses),
      Event.insertMany(events),
      Mosque.insertMany(mosques),
      Medical.insertMany(medicalFacilities),
      EmergencyContact.insertMany(emergencyContacts),
    ]);

    console.log("✅ Seed data inserted successfully!");
    console.log(`   - ${businesses.length} businesses`);
    console.log(`   - ${events.length} events`);
    console.log(`   - ${mosques.length} mosques`);
    console.log(`   - ${medicalFacilities.length} medical facilities`);
    console.log(`   - ${emergencyContacts.length} emergency contacts`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

seed();
