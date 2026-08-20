import { tourRepository } from '@/features/tours/repository/tour.repository';
import { TourDocument } from '@/features/tours/schema/tour.schema';
import { Tour } from '@/features/tours/types/tour.types';
import { CreateTourType } from '@/features/tours/validations/tour.validation';
import { PaginatedResult, ServiceResult } from '@/shared/types/common';

function toTourDTO(doc: TourDocument): Tour {
  return {
    id: doc._id.toString(),
    title: doc.title,
    description: doc.description,
    itinerary: doc.itinerary,
    price: doc.price,
    totalSeats: doc.totalSeats,
    availableSeats: doc.availableSeats,
    images: doc.images,
    meetingPoint: doc.meetingPoint,
  };
}

export async function listToursService(
  page = 1,
  limit = 20
): Promise<ServiceResult<PaginatedResult<Tour>>> {
  const { items } = await tourRepository.findAll(page, limit);
  return { data: { items: items.map(toTourDTO), page, limit }, status: 200 };
}

export async function getTourByIdService(id: string): Promise<ServiceResult<Tour>> {
  const tour = await tourRepository.findById(id);
  if (!tour) return { data: { error: 'NOT_FOUND' }, status: 404 };
  return { data: toTourDTO(tour), status: 200 };
}

export async function createTourService(
  input: CreateTourType
): Promise<ServiceResult<{ id: string }>> {
  const id = await tourRepository.create({
    title: input.title,
    description: input.description,
    itinerary: input.itinerary,
    price: input.price,
    totalSeats: input.totalSeats,
    availableSeats: input.totalSeats,
    images: input.images,
    meetingPoint: input.meetingPoint,
  });
  return { data: { id }, status: 201 };
}

export async function deleteTourService(id: string): Promise<ServiceResult<{ success: boolean }>> {
  const deleted = await tourRepository.deleteById(id);
  if (!deleted) return { data: { error: 'NOT_FOUND' }, status: 404 };
  return { data: { success: true }, status: 200 };
}
