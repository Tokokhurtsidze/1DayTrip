import { ToursListing } from '@/features/tours/components/tours-listing';
import { listToursService } from '@/features/tours/service/tour.service';

export const dynamic = 'force-dynamic';

async function getTours() {
  try {
    const { data } = await listToursService(1, 50);
    return 'items' in data ? data.items : [];
  } catch {
    return [];
  }
}

export default async function ToursPage() {
  const tours = await getTours();
  return <ToursListing tours={tours} />;
}
