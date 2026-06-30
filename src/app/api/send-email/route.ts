import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/* ── Security: HTML entity escaping ─────────────────────────────── */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ── Lazy transporter (reads env vars per-request, not at module load) ── */
let _transporter: ReturnType<typeof nodemailer.createTransport> | null = null;
function getTransporter() {
  if (_transporter) return { transporter: _transporter, user: process.env.GMAIL_USER! };
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (user && pass) {
    _transporter = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } });
    return { transporter: _transporter, user };
  }
  return null;
}

/* ── In-memory rate limiter (simple per-IP bucket) ─────────────── */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3; // max 3 sends per window per IP

/* ── Request interface (no `to` field) ──────────────────────────── */
interface SendEmailRequest {
  subject: string;
  body: string;
  formName: string;
  formData: Record<string, string>;
}

export async function POST(request: Request) {
  try {
    /* ── Guard: env vars configured ── */
    const adminEmail = 'navpreet8testing@gmail.com';
    const creds = getTransporter();
    if (!creds || !adminEmail) {
      console.error('[send-email] Missing GMAIL_USER, GMAIL_APP_PASSWORD, or ADMIN_EMAIL env vars');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    /* ── Guard: rate limiting ── */
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const now = Date.now();
    const bucket = rateLimitMap.get(ip);
    if (bucket && now < bucket.resetAt && bucket.count >= RATE_LIMIT_MAX) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }
    if (bucket && now >= bucket.resetAt) {
      rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    } else if (bucket) {
      bucket.count += 1;
    } else {
      rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    }

    /* ── Parse & validate body ── */
    const body: SendEmailRequest = await request.json();
    const { subject, body: emailBody, formName, formData } = body;

    if (!subject || !formData || Object.keys(formData).length === 0) {
      return NextResponse.json({ error: 'Missing required fields: subject, formData' }, { status: 400 });
    }

    /* ── Build HTML with escaped values ── */
    const safeSubject = escapeHtml(subject);
    const safeFormName = escapeHtml(formName || 'Form');
    const safeBody = escapeHtml(emailBody || '');

    const formDataHtml = Object.entries(formData)
      .map(
        ([key, value]) =>
          `<tr><td style="padding:8px 16px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;">${escapeHtml(key)}</td><td style="padding:8px 16px;border:1px solid #e5e7eb;">${escapeHtml(value)}</td></tr>`
      )
      .join('');

    const htmlContent = `
        <div style="font-family:'Segoe UI',system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
          <div style="background:#065f46;color:white;padding:20px 24px;border-radius:12px 12px 0 0;">
            <h2 style="margin:0;font-size:20px;">${safeSubject}</h2>
            <p style="margin:4px 0 0;opacity:0.8;font-size:14px;">Form: ${safeFormName}</p>
          </div>
          <div style="padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
            <p style="margin:0 0 16px;color:#374151;font-size:14px;">${safeBody}</p>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <thead>
                <tr style="background:#065f46;color:white;">
                  <th style="padding:10px 16px;text-align:left;border-radius:8px 0 0 0;">Field</th>
                  <th style="padding:10px 16px;text-align:left;border-radius:0 8px 0 0;">Value</th>
                </tr>
              </thead>
              <tbody>${formDataHtml}</tbody>
            </table>
            <p style="margin:20px 0 0;font-size:12px;color:#9ca3af;">This email was sent automatically from the Greenfield University website.</p>
          </div>
        </div>
      `;

    /* ── Send to fixed ADMIN_EMAIL only ── */
    await creds.transporter.sendMail({
      from: creds.user,
      to: adminEmail,
      subject: `[Greenfield University] ${safeSubject}`,
      html: htmlContent,
    });

    console.log(`[send-email] Email sent successfully to ${adminEmail}`);
    return NextResponse.json({ success: true, message: 'Email sent' });
  } catch (error) {
    console.error('[send-email] Error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}