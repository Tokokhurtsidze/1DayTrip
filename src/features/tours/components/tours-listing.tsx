'use client';

import Image from 'next/image';

import { TourCard } from '@/features/tours/components/tour-card';
import { Tour } from '@/features/tours/types/tour.types';
import { Footer } from '@/shared/components/layout/footer';
import { Header } from '@/shared/components/layout/header';
import { useTranslations } from '@/shared/hooks/use-translations';

type ToursListingProps = {
  tours: Tour[];
  error?: string | null;
};

const BANNER_IMAGE =
  'https://images.unsplash.com/photo-1738599492207-c93f5760ea4c?auto=format&fit=crop&w=2400&q=80';

export function ToursListing({ tours }: ToursListingProps) {
  const { t } = useTranslations();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={BANNER_IMAGE}
              alt=""
              fill
              priority
              className="object-cover opacity-30"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/50" />
          </div>

          <div className="relative mx-auto w-full max-w-5xl px-6 pb-10 pt-16 sm:px-10 sm:pt-20">
            <h1 className="animate-rise text-3xl font-bold sm:text-4xl">{t.tours.pageTitle}</h1>
            <p className="animate-rise animate-rise-1 mt-2 max-w-xl text-muted-foreground">
              {t.tours.pageSubtitle}
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-6 pb-24 sm:px-10">
          {error ? (
            <div className="glass-panel rounded-lg p-8 text-center text-sm text-destructive">
              Unable to load tours right now. Please try again later.
            </div>
          ) : tours.length === 0 ? (
            <div className="glass-panel rounded-lg p-8 text-center text-sm text-muted-foreground">
              {t.tours.empty}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
