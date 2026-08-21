import { userRepository } from '@/features/auth/repository/user.repository';
import { bookingRepository } from '@/features/bookings/repository/booking.repository';
import { BookingDocument } from '@/features/bookings/schema/booking.schema';
import { Booking } from '@/features/bookings/types/booking.types';
import { CreateBookingType } from '@/features/bookings/validations/booking.validation';
import { tourRepository } from '@/features/tours/repository/tour.repository';
import { DEFAULT_LOCALE, Locale } from '@/shared/const/locale.const';
import { mailer } from '@/shared/lib/mailer';
import { ServiceResult } from '@/shared/types/common';

function toBookingDTO(doc: BookingDocument): Booking {
  return {
    id: doc._id.toString(),
    userId: doc.userId.toString(),
    tourId: doc.tourId.toString(),
    paidAmount: doc.paidAmount,
    paymentStatus: doc.paymentStatus as Booking['paymentStatus'],
    transactionId: doc.transactionId ?? undefined,
    bookingDate: doc.bookingDate.toISOString(),
  };
}

export async function createBookingService(
  userId: string,
  input: CreateBookingType
): Promise<ServiceResult<Booking>> {
  const tour = await tourRepository.findById(input.tourId);
  if (!tour) return { data: { error: 'TOUR_NOT_FOUND' }, status: 404 };
  if (tour.availableSeats < 1) return { data: { error: 'SOLD_OUT' }, status: 409 };

  const id = await bookingRepository.create({
    userId,
    tourId: input.tourId,
    paidAmount: input.paidAmount,
    paymentStatus: 'pending',
    bookingDate: new Date(),
  });

  const booking = await bookingRepository.findById(id);
  return { data: toBookingDTO(booking!), status: 201 };
}

export async function completeBookingService(
  bookingId: string,
  transactionId: string,
  locale: Locale = DEFAULT_LOCALE
): Promise<ServiceResult<Booking>> {
  const booking = await bookingRepository.findById(bookingId);
  if (!booking) return { data: { error: 'BOOKING_NOT_FOUND' }, status: 404 };
  if (booking.paymentStatus === 'completed') {
    return { data: toBookingDTO(booking), status: 200 };
  }

  // Atomic decrement — the availableSeats >= 1 filter guarantees overlapping
  // requests can never push a tour's seat count below zero.
  const tour = await tourRepository.decrementAvailableSeats(booking.tourId.toString());
  if (!tour) {
    await bookingRepository.updateById(bookingId, { paymentStatus: 'failed' });
    return { data: { error: 'SOLD_OUT' }, status: 409 };
  }

  await bookingRepository.updateById(bookingId, { paymentStatus: 'completed', transactionId });

  const user = await userRepository.findById(booking.userId.toString());
  if (user) {
    try {
      await mailer.sendBookingConfirmationEmail(
        user.email,
        {
          tourTitle: tour.title[locale],
          bookingDate: booking.bookingDate.toISOString(),
          paidAmount: booking.paidAmount,
          transactionId,
          meetingPoint: tour.meetingPoint,
        },
        locale
      );
    } catch {
      // email sending is best-effort; do not block booking completion
    }
  }

  const updated = await bookingRepository.findById(bookingId);
  return { data: toBookingDTO(updated!), status: 200 };
}
