'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '@/components/college/Navbar';
import { Footer } from '@/components/college/Footer';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Globe, Search, Database, Newspaper, Headphones, Monitor } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { IMAGES } from '@/lib/images';

gsap.registerPlugin(ScrollTrigger);

const featuredBooks = [
  { title: 'Introduction to Algorithms', author: 'Cormen et al.', image: IMAGES.bcaClassroom, category: 'Computer Science' },
  { title: 'Principles of Economics', author: 'Mankiw', image: IMAGES.commerce, category: 'Commerce' },
  { title: 'Organizational Behavior', author: 'Robbins & Judge', image: IMAGES.bbaBusiness, category: 'Management' },
  { title: 'Machine Learning Basics', author: 'Mitchell', image: IMAGES.mcaCoding, category: 'AI & Data' },
  { title: 'Organic Chemistry', author: 'Morrison & Boyd', image: IMAGES.science, category: 'Science' },
  { title: 'Modern Art History', author: 'Gombrich', image: IMAGES.arts, category: 'Humanities' },
];

const digitalResources = [
  { icon: Database, title: 'JSTOR Access', desc: '10,000+ academic journals and books' },
  { icon: Newspaper, title: 'Newspaper Archives', desc: 'Historical and current publications' },
  { icon: Headphones, title: 'Audio Library', desc: 'Audiobooks and lecture recordings' },
  { icon: Monitor, title: 'Digital Lab', desc: '40 workstations with research software' },
];

const libraryHours = [
  { day: 'Monday – Friday', hours: '8:00 AM – 10:00 PM' },
  { day: 'Saturday', hours: '9:00 AM – 8:00 PM' },
  { day: 'Sunday', hours: '10:00 AM – 6:00 PM' },
  { day: 'Exam Period', hours: '24/7 Access' },
];

export default function LibraryPage() {
  const heroRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      if (heroRef.current) {
        gsap.from('.lib-hero-content', {
          y: 50, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: heroRef.current, start: 'top 80%', once: true },
        });
      }

      // Section headings
      document.querySelectorAll('.lib-section-heading').forEach((el) => {
        gsap.from(el, {
          y: 30, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });

      // Bento tiles
      document.querySelectorAll('.lib-bento-tile').forEach((el, i) => {
        gsap.from(el, {
          y: 40, scale: 0.95,
          duration: 0.7, delay: i * 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      // Resource cards
      document.querySelectorAll('.lib-resource-card').forEach((el, i) => {
        gsap.from(el, {
          x: i % 2 === 0 ? -40 : 40,
          duration: 0.7, delay: i * 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${IMAGES.library})` }} />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-32 w-full">
          <div className="lib-hero-content gsap-reveal max-w-3xl">
            <span className="font-section-label inline-block text-emerald-light text-sm font-semibold uppercase tracking-widest mb-4">Knowledge Hub</span>
            <h1 className="font-hero-word text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6">
              University Library
            </h1>
            <p className="font-body-alt text-lg sm:text-xl text-white/70 max-w-xl mb-8 leading-relaxed">
              Access over 50,000 volumes, digital archives, and research databases. Our library is the intellectual heart of Greenfield University.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-8 shadow-2xl shadow-emerald/30" asChild>
                <a href="#catalog">Browse Catalog</a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 border-white/30 text-white hover:bg-white/10 bg-transparent" asChild>
                <a href="#digital">Digital Resources</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books — Bento Grid */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-white via-emerald-50/20 to-white dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="lib-section-heading gsap-reveal text-center mb-14">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Collection</span>
            <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">Featured Books</h2>
            <p className="font-body-alt text-muted-foreground max-w-2xl mx-auto text-lg">
              Explore our curated collection spanning every discipline taught at Greenfield University.
            </p>
          </div>
          <div className="glass-card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBooks.map((book) => (
              <a key={book.title} href="/programs" className="lib-bento-tile gsap-reveal group rounded-2xl overflow-hidden bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-emerald/5 transition-all duration-500 hover:-translate-y-1 block">
                <div className="h-48 overflow-hidden">
                  <img src={book.image} alt={book.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106" />
                </div>
                <div className="p-6">
                  <span className="inline-block text-xs font-semibold uppercase tracking-wider text-emerald bg-emerald/10 dark:bg-emerald/20 px-2.5 py-1 rounded-full mb-3">{book.category}</span>
                  <h3 className="font-feature-title text-lg font-semibold text-slate-dark dark:text-white mb-1">{book.title}</h3>
                  <p className="text-sm text-muted-foreground dark:text-white/50">{book.author}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* Digital Resources */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="lib-section-heading gsap-reveal text-center mb-14">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Online Access</span>
            <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">Digital Resources</h2>
            <p className="font-body-alt text-muted-foreground max-w-2xl mx-auto text-lg">
              Access world-class research databases and digital content from anywhere.
            </p>
          </div>
          <div className="glass-card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {digitalResources.map((resource) => (
              <div key={resource.title} className="lib-resource-card gsap-reveal card-glow group p-6 rounded-2xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 hover:border-emerald/30 dark:hover:border-emerald/30 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center mb-4 group-hover:bg-emerald group-hover:scale-110 transition-all duration-400">
                  <resource.icon className="w-6 h-6 text-emerald group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-feature-title text-base font-semibold text-slate-dark dark:text-white mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground dark:text-white/50">{resource.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* Library Hours */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-white via-emerald-50/20 to-white dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="lib-section-heading gsap-reveal text-center mb-14">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Visit Us</span>
            <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">Library Hours</h2>
          </div>
          <div className="max-w-lg mx-auto">
            <div className="glass-card rounded-2xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 overflow-hidden">
              {libraryHours.map((slot, i) => (
                <div key={slot.day} className={`flex items-center justify-between p-5 ${i !== libraryHours.length - 1 ? 'border-b border-emerald-50 dark:border-white/5' : ''}`}>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-emerald" />
                    <span className="font-medium text-slate-dark dark:text-white">{slot.day}</span>
                  </div>
                  <span className="font-body-alt text-muted-foreground dark:text-white/60">{slot.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Online Catalog CTA */}
      <section id="catalog" className="py-20 sm:py-28 bg-emerald-dark dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="lib-section-heading gsap-reveal">
            <div className="w-16 h-16 rounded-2xl bg-emerald/20 flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-emerald-light" />
            </div>
            <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Online Catalog</h2>
            <p className="font-body-alt text-white/60 max-w-xl mx-auto text-lg mb-8">
              Search our complete collection of books, journals, and digital media. Reserve items online and pick them up at the circulation desk.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald hover:bg-emerald text-white rounded-full px-10 shadow-lg shadow-emerald/30 text-base" asChild>
              <Link href="/">
                <Globe className="w-5 h-5 mr-2" />
                Open Catalog
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-10 border-white/20 text-white hover:bg-white/10 bg-transparent" asChild>
              <Link href="/">
                <BookOpen className="w-5 h-5 mr-2" />
                Student Guide
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* New Arrivals */}
      <NewArrivalsSection />

      {/* Library Statistics */}
      <LibraryStatsSection />

      <Footer />
    </main>
  );
}

const newBooks = [
  { title: 'Introduction to Quantum Computing', author: 'Dr. Rajesh Kumar', dept: 'Computer Science', img: IMAGES.library },
  { title: 'Behavioral Economics: A Primer', author: 'Dr. Meera Nair', dept: 'Commerce', img: IMAGES.bcaClassroom },
  { title: 'Modern Indian Poetry', author: 'Prof. Vikram Singh', dept: 'Humanities', img: IMAGES.arts },
  { title: 'Data Structures in Practice', author: 'Dr. Priya Sharma', dept: 'Computer Science', img: IMAGES.mcaCoding },
];

function NewArrivalsSection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-white via-emerald-50/20 to-white dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Fresh Off the Press</span>
          <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">New Arrivals</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newBooks.map((book) => (
            <a key={book.title} href="/programs" className="rounded-2xl overflow-hidden border border-emerald-100/50 dark:border-white/10 bg-white dark:bg-white/5 hover:-translate-y-1 transition-all duration-300 group block">
              <div className="h-40 overflow-hidden">
                <img src={book.img} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <Badge className="bg-emerald/10 text-emerald hover:bg-emerald/20 border-0 text-[10px] mb-2">{book.dept}</Badge>
                <h3 className="font-feature-title text-sm font-semibold text-slate-dark dark:text-white mb-1 line-clamp-2">{book.title}</h3>
                <p className="font-body-alt text-xs text-muted-foreground dark:text-white/50">{book.author}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const libraryStats = [
  { value: '50,000+', label: 'Books' },
  { value: '5,000+', label: 'Journals' },
  { value: '200+', label: 'Databases' },
];

function LibraryStatsSection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-emerald-dark via-emerald-dark/95 to-slate-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-around items-center">
          {libraryStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-stat-number text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">{stat.value}</p>
              <p className="font-body-alt text-sm sm:text-base text-white/60 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}