import { ToursManager } from '@/features/dashboard/components/tours-manager';
import { listToursService } from '@/features/tours/service/tour.service';

export default async function ToursPage() {
  const { data } = await listToursService(1, 100);
  const items = data && 'items' in data ? data.items : [];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <header className="animate-rise flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Manage Tours</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View and delete added tours.
          </p>
        </div>
      </header>
      <ToursManager initialTours={items} />
    </div>
  );
}
