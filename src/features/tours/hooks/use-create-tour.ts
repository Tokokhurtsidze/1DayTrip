'use client';

import { useState } from 'react';

import { CreateTourType } from '@/features/tours/validations/tour.validation';
import { http } from '@/shared/lib/http';

export function useCreateTour() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createTour = async (data: CreateTourType) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await http.post('/tours', data);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create tour');
    } finally {
      setLoading(false);
    }
  };

  return { createTour, loading, error, success };
}
