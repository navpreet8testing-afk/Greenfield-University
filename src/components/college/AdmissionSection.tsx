'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle, Loader2, Download, Upload, FileText, X, CloudUpload, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { isSupabaseConfigured } from '@/lib/supabase';
import { OtpModal } from '@/components/OtpModal';

gsap.registerPlugin(ScrollTrigger);

interface Program {
  id: string;
  name: string;
  shortName: string;
}

interface AdmissionSectionProps {
  programs: Program[];
}

export function AdmissionSection({ programs }: AdmissionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const pendingFormRef = useRef<HTMLFormElement | null>(null);
  const { toast } = useToast();

  // Upload state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadRef, setUploadRef] = useState<string | null>(null);
  const [pdfBase64Data, setPdfBase64Data] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.admission-heading', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      gsap.fromTo('.admission-form', { opacity: 0, y: 40, scale: 0.98 }, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.admission-form', start: 'top 85%' },
      });

      gsap.fromTo('.admission-features', { opacity: 0, x: 40 }, {
        opacity: 1, x: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.admission-features', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

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
        toast({ title: 'Application Submitted!', description: 'We will contact you shortly with next steps.', variant: 'default' });
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
      <div style="flex:1;margin-bottom:18px;background-color:#ffffff;"><label style="display:block;font-size:13px;font-weight:600;color:#475569;margin-bottom:6px;background-color:#ffffff;">Program Applied For *</label><div style="font-size:11px;color:#94a3b8;margin-top:2px;background-color:#ffffff;">${programs.map(p => p.shortName + ' — ' + p.name).join(' | ')}</div><div style="border-bottom:1px dashed #cbd5e1;height:28px;margin-top:4px;background-color:#ffffff;"></div></div>
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

  const benefits = [
    { title: 'Easy Online Process', description: 'Complete your application in under 5 minutes with our streamlined digital form.' },
    { title: 'Instant Confirmation', description: 'Receive immediate acknowledgment and application tracking ID via email.' },
    { title: 'Scholarship Eligibility', description: 'Merit-based and need-based scholarships automatically evaluated for all applicants.' },
    { title: 'Counseling Support', description: 'Free academic counseling sessions to help you choose the right program.' },
  ];

  return (
    <section id="admission" ref={sectionRef} className="py-20 sm:py-28 bg-slate-dark relative overflow-hidden dark:bg-slate-900">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16 admission-heading">
          <span className="font-section-label inline-block text-emerald text-sm font-semibold tracking-[0.2em] mb-3">Begin Your Journey</span>
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
                        className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 cursor-pointer transition-all duration-300 ${
                          isDragOver
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
      <OtpModal
        isOpen={otpOpen}
        email={otpEmail}
        onClose={() => setOtpOpen(false)}
        onVerified={handleOtpVerified}
      />
    </section>
  );
}