import { NextRequest, NextResponse } from 'next/server';

import { createTourService, listToursService } from '@/features/tours/service/tour.service';
import { CreateTourSchema } from '@/features/tours/validations/tour.validation';
import { validateBody } from '@/shared/middleware/validate-body';
import { requireAdmin } from '@/shared/utils/auth-guard';

export async function GET(req: NextRequest) {
  try {
    const page = Number(req.nextUrl.searchParams.get('page') ?? 1);
    const limit = Number(req.nextUrl.searchParams.get('limit') ?? 20);
    const { data, status } = await listToursService(page, limit);
    return NextResponse.json(data, { status });
  } catch {
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const guard = await requireAdmin();
    if (guard instanceof NextResponse) return guard;

    const validated = await validateBody(req, CreateTourSchema);
    if (validated instanceof NextResponse) return validated;

    const { data, status } = await createTourService(validated.data);
    return NextResponse.json(data, { status });
  } catch {
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
