'use client';

import { useState } from 'react';

import { Booking } from '@/features/bookings/types/booking.types';
import { Tour } from '@/features/tours/types/tour.types';
import { Locale } from '@/shared/const/locale.const';
import { http } from '@/shared/lib/http';

type BookingStatus = 'idle' | 'booking' | 'success' | 'sold-out' | 'error';

type HttpError = {
  message: string;
  status: number;
};

export function useBookTour() {
  const [status, setStatus] = useState<BookingStatus>('idle');
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);

  const book = async (tour: Tour, locale: Locale) => {
    setStatus('booking');
    setError(null);
    try {
      const created = await http.post<Booking>('/bookings', {
        tourId: tour.id,
        paidAmount: tour.price,
      });
      const transactionId = crypto.randomUUID();
      const completed = await http.post<Booking>(`/bookings/${created.id}/complete`, {
        transactionId,
        locale,
      });
      setBooking(completed);
      setStatus('success');
    } catch (err) {
      const httpError = err as HttpError;
      if (httpError.status === 409) {
        setStatus('sold-out');
      } else {
        setError(httpError.message);
        setStatus('error');
      }
    }
  };

  return { status, booking, error, book };
}
