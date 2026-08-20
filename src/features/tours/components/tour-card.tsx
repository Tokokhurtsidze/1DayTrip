'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Tour } from '@/features/tours/types/tour.types';
import { LocaleToggle } from '@/shared/components/layout/locale-toggle';
import { useLocale } from '@/shared/hooks/use-locale';
import { cn } from '@/shared/lib/utils';

type TourCardProps = {
  tour: Tour;
};

export function TourCard({ tour }: TourCardProps) {
  const { locale } = useLocale();

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg border border-border bg-card',
        'transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg'
      )}
    >
      <div className="absolute right-2 top-2 z-10 rounded-full bg-background/80 backdrop-blur-sm">
        <LocaleToggle />
      </div>

      <Link href={`/tours/${tour.id}`} className="block">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={tour.images[0]}
            alt={tour.title[locale]}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        <div className="space-y-2 p-4">
          <h3 className="font-heading text-lg font-semibold text-card-foreground">
            {tour.title[locale]}
          </h3>

          <p className="line-clamp-2 text-sm text-muted-foreground">{tour.description[locale]}</p>

          <div className="flex items-center justify-between pt-2">
            <span className="font-mono text-base font-semibold text-primary">${tour.price}</span>
            <span className="text-sm text-muted-foreground">
              {tour.availableSeats}/{tour.totalSeats} seats left
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
