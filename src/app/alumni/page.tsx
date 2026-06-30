'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { Navbar } from '@/components/college/Navbar';
import { Footer } from '@/components/college/Footer';
import { Button } from '@/components/ui/button';
import { Users, Globe, MapPin, Award, Briefcase, Handshake, Calendar, Heart, MessageCircle } from 'lucide-react';
import { IMAGES, FACULTY_IMAGES } from '@/lib/images';

const alumniStats = [
  { label: 'Alumni Members', value: 18000, suffix: '+', icon: Users },
  { label: 'Countries', value: 35, suffix: '+', icon: Globe },
  { label: 'Chapters', value: 12, suffix: '', icon: MapPin },
];

const featuredAlumni = [
  { name: 'Arjun Mehta', batch: 'BCA 2015', role: 'Senior Software Engineer at Google', image: FACULTY_IMAGES[0], quote: 'Greenfield gave me the foundation to dream big and the skills to achieve those dreams.' },
  { name: 'Priya Nair', batch: 'BBA 2013', role: 'VP of Marketing, Deloitte India', image: FACULTY_IMAGES[1], quote: 'The mentorship and industry exposure I received here shaped my entire career trajectory.' },
  { name: 'Rohan Kapoor', batch: 'MCA 2016', role: 'Founder & CEO, TechNova Solutions', image: FACULTY_IMAGES[4], quote: 'The entrepreneurial spirit fostered at GU gave me the courage to start my own company.' },
  { name: 'Sneha Reddy', batch: 'B.Com 2014', role: 'Director, KPMG Financial Advisory', image: FACULTY_IMAGES[3], quote: 'Every professor I had at Greenfield invested in my growth both academically and personally.' },
];

const networkBenefits = [
  { icon: Briefcase, title: 'Job Referrals', desc: 'Exclusive job postings and referral programs through our alumni network.' },
  { icon: Handshake, title: 'Mentorship', desc: 'Connect with experienced alumni mentors for career guidance.' },
  { icon: Award, title: 'Scholarships', desc: 'Alumni-funded scholarships for deserving current students.' },
  { icon: Heart, title: 'Community', desc: 'Regional chapters and annual gatherings to stay connected.' },
  { icon: MessageCircle, title: 'Knowledge Exchange', desc: 'Webinars, talks, and workshops led by distinguished alumni.' },
  { icon: Calendar, title: 'Events', desc: 'Annual reunions, homecoming, and professional networking events.' },
];

const upcomingEvents = [
  { title: 'Annual Alumni Meet 2025', date: 'January 18, 2025', location: 'Main Campus Auditorium' },
  { title: 'Silicon Valley Chapter Meetup', date: 'February 8, 2025', location: 'San Francisco, CA' },
  { title: 'Mumbai Alumni Mixer', date: 'February 22, 2025', location: 'The Taj Mahal Palace, Mumbai' },
];

export default function AlumniPage() {
  // Hero subtle slide-in only — no opacity hiding
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (heroRef.current) {
      gsap.from(heroRef.current, {
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
      });
    }
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${IMAGES.graduation})` }} />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-32 w-full">
          <div ref={heroRef} className="max-w-3xl">
            <span className="font-section-label inline-block text-emerald-light text-sm font-semibold uppercase tracking-widest mb-4">Forever Connected</span>
            <h1 className="font-hero-word text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6">
              Alumni Network
            </h1>
            <p className="font-body-alt text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed">
              Join 18,000+ graduates who are shaping industries across 35+ countries. Once a Greenfield student, always part of the family.
            </p>
          </div>
        </div>
      </section>

      {/* Alumni Stats */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-white via-emerald-50/30 to-white dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Our Community</span>
            <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">Alumni at a Glance</h2>
          </div>
          <div className="glass-card grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {alumniStats.map((stat) => (
              <div key={stat.label} className="group text-center p-8 rounded-2xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 hover:border-emerald/30 dark:hover:border-emerald/30 shadow-sm hover:shadow-xl hover:shadow-emerald/5 transition-all duration-500 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-emerald/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald group-hover:scale-110 transition-all duration-400">
                  <stat.icon className="w-7 h-7 text-emerald group-hover:text-white transition-colors duration-400" />
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-slate-dark dark:text-white mb-2">
                  <span className="font-stat-number">{stat.value}{stat.suffix}</span>
                </div>
                <div className="text-sm text-muted-foreground dark:text-white/60 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* Featured Alumni Stories */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Success Stories</span>
            <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">Featured Alumni</h2>
            <p className="font-body-alt text-muted-foreground max-w-2xl mx-auto text-lg">
              Our graduates are making their mark across the globe.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAlumni.map((alum) => (
              <div key={alum.name} className="card-glow group rounded-2xl overflow-hidden bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 hover:border-emerald/30 dark:hover:border-emerald/30 shadow-sm hover:shadow-xl hover:shadow-emerald/5 transition-all duration-500 hover:-translate-y-1">
                <div className="h-52 overflow-hidden">
                  <img
                    src={alum.image}
                    alt={alum.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald">{alum.batch}</span>
                  <h3 className="font-feature-title text-lg font-semibold text-slate-dark dark:text-white mt-1">{alum.name}</h3>
                  <p className="text-xs text-muted-foreground dark:text-white/50 mt-0.5">{alum.role}</p>
                  <p className="font-quote text-sm text-slate-600 dark:text-white/60 mt-3 italic leading-relaxed">&ldquo;{alum.quote}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* Network Benefits */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-white via-emerald-50/20 to-white dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Benefits</span>
            <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">Why Join the Network</h2>
            <p className="font-body-alt text-muted-foreground max-w-2xl mx-auto text-lg">
              Stay connected and unlock exclusive opportunities.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {networkBenefits.map((benefit) => (
              <div key={benefit.title} className="card-glow group p-6 rounded-2xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 hover:border-emerald/30 dark:hover:border-emerald/30 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center mb-4 group-hover:bg-emerald group-hover:scale-110 transition-all duration-400">
                  <benefit.icon className="w-6 h-6 text-emerald group-hover:text-white transition-colors duration-400" />
                </div>
                <h3 className="font-feature-title text-base font-semibold text-slate-dark dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground dark:text-white/50 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* Reunions & Events */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Gatherings</span>
            <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">Upcoming Events</h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.title} className="card-glow group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 hover:border-emerald/30 dark:hover:border-emerald/30 hover:shadow-md transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-emerald" />
                  </div>
                  <div>
                    <h4 className="font-feature-title font-semibold text-slate-dark dark:text-white group-hover:text-emerald transition-colors">{event.title}</h4>
                    <p className="text-sm text-muted-foreground dark:text-white/50 mt-1">{event.date}</p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground dark:text-white/50 sm:ml-4">
                  <MapPin className="w-3.5 h-3.5" />{event.location}
                </span>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button size="lg" className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-8 shadow-lg shadow-emerald/20" asChild>
              <Link href="/contact">Join the Network</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}