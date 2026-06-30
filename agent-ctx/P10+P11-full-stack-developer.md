# Task P10+P11 — full-stack-developer

## Summary
Set up Supabase client integration and built the admission PDF download/upload flow.

## Files Created
- `/src/lib/supabase.ts` — Supabase client wrapper with graceful null fallback when env vars are empty
- `/src/app/portal/page.tsx` — Student Portal dashboard page (login → academic dashboard)

## Files Modified
- `/src/components/college/AdmissionSection.tsx` — Added PDF download button + drag-and-drop upload zone
- `.env.local` — Added NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY placeholders

## Key Decisions
- Supabase client returns `null` when env vars are empty; all consuming code checks via `isSupabaseConfigured()`
- Student Portal shows mock data with a prominent "Database Not Configured" warning when Supabase is unavailable
- PDF download uses `window.open()` + `window.print()` for zero-dependency PDF generation
- File upload validates client-side (PDF only, 10 MB max) and uploads to Supabase Storage 'documents' bucket when available
- All existing admission form functionality preserved intact

## Lint Status
- ESLint: 0 errors, 0 warnings