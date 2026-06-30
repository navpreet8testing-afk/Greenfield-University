import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const programs = await db.program.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json(programs);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch programs' }, { status: 500 });
  }
}