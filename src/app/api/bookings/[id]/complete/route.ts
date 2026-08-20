import { NextRequest, NextResponse } from 'next/server';

import { completeBookingService } from '@/features/bookings/service/booking.service';
import { CompleteBookingSchema } from '@/features/bookings/validations/booking.validation';
import { validateBody } from '@/shared/middleware/validate-body';
import { requireUser } from '@/shared/utils/auth-guard';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const guard = await requireUser();
    if (guard instanceof NextResponse) return guard;

    const { id } = await params;
    const validated = await validateBody(req, CompleteBookingSchema);
    if (validated instanceof NextResponse) return validated;

    const { data, status } = await completeBookingService(
      id,
      validated.data.transactionId,
      validated.data.locale
    );
    return NextResponse.json(data, { status });
  } catch {
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
