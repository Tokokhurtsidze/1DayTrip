import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/shared/lib/mongo', () => ({
  mongo: { connect: vi.fn() },
}));

vi.mock('@/features/bookings/schema/booking.schema', () => ({
  BookingModel: {
    findById: vi.fn(),
    find: vi.fn(),
    create: vi.fn(),
    findByIdAndUpdate: vi.fn(),
  },
}));

import { BookingModel } from '@/features/bookings/schema/booking.schema';
import { mongo } from '@/shared/lib/mongo';

import { bookingRepository } from './booking.repository';

const mockMongo = vi.mocked(mongo);
const mockModel = vi.mocked(BookingModel);

function makeLeanQuery<T>(result: T) {
  return { lean: () => ({ exec: () => Promise.resolve(result) }) };
}

describe('bookingRepository', () => {
  beforeEach(() => vi.clearAllMocks());

  it('findById connects and calls findById', async () => {
    (mockModel.findById as ReturnType<typeof vi.fn>).mockReturnValueOnce(
      makeLeanQuery({ _id: 'b1', paymentStatus: 'pending' })
    );
    const result = await bookingRepository.findById('b1');
    expect(mockMongo.connect).toHaveBeenCalled();
    expect(result).toEqual({ _id: 'b1', paymentStatus: 'pending' });
  });

  it('create calls model.create and returns id string', async () => {
    (mockModel.create as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      _id: { toString: () => 'b1' },
    });
    const id = await bookingRepository.create({
      userId: 'u1',
      tourId: 't1',
      paidAmount: 100,
      paymentStatus: 'pending',
      bookingDate: new Date(),
    });
    expect(id).toBe('b1');
  });

  it('updateById returns true when the document is found', async () => {
    (mockModel.findByIdAndUpdate as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ _id: 'b1' });
    const result = await bookingRepository.updateById('b1', { paymentStatus: 'completed' });
    expect(result).toBe(true);
  });
});
