import { NextResponse } from 'next/server';
import { mongo } from '@/shared/lib/mongo';

export async function GET() {
  let mongoStatus: 'connected' | 'disconnected' | 'error' = 'disconnected';
  try {
    await mongo.connect();
    mongoStatus = 'connected';
  } catch {
    mongoStatus = 'error';
  }

  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    mongo: mongoStatus,
  });
}
