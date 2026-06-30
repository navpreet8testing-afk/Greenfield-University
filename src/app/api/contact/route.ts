import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Phone number is required'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

/* ── Lazy Gmail transporter ── */
let _transporter: ReturnType<typeof nodemailer.createTransport> | null = null;
function getTransporter() {
  if (_transporter) return _transporter;
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (user && pass) {
    _transporter = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } });
    return _transporter;
  }
  return null;
}

/* ── Send admin email for contact form ── */
async function sendContactEmail(data: z.infer<typeof contactSchema>) {
  const adminEmail = 'navpreet8testing@gmail.com';
  const transporter = getTransporter();
  const gmailUser = process.env.GMAIL_USER;
  if (!transporter || !adminEmail || !gmailUser) {
    throw new Error('Email service not configured: missing GMAIL_USER or GMAIL_APP_PASSWORD');
  }

  function esc(s: string) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  const html = `
    <div style="font-family:'Segoe UI',system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
      <div style="background:#065f46;color:white;padding:20px 24px;border-radius:12px 12px 0 0;">
        <h2 style="margin:0;font-size:20px;">New Contact Message</h2>
        <p style="margin:4px 0 0;opacity:0.8;font-size:14px;">Form: Contact Form</p>
      </div>
      <div style="padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
        <p style="margin:0 0 16px;color:#374151;font-size:14px;">A new contact message has been received.</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead><tr style="background:#065f46;color:white;">
            <th style="padding:10px 16px;text-align:left;border-radius:8px 0 0 0;">Field</th>
            <th style="padding:10px 16px;text-align:left;border-radius:0 8px 0 0;">Value</th>
          </tr></thead>
          <tbody>
            <tr><td style="padding:8px 16px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;">Name</td><td style="padding:8px 16px;border:1px solid #e5e7eb;">${esc(data.name)}</td></tr>
            <tr><td style="padding:8px 16px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;">Email</td><td style="padding:8px 16px;border:1px solid #e5e7eb;">${esc(data.email)}</td></tr>
            <tr><td style="padding:8px 16px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;">Phone</td><td style="padding:8px 16px;border:1px solid #e5e7eb;">${esc(data.phone)}</td></tr>
            <tr><td style="padding:8px 16px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;">Subject</td><td style="padding:8px 16px;border:1px solid #e5e7eb;">${esc(data.subject)}</td></tr>
            <tr><td style="padding:8px 16px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;">Message</td><td style="padding:8px 16px;border:1px solid #e5e7eb;">${esc(data.message)}</td></tr>
          </tbody>
        </table>
        <p style="margin:20px 0 0;font-size:12px;color:#9ca3af;">This email was sent automatically from the Greenfield University website.</p>
      </div>
    </div>`;

  await transporter.sendMail({
    from: gmailUser,
    to: adminEmail,
    subject: '[Greenfield University] New Contact Message',
    html,
  });

  console.log(`[contact] Email sent successfully to ${adminEmail}`);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = contactSchema.parse(body);

    // Send admin email (awaited - fail if email fails)
    await sendContactEmail(validated);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('[contact] Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}