import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEmergencyContact extends Document {
  name: string;
  nameAr?: string;
  nameFr?: string;
  type:
    | "police"
    | "fire"
    | "ambulance"
    | "hospital"
    | "municipality"
    | "utility"
    | "other";
  phone: string;
  alternatePhone?: string;
  address?: string;
  addressAr?: string;
  description?: string;
  descriptionAr?: string;
  isAvailable24h: boolean;
  priority: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EmergencyContactSchema = new Schema<IEmergencyContact>(
  {
    name: { type: String, required: true },
    nameAr: { type: String },
    nameFr: { type: String },
    type: {
      type: String,
      enum: [
        "police",
        "fire",
        "ambulance",
        "hospital",
        "municipality",
        "utility",
        "other",
      ],
      default: "other",
      index: true,
    },
    phone: { type: String, required: true },
    alternatePhone: { type: String },
    address: { type: String },
    addressAr: { type: String },
    description: { type: String },
    descriptionAr: { type: String },
    isAvailable24h: { type: Boolean, default: false },
    priority: { type: Number, default: 10 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const EmergencyContact: Model<IEmergencyContact> =
  mongoose.models.EmergencyContact ||
  mongoose.model<IEmergencyContact>("EmergencyContact", EmergencyContactSchema);

export default EmergencyContact;
