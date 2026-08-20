import { NextResponse } from 'next/server';

import { auth } from '@/shared/lib/auth';

type SessionUser = { id: string; role: 'user' | 'admin'; email: string; name: string };

export async function requireAdmin(): Promise<{ user: SessionUser } | NextResponse> {
  const session = await auth();
  const user = session?.user as SessionUser | undefined;

  if (!user) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
  }
  if (user.role !== 'admin') {
    return NextResponse.json({ error: 'FORBIDDEN' }, { status: 403 });
  }
  return { user };
}

export async function requireUser(): Promise<{ user: SessionUser } | NextResponse> {
  const session = await auth();
  const user = session?.user as SessionUser | undefined;

  if (!user) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
  }
  return { user };
}
