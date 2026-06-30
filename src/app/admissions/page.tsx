'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useQuery } from '@tanstack/react-query';
import {
  Send, CheckCircle, Loader2, Download, FileText, X,
  CloudUpload, Check, GraduationCap, ClipboardList,
  Upload, BellRing, IndianRupee, Award, BookOpen,
  Trophy, Heart, FlaskConical, ArrowRight, CalendarCheck,
  FileCheck, CircleCheckBig,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/college/Navbar';
import { Footer } from '@/components/college/Footer';
import { useToast } from '@/hooks/use-toast';
import { OtpModal } from '@/components/OtpModal';
import { isSupabaseConfigured } from '@/lib/supabase';
import { IMAGES, PAGE_PHOTOS } from '@/lib/images';

gsap.registerPlugin(ScrollTrigger);

interface Program {
  id: string;
  name: string;
  shortName: string;
}

/* ─────────────────────────────────────────── Data ─────────────────────────────────────────── */

const steps = [
  { icon: BookOpen, title: 'Choose Program', description: 'Browse our diverse range of undergraduate, postgraduate, and doctoral programs to find the perfect fit for your aspirations.' },
  { icon: ClipboardList, title: 'Fill Application', description: 'Complete the online application form with your personal and academic details. The process takes under 5 minutes.' },
  { icon: Upload, title: 'Upload Documents', description: 'Submit your academic transcripts, ID proof, and other required documents in PDF format.' },
  { icon: CircleCheckBig, title: 'Receive Confirmation', description: 'Get instant confirmation with your application tracking ID. Our team will reach out within 48 hours.' },
];

const eligibilityCriteria = [
  { level: 'Undergraduate (UG)', icon: GraduationCap, criteria: '10+2 with minimum 50% aggregate marks from a recognized board. Valid entrance score preferred but not mandatory.', color: 'emerald' as const },
  { level: 'Postgraduate (PG)', icon: BookOpen, criteria: "Bachelor's degree with minimum 50% aggregate marks from a recognized university. Relevant discipline preferred.", color: 'gold' as const },
  { level: 'Doctoral (PhD)', icon: FlaskConical, criteria: "Master's degree with minimum 55% aggregate marks. Research proposal and interview required for final selection.", color: 'emerald-dark' as const },
];

const importantDates = [
  { date: 'January 15, 2025', label: 'Application Start', icon: CalendarCheck, highlight: false },
  { date: 'March 31, 2025', label: 'Early Bird Deadline', icon: BellRing, highlight: true },
  { date: 'June 15, 2025', label: 'Regular Deadline', icon: BellRing, highlight: false },
  { date: 'July 1-10, 2025', label: 'Counseling Dates', icon: FileCheck, highlight: false },
  { date: 'August 1, 2025', label: 'Classes Begin', icon: GraduationCap, highlight: false },
];

const feeStructure = [
  { program: 'BCA (Bachelor of Computer Applications)', fee: '₹45,000', year: '/year' },
  { program: 'B.Com (Bachelor of Commerce)', fee: '₹40,000', year: '/year' },
  { program: 'BBA (Bachelor of Business Administration)', fee: '₹50,000', year: '/year' },
  { program: 'B.Sc (Bachelor of Science)', fee: '₹45,000', year: '/year' },
  { program: 'BA (Bachelor of Arts)', fee: '₹35,000', year: '/year' },
  { program: 'MCA (Master of Computer Applications)', fee: '₹75,000', year: '/year' },
  { program: 'MBA (Master of Business Administration)', fee: '₹95,000', year: '/year' },
  { program: 'M.Sc (Master of Science)', fee: '₹60,000', year: '/year' },
];

const scholarships = [
  { title: 'Merit Scholarship', description: 'Awarded to students with exceptional academic records. Up to 100% tuition waiver for top performers.', icon: Trophy, percentage: '100%', tag: 'Up to', color: 'emerald' as const },
  { title: 'Sports Scholarship', description: 'For students who have represented at state or national level in recognized sports. Includes coaching support.', icon: Award, percentage: '50%', tag: 'Up to', color: 'gold' as const },
  { title: 'Need-based Financial Aid', description: 'Supporting students from economically weaker sections to ensure education is accessible to all deserving candidates.', icon: Heart, percentage: '30%', tag: 'Up to', color: 'emerald-dark' as const },
  { title: 'Research Fellowship', description: 'Full tuition waiver plus monthly stipend for doctoral candidates engaged in approved research projects.', icon: FlaskConical, percentage: '100%', tag: 'Full + Stipend', color: 'gold' as const },
];

/* ─────────────────────────────────────────── Page ─────────────────────────────────────────── */

export default function AdmissionsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // ── Fetch programs ────────────────────────────────────────────────
  const { data: programs = [] } = useQuery<Program[]>({
    queryKey: ['programs'],
    queryFn: () => fetch('/api/programs').then((r) => r.json()),
  });

  // ── Form state ────────────────────────────────────────────────────
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const pendingFormRef = useRef<HTMLFormElement | null>(null);

  // ── Upload state ──────────────────────────────────────────────────
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadRef, setUploadRef] = useState<string | null>(null);
  const [pdfBase64Data, setPdfBase64Data] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── GSAP Animations ───────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from('.hero-title', {
        y: 60, scale: 0.95, duration: 1.2, ease: 'power3.out', delay: 0.2,
      });
      gsap.from('.hero-subtitle', {
        y: 30, duration: 1, ease: 'power3.out', delay: 0.5,
      });
      gsap.from('.hero-cta', {
        y: 20, duration: 0.8, ease: 'power3.out', delay: 0.8,
      });

      // Section animations
      const sections = [
        { trigger: '.steps-section', els: '.step-card' },
        { trigger: '.eligibility-section', els: '.eligibility-card' },
        { trigger: '.dates-section', els: '.date-card' },
        { trigger: '.fees-section', els: '.fees-table' },
        { trigger: '.scholarships-section', els: '.scholarship-card' },
      ];

      sections.forEach(({ trigger, els }) => {
        gsap.from(`${trigger} .section-label`, {
          y: 20, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger, start: 'top 80%', immediateRender: false },
        });
        gsap.from(`${trigger} .section-title`, {
          y: 30, duration: 0.9, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger, start: 'top 80%', immediateRender: false },
        });
        gsap.from(els, {
          y: 40, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.25,
          scrollTrigger: { trigger, start: 'top 80%', immediateRender: false },
        });
      });

      // Application form animations
      gsap.from('.admission-heading', {
        y: 40, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.application-section', start: 'top 80%', immediateRender: false },
      });
      gsap.from('.admission-form', {
        y: 40, scale: 0.98, duration: 0.8, delay: 0.3, ease: 'power3.out',
        scrollTrigger: { trigger: '.admission-form', start: 'top 85%', immediateRender: false },
      });
      gsap.from('.admission-features', {
        x: 40, duration: 0.8, delay: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.admission-features', start: 'top 85%', immediateRender: false },
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  // ── Form Submit ───────────────────────────────────────────────────
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.email as HTMLInputElement)?.value?.trim();
    if (!email) {
      toast({ title: 'Error', description: 'Email address is required', variant: 'destructive' });
      return;
    }
    pendingFormRef.current = form;
    setOtpEmail(email);
    setOtpOpen(true);
  }

  async function handleOtpVerified() {
    setOtpOpen(false);
    setSubmitting(true);
    try {
      const form = pendingFormRef.current;
      if (!form) return;
      const data: Record<string, string | undefined> = {
        fullName: (form.fullName as HTMLInputElement).value,
        email: (form.email as HTMLInputElement).value,
        phone: (form.phone as HTMLInputElement).value,
        program: (form.program as HTMLSelectElement).value,
        previousQualification: (form.qualification as HTMLInputElement).value,
        message: (form.message as HTMLTextAreaElement).value,
        documentRef: uploadRef || undefined,
      };

      // If PDF was read as base64 (no Supabase), attach it
      if (pdfBase64Data && uploadedFile) {
        data.pdfBase64 = pdfBase64Data;
        data.pdfFileName = uploadedFile.name;
      }

      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
        toast({ title: 'Application submitted successfully!' });
      } else {
        const err = await res.json();
        toast({ title: 'Error', description: err.error || 'Something went wrong', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Network Error', description: 'Please check your connection and try again.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  }

  // ── PDF Download ──────────────────────────────────────────────────
  async function handleDownloadForm() {
    try {
      const html2pdf = (await import('html2pdf.js')).default;

      const container = document.createElement('div');
      container.innerHTML = `
  <div style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;padding:40px;color:#1e293b;background-color:#ffffff;">
    <div style="text-align:center;border-bottom:3px solid #059669;padding-bottom:20px;margin-bottom:30px;background-color:#ffffff;">
      <h1 style="font-size:24px;color:#059669;margin:0 0 4px;background-color:#ffffff;">GREENFIELD UNIVERSITY</h1>
      <p style="font-size:13px;color:#64748b;margin:0;background-color:#ffffff;">University Road, Academic City &bull; admissions@greenfield.edu &bull; +91 7973290805</p>
      <p style="margin-top:8px;font-size:14px;font-weight:600;color:#1e293b;background-color:#ffffff;">APPLICATION FORM &mdash; ADMISSION 2025&ndash;26</p>
    </div>
    <div style="font-size:18px;font-weight:600;margin-bottom:20px;color:#334155;background-color:#ffffff;">Applicant Information</div>
    <div style="display:flex;gap:24px;background-color:#ffffff;">
      <div style="flex:1;margin-bottom:18px;background-color:#ffffff;"><label style="display:block;font-size:13px;font-weight:600;color:#475569;margin-bottom:6px;background-color:#ffffff;">Full Name *</label><div style="border-bottom:1px dashed #cbd5e1;height:28px;background-color:#ffffff;"></div></div>
      <div style="flex:1;margin-bottom:18px;background-color:#ffffff;"><label style="display:block;font-size:13px;font-weight:600;color:#475569;margin-bottom:6px;background-color:#ffffff;">Email Address *</label><div style="border-bottom:1px dashed #cbd5e1;height:28px;background-color:#ffffff;"></div></div>
    </div>
    <div style="display:flex;gap:24px;background-color:#ffffff;">
      <div style="flex:1;margin-bottom:18px;background-color:#ffffff;"><label style="display:block;font-size:13px;font-weight:600;color:#475569;margin-bottom:6px;background-color:#ffffff;">Phone Number *</label><div style="border-bottom:1px dashed #cbd5e1;height:28px;background-color:#ffffff;"></div></div>
      <div style="flex:1;margin-bottom:18px;background-color:#ffffff;"><label style="display:block;font-size:13px;font-weight:600;color:#475569;margin-bottom:6px;background-color:#ffffff;">Date of Birth</label><div style="border-bottom:1px dashed #cbd5e1;height:28px;background-color:#ffffff;"></div></div>
    </div>
    <div style="font-size:18px;font-weight:600;margin:24px 0 20px;color:#334155;background-color:#ffffff;">Academic Information</div>
    <div style="display:flex;gap:24px;background-color:#ffffff;">
      <div style="flex:1;margin-bottom:18px;background-color:#ffffff;"><label style="display:block;font-size:13px;font-weight:600;color:#475569;margin-bottom:6px;background-color:#ffffff;">Program Applied For *</label><div style="border-bottom:1px dashed #cbd5e1;height:28px;margin-top:4px;background-color:#ffffff;"></div></div>
      <div style="flex:1;margin-bottom:18px;background-color:#ffffff;"><label style="display:block;font-size:13px;font-weight:600;color:#475569;margin-bottom:6px;background-color:#ffffff;">Previous Qualification *</label><div style="border-bottom:1px dashed #cbd5e1;height:28px;background-color:#ffffff;"></div></div>
    </div>
    <div style="display:flex;gap:24px;background-color:#ffffff;">
      <div style="flex:1;margin-bottom:18px;background-color:#ffffff;"><label style="display:block;font-size:13px;font-weight:600;color:#475569;margin-bottom:6px;background-color:#ffffff;">University / Board Name</label><div style="border-bottom:1px dashed #cbd5e1;height:28px;background-color:#ffffff;"></div></div>
      <div style="flex:1;margin-bottom:18px;background-color:#ffffff;"><label style="display:block;font-size:13px;font-weight:600;color:#475569;margin-bottom:6px;background-color:#ffffff;">Percentage / CGPA</label><div style="border-bottom:1px dashed #cbd5e1;height:28px;background-color:#ffffff;"></div></div>
    </div>
    <div style="font-size:18px;font-weight:600;margin:24px 0 20px;color:#334155;background-color:#ffffff;">Additional Information</div>
    <div style="margin-bottom:18px;background-color:#ffffff;"><label style="display:block;font-size:13px;font-weight:600;color:#475569;margin-bottom:6px;background-color:#ffffff;">Message / Statement of Purpose (Optional)</label><div style="border-bottom:1px dashed #cbd5e1;height:80px;background-color:#ffffff;"></div></div>
    <div style="background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px;margin-top:30px;font-size:12px;color:#166534;">
      <h3 style="font-size:14px;margin:0 0 8px;background-color:#f0fdf4;color:#166534;">Submission Instructions</h3>
      <ol style="padding-left:20px;margin:0;background-color:#f0fdf4;color:#166534;"><li style="margin-bottom:4px;background-color:#f0fdf4;color:#166534;">Fill out all required fields marked with an asterisk (*).</li><li style="margin-bottom:4px;background-color:#f0fdf4;color:#166534;">You may also submit this application online at greenfield.edu/admissions.</li><li style="margin-bottom:4px;background-color:#f0fdf4;color:#166534;">Attach a copy of your most recent academic transcript and a valid photo ID.</li><li style="margin-bottom:4px;background-color:#f0fdf4;color:#166534;">Submit the completed form to the Admissions Office or email it to admissions@greenfield.edu.</li><li style="margin-bottom:0;background-color:#f0fdf4;color:#166534;">You will receive an acknowledgment with your application tracking ID within 24 hours.</li></ol>
    </div>
    <div style="margin-top:40px;display:flex;justify-content:space-between;align-items:end;background-color:#ffffff;">
      <div style="background-color:#ffffff;"><label style="font-size:12px;font-weight:600;color:#475569;background-color:#ffffff;">Applicant's Signature</label><div style="border-bottom:1px dashed #cbd5e1;width:200px;height:28px;margin-top:4px;background-color:#ffffff;"></div></div>
      <div style="text-align:right;background-color:#ffffff;"><label style="font-size:12px;font-weight:600;color:#475569;background-color:#ffffff;">Date</label><div style="border-bottom:1px dashed #cbd5e1;width:180px;height:28px;margin-top:4px;background-color:#ffffff;"></div></div>
    </div>
  </div>`;

      document.body.appendChild(container);
      await html2pdf().set({
        margin: [10, 10, 10, 10],
        filename: 'Greenfield_University_Application_Form_2025-26.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          onclone: (clonedDoc) => {
            const allElements = clonedDoc.querySelectorAll('*');
            allElements.forEach((el) => {
              const computed = window.getComputedStyle(el);
              const color = computed.color;
              const bgColor = computed.backgroundColor;
              const borderColor = computed.borderColor;
              if (el instanceof HTMLElement) {
                if (color && !color.startsWith('rgb')) el.style.color = '#000000';
                if (bgColor && !bgColor.startsWith('rgb') && bgColor !== 'transparent' && bgColor !== 'rgba(0, 0, 0, 0)') el.style.backgroundColor = '#ffffff';
                if (borderColor && !borderColor.startsWith('rgb') && borderColor !== 'transparent' && borderColor !== 'rgba(0, 0, 0, 0)') el.style.borderColor = '#cbd5e1';
              }
            });
          },
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      }).from(container).save();
      document.body.removeChild(container);
    } catch (error) {
      console.error('[PDF Download] Error:', error);
      toast({ title: 'Download Failed', description: 'Could not generate PDF. Please try again.', variant: 'destructive' });
    }
  }

  // ── File Upload ───────────────────────────────────────────────────
  function validateFile(file: File): boolean {
    if (file.type !== 'application/pdf') {
      toast({ title: 'Invalid File', description: 'Only PDF files are accepted.', variant: 'destructive' });
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: 'File Too Large', description: 'Maximum file size is 10 MB.', variant: 'destructive' });
      return false;
    }
    return true;
  }

  async function handleFileUpload(file: File) {
    if (!validateFile(file)) return;
    setUploadedFile(file);
    setUploadComplete(false);
    setUploadRef(null);

    if (isSupabaseConfigured()) {
      setUploading(true);
      try {
        const { supabase } = await import('@/lib/supabase');
        const fileName = `applications/${Date.now()}_${file.name}`;
        const { data, error } = await supabase!
          .storage
          .from('documents')
          .upload(fileName, file, { upsert: false });

        if (error) {
          toast({ title: 'Upload Failed', description: error.message, variant: 'destructive' });
        } else {
          setUploadRef(data.path);
          setUploadComplete(true);
          toast({ title: 'Document Uploaded', description: 'Your document has been saved successfully.', variant: 'default' });
        }
      } catch {
        toast({ title: 'Upload Error', description: 'Could not upload to cloud storage. File is selected locally.', variant: 'destructive' });
      } finally {
        setUploading(false);
      }
    } else {
      // No Supabase — read file as base64 so it can be sent with the form
      setUploading(true);
      try {
        const base64 = await readFileAsBase64(file);
        setPdfBase64Data(base64);
        setUploadComplete(true);
        toast({ title: 'File Selected', description: 'File is ready. Submit your application to include it.', variant: 'default' });
      } catch {
        toast({ title: 'File Error', description: 'Could not read the file. Please try again.', variant: 'destructive' });
        setUploadedFile(null);
      } finally {
        setUploading(false);
      }
    }
  }

  function readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  function handleRemoveFile() {
    setUploadedFile(null);
    setUploadComplete(false);
    setUploadRef(null);
    setPdfBase64Data(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, []);

  // ── Application form benefits ─────────────────────────────────────
  const benefits = [
    { title: 'Easy Online Process', description: 'Complete your application in under 5 minutes with our streamlined digital form.' },
    { title: 'Instant Confirmation', description: 'Receive immediate acknowledgment and application tracking ID via email.' },
    { title: 'Scholarship Eligibility', description: 'Merit-based and need-based scholarships automatically evaluated for all applicants.' },
    { title: 'Counseling Support', description: 'Free academic counseling sessions to help you choose the right program.' },
  ];

  return (
    <div ref={pageRef} className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* ═══════════════════ HERO SECTION ═══════════════════ */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${IMAGES.graduation})` }}
            aria-hidden="true"
          />
          <div className="hero-overlay absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          <div className="noise-overlay absolute inset-0" />

          <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
           
            <h1 className="hero-title font-hero-word text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Admissions 2025-26
            </h1>
            <p className="hero-subtitle font-body-alt text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Your journey to excellence starts here. Apply now and join our community of achievers.
            </p>
            <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#apply"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald hover:bg-emerald-dark text-white font-semibold rounded-full shadow-lg shadow-emerald/25 transition-all duration-300 hover:shadow-emerald/40 hover:scale-105"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#dates"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium rounded-full border border-white/20 transition-all duration-300"
              >
                View Important Dates
              </a>
            </div>
          </div>

          {/* Decorative bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* ═══════════════════ HOW TO APPLY ═══════════════════ */}
        <section className="steps-section py-20 sm:py-28 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 glass-card">
            <div className="text-center mb-16">
              <span className="section-label font-section-label inline-block text-emerald text-sm font-semibold tracking-[0.2em] mb-3">
                Application Process
              </span>
              <h2 className="section-title font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                <span className="gradient-text">How to Apply</span>
              </h2>
              <p className="font-body-alt text-muted-foreground max-w-2xl mx-auto text-lg">
                Follow these simple steps to complete your application and secure your place at Greenfield University.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  className={`step-card group relative bg-white dark:bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-sm hover:shadow-xl hover:shadow-emerald/5 transition-all duration-500 hover:-translate-y-1 animate-fade-up stagger-${i + 1}`}
                >
                  {/* Step number */}
                  <div className="absolute -top-4 -left-2 w-10 h-10 rounded-xl bg-emerald text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-emerald/30 group-hover:scale-110 transition-transform duration-300">
                    {i + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-emerald/10 dark:bg-emerald/20 flex items-center justify-center mb-5 group-hover:bg-emerald group-hover:scale-110 transition-all duration-300 mt-2">
                    <step.icon className="w-7 h-7 text-emerald group-hover:text-white transition-colors duration-300" />
                  </div>

                  <h3 className="font-feature-title text-lg font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="font-body-alt text-sm text-muted-foreground leading-relaxed">{step.description}</p>

                  {/* Connector line (hidden on last card and mobile) */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-emerald/20" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section divider */}
        <div className="section-divider-gradient h-px" />

        {/* ═══════════════════ ADMISSION COUNSELING ═══════════════════ */}
        <section className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="group rounded-2xl overflow-hidden img-reveal">
                <div className="relative h-72 sm:h-80 lg:h-[420px]">
                  <img
                    src={PAGE_PHOTOS.admissionCounseling}
                    alt="Admission Counseling Session at Greenfield University"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                </div>
              </div>
              <div>
                <span className="font-section-label inline-block text-emerald text-sm font-semibold tracking-[0.2em] mb-3">
                  Personalized Guidance
                </span>
                <h2 className="font-section-title text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Admission Counseling
                </h2>
                <p className="font-body-alt text-muted-foreground leading-relaxed mb-6">
                  Our dedicated counselors guide you through every step of the admission process — from choosing the right program to understanding fee structures and scholarship opportunities. One-on-one sessions ensure you make an informed decision about your academic future.
                </p>
                <ul className="space-y-3">
                  {["Personalized program selection guidance", "Document verification & application support", "Scholarship eligibility assessment", "Campus tour scheduling"].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald flex-shrink-0" />
                      <span className="font-body-alt text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section divider */}
        <div className="section-divider-gradient h-px" />

        {/* ═══════════════════ ELIGIBILITY CRITERIA ═══════════════════ */}
        <section className="eligibility-section py-20 sm:py-28 bg-emerald/[0.03] dark:bg-emerald/[0.02]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="section-label font-section-label inline-block text-emerald text-sm font-semibold tracking-[0.2em] mb-3">
                Requirements
              </span>
              <h2 className="section-title font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Eligibility Criteria
              </h2>
              <p className="font-body-alt text-muted-foreground max-w-2xl mx-auto text-lg">
                Check the minimum requirements for each program level before applying.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 card-glow">
              {eligibilityCriteria.map((item, i) => (
                <Card
                  key={item.level}
                  className={`eligibility-card rounded-2xl border border-border shadow-sm hover:shadow-xl hover:shadow-emerald/5 transition-all duration-500 hover:-translate-y-1 bg-white dark:bg-card overflow-hidden group animate-fade-up stagger-${i + 1}`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${item.color === 'gold'
                          ? 'bg-gold/10 group-hover:bg-gold'
                          : 'bg-emerald/10 group-hover:bg-emerald'
                        }`}>
                        <item.icon className={`w-7 h-7 transition-colors duration-300 ${item.color === 'gold'
                            ? 'text-gold group-hover:text-white'
                            : 'text-emerald group-hover:text-white'
                          }`} />
                      </div>
                      <CardTitle className="font-feature-title text-lg font-bold text-foreground">{item.level}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="font-body-alt text-muted-foreground leading-relaxed text-sm">{item.criteria}</p>
                    <div className="mt-5 flex items-center gap-2">
                      <Badge variant="secondary" className={`text-xs font-medium ${item.color === 'gold'
                          ? 'bg-gold/10 text-gold-dark hover:bg-gold/20'
                          : 'bg-emerald/10 text-emerald-dark hover:bg-emerald/20'
                        }`}>
                        {item.level === 'Undergraduate (UG)' ? 'Min. 50% in 10+2' : item.level === 'Postgraduate (PG)' ? "Min. 50% in Bachelor's" : "Min. 55% in Master's"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Section divider */}
        <div className="section-divider-gradient h-px" />

        {/* ═══════════════════ IMPORTANT DATES ═══════════════════ */}
        <section id="dates" className="dates-section py-20 sm:py-28 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="section-label font-section-label inline-block text-emerald text-sm font-semibold tracking-[0.2em] mb-3">
                Mark Your Calendar
              </span>
              <h2 className="section-title font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Important Dates
              </h2>
              <p className="font-body-alt text-muted-foreground max-w-2xl mx-auto text-lg">
                Stay on track with key admission deadlines and milestones.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-emerald/10" />

                <div className="space-y-6">
                  {importantDates.map((item, i) => (
                    <div
                      key={item.label}
                      className="date-card relative flex items-start gap-5 sm:gap-6 group"
                    >
                      {/* Timeline dot */}
                      <div className={`relative z-10 shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${item.highlight
                          ? 'bg-emerald shadow-lg shadow-emerald/30'
                          : 'bg-emerald/10 dark:bg-emerald/20 group-hover:bg-emerald group-hover:shadow-lg group-hover:shadow-emerald/20'
                        }`}>
                        <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${item.highlight ? 'text-white' : 'text-emerald group-hover:text-white'
                          }`} />
                      </div>

                      {/* Content card */}
                      <div className={`flex-1 p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${item.highlight
                          ? 'bg-emerald/5 border-emerald/20 shadow-md shadow-emerald/5'
                          : 'bg-white dark:bg-card border-border hover:border-emerald/30 hover:shadow-lg hover:shadow-emerald/5'
                        }`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h3 className={`font-feature-title font-bold text-base sm:text-lg ${item.highlight ? 'text-emerald' : 'text-foreground'
                              }`}>
                              {item.label}
                            </h3>
                            <p className="font-body-alt text-sm text-muted-foreground mt-1">{item.date}</p>
                          </div>
                          {item.highlight && (
                            <Badge className="bg-emerald text-white w-fit">Early Bird</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section divider */}
        <div className="section-divider-gradient h-px" />

        {/* ═══════════════════ FEE STRUCTURE ═══════════════════ */}
        <section className="fees-section py-20 sm:py-28 bg-emerald/[0.03] dark:bg-emerald/[0.02]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="section-label font-section-label inline-block text-emerald text-sm font-semibold tracking-[0.2em] mb-3">
                Transparent Pricing
              </span>
              <h2 className="section-title font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Fee Structure
              </h2>
              <p className="font-body-alt text-muted-foreground max-w-2xl mx-auto text-lg">
                Competitive fees with flexible payment options and scholarship support.
              </p>
            </div>

            <div className="fees-table max-w-4xl mx-auto">
              <Card className="rounded-2xl border border-border overflow-hidden shadow-sm bg-white dark:bg-card">
                {/* UG Header */}
                <div className="bg-emerald/5 dark:bg-emerald/10 px-6 py-3 border-b border-border">
                  <h3 className="font-feature-title font-bold text-emerald flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Undergraduate Programs
                  </h3>
                </div>
                <div className="divide-y divide-border">
                  {feeStructure.filter(f => f.program.startsWith('B')).map((item) => (
                    <div key={item.program} className="flex items-center justify-between px-6 py-4 hover:bg-emerald/[0.02] transition-colors">
                      <span className="font-body-alt text-sm sm:text-base text-foreground">{item.program}</span>
                      <span className="font-feature-title font-bold text-emerald whitespace-nowrap ml-4">
                        {item.fee}<span className="text-muted-foreground font-normal text-xs">{item.year}</span>
                      </span>
                    </div>
                  ))}
                </div>

                {/* PG Header */}
                <div className="bg-gold/5 dark:bg-gold/10 px-6 py-3 border-y border-border">
                  <h3 className="font-feature-title font-bold text-gold-dark flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Postgraduate Programs
                  </h3>
                </div>
                <div className="divide-y divide-border">
                  {feeStructure.filter(f => f.program.startsWith('M')).map((item) => (
                    <div key={item.program} className="flex items-center justify-between px-6 py-4 hover:bg-emerald/[0.02] transition-colors">
                      <span className="font-body-alt text-sm sm:text-base text-foreground">{item.program}</span>
                      <span className="font-feature-title font-bold text-emerald whitespace-nowrap ml-4">
                        {item.fee}<span className="text-muted-foreground font-normal text-xs">{item.year}</span>
                      </span>
                    </div>
                  ))}
                </div>

                {/* Note */}
                <div className="bg-muted/50 px-6 py-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    <IndianRupee className="w-3 h-3 inline mr-1" />
                    Fees are indicative and may vary. Additional laboratory and hostel charges apply. EMI options available.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Section divider */}
        <div className="section-divider-gradient h-px" />

        {/* ═══════════════════ SCHOLARSHIPS ═══════════════════ */}
        <section className="scholarships-section py-20 sm:py-28 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="section-label font-section-label inline-block text-emerald text-sm font-semibold tracking-[0.2em] mb-3">
                Financial Support
              </span>
              <h2 className="section-title font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Scholarships & Aid
              </h2>
              <p className="font-body-alt text-muted-foreground max-w-2xl mx-auto text-lg">
                We believe in nurturing talent regardless of financial background. Explore our scholarship programs.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 card-glow">
              {scholarships.map((s, i) => (
                <Card
                  key={s.title}
                  className={`scholarship-card group rounded-2xl border border-border shadow-sm hover:shadow-xl hover:shadow-emerald/5 transition-all duration-500 hover:-translate-y-1 bg-white dark:bg-card overflow-hidden animate-fade-up stagger-${i + 1}`}
                >
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-start gap-5">
                      <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${s.color === 'gold'
                          ? 'bg-gold/10 group-hover:bg-gold'
                          : 'bg-emerald/10 group-hover:bg-emerald'
                        }`}>
                        <s.icon className={`w-7 h-7 transition-colors duration-300 ${s.color === 'gold'
                            ? 'text-gold group-hover:text-white'
                            : 'text-emerald group-hover:text-white'
                          }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 className="font-feature-title text-lg font-bold text-foreground">{s.title}</h3>
                          <div className={`shrink-0 text-right`}>
                            <span className={`block text-2xl font-bold ${s.color === 'gold' ? 'text-gold' : 'text-emerald'
                              }`}>
                              {s.percentage}
                            </span>
                            <span className="text-xs text-muted-foreground">{s.tag}</span>
                          </div>
                        </div>
                        <p className="font-body-alt text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Section divider */}
        <div className="section-divider-gradient h-px" />

        {/* ═══════════════════ APPLICATION FORM ═══════════════════ */}
        <section id="apply" className="application-section py-20 sm:py-28 bg-slate-dark dark:bg-slate-900 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald/5 rounded-full blur-3xl -translate-y-1/2" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center mb-16 admission-heading">
              <span className="font-section-label inline-block text-emerald text-sm font-semibold tracking-[0.2em] mb-3">
                Begin Your Journey
              </span>
              <h2 className="font-cta-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Apply for Admission 2025–26
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto text-lg font-body-alt">
                Take the first step towards an extraordinary academic career. Apply now and join our community of achievers.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-12 items-start">
              {/* Benefits */}
              <div className="lg:col-span-2 admission-features">
                <div className="space-y-6">
                  {benefits.map((b, i) => (
                    <div key={b.title} className="flex gap-4 group">
                      <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald/10 flex items-center justify-center text-emerald text-sm font-bold group-hover:bg-emerald group-hover:text-white transition-all duration-300">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm mb-1">{b.title}</h4>
                        <p className="text-white/40 text-sm leading-relaxed">{b.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-3 admission-form">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8">
                  {submitted ? (
                    <div className="text-center py-12">
                      <CheckCircle className="w-16 h-16 text-emerald mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">Application Received!</h3>
                      <p className="text-white/50 mb-6">Thank you for your interest. Our admissions team will reach out to you within 48 hours.</p>
                      <Button
                        variant="outline"
                        className="border-emerald/50 text-emerald hover:bg-emerald/10 rounded-full"
                        onClick={() => { setSubmitted(false); handleRemoveFile(); }}
                      >
                        Submit Another Application
                      </Button>
                    </div>
                  ) : (
                    <>
                      {/* Download Application Form Button */}
                      <button
                        type="button"
                        onClick={handleDownloadForm}
                        className="w-full mb-6 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border border-dashed border-white/20 text-white/70 hover:text-white hover:border-emerald/50 hover:bg-emerald/5 transition-all duration-300 text-sm font-medium group"
                      >
                        <Download className="w-4 h-4 group-hover:text-emerald transition-colors" />
                        <span>Download Application Form (PDF)</span>
                        <FileText className="w-3.5 h-3.5 opacity-50" />
                      </button>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-white/70 text-sm">Full Name *</Label>
                            <Input id="fullName" name="fullName" required placeholder="John Doe"
                              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald/50 focus:ring-emerald/20 rounded-xl h-11" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-white/70 text-sm">Email Address *</Label>
                            <Input id="email" name="email" type="email" required placeholder="john@example.com"
                              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald/50 focus:ring-emerald/20 rounded-xl h-11" />
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-white/70 text-sm">Phone Number *</Label>
                            <Input id="phone" name="phone" type="tel" required placeholder="+91 98765 43210"
                              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald/50 focus:ring-emerald/20 rounded-xl h-11" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="program" className="text-white/70 text-sm">Program *</Label>
                            <select
                              id="program"
                              name="program"
                              required
                              className="w-full bg-white/5 border border-white/10 text-white rounded-xl h-11 px-3 text-sm focus:outline-none focus:border-emerald/50 focus:ring-emerald/20 [&>option]:bg-slate-dark [&>option]:text-white"
                            >
                              <option value="">Select a program</option>
                              {programs.map((p) => (
                                <option key={p.id} value={p.name}>{p.shortName} — {p.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="qualification" className="text-white/70 text-sm">Previous Qualification</Label>
                          <Input id="qualification" name="qualification" placeholder="e.g., 12th Standard, B.Sc., Diploma..."
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald/50 focus:ring-emerald/20 rounded-xl h-11" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message" className="text-white/70 text-sm">Message (Optional)</Label>
                          <Textarea id="message" name="message" rows={3} placeholder="Tell us about your goals and aspirations..."
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald/50 focus:ring-emerald/20 rounded-xl resize-none" />
                        </div>

                        {/* Drag-and-Drop Upload Zone */}
                        <div className="space-y-2">
                          <Label className="text-white/70 text-sm">Upload Document (PDF, max 10 MB)</Label>
                          <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => !uploadedFile && fileInputRef.current?.click()}
                            className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 cursor-pointer transition-all duration-300 ${isDragOver
                                ? 'border-emerald bg-emerald/10 scale-[1.01]'
                                : uploadedFile
                                  ? 'border-emerald/40 bg-emerald/5'
                                  : 'border-white/15 hover:border-white/30 hover:bg-white/5'
                              }`}
                          >
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept=".pdf,application/pdf"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(file);
                              }}
                            />

                            {uploading ? (
                              <>
                                <Loader2 className="w-8 h-8 text-emerald animate-spin" />
                                <p className="text-sm text-white/60">Uploading document...</p>
                              </>
                            ) : uploadedFile ? (
                              <>
                                <div className="flex items-center gap-3 w-full">
                                  <div className="shrink-0 w-10 h-10 rounded-lg bg-emerald/20 flex items-center justify-center">
                                    {uploadComplete ? (
                                      <Check className="w-5 h-5 text-emerald" />
                                    ) : (
                                      <FileText className="w-5 h-5 text-emerald" />
                                    )}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm text-white font-medium truncate">{uploadedFile.name}</p>
                                    <p className="text-xs text-white/40">
                                      {(uploadedFile.size / 1024).toFixed(1)} KB
                                      {uploadComplete && ' • Ready'}
                                      {uploadRef && ' • Cloud saved'}
                                    </p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); handleRemoveFile(); }}
                                    className="shrink-0 w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                                    aria-label="Remove file"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              </>
                            ) : (
                              <>
                                <CloudUpload className={`w-8 h-8 transition-colors ${isDragOver ? 'text-emerald' : 'text-white/30'}`} />
                                <div className="text-center">
                                  <p className="text-sm text-white/60">
                                    <span className="text-emerald font-medium">Click to upload</span> or drag and drop
                                  </p>
                                  <p className="text-xs text-white/30 mt-1">PDF files only, up to 10 MB</p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <Button
                          type="submit"
                          disabled={submitting}
                          className="w-full bg-emerald hover:bg-emerald-dark text-white rounded-xl h-12 text-base font-semibold shadow-lg shadow-emerald/20 hover:shadow-emerald/40 transition-all"
                        >
                          {submitting ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
                          ) : (
                            <><Send className="w-4 h-4 mr-2" /> Submit Application</>
                          )}
                        </Button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <OtpModal
        isOpen={otpOpen}
        email={otpEmail}
        onClose={() => setOtpOpen(false)}
        onVerified={handleOtpVerified}
      />
    </div>
  );
}