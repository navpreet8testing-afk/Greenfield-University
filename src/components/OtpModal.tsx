'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { X, ShieldCheck, Loader2 } from 'lucide-react';

interface OtpModalProps {
  isOpen: boolean;
  email: string;
  onClose: () => void;
  onVerified: () => void;
}

export function OtpModal({ isOpen, email, onClose, onVerified }: OtpModalProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [sent, setSent] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const mountedRef = useRef(false);

  // Send OTP via email when modal opens
  useEffect(() => {
    if (isOpen) {
      setOtp(['', '', '', '', '', '']);
      setError('');
      setSent(false);
      mountedRef.current = true;
      sendOtp();
    } else {
      mountedRef.current = false;
    }
  }, [isOpen]);

  async function sendOtp() {
    setSending(true);
    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSending(false);
    }
  }

  const handleChange = useCallback((index: number, value: string) => {
    if (!mountedRef.current) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }, [otp]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }, [otp]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const newOtp = [...otp];
    pasted.split('').forEach((ch, i) => { newOtp[i] = ch; });
    setOtp(newOtp);
    const nextEmpty = newOtp.findIndex(v => !v);
    inputRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();
  }, [otp]);

  const handleVerify = async () => {
    const entered = otp.join('');
    if (entered.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setVerifying(true);
    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), code: entered }),
      });
      const data = await res.json();

      if (data.success) {
        setVerifying(false);
        onVerified();
      } else {
        setVerifying(false);
        setError(data.error || 'Invalid OTP, please try again');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch {
      setVerifying(false);
      setError('Network error. Please try again.');
    }
  };

  const handleResend = async () => {
    setOtp(['', '', '', '', '', '']);
    setError('');
    await sendOtp();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-slate-700 dark:hover:text-gray-300 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-emerald/10 flex items-center justify-center mx-auto mb-5">
          <ShieldCheck className="w-7 h-7 text-emerald" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-center text-slate-dark dark:text-white mb-1">
          Verify Your Email
        </h3>
        <p className="text-sm text-center text-muted-foreground dark:text-white/60 mb-6">
          We sent a 6-digit code to <strong className="text-slate-dark dark:text-white">{email}</strong>
        </p>

        {sending ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-emerald" />
            <span className="ml-3 text-sm text-muted-foreground dark:text-white/60">Sending OTP to your email...</span>
          </div>
        ) : sent ? (
          <>
            {/* OTP Inputs */}
            <div className="flex justify-center gap-2.5 mb-2">
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
                  className="w-11 h-13 text-center text-lg font-bold rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 text-slate-dark dark:text-white focus:border-emerald focus:ring-2 focus:ring-emerald/20 focus:outline-none transition-colors"
                  aria-label={`Digit ${i + 1}`}
                />
              ))}
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-500 text-center mb-4">{error}</p>
            )}

            {/* Resend */}
            <p className="text-xs text-center text-muted-foreground dark:text-white/40 mb-6">
              Didn&apos;t receive it?{' '}
              <button
                type="button"
                onClick={handleResend}
                disabled={sending}
                className="text-emerald hover:underline font-medium disabled:opacity-50"
              >
                Resend OTP
              </button>
            </p>

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={verifying || otp.join('').length < 6}
              className="w-full h-12 rounded-xl bg-emerald hover:bg-emerald/90 text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {verifying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Confirm'
              )}
            </button>
          </>
        ) : (
          <div className="py-4 text-center">
            {error && (
              <p className="text-sm text-red-500 mb-4">{error}</p>
            )}
            <button
              onClick={sendOtp}
              disabled={sending}
              className="w-full h-12 rounded-xl bg-emerald hover:bg-emerald/90 text-white font-semibold text-sm disabled:opacity-50 transition-colors"
            >
              {sending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                'Retry'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}