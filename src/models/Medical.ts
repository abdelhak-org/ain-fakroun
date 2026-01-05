import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMedical extends Document {
  name: string;
  nameAr?: string;
  nameFr?: string;
  type:
    | "hospital"
    | "clinic"
    | "pharmacy"
    | "laboratory"
    | "dentist"
    | "specialist"
    | "other";
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
  createdAt: Date;
  updatedAt: Date;
}

const MedicalSchema = new Schema<IMedical>(
  {
    name: { type: String, required: true, index: true },
    nameAr: { type: String },
    nameFr: { type: String },
    type: {
      type: String,
      enum: [
        "hospital",
        "clinic",
        "pharmacy",
        "laboratory",
        "dentist",
        "specialist",
        "other",
      ],
      default: "clinic",
      index: true,
    },
    specialty: { type: String },
    specialtyAr: { type: String },
    description: { type: String },
    descriptionAr: { type: String },
    address: { type: String, required: true },
    addressAr: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    phones: [{ type: String }],
    emergencyPhone: { type: String },
    email: { type: String },
    website: { type: String },
    hours: { type: String },
    isEmergency24h: { type: Boolean, default: false },
    doctors: [{ type: String }],
    images: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

MedicalSchema.index({
  name: "text",
  nameAr: "text",
  nameFr: "text",
  specialty: "text",
});

const Medical: Model<IMedical> =
  mongoose.models.Medical || mongoose.model<IMedical>("Medical", MedicalSchema);

export default Medical;
