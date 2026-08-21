'use client';

import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Tour } from '@/features/tours/types/tour.types';
import { Footer } from '@/shared/components/layout/footer';
import { Header } from '@/shared/components/layout/header';
import { LocaleToggle } from '@/shared/components/layout/locale-toggle';
import { useLocale } from '@/shared/hooks/use-locale';
import { useTranslations } from '@/shared/hooks/use-translations';
import { cn } from '@/shared/lib/utils';

type TourDetailProps = {
  tour: Tour;
};

export function TourDetail({ tour }: TourDetailProps) {
  const { locale } = useLocale();
  const { t } = useTranslations();
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="grain-overlay flex-1">
        <section className="relative z-10 mx-auto w-full max-w-3xl px-6 py-16 sm:px-10">
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            {t.tours.backToTours}
          </Link>

          <div className="relative mt-6 h-72 w-full overflow-hidden rounded-lg sm:h-96">
            <Image
              src={tour.images[activeImage]}
              alt={tour.title[locale]}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          {tour.images.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {tour.images.map((image, index) => (
                <button
                  key={image.slice(0, 32) + index}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`Photo ${index + 1}`}
                  className={cn(
                    'relative size-16 shrink-0 overflow-hidden rounded-md border-2 transition-all',
                    index === activeImage
                      ? 'border-primary shadow-md shadow-primary/30'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  )}
                >
                  <Image src={image} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
            <h1 className="font-heading text-3xl font-bold sm:text-4xl">{tour.title[locale]}</h1>
            <LocaleToggle />
          </div>

          <div className="mt-3 flex items-center gap-4">
            <span className="font-mono text-xl font-semibold text-primary">${tour.price}</span>
            <span className="text-sm text-muted-foreground">
              {tour.availableSeats}/{tour.totalSeats} {t.tours.seatsLeft}
            </span>
          </div>

          <p className="mt-6 leading-relaxed text-muted-foreground">{tour.description[locale]}</p>

          <div className="glass-panel mt-8 rounded-lg p-6">
            <h2 className="font-heading text-lg font-semibold">{t.tours.itineraryHeading}</h2>
            <p className="mt-2 whitespace-pre-line leading-relaxed text-muted-foreground">
              {tour.itinerary[locale]}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
