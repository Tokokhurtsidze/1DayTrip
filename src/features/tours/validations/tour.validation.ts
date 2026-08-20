import { z } from 'zod';

export const MAX_TOUR_IMAGES = 6;
export const MAX_IMAGE_SIZE_MB = 1.8;

export const LocalizedTextSchema = z.object({
  ka: z.string().min(1),
  en: z.string().min(1),
});

export const CreateTourSchema = z.object({
  title: LocalizedTextSchema,
  description: LocalizedTextSchema,
  itinerary: LocalizedTextSchema,
  price: z.number().positive(),
  totalSeats: z.number().int().positive(),
  images: z.array(z.string().min(1)).min(1).max(MAX_TOUR_IMAGES),
  meetingPoint: z.string().min(1),
});

export type CreateTourType = z.infer<typeof CreateTourSchema>;
