import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBusiness extends Document {
  name: string;
  nameAr?: string;
  nameFr?: string;
  description?: string;
  descriptionAr?: string;
  descriptionFr?: string;
  category:
    | "restaurant"
    | "shop"
    | "pharmacy"
    | "bank"
    | "hotel"
    | "service"
    | "other";
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
  createdAt: Date;
  updatedAt: Date;
}

const BusinessSchema = new Schema<IBusiness>(
  {
    name: { type: String, required: true, index: true },
    nameAr: { type: String },
    nameFr: { type: String },
    description: { type: String },
    descriptionAr: { type: String },
    descriptionFr: { type: String },
    category: {
      type: String,
      enum: [
        "restaurant",
        "shop",
        "pharmacy",
        "bank",
        "hotel",
        "service",
        "other",
      ],
      default: "other",
      index: true,
    },
    address: { type: String, required: true },
    addressAr: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    phones: [{ type: String }],
    email: { type: String },
    website: { type: String },
    hours: { type: String },
    images: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Text index for search
BusinessSchema.index({
  name: "text",
  nameAr: "text",
  nameFr: "text",
  description: "text",
});

const Business: Model<IBusiness> =
  mongoose.models.Business ||
  mongoose.model<IBusiness>("Business", BusinessSchema);

export default Business;
