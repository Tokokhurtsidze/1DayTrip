import { TourDocument, TourModel } from '@/features/tours/schema/tour.schema';
import { mongo } from '@/shared/lib/mongo';

export const tourRepository = {
  async findAll(page = 1, limit = 20): Promise<{ items: TourDocument[] }> {
    await mongo.connect();
    const skip = (page - 1) * limit;
    const items = await TourModel.find({}, null, { skip, limit }).lean<TourDocument[]>().exec();
    return { items };
  },

  async findById(id: string): Promise<TourDocument | null> {
    await mongo.connect();
    return TourModel.findById(id).lean<TourDocument>().exec();
  },

  async create(data: Omit<TourDocument, '_id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    await mongo.connect();
    const doc = await TourModel.create(data);
    return doc._id.toString();
  },

  async updateById(id: string, data: Partial<TourDocument>): Promise<boolean> {
    await mongo.connect();
    const result = await TourModel.findByIdAndUpdate(id, { $set: data });
    return result !== null;
  },

  async deleteById(id: string): Promise<boolean> {
    await mongo.connect();
    const result = await TourModel.findByIdAndDelete(id);
    return result !== null;
  },

  async decrementAvailableSeats(id: string): Promise<TourDocument | null> {
    await mongo.connect();
    return TourModel.findOneAndUpdate(
      { _id: id, availableSeats: { $gte: 1 } },
      { $inc: { availableSeats: -1 } },
      { new: true }
    )
      .lean<TourDocument>()
      .exec();
  },

  async incrementAvailableSeats(id: string): Promise<boolean> {
    await mongo.connect();
    const result = await TourModel.updateOne({ _id: id }, { $inc: { availableSeats: 1 } });
    return result.matchedCount > 0;
  },
};
