import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const applicationSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  program: z.string().min(1, 'Please select a program'),
  previousQualification: z.string().optional(),
  message: z.string().optional(),
  documentRef: z.string().optional(),
  pdfBase64: z.string().optional(),
  pdfFileName: z.string().optional(),
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

/* ── Send admin email with optional PDF attachment ── */
async function sendAdminEmail(
  data: Record<string, string>,
  pdfBase64?: string,
  pdfFileName?: string,
  documentRef?: string,
) {
  const adminEmail = 'navpreet8testing@gmail.com';
  const transporter = getTransporter();
  const gmailUser = process.env.GMAIL_USER;
  if (!transporter || !adminEmail || !gmailUser) {
    throw new Error('Email service not configured: missing GMAIL_USER or GMAIL_APP_PASSWORD');
  }

  function esc(s: string) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  const rows = Object.entries(data)
    .filter(([k]) => k !== 'documentRef' && k !== 'pdfBase64' && k !== 'pdfFileName')
    .map(([k, v]) => `<tr><td style="padding:8px 16px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;">${esc(k)}</td><td style="padding:8px 16px;border:1px solid #e5e7eb;">${esc(v)}</td></tr>`)
    .join('');

  const html = `
    <div style="font-family:'Segoe UI',system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
      <div style="background:#065f46;color:white;padding:20px 24px;border-radius:12px 12px 0 0;">
        <h2 style="margin:0;font-size:20px;">New Admission Application</h2>
        <p style="margin:4px 0 0;opacity:0.8;font-size:14px;">Form: Admission Application</p>
      </div>
      <div style="padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
        <p style="margin:0 0 16px;color:#374151;font-size:14px;">A new admission application has been submitted.</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead><tr style="background:#065f46;color:white;">
            <th style="padding:10px 16px;text-align:left;border-radius:8px 0 0 0;">Field</th>
            <th style="padding:10px 16px;text-align:left;border-radius:0 8px 0 0;">Value</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
        <p style="margin:20px 0 0;font-size:12px;color:#9ca3af;">This email was sent automatically from the Greenfield University website.</p>
      </div>
    </div>`;

  const mailOptions: nodemailer.SendMailOptions = {
    from: gmailUser,
    to: adminEmail,
    subject: '[Greenfield University] New Admission Application',
    html,
  };

  /* ── Priority 1: Base64 PDF sent directly from frontend ── */
  if (pdfBase64) {
    try {
      // Strip data URL prefix if present (e.g. "data:application/pdf;base64,XXXXX")
      const base64Data = pdfBase64.includes(',')
        ? pdfBase64.split(',')[1]
        : pdfBase64;
      const buffer = Buffer.from(base64Data, 'base64');
      const fileName = pdfFileName || 'application.pdf';
      mailOptions.attachments = [{
        filename: fileName,
        content: buffer,
        contentType: 'application/pdf',
      }];
      console.log(`[applications] PDF attached from base64: ${fileName} (${(buffer.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.warn('[applications] Failed to decode base64 PDF:', err);
    }
  }
  /* ── Priority 2: Download from Supabase storage (legacy) ── */
  else if (documentRef) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (supabaseUrl && supabaseAnonKey) {
        const { createClient } = await import('@supabase/supabase-js');
        const sb = createClient(supabaseUrl, supabaseAnonKey);
        const { data: fileData, error } = await sb.storage.from('documents').download(documentRef);
        if (!error && fileData) {
          const buffer = Buffer.from(await fileData.arrayBuffer());
          const fileName = documentRef.split('/').pop() || 'document.pdf';
          mailOptions.attachments = [{
            filename: fileName,
            content: buffer,
            contentType: 'application/pdf',
          }];
          console.log(`[applications] PDF attached from Supabase: ${fileName} (${(buffer.length / 1024).toFixed(1)} KB)`);
        } else {
          console.warn('[applications] Could not download PDF from Supabase:', error?.message);
        }
      }
    } catch (err) {
      console.warn('[applications] PDF attachment from Supabase failed:', err);
    }
  }

  await transporter.sendMail(mailOptions);
  console.log(`[applications] Email sent to ${adminEmail}${mailOptions.attachments ? ' (with PDF attachment)' : ''}`);
}

export async function GET() {
  try {
    const applications = await db.application.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return NextResponse.json(applications);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = applicationSchema.parse(body);

    // Save to DB (exclude file fields — not in schema)
    const { pdfBase64, pdfFileName, documentRef, ...dbData } = validated;
    const application = await db.application.create({
      data: dbData,
    });

    // Send admin email with form data + PDF attachment (awaited - fail if email fails)
    await sendAdminEmail(
      validated as unknown as Record<string, string>,
      pdfBase64,
      pdfFileName,
      validated.documentRef,
    );

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error('[applications] Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}