export type PaymentStatus = 'pending' | 'completed' | 'failed';

export type Booking = {
  id: string;
  userId: string;
  tourId: string;
  paidAmount: number;
  paymentStatus: PaymentStatus;
  transactionId?: string;
  bookingDate: string;
};
