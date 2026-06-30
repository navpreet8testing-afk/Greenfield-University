import { NextResponse } from 'next/server';

export async function GET() {
  const stats = [
    { label: 'Students Enrolled', value: 3200, suffix: '+', icon: 'GraduationCap' },
    { label: 'Faculty Members', value: 150, suffix: '+', icon: 'Users' },
    { label: 'Programs Offered', value: 25, suffix: '+', icon: 'BookOpen' },
    { label: 'Placement Rate', value: 94, suffix: '%', icon: 'TrendingUp' },
    { label: 'Research Papers', value: 450, suffix: '+', icon: 'FileText' },
    { label: 'Industry Partners', value: 80, suffix: '+', icon: 'Handshake' },
  ];
  return NextResponse.json(stats);
}