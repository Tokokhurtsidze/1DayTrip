import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/features/bookings/repository/booking.repository', () => ({
  bookingRepository: {
    findById: vi.fn(),
    create: vi.fn(),
    updateById: vi.fn(),
  },
}));

vi.mock('@/features/tours/repository/tour.repository', () => ({
  tourRepository: {
    findById: vi.fn(),
    decrementAvailableSeats: vi.fn(),
  },
}));

vi.mock('@/features/auth/repository/user.repository', () => ({
  userRepository: {
    findById: vi.fn(),
  },
}));

vi.mock('@/shared/lib/mailer', () => ({
  mailer: {
    sendBookingConfirmationEmail: vi.fn(),
  },
}));

import { userRepository } from '@/features/auth/repository/user.repository';
import { bookingRepository } from '@/features/bookings/repository/booking.repository';
import { tourRepository } from '@/features/tours/repository/tour.repository';
import { mailer } from '@/shared/lib/mailer';

import { completeBookingService, createBookingService } from './booking.service';

const mockBookingRepo = vi.mocked(bookingRepository);
const mockTourRepo = vi.mocked(tourRepository);
const mockUserRepo = vi.mocked(userRepository);
const mockMailer = vi.mocked(mailer);

const pendingBooking = {
  _id: { toString: () => 'b1' },
  userId: { toString: () => 'u1' },
  tourId: { toString: () => 't1' },
  paidAmount: 100,
  paymentStatus: 'pending' as const,
  transactionId: undefined,
  bookingDate: new Date('2026-07-10T09:00:00.000Z'),
};

describe('createBookingService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns 404 when the tour does not exist', async () => {
    mockTourRepo.findById.mockResolvedValueOnce(null);
    const result = await createBookingService('u1', { tourId: 't1', paidAmount: 100 });
    expect(result.status).toBe(404);
  });

  it('returns 409 when the tour is sold out', async () => {
    mockTourRepo.findById.mockResolvedValueOnce({ availableSeats: 0 } as never);
    const result = await createBookingService('u1', { tourId: 't1', paidAmount: 100 });
    expect(result.status).toBe(409);
  });
});

describe('completeBookingService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns 409 and marks the booking failed when no seats remain (atomic decrement fails)', async () => {
    mockBookingRepo.findById.mockResolvedValueOnce(pendingBooking as never);
    mockTourRepo.decrementAvailableSeats.mockResolvedValueOnce(null);

    const result = await completeBookingService('b1', 'tx_123');

    expect(mockTourRepo.decrementAvailableSeats).toHaveBeenCalledWith('t1');
    expect(mockBookingRepo.updateById).toHaveBeenCalledWith('b1', { paymentStatus: 'failed' });
    expect(result.status).toBe(409);
    expect(mockMailer.sendBookingConfirmationEmail).not.toHaveBeenCalled();
  });

  it('completes the booking, decrements seats once, and emails the meeting point', async () => {
    mockBookingRepo.findById
      .mockResolvedValueOnce(pendingBooking as never)
      .mockResolvedValueOnce({ ...pendingBooking, paymentStatus: 'completed', transactionId: 'tx_123' } as never);
    mockTourRepo.decrementAvailableSeats.mockResolvedValueOnce({
      title: { en: 'Kazbegi Day Trip', ka: 'ყაზბეგი' },
      meetingPoint: 'Freedom Square, 9:00 AM',
    } as never);
    mockUserRepo.findById.mockResolvedValueOnce({ email: 'alice@example.com' } as never);

    const result = await completeBookingService('b1', 'tx_123');

    expect(mockBookingRepo.updateById).toHaveBeenCalledWith('b1', {
      paymentStatus: 'completed',
      transactionId: 'tx_123',
    });
    expect(mockMailer.sendBookingConfirmationEmail).toHaveBeenCalledWith(
      'alice@example.com',
      expect.objectContaining({ meetingPoint: 'Freedom Square, 9:00 AM' }),
      'en'
    );
    expect(result.status).toBe(200);
  });

  it('is idempotent when the booking is already completed', async () => {
    mockBookingRepo.findById.mockResolvedValueOnce({
      ...pendingBooking,
      paymentStatus: 'completed',
    } as never);

    const result = await completeBookingService('b1', 'tx_123');

    expect(mockTourRepo.decrementAvailableSeats).not.toHaveBeenCalled();
    expect(result.status).toBe(200);
  });
});
