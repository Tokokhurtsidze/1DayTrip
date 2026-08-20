import mongoose, { Schema, InferSchemaType } from 'mongoose';

const LocalizedTextSchema = new Schema(
  {
    ka: { type: String, required: true },
    en: { type: String, required: true },
  },
  { _id: false }
);

const TourSchema = new Schema(
  {
    title: { type: LocalizedTextSchema, required: true },
    description: { type: LocalizedTextSchema, required: true },
    itinerary: { type: LocalizedTextSchema, required: true },
    price: { type: Number, required: true },
    totalSeats: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    images: { type: [String], required: true },
    meetingPoint: { type: String, required: true },
  },
  { timestamps: true }
);

export type TourDocument = InferSchemaType<typeof TourSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const TourModel = mongoose.models.Tour || mongoose.model('Tour', TourSchema);
