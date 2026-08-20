import { NextRequest, NextResponse } from 'next/server';

import { getTourByIdService, deleteTourService } from '@/features/tours/service/tour.service';
import { auth } from '@/shared/lib/auth';

type SessionUser = { role?: 'admin' | 'user' };

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { data, status } = await getTourByIdService(id);
    return NextResponse.json(data, { status });
  } catch {
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    const user = session?.user as SessionUser | undefined;
    if (user?.role !== 'admin') {
      return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
    }

    const { id } = await params;
    const { data, status } = await deleteTourService(id);
    return NextResponse.json(data, { status });
  } catch {
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
