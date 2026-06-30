import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Phone number is required'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = contactSchema.parse(body);

    fetch('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: validated.subject,
        body: 'A new contact message has been received.',
        formName: 'Contact Form',
        formData: { name: validated.name, email: validated.email, phone: validated.phone, subject: validated.subject, message: validated.message },
      }),
    }).catch((err) => console.error('[contact] Email notification failed:', err));

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('[contact] Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}