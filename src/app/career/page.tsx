'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '@/components/college/Navbar';
import { Footer } from '@/components/college/Footer';
import { Button } from '@/components/ui/button';
import { GraduationCap, TrendingUp, Users, Briefcase, MapPin, ArrowRight, Building2, DollarSign, Clock } from 'lucide-react';
import { IMAGES } from '@/lib/images';

gsap.registerPlugin(ScrollTrigger);

const placementStats = [
  { label: 'Students Placed', value: 2800, suffix: '+', icon: GraduationCap },
  { label: 'Highest Package', value: 42, suffix: ' LPA', icon: TrendingUp },
  { label: 'Average Package', value: 8.5, suffix: ' LPA', icon: DollarSign },
  { label: 'Recruiting Companies', value: 120, suffix: '+', icon: Building2 },
  { label: 'Internship Offers', value: 950, suffix: '+', icon: Briefcase },
  { label: 'Students Pursuing Higher Ed', value: 320, suffix: '+', icon: Users },
];

const recruiters = [
  'Google', 'Microsoft', 'Amazon', 'Infosys', 'TCS', 'Wipro',
  'Deloitte', 'Accenture', 'IBM', 'Oracle', 'Adobe', 'Salesforce',
];

const jobOpenings = [
  { role: 'Software Engineer', company: 'Google India', location: 'Bangalore', type: 'Full-time' },
  { role: 'Data Analyst', company: 'Deloitte', location: 'Mumbai', type: 'Full-time' },
  { role: 'Business Development Associate', company: 'Amazon', location: 'Hyderabad', type: 'Full-time' },
  { role: 'UI/UX Design Intern', company: 'Adobe', location: 'Remote', type: 'Internship' },
  { role: 'Cloud Engineer', company: 'Microsoft', location: 'Pune', type: 'Full-time' },
  { role: 'Marketing Executive', company: 'Accenture', location: 'Delhi', type: 'Full-time' },
];

const careerServices = [
  { title: 'Resume Building', desc: 'Professional resume workshops and one-on-one reviews with industry experts.' },
  { title: 'Mock Interviews', desc: 'Practice sessions with alumni and HR professionals from top companies.' },
  { title: 'Skill Development', desc: 'Certification programs in cloud computing, data science, and digital marketing.' },
  { title: 'Career Counseling', desc: 'Personalized guidance from experienced career counselors throughout your journey.' },
];

function PlacementStatCard({ stat, index }: { stat: typeof placementStats[0]; index: number }) {
  const numberRef = useRef<HTMLSpanElement>(null);

  // Light counter animation — only animates the number, never hides the card
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (numberRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: { trigger: numberRef.current, start: 'top 90%', once: true },
          onUpdate: () => {
            if (numberRef.current) {
              const display = stat.value % 1 !== 0 ? obj.val.toFixed(1) : Math.round(obj.val).toLocaleString();
              numberRef.current.textContent = display + stat.suffix;
            }
          },
        });
      }
    });
    return () => ctx.revert();
  }, [index, stat]);

  return (
    <div className="group relative p-6 rounded-2xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 hover:border-emerald/30 dark:hover:border-emerald/30 shadow-sm hover:shadow-xl hover:shadow-emerald/5 transition-all duration-500 hover:-translate-y-1">
      <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center mb-4 group-hover:bg-emerald group-hover:scale-110 transition-all duration-400">
        <stat.icon className="w-6 h-6 text-emerald group-hover:text-white transition-colors duration-400" />
      </div>
      <div className="text-3xl sm:text-4xl font-bold text-slate-dark dark:text-white mb-1">
        <span ref={numberRef} className="font-stat-number stat-number">0{stat.suffix}</span>
      </div>
      <div className="text-sm text-muted-foreground dark:text-white/60 font-medium">{stat.label}</div>
    </div>
  );
}

export default function CareerPage() {
  // Hero fade-in only — no opacity:0 on any content
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
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${IMAGES.career})` }} />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-32 w-full">
          <div ref={heroRef} className="max-w-3xl">
            <span className="font-section-label inline-block text-emerald-light text-sm font-semibold uppercase tracking-widest mb-4">Placements</span>
            <h1 className="font-hero-word text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6">
              Launch Your Career
            </h1>
            <p className="font-body-alt text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed">
              94% placement rate with top recruiters. Our dedicated career services team ensures every student is industry-ready.
            </p>
          </div>
        </div>
      </section>

      {/* Placement Stats */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-white via-emerald-50/30 to-white dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Our Record</span>
            <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">Placement Statistics</h2>
            <p className="font-body-alt text-muted-foreground max-w-2xl mx-auto text-lg">
              Consistently outstanding results year after year.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {placementStats.map((stat, i) => (
              <PlacementStatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Recruiters Marquee */}
      <section className="relative py-16 sm:py-20 overflow-hidden bg-gradient-to-b from-white via-emerald-light/20 to-white dark:from-slate-900 dark:via-slate-800/30 dark:to-slate-900">
        <div className="text-center mb-12 px-4 sm:px-6">
          <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Our Recruiters</span>
          <h2 className="font-section-title text-3xl sm:text-4xl font-bold text-slate-dark dark:text-white">Top Recruiting Companies</h2>
        </div>
        <div className="mb-4 overflow-hidden">
          <div className="marquee-ltr flex whitespace-nowrap">
            {[...recruiters, ...recruiters, ...recruiters, ...recruiters].map((name, i) => (
              <div key={`r-${i}`} className="flex-shrink-0 mx-3 sm:mx-4">
                <div className="flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm hover:border-emerald/40 transition-colors min-w-[160px] sm:min-w-[180px]">
                  <span className="font-feature-title text-lg sm:text-xl font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap">{name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10" />
      </section>

      <div className="section-divider-gradient" />

      {/* Career Services */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Support</span>
            <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4 gradient-text">Career Services</h2>
            <p className="font-body-alt text-muted-foreground max-w-2xl mx-auto text-lg">
              Comprehensive support to prepare you for the professional world.
            </p>
          </div>
          <div className="glass-card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerServices.map((service) => (
              <div key={service.title} className="card-glow p-6 rounded-2xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 hover:border-emerald/30 dark:hover:border-emerald/30 hover:-translate-y-1 transition-all duration-300">
                <h3 className="font-feature-title text-base font-semibold text-slate-dark dark:text-white mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground dark:text-white/50 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* Job Openings */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-white via-emerald-50/20 to-white dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Opportunities</span>
            <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">Current Job Openings</h2>
            <p className="font-body-alt text-muted-foreground max-w-2xl mx-auto text-lg">
              Latest positions available exclusively for Greenfield University students and alumni.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {jobOpenings.map((job) => (
              <a key={job.role + job.company} href="/admissions" className="card-glow group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 hover:border-emerald/30 dark:hover:border-emerald/30 hover:shadow-md hover:shadow-emerald/5 transition-all duration-300 cursor-pointer block">
                <div className="flex-1">
                  <h4 className="font-feature-title font-semibold text-slate-dark dark:text-white group-hover:text-emerald transition-colors">{job.role}</h4>
                  <p className="text-sm text-muted-foreground dark:text-white/50">{job.company}</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground dark:text-white/50">
                    <MapPin className="w-3.5 h-3.5" />{job.location}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground dark:text-white/50">
                    <Clock className="w-3.5 h-3.5" />{job.type}
                  </span>
                  <ArrowRight className="w-4 h-4 text-emerald opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button size="lg" className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-8 shadow-lg shadow-emerald/20" asChild>
              <Link href="/contact"><Briefcase className="w-5 h-5 mr-2" />View All Openings</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}