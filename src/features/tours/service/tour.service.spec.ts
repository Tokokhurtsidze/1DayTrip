import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/features/tours/repository/tour.repository', () => ({
  tourRepository: {
    findAll: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
  },
}));

import { tourRepository } from '@/features/tours/repository/tour.repository';

import { createTourService, getTourByIdService, listToursService } from './tour.service';

const mockRepo = vi.mocked(tourRepository);

const input = {
  title: { ka: 'ტური', en: 'Tour' },
  description: { ka: 'აღწერა', en: 'Description' },
  itinerary: { ka: 'გეგმა', en: 'Itinerary' },
  price: 150,
  totalSeats: 20,
  images: ['img.jpg'],
  meetingPoint: 'Freedom Square',
};

describe('createTourService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('sets availableSeats equal to totalSeats on creation', async () => {
    mockRepo.create.mockResolvedValueOnce('tour1');
    await createTourService(input);
    expect(mockRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({ totalSeats: 20, availableSeats: 20 })
    );
  });

  it('returns 201 with the new tour id', async () => {
    mockRepo.create.mockResolvedValueOnce('tour1');
    const result = await createTourService(input);
    expect(result).toEqual({ data: { id: 'tour1' }, status: 201 });
  });
});

describe('getTourByIdService', () => {
  it('returns 404 when the tour does not exist', async () => {
    mockRepo.findById.mockResolvedValueOnce(null);
    const result = await getTourByIdService('missing');
    expect(result.status).toBe(404);
  });
});

describe('listToursService', () => {
  it('returns a paginated list', async () => {
    mockRepo.findAll.mockResolvedValueOnce({ items: [] });
    const result = await listToursService(1, 20);
    expect(result).toEqual({ data: { items: [], page: 1, limit: 20 }, status: 200 });
  });
});
