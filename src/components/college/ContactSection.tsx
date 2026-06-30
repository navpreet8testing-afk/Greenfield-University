'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { OtpModal } from '@/components/OtpModal';
import { IMAGES } from '@/lib/images';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { icon: MapPin, title: 'Address', details: ['University Road, Academic City', 'State 123456, India'] },
  { icon: Phone, title: 'Phone', details: ['+91 7973290805'] },
  { icon: Mail, title: 'Email', details: ['navpreet8testing@gmail.com'] },
  { icon: Clock, title: 'Office Hours', details: ['Mon–Fri: 9:00 AM – 5:00 PM', 'Sat: 9:00 AM – 1:00 PM'] },
];

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const pendingFormRef = useRef<HTMLFormElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-heading', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      gsap.fromTo('.contact-info', { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-info', start: 'top 85%' },
      });

      gsap.fromTo('.contact-form', { opacity: 0, x: 40 }, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-form', start: 'top 85%' },
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
        toast({ title: 'Message Sent!', description: 'We will get back to you within 24 hours.' });
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

  return (
    <section id="contact" ref={sectionRef} className="py-20 sm:py-28 bg-gradient-to-b from-white to-emerald-50/20 dark:from-slate-dark/95 dark:to-slate-dark/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 contact-heading">
          <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Get in Touch</span>
          <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark mb-4">
            Contact Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-body-alt">
            Have questions? We&apos;d love to hear from you. Reach out and our team will respond promptly.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 contact-info">
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div key={item.title} className="flex gap-4 group">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center group-hover:bg-emerald transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-emerald group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-dark text-sm mb-1">{item.title}</h4>
                    {item.details.map((d) => (
                      <p key={d} className="text-sm text-muted-foreground">{d}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <a
              href="/campus"
              className="mt-8 rounded-2xl h-56 relative overflow-hidden group cursor-pointer block"
              style={{ backgroundImage: `url(${IMAGES.architecture})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:from-black/60 transition-all duration-500" />
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                {/* Pulsing green dot */}
                <div className="mb-3 relative">
                  <div className="w-4 h-4 rounded-full bg-emerald pulse-dot" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                </div>
                <p className="text-white font-semibold text-sm tracking-wide">Interactive Campus Map</p>
                <p className="text-white/50 text-xs mt-1.5">Virtual Tour Coming Soon</p>
              </div>
              {/* Subtle border */}
              <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
            </a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 contact-form">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-border/50 p-6 sm:p-8 shadow-sm dark:bg-white/5 dark:border-white/10">
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div className="space-y-2">
                  <Label htmlFor="contact-name" className="text-sm">Your Name *</Label>
                  <Input id="contact-name" name="name" required placeholder="Full name"
                    className="rounded-xl h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email" className="text-sm">Email Address *</Label>
                  <Input id="contact-email" name="email" type="email" required placeholder="you@example.com"
                    className="rounded-xl h-11" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div className="space-y-2">
                  <Label htmlFor="contact-phone" className="text-sm">Phone Number *</Label>
                  <Input id="contact-phone" name="phone" type="tel" required placeholder="+91 7973290805"
                    className="rounded-xl h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-subject" className="text-sm">Subject *</Label>
                  <Input id="contact-subject" name="subject" required placeholder="How can we help?"
                    className="rounded-xl h-11" />
                </div>
              </div>
              <div className="space-y-2 mb-6">
                <Label htmlFor="contact-message" className="text-sm">Message *</Label>
                <Textarea id="contact-message" name="message" required rows={5} placeholder="Tell us more about your inquiry..."
                  className="rounded-xl resize-none" />
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-emerald hover:bg-emerald-dark text-white rounded-xl h-12 px-8 font-semibold shadow-lg shadow-emerald/20 hover:shadow-emerald/40 transition-all"
              >
                {submitting ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                ) : (
                  <><Send className="w-4 h-4 mr-2" /> Send Message</>
                )}
              </Button>
            </form>
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