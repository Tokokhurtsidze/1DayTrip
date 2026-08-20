import mongoose, { Schema, InferSchemaType } from 'mongoose';

const BookingSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tourId: { type: Schema.Types.ObjectId, ref: 'Tour', required: true },
    paidAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
      required: true,
    },
    transactionId: { type: String, required: false },
    bookingDate: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

export type BookingDocument = InferSchemaType<typeof BookingSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const BookingModel = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
