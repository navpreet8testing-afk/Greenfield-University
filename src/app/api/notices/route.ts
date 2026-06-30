import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const notices = await db.notice.findMany({
      orderBy: { date: 'desc' },
    });
    return NextResponse.json(notices);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch notices' }, { status: 500 });
  }
}