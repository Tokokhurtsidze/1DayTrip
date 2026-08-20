'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Tour } from '@/features/tours/types/tour.types';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

type ToursManagerProps = {
  initialTours: Tour[];
};

export const ToursManager = ({ initialTours }: ToursManagerProps) => {
  const [tours, setTours] = useState<Tour[]>(initialTours);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tour?')) return;
    
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/tours/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTours(tours.filter(t => t.id !== id));
        router.refresh();
      } else {
        alert('Failed to delete tour');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    } finally {
      setIsDeleting(null);
    }
  };

  if (tours.length === 0) {
    return <p className="text-muted-foreground">No tours available.</p>;
  }

  return (
    <Card className="animate-rise animate-rise-1">
      <CardHeader>
        <CardTitle className="text-base">All Tours</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col divide-y divide-border">
          {tours.map((tour) => (
            <li
              key={tour.id}
              className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{tour.title.en}</p>
                  <p className="truncate text-xs text-muted-foreground">Price: ${tour.price} • Seats: {tour.availableSeats} / {tour.totalSeats}</p>
                </div>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(tour.id)}
                disabled={isDeleting === tour.id}
                aria-label="Delete tour"
              >
                <Trash2 className="size-4" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
