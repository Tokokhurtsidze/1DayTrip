import { z } from 'zod';

import { LOCALES } from '@/shared/const/locale.const';

export const CreateBookingSchema = z.object({
  tourId: z.string().min(24).max(24),
  paidAmount: z.number().positive(),
});

export type CreateBookingType = z.infer<typeof CreateBookingSchema>;

export const CompleteBookingSchema = z.object({
  transactionId: z.string().min(1),
  locale: z.enum(LOCALES).optional(),
});

export type CompleteBookingType = z.infer<typeof CompleteBookingSchema>;
