import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/shared/lib/mongo', () => ({
  mongo: { connect: vi.fn() },
}));

vi.mock('@/features/tours/schema/tour.schema', () => ({
  TourModel: {
    find: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    findByIdAndUpdate: vi.fn(),
    findByIdAndDelete: vi.fn(),
    findOneAndUpdate: vi.fn(),
    updateOne: vi.fn(),
  },
}));

import { TourModel } from '@/features/tours/schema/tour.schema';
import { mongo } from '@/shared/lib/mongo';

import { tourRepository } from './tour.repository';

const mockMongo = vi.mocked(mongo);
const mockModel = vi.mocked(TourModel);

function makeLeanQuery<T>(result: T) {
  return { lean: () => ({ exec: () => Promise.resolve(result) }) };
}

describe('tourRepository', () => {
  beforeEach(() => vi.clearAllMocks());

  it('decrementAvailableSeats issues an atomic findOneAndUpdate guarded by availableSeats >= 1', async () => {
    (mockModel.findOneAndUpdate as ReturnType<typeof vi.fn>).mockReturnValueOnce(
      makeLeanQuery({ _id: 'tour1', availableSeats: 4 })
    );

    const result = await tourRepository.decrementAvailableSeats('tour1');

    expect(mockMongo.connect).toHaveBeenCalled();
    expect(mockModel.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: 'tour1', availableSeats: { $gte: 1 } },
      { $inc: { availableSeats: -1 } },
      { new: true }
    );
    expect(result).toEqual({ _id: 'tour1', availableSeats: 4 });
  });

  it('decrementAvailableSeats returns null when no seats remain', async () => {
    (mockModel.findOneAndUpdate as ReturnType<typeof vi.fn>).mockReturnValueOnce(makeLeanQuery(null));
    const result = await tourRepository.decrementAvailableSeats('tour1');
    expect(result).toBeNull();
  });

  it('create calls model.create and returns id string', async () => {
    (mockModel.create as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      _id: { toString: () => 'tour1' },
    });
    const id = await tourRepository.create({
      title: { ka: 'title', en: 'title' },
      description: { ka: 'desc', en: 'desc' },
      itinerary: { ka: 'itin', en: 'itin' },
      price: 100,
      totalSeats: 10,
      availableSeats: 10,
      images: ['img.jpg'],
      meetingPoint: 'Square',
    });
    expect(id).toBe('tour1');
  });
});
