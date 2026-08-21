import { ToursListing } from '@/features/tours/components/tours-listing';
import { listToursService } from '@/features/tours/service/tour.service';

export const dynamic = 'force-dynamic';

async function getTours() {
  try {
    const { data, status } = await listToursService(1, 50);
    if (status !== 200 || !('items' in data)) return { items: [], error: null };
    return { items: data.items, error: null };
  } catch {
    return { items: [], error: 'LOAD_FAILED' };
  }
}

export default async function ToursPage() {
  const { items, error } = await getTours();
  return <ToursListing tours={items} error={error} />;
}
