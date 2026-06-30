/* Shared in-memory OTP store — uses globalThis to survive module isolation in Turbopack */

const OTP_KEY = '__greenfield_otp_store__';

interface OtpEntry {
  code: string;
  expiresAt: number;
}

function getStore(): Map<string, OtpEntry> {
  if (!(globalThis as Record<string, unknown>)[OTP_KEY]) {
    (globalThis as Record<string, unknown>)[OTP_KEY] = new Map<string, OtpEntry>();
  }
  return (globalThis as Record<string, unknown>)[OTP_KEY] as Map<string, OtpEntry>;
}

export function setOtp(key: string, code: string): void {
  getStore().set(key, { code, expiresAt: Date.now() + 5 * 60 * 1000 });
}

export function verifyOtp(key: string, code: string): boolean {
  const stored = getStore().get(key);
  if (stored && stored.code === code && Date.now() < stored.expiresAt) {
    getStore().delete(key);
    return true;
  }
  return false;
}

export function clearOtp(key: string): void {
  getStore().delete(key);
}

export function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}