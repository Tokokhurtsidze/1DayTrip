import { BookingDocument, BookingModel } from '@/features/bookings/schema/booking.schema';
import { mongo } from '@/shared/lib/mongo';

export const bookingRepository = {
  async findById(id: string): Promise<BookingDocument | null> {
    await mongo.connect();
    return BookingModel.findById(id).lean<BookingDocument>().exec();
  },

  async findByUserId(userId: string): Promise<{ items: BookingDocument[] }> {
    await mongo.connect();
    const items = await BookingModel.find({ userId }).lean<BookingDocument[]>().exec();
    return { items };
  },

  async create(
    data: Omit<BookingDocument, '_id' | 'createdAt' | 'updatedAt' | 'userId' | 'tourId'> & {
      userId: string;
      tourId: string;
    }
  ): Promise<string> {
    await mongo.connect();
    const doc = await BookingModel.create(data);
    return doc._id.toString();
  },

  async updateById(id: string, data: Partial<BookingDocument>): Promise<boolean> {
    await mongo.connect();
    const result = await BookingModel.findByIdAndUpdate(id, { $set: data });
    return result !== null;
  },
};
