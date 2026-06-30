'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Faculty', href: '/about' },
  { label: 'Campus Life', href: '/campus' },
  { label: 'Photo Gallery', href: '/gallery' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Contact', href: '/contact' },
];

const resourceLinks = [
  { label: 'Academic Calendar', href: '/downloads' },
  { label: 'Library Portal', href: '/library' },
  { label: 'Student Portal', href: '/portal' },
  { label: 'Scholarship Info', href: '/admissions' },
  { label: 'Placement Cell', href: '/career' },
  { label: 'Research Portal', href: '/about' },
];

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/greenfielduniversity', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/greenfield_uni', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/greenfielduniversity', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/school/greenfield-university', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/@greenfielduniversity', label: 'YouTube' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubscribe = () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
      });
      return;
    }
    toast({
      title: 'Subscribed!',
      description: 'You will receive our latest updates and admission news.',
    });
    setEmail('');
  };

  return (
    <footer className="bg-slate-dark dark:bg-slate-900 text-white">
      {/* Newsletter Banner */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-section-title text-xl sm:text-2xl text-white">
              Stay Connected
            </h3>
            <p className="font-body-alt text-white/60 text-sm mt-2 max-w-md">
              Subscribe to our newsletter for latest updates, events, and admission news.
            </p>
          </div>
          <div className="flex w-full md:w-auto max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
              placeholder="Enter your email"
              className="flex-1 min-w-0 px-5 py-3 rounded-l-full bg-white/10 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-emerald/50 transition-colors"
              aria-label="Email address"
            />
            <button
              onClick={handleSubscribe}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-r-full bg-emerald hover:bg-emerald/90 text-white text-sm font-medium transition-colors duration-300 shrink-0"
              aria-label="Subscribe"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Subscribe</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notice Ticker */}
      <div className="bg-emerald py-2.5 overflow-hidden">
        <div className="ticker-animate flex whitespace-nowrap">
          {[1, 2].map((dup) => (
            <div key={dup} className="flex items-center gap-8 mr-8">
              <span className="text-sm font-medium text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                Admissions Open 2025-26 — Apply Now!
              </span>
              <span className="text-sm font-medium text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                CodeStorm 2025 — National Hackathon Registrations Open
              </span>
              <span className="text-sm font-medium text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                94% Placement Record — 300+ Companies Recruited
              </span>
              <span className="text-sm font-medium text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                NAAC A++ Accredited — Among Top Universities
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-lg bg-emerald flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <div>
                <span className="font-bold text-lg text-white">Greenfield</span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-emerald">University</span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Shaping futures through academic excellence, innovation, and holistic development since 2003.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-emerald transition-colors duration-300"
                >
                  <s.icon className="w-4 h-4 text-white/60 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-5 text-white/90">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-emerald transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-sm mb-5 text-white/90">Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-emerald transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-5 text-white/90">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                <span className="text-sm text-white/70">University Road, Academic City, State 123456, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald shrink-0" />
                <a href="tel:+917973290805" className="text-sm text-white/70">+91 7973290805</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald shrink-0" />
                <a href="mailto:navpreet8testing@gmail.com" className="text-sm text-white/70">navpreet8testing@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30 font-footer">
            © {new Date().getFullYear()} Greenfield University. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/30">
            <a href="/contact" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="/contact" className="hover:text-white/60 transition-colors">Terms of Service</a>
            <a href="/" className="hover:text-white/60 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>

      </footer>
  );
}