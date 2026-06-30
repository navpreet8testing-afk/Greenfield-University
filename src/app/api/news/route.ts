import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');

    const where = { published: true };

    const news = await db.news.findMany({
      where: featured === 'true' ? { ...where, featured: true } : where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error('News API error:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}