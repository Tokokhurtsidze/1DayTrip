import { NextRequest, NextResponse } from 'next/server';

import { createBookingService } from '@/features/bookings/service/booking.service';
import { CreateBookingSchema } from '@/features/bookings/validations/booking.validation';
import { validateBody } from '@/shared/middleware/validate-body';
import { requireUser } from '@/shared/utils/auth-guard';

export async function POST(req: NextRequest) {
  try {
    const guard = await requireUser();
    if (guard instanceof NextResponse) return guard;

    const validated = await validateBody(req, CreateBookingSchema);
    if (validated instanceof NextResponse) return validated;

    const { data, status } = await createBookingService(guard.user.id, validated.data);
    return NextResponse.json(data, { status });
  } catch {
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
