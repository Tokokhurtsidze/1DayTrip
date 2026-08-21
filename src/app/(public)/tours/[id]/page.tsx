import { notFound } from 'next/navigation';

import { TourDetail } from '@/features/tours/components/tour-detail';
import { getTourByIdService } from '@/features/tours/service/tour.service';
import { Footer } from '@/shared/components/layout/footer';
import { Header } from '@/shared/components/layout/header';

export const dynamic = 'force-dynamic';

export default async function TourDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let data;
  let status;

  try {
    const result = await getTourByIdService(id);
    data = result.data;
    status = result.status;
  } catch {
    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">
          <section className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10">
            <div className="glass-panel rounded-lg p-8 text-center text-sm text-destructive">
              Unable to load this tour right now. Please try again later.
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (status === 404 || !('id' in data)) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <TourDetail tour={data} />
      </main>
      <Footer />
    </div>
  );
}
