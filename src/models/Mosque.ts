import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMosque extends Document {
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
  prayerTimes?: {
    fajr?: string;
    dhuhr?: string;
    asr?: string;
    maghrib?: string;
    isha?: string;
    jumua?: string;
  };
  facilities: string[];
  images: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MosqueSchema = new Schema<IMosque>(
  {
    name: { type: String, required: true, index: true },
    nameAr: { type: String },
    nameFr: { type: String },
    description: { type: String },
    descriptionAr: { type: String },
    address: { type: String, required: true },
    addressAr: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    imam: { type: String },
    phone: { type: String },
    prayerTimes: {
      fajr: { type: String },
      dhuhr: { type: String },
      asr: { type: String },
      maghrib: { type: String },
      isha: { type: String },
      jumua: { type: String },
    },
    facilities: [{ type: String }],
    images: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

MosqueSchema.index({ name: "text", nameAr: "text", nameFr: "text" });

const Mosque: Model<IMosque> =
  mongoose.models.Mosque || mongoose.model<IMosque>("Mosque", MosqueSchema);

export default Mosque;
