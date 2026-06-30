import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateOtp, setOtp } from '@/lib/otp-store';

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    const code = generateOtp();
    setOtp(email, code);

    const htmlBody = `
      <div style="font-family:'Segoe UI',system-ui,sans-serif;max-width:480px;margin:0 auto;padding:24px;">
        <div style="background:#065f46;color:white;padding:20px 24px;border-radius:12px 12px 0 0;text-align:center;">
          <h2 style="margin:0;font-size:20px;">Greenfield University</h2>
          <p style="margin:4px 0 0;opacity:0.8;font-size:14px;">Email Verification</p>
        </div>
        <div style="padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;text-align:center;">
          <p style="margin:0 0 16px;color:#374151;font-size:14px;">Your verification code is:</p>
          <div style="font-size:32px;font-weight:bold;letter-spacing:8px;color:#065f46;margin:16px 0;">${code}</div>
          <p style="margin:16px 0 0;font-size:13px;color:#6b7280;">This code expires in 5 minutes. Do not share it with anyone.</p>
          <p style="margin:12px 0 0;font-size:12px;color:#9ca3af;">If you did not request this code, please ignore this email.</p>
        </div>
      </div>
    `;

    /* ── Send OTP via Gmail SMTP ── */
    const creds = getTransporter();
    if (creds) {
      try {
        await creds.transporter.sendMail({
          from: `"Greenfield University" <${creds.user}>`,
          to: email,
          subject: 'Greenfield University — Your Verification Code',
          text: `Greenfield University\n\nYour verification code is: ${code}\n\nThis code expires in 5 minutes.\n\n— Greenfield University`,
          html: htmlBody,
        });
        console.log(`[send-otp] OTP email sent to ${email}, code: ${code}`);
      } catch (mailErr) {
        console.warn('[send-otp] Email send failed, OTP still in memory:', mailErr);
      }
    } else {
      console.warn('[send-otp] Gmail not configured, OTP stored in memory only');
    }

    console.log(`[send-otp] OTP for ${email}: ${code} (expires in 5 min)`);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[send-otp] Exception:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to send OTP. Please try again.' },
      { status: 500 }
    );
  }
}