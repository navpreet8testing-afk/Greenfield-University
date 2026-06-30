import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const faculty = await db.faculty.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json(faculty);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch faculty' }, { status: 500 });
  }
}