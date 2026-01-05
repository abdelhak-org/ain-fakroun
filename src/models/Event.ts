import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEvent extends Document {
  title: string;
  titleAr?: string;
  titleFr?: string;
  description?: string;
  descriptionAr?: string;
  descriptionFr?: string;
  category:
    | "sports"
    | "cultural"
    | "religious"
    | "educational"
    | "community"
    | "other";
  startDate: Date;
  endDate?: Date;
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
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, index: true },
    titleAr: { type: String },
    titleFr: { type: String },
    description: { type: String },
    descriptionAr: { type: String },
    descriptionFr: { type: String },
    category: {
      type: String,
      enum: [
        "sports",
        "cultural",
        "religious",
        "educational",
        "community",
        "other",
      ],
      default: "other",
      index: true,
    },
    startDate: { type: Date, required: true, index: true },
    endDate: { type: Date },
    location: { type: String, required: true },
    locationAr: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    organizer: { type: String },
    contactPhone: { type: String },
    contactEmail: { type: String },
    images: [{ type: String }],
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

EventSchema.index({
  title: "text",
  titleAr: "text",
  titleFr: "text",
  description: "text",
});

const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;
