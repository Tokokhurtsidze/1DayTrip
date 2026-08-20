import { notFound } from 'next/navigation';

import { TourDetail } from '@/features/tours/components/tour-detail';
import { getTourByIdService } from '@/features/tours/service/tour.service';

export const dynamic = 'force-dynamic';

export default async function TourDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, status } = await getTourByIdService(id);

  if (status === 404 || !('id' in data)) notFound();

  return <TourDetail tour={data} />;
}
