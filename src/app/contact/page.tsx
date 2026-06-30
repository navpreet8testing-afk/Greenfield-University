'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MapPin, Phone, Mail, Clock, Send, Loader2,
  Facebook, Twitter, Instagram, Linkedin, Youtube,
  ChevronDown, ExternalLink, Building2,
} from 'lucide-react';
import { Navbar } from '@/components/college/Navbar';
import { Footer } from '@/components/college/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { IMAGES, PAGE_PHOTOS } from '@/lib/images';
import { OtpModal } from '@/components/OtpModal';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const contactInfo = [
  { icon: MapPin, title: 'Address', lines: ['University Road, Academic City', 'State 123456, India'] },
  { icon: Phone, title: 'Phone', lines: ['+91 7973290805'] },
  { icon: Mail, title: 'Email', lines: ['navpreet8testing@gmail.com'] },
  { icon: Clock, title: 'Office Hours', lines: ['Mon – Fri: 9:00 AM – 5:00 PM', 'Sat: 9:00 AM – 1:00 PM'] },
];

const departments = [
  { name: 'Admissions Office', phone: '+91 7973290805', email: 'admissions@greenfield.edu' },
  { name: 'Academic Affairs', phone: '+91 7973290806', email: 'academic@greenfield.edu' },
  { name: 'Student Services', phone: '+91 7973290807', email: 'students@greenfield.edu' },
  { name: 'Placement Cell', phone: '+91 7973290808', email: 'placements@greenfield.edu' },
  { name: 'Library', phone: '+91 7973290809', email: 'library@greenfield.edu' },
  { name: 'Research Center', phone: '+91 7973290810', email: 'research@greenfield.edu' },
];

const faqs = [
  { q: 'How do I apply for admission?', a: 'You can apply online through our Admissions Portal or visit the campus during office hours. The application form and required documents are listed on the Admissions page.' },
  { q: 'What are the eligibility criteria for undergraduate programs?', a: 'Candidates must have completed 10+2 from a recognized board with a minimum aggregate of 50%. Specific programs may have additional subject requirements.' },
  { q: 'Is hostel accommodation available?', a: 'Yes, Greenfield University provides separate hostel facilities for boys and girls with all modern amenities including Wi-Fi, mess, and recreational areas.' },
  { q: 'How can I schedule a campus visit?', a: 'Campus visits can be scheduled by contacting the Admissions Office at +91 7973290805 or by emailing admissions@greenfield.edu. Walk-ins during office hours are also welcome.' },
  { q: 'What scholarship opportunities are available?', a: 'We offer merit-based, need-based, and sports scholarships. Details about eligibility and application deadlines are available on the Admissions page.' },
  { q: 'How do I request my transcripts or certificates?', a: 'Transcripts and certificates can be requested through the Student Portal or by visiting the Academic Affairs office. Processing takes 5-7 working days.' },
];

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/greenfielduniversity', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/greenfield_uni', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/greenfielduniversity', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/school/greenfield-university', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/@greenfielduniversity', label: 'YouTube' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const pendingFormRef = useRef<HTMLFormElement | null>(null);
  const { toast } = useToast();

  /* ---------- GSAP Animations ---------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero content
      gsap.from('.contact-hero-content', {
        y: 60, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: heroRef.current, start: 'top 70%', once: true, immediateRender: false },
      });

      // Section headings
      document.querySelectorAll('.contact-heading').forEach((el) => {
        gsap.from(el, {
          y: 30, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true, immediateRender: false },
        });
      });

      // Info cards
      document.querySelectorAll('.contact-info-card').forEach((el, i) => {
        gsap.from(el, {
          y: 40, scale: 0.95, duration: 0.7, delay: i * 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true, immediateRender: false },
        });
      });

      // Form slide in
      gsap.from('.contact-form-wrapper', {
        y: 40, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-form-wrapper', start: 'top 85%', once: true, immediateRender: false },
      });

      // Map section
      gsap.from('.contact-map-section', {
        scale: 0.97, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-map-section', start: 'top 85%', once: true, immediateRender: false },
      });

      // Department cards
      document.querySelectorAll('.dept-card').forEach((el, i) => {
        gsap.from(el, {
          y: 30, duration: 0.6, delay: i * 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true, immediateRender: false },
        });
      });

      // FAQ items
      document.querySelectorAll('.faq-item').forEach((el, i) => {
        gsap.from(el, {
          y: 20, duration: 0.5, delay: i * 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true, immediateRender: false },
        });
      });

      // Social icons
      gsap.from('.social-icon', {
        y: 20, duration: 0.5, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.social-grid', start: 'top 90%', once: true, immediateRender: false },
      });
    });
    return () => ctx.revert();
  }, []);

  /* ---------- Form handler ---------- */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
      const data = {
        name: (form.name as HTMLInputElement).value,
        email: (form.email as HTMLInputElement).value,
        phone: (form.phone as HTMLInputElement).value,
        subject: (form.subject as HTMLInputElement).value,
        message: (form.message as HTMLTextAreaElement).value,
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast({ title: 'Application submitted successfully!' });
        form.reset();
      } else {
        const err = await res.json();
        toast({ title: 'Error', description: err.error || 'Failed to send message', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'Network error. Please try again.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  }

  /* ---------- Render ---------- */
  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-slate-dark">
      <Navbar />

      {/* ============ HERO ============ */}
      <section
        ref={heroRef}
        className="relative h-[70vh] min-h-[480px] flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url(${IMAGES.architecture})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="hero-overlay" />
        <div className="noise-overlay" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto contact-hero-content">
          <span className="font-section-label inline-block text-emerald-light text-sm font-semibold uppercase tracking-widest mb-4">
            Get in Touch
          </span>
          <h1 className="font-section-title text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Contact Us
          </h1>
          <p className="font-body-alt text-white/70 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Have questions? We&apos;d love to hear from you. Reach out and our team will respond promptly.
          </p>
        </div>
      </section>

      {/* ============ CONTACT INFO CARDS ============ */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-white to-emerald-50/20 dark:from-slate-dark dark:to-slate-dark/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 glass-card">
          <div className="text-center mb-14 contact-heading">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">
              Reach Us
            </span>
            <h2 className="font-section-title text-3xl sm:text-4xl font-bold text-slate-dark dark:text-white">
              <span className="gradient-text">Contact Information</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 card-glow">
            {contactInfo.map((item, i) => (
              <div
                key={item.title}
                className={`contact-info-card rounded-2xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 p-6 text-center group hover:border-emerald/30 dark:hover:border-emerald/30 hover:shadow-lg hover:shadow-emerald/5 transition-all duration-300 animate-fade-up stagger-${i + 1}`}
              >
                <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald/10 dark:bg-emerald/20 flex items-center justify-center mb-4 group-hover:bg-emerald transition-colors duration-300">
                  <item.icon className="w-6 h-6 text-emerald group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-slate-dark dark:text-white text-sm mb-2">{item.title}</h3>
                {item.lines.map((line) => (
                  <p key={line} className="text-sm text-muted-foreground dark:text-white/50">{line}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* ============ CONTACT FORM ============ */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-emerald-50/20 to-white dark:from-slate-dark/95 dark:to-slate-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 contact-heading">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">
              Send a Message
            </span>
            <h2 className="font-section-title text-3xl sm:text-4xl font-bold text-slate-dark dark:text-white">
              We&apos;d Love to Hear From You
            </h2>
            <p className="text-muted-foreground dark:text-white/50 mt-3 font-body-alt max-w-xl mx-auto">
              Fill out the form below and our team will get back to you within 24 hours.
            </p>
          </div>

          <div className="contact-form-wrapper">
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-white/5 rounded-2xl border border-border/50 dark:border-white/10 p-6 sm:p-8 shadow-sm"
            >
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div className="space-y-2">
                  <Label htmlFor="contact-name" className="text-sm">Your Name *</Label>
                  <Input
                    id="contact-name"
                    name="name"
                    required
                    placeholder="Full name"
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email" className="text-sm">Email Address *</Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone" className="text-sm">Phone Number *</Label>
                  <Input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="rounded-xl h-11"
                  />
                </div>
              </div>
              <div className="space-y-2 mb-5">
                <Label htmlFor="contact-subject" className="text-sm">Subject *</Label>
                <Input
                  id="contact-subject"
                  name="subject"
                  required
                  placeholder="How can we help?"
                  className="rounded-xl h-11"
                />
              </div>
              <div className="space-y-2 mb-6">
                <Label htmlFor="contact-message" className="text-sm">Message *</Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us more about your inquiry..."
                  className="rounded-xl resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-emerald hover:bg-emerald-dark text-white rounded-xl h-12 px-8 font-semibold shadow-lg shadow-emerald/20 hover:shadow-emerald/40 transition-all"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* ============ CAMPUS MAP ============ */}
      <section className="py-20 sm:py-28 bg-white dark:bg-slate-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 contact-heading">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">
              Location
            </span>
            <h2 className="font-section-title text-3xl sm:text-4xl font-bold text-slate-dark dark:text-white">
              Find Us on Campus
            </h2>
          </div>

          <a
            href="/campus"
            className="contact-map-section rounded-2xl h-80 sm:h-96 relative overflow-hidden group cursor-pointer img-reveal block"
            style={{ backgroundImage: `url(${PAGE_PHOTOS.modernLibrary})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:from-black/60 transition-all duration-500" />
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
              {/* Pulsing green dot */}
              <div className="mb-4 relative">
                <div className="w-5 h-5 rounded-full bg-emerald pulse-dot" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                </div>
              </div>
              <p className="text-white font-semibold text-lg sm:text-xl tracking-wide">Interactive Campus Map</p>
              <p className="text-white/50 text-sm mt-2">Virtual Tour Coming Soon</p>
              <div className="mt-4 inline-flex items-center gap-2 text-emerald-light text-sm font-medium group-hover:gap-3 transition-all duration-300">
                <ExternalLink className="w-4 h-4" />
                <span>Explore Campus</span>
              </div>
            </div>
            {/* Subtle border */}
            <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
          </a>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* ============ DEPARTMENT CONTACTS ============ */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-white to-emerald-50/20 dark:from-slate-dark dark:to-slate-dark/95">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 contact-heading">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">
              Direct Lines
            </span>
            <h2 className="font-section-title text-3xl sm:text-4xl font-bold text-slate-dark dark:text-white">
              Department Contacts
            </h2>
            <p className="text-muted-foreground dark:text-white/50 mt-3 font-body-alt max-w-xl mx-auto">
              Reach out directly to the relevant department for faster assistance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 card-glow">
            {departments.map((dept, i) => (
              <div
                key={dept.name}
                className={`dept-card rounded-2xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 p-6 hover:border-emerald/30 dark:hover:border-emerald/30 hover:shadow-lg hover:shadow-emerald/5 transition-all duration-300 animate-fade-up stagger-${i + 1}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald/10 dark:bg-emerald/20 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-emerald" />
                  </div>
                  <h3 className="font-semibold text-slate-dark dark:text-white text-sm">{dept.name}</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-white/50">
                    <Phone className="w-3.5 h-3.5 text-emerald shrink-0" />
                    <a href={`tel:${dept.phone}`} className="hover:text-emerald transition-colors">{dept.phone}</a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-white/50">
                    <Mail className="w-3.5 h-3.5 text-emerald shrink-0" />
                    <a href={`mailto:${dept.email}`} className="hover:text-emerald transition-colors">{dept.email}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* ============ VISIT OUR CAMPUS ============ */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 contact-heading">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">
              Experience It Yourself
            </span>
            <h2 className="font-section-title text-3xl sm:text-4xl font-bold text-slate-dark dark:text-white">
              Visit Our Campus
            </h2>
            <p className="text-muted-foreground dark:text-white/50 mt-3 font-body-alt max-w-xl mx-auto">
              Walk through our sprawling 120-acre campus and witness world-class infrastructure first-hand.
            </p>
          </div>

          <a href="/campus" className="contact-map-section group rounded-2xl overflow-hidden relative h-72 sm:h-96 img-reveal cursor-pointer block">
            <img
              src={PAGE_PHOTOS.convocationHall}
              alt="Greenfield University Convocation Hall"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8">
              <h3 className="font-section-title text-2xl sm:text-3xl font-bold text-white mb-2">Plan Your Visit</h3>
              <p className="text-white/70 text-sm sm:text-base font-body-alt max-w-lg">
                Campus tours are available Monday through Saturday. Contact our Admissions Office to schedule a guided tour.
              </p>
            </div>
          </a>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* ============ FAQ ============ */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-emerald-50/20 to-white dark:from-slate-dark/95 dark:to-slate-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 contact-heading">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">
              FAQ
            </span>
            <h2 className="font-section-title text-3xl sm:text-4xl font-bold text-slate-dark dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="faq-item rounded-2xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex items-center justify-between w-full text-left px-6 py-5 gap-4 group"
                  aria-expanded={openFaq === idx}
                >
                  <span className="font-medium text-slate-dark dark:text-white text-sm sm:text-base group-hover:text-emerald transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald shrink-0 transition-transform duration-300 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === idx ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-5 text-sm text-muted-foreground dark:text-white/50 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* ============ SOCIAL MEDIA ============ */}
      <section className="py-20 sm:py-28 bg-white dark:bg-slate-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="mb-14 contact-heading">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">
              Follow Us
            </span>
            <h2 className="font-section-title text-3xl sm:text-4xl font-bold text-slate-dark dark:text-white">
              Stay Connected
            </h2>
            <p className="text-muted-foreground dark:text-white/50 mt-3 font-body-alt max-w-xl mx-auto">
              Connect with us on social media for the latest news, events, and campus updates.
            </p>
          </div>

          <div className="social-grid flex items-center justify-center gap-4 flex-wrap">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="social-icon w-14 h-14 rounded-2xl bg-emerald/10 dark:bg-emerald/20 flex items-center justify-center hover:bg-emerald hover:scale-110 transition-all duration-300 group"
              >
                <s.icon className="w-6 h-6 text-emerald group-hover:text-white transition-colors duration-300" />
              </a>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 text-sm text-muted-foreground dark:text-white/40">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="hover:text-emerald transition-colors duration-200"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <OtpModal
        isOpen={otpOpen}
        email={otpEmail}
        onClose={() => setOtpOpen(false)}
        onVerified={handleOtpVerified}
      />
    </main>
  );
}