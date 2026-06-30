'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShieldCheck } from 'lucide-react';

interface OtpVerificationProps {
  mobile: string;
  onVerified: () => void;
  onSkip?: () => void;
}

export function OtpVerification({ mobile, onVerified, onSkip }: OtpVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(0);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [sent, setSent] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const sendOtp = useCallback(async () => {
    setSending(true);
    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        setCountdown(60);
        toast({ title: 'OTP Sent', description: `A 4-digit code was sent to ${mobile}`, variant: 'default' });
      } else {
        toast({ title: 'Failed', description: 'Could not send OTP. Please try again.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'Network error. Please try again.', variant: 'destructive' });
    } finally {
      setSending(false);
    }
  }, [mobile, toast]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    const newOtp = [...otp];
    pasted.split('').forEach((char, i) => { newOtp[i] = char; });
    setOtp(newOtp);
    const nextIndex = Math.min(pasted.length, 3);
    inputRefs.current[nextIndex]?.focus();
  };

  const verifyOtp = useCallback(async () => {
    const code = otp.join('');
    if (code.length !== 4) {
      toast({ title: 'Incomplete OTP', description: 'Please enter all 4 digits.', variant: 'destructive' });
      return;
    }
    setVerifying(true);
    // Mock verification — accept any 4-digit code
    await new Promise((r) => setTimeout(r, 800));
    setVerifying(false);
    toast({ title: 'Verified!', description: 'Mobile number verified successfully.', variant: 'default' });
    onVerified();
  }, [otp, toast, onVerified]);

  const maskedMobile = mobile.replace(/(\d{2})\d{6}(\d{2})/, '$1******$2');

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-emerald-100 dark:border-emerald/20 shadow-lg shadow-emerald/5 p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-emerald/10 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-7 h-7 text-emerald" />
          </div>
          <h3 className="text-xl font-bold text-slate-dark dark:text-white mb-1">Verify Your Number</h3>
          <p className="text-sm text-muted-foreground dark:text-white/50">
            We sent a 4-digit code to <span className="font-medium text-foreground dark:text-white">{maskedMobile}</span>
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className="w-14 h-14 text-center text-2xl font-bold rounded-xl border-2 border-emerald-200 dark:border-emerald/30 bg-emerald-50/50 dark:bg-emerald-950/30 text-slate-dark dark:text-white focus:border-emerald focus:ring-2 focus:ring-emerald/20 outline-none transition-all duration-200"
              aria-label={`OTP digit ${i + 1}`}
            />
          ))}
        </div>

        {/* Verify Button */}
        <Button
          onClick={verifyOtp}
          disabled={otp.join('').length !== 4 || verifying || !sent}
          className="w-full h-12 bg-emerald hover:bg-emerald-dark text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-emerald/20 text-base"
        >
          {verifying ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify'
          )}
        </Button>

        {/* Send OTP / Resend */}
        <div className="mt-4 text-center">
          {!sent ? (
            <Button
              variant="ghost"
              onClick={sendOtp}
              disabled={sending}
              className="text-emerald hover:text-emerald-dark hover:bg-emerald-50 dark:hover:bg-emerald/10 font-medium"
            >
              {sending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send OTP'
              )}
            </Button>
          ) : (
            <p className="text-sm text-muted-foreground dark:text-white/50">
              {countdown > 0 ? (
                <>Resend code in <span className="font-semibold text-emerald">{countdown}s</span></>
              ) : (
                <button
                  onClick={sendOtp}
                  disabled={sending}
                  className="text-emerald hover:text-emerald-dark font-semibold hover:underline"
                >
                  {sending ? 'Sending...' : 'Resend OTP'}
                </button>
              )}
            </p>
          )}
        </div>

        {/* Skip */}
        {onSkip && (
          <div className="mt-3 text-center">
            <button
              onClick={onSkip}
              className="text-xs text-muted-foreground dark:text-white/40 hover:text-foreground dark:hover:text-white/70 transition-colors"
            >
              Skip for now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}