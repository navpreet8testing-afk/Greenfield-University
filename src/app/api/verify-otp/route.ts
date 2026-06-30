import { NextResponse } from 'next/server';
import { verifyOtp, clearOtp } from '@/lib/otp-store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, code } = body;

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    if (!code || typeof code !== 'string' || code.length !== 6) {
      return NextResponse.json(
        { success: false, error: 'A valid 6-digit code is required' },
        { status: 400 }
      );
    }

    if (verifyOtp(email, code)) {
      console.log('[verify-otp] OTP verified for:', email);
      return NextResponse.json({ success: true });
    }

    console.error('[verify-otp] Invalid OTP for:', email);
    return NextResponse.json(
      { success: false, error: 'Invalid OTP. Please try again.' },
      { status: 400 }
    );
  } catch (err) {
    console.error('[verify-otp] Exception:', err);
    return NextResponse.json(
      { success: false, error: 'Verification failed. Please try again.' },
      { status: 500 }
    );
  }
}