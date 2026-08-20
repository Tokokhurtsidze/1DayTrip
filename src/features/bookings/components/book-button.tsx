'use client';

import { AlertTriangle, CheckCircle2, Ticket } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { useBookTour } from '@/features/bookings/hooks/use-book-tour';
import { Tour } from '@/features/tours/types/tour.types';
import { Button } from '@/shared/components/ui/button';
import { useTranslations } from '@/shared/hooks/use-translations';

type BookButtonProps = {
  tour: Tour;
};

export function BookButton({ tour }: BookButtonProps) {
  const { data: session } = useSession();
  const { locale, t } = useTranslations();
  const { status, booking, error, book } = useBookTour();

  if (!session?.user) {
    return (
      <Button variant="outline" size="sm" asChild className="w-full">
        <Link href="/sign-in">{t.booking.signInToBook}</Link>
      </Button>
    );
  }

  if (status === 'success' && booking) {
    return (
      <div className="glass-panel animate-rise overflow-hidden rounded-lg border-primary/30 p-4">
        <div className="flex items-center gap-2 text-primary">
          <CheckCircle2 className="size-5" />
          <p className="font-heading font-semibold">{t.booking.confirmedTitle}</p>
        </div>
        <div className="mt-3 space-y-1 border-t border-white/10 pt-3 text-sm">
          <p className="text-muted-foreground">
            {t.booking.meetingPointLabel}:{' '}
            <span className="font-medium text-foreground">{tour.meetingPoint}</span>
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            {t.booking.transactionLabel}: {booking.transactionId}
          </p>
        </div>
      </div>
    );
  }

  if (status === 'sold-out') {
    return (
      <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
        <AlertTriangle className="size-4 shrink-0" />
        {t.booking.soldOut}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <Button
        size="sm"
        className="w-full font-semibold"
        disabled={status === 'booking'}
        onClick={() => book(tour, locale)}
      >
        <Ticket className="size-4" />
        {status === 'booking' ? t.booking.processing : `${t.booking.bookButton} — $${tour.price}`}
      </Button>
      {status === 'error' && (
        <p className="text-xs text-destructive">{error ?? t.booking.errorGeneric}</p>
      )}
    </div>
  );
}
