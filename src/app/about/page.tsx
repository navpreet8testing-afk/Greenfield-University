'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '@/components/college/Navbar';
import { Footer } from '@/components/college/Footer';
import {
  Eye, Target, BookOpen, FlaskConical, Coffee, BedDouble,
  Award, ShieldCheck, BadgeCheck, Library, Trophy, Globe,
  ChevronRight,
} from 'lucide-react';
import { IMAGES, FACULTY_IMAGES, PAGE_PHOTOS } from '@/lib/images';

gsap.registerPlugin(ScrollTrigger);

/* ---------- Data ---------- */

const milestones = [
  { year: '2003', title: 'Foundation', desc: 'Greenfield University established with a vision to transform higher education in the region.' },
  { year: '2008', title: 'NAAC Accreditation', desc: 'Awarded NAAC "A" grade in the first accreditation cycle, recognizing academic excellence.' },
  { year: '2013', title: 'Research Center', desc: 'Recognized as a Research Center by the university grants commission with 12+ active labs.' },
  { year: '2018', title: 'International Partnerships', desc: 'Signed MoUs with leading global universities including MIT, Oxford, and NUS Singapore.' },
  { year: '2023', title: 'NAAC A++ Accreditation', desc: 'Achieved the prestigious NAAC A++ grade, placing us among India\'s top institutions.' },
];

const leaders = [
  {
    name: 'Dr. Rajesh Sharma',
    designation: 'Chancellor',
    image: FACULTY_IMAGES[4],
    bio: 'Former IIT Director with 40+ years in academia. Led national education policy committees and received the Padma Shri for contributions to higher education.',
  },
  {
    name: 'Dr. Meera Krishnan',
    designation: 'Vice Chancellor',
    image: FACULTY_IMAGES[1],
    bio: 'PhD from MIT, published 80+ research papers. Instrumental in establishing international partnerships and raising the university\'s global standing.',
  },
  {
    name: 'Prof. Anil Deshmukh',
    designation: 'Dean of Academics',
    image: FACULTY_IMAGES[0],
    bio: '25 years of teaching experience across premier institutions. Architect of Greenfield\'s innovative interdisciplinary curriculum framework.',
  },
  {
    name: 'Dr. Sunita Patel',
    designation: 'Dean of Research',
    image: FACULTY_IMAGES[3],
    bio: 'Holds 5 patents and leads a research group of 40+ scholars. Spearheaded the university\'s leap into the NIRF Top 100 rankings.',
  },
];

const accreditations = [
  { icon: Award, title: 'NAAC A++', desc: 'Highest accreditation grade awarded by the National Assessment & Accreditation Council.' },
  { icon: Trophy, title: 'NIRF Top 100', desc: 'Ranked among India\'s top 100 universities in the National Institutional Ranking Framework.' },
  { icon: ShieldCheck, title: 'ISO 9001:2015', desc: 'Certified for quality management systems across all academic and administrative processes.' },
  { icon: BadgeCheck, title: 'UGC Recognized', desc: 'Fully recognized by the University Grants Commission under Sections 2(f) and 12(B).' },
];

const facilities = [
  { icon: Library, title: 'Central Library', stat: '50,000+ volumes', image: IMAGES.library, desc: 'A vast collection of books, journals, e-resources, and a dedicated rare manuscripts section.' },
  { icon: FlaskConical, title: 'Laboratories', stat: '25+ labs', image: IMAGES.laboratory, desc: 'State-of-the-art research and teaching labs equipped with the latest technology and instruments.' },
  { icon: Trophy, title: 'Sports Complex', stat: '15+ sports', image: IMAGES.sports, desc: 'Olympic-size swimming pool, indoor courts, cricket ground, gymnasium, and athletics track.' },
  { icon: BookOpen, title: 'Smart Classrooms', stat: '120+ rooms', image: IMAGES.bcaClassroom, desc: 'Technology-enabled classrooms with interactive boards, projectors, and video conferencing.' },
  { icon: Coffee, title: 'Cafeteria', stat: '3 outlets', image: IMAGES.cafeteria, desc: 'Hygienic, multi-cuisine food courts serving nutritious meals and refreshments throughout the day.' },
  { icon: BedDouble, title: 'Hostel', stat: '2,000+ beds', image: IMAGES.campusLife, desc: 'Separate boys\' and girls\' hostels with 24/7 Wi-Fi, laundry, recreation rooms, and security.' },
];

const globalPartners = [
  'MIT', 'University of Oxford', 'IIT Bombay', 'NUS Singapore', 'ETH Zurich', 'Stanford University',
];

/* ---------- Page Component ---------- */

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      if (heroRef.current) {
        gsap.from('.about-hero-content', {
          y: 50, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: heroRef.current, start: 'top 80%', once: true },
        });
      }

      // Section headings
      document.querySelectorAll('.about-heading').forEach((el) => {
        gsap.from(el, {
          y: 30, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });

      // Cards (leadership, accreditations, facilities)
      document.querySelectorAll('.about-card').forEach((el, i) => {
        gsap.from(el, {
          y: 40, scale: 0.95, duration: 0.7, delay: i * 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      // Items (mission points)
      document.querySelectorAll('.about-item').forEach((el, i) => {
        gsap.from(el, {
          y: 30, duration: 0.6, delay: i * 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      // Timeline milestones
      document.querySelectorAll('.about-milestone').forEach((el, i) => {
        gsap.from(el, {
          y: 30, duration: 0.6, delay: i * 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      // Partner items
      document.querySelectorAll('.about-partner').forEach((el, i) => {
        gsap.from(el, {
          y: 20, scale: 0.95, duration: 0.5, delay: i * 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* ===== Hero ===== */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${IMAGES.architecture})` }} />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-32 w-full">
          <div className="about-hero-content gsap-reveal max-w-3xl">
            <span className="font-section-label inline-block text-emerald-light text-sm font-semibold uppercase tracking-widest mb-4">Established 2003</span>
            <h1 className="font-hero-word text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6">
              About Greenfield University
            </h1>
            <p className="font-body-alt text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed">
              Over two decades of academic excellence, innovation, and holistic development — recognized with NAAC A++ accreditation for our unwavering commitment to quality education.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Vision & Mission ===== */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-white via-emerald-50/30 to-white dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 glass-card">
          <div className="about-heading gsap-reveal text-center mb-16">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Our Purpose</span>
            <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">Vision &amp; Mission</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Vision */}
            <div className="about-card gsap-reveal p-8 rounded-2xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-emerald/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-emerald" />
              </div>
              <h3 className="font-feature-title text-2xl font-bold text-slate-dark dark:text-white mb-4">Our Vision</h3>
              <p className="font-body-alt text-muted-foreground dark:text-white/60 leading-relaxed text-lg">
                To be a globally recognized center of academic excellence, nurturing innovation-driven leaders who contribute meaningfully to society through research, entrepreneurship, and compassionate leadership.
              </p>
            </div>

            {/* Mission */}
            <div className="about-card gsap-reveal p-8 rounded-2xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-gold-dark" />
              </div>
              <h3 className="font-feature-title text-2xl font-bold text-slate-dark dark:text-white mb-4">Our Mission</h3>
              <ul className="space-y-4">
                {[
                  'Deliver quality education through an industry-aligned, interdisciplinary curriculum that prepares students for a rapidly evolving world.',
                  'Foster a research-driven culture that encourages innovation, critical thinking, and scholarly publication across all disciplines.',
                  'Build strong industry and international academic partnerships to provide students with global exposure and real-world experience.',
                  'Promote holistic development through sports, arts, community service, and leadership programs that shape well-rounded individuals.',
                ].map((point, i) => (
                  <li key={i} className="about-item gsap-reveal flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
                    <span className="font-body-alt text-muted-foreground dark:text-white/60 leading-relaxed text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* ===== History & Heritage ===== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="about-heading gsap-reveal text-center mb-16">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Our Journey</span>
            <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">History &amp; Heritage</h2>
            <p className="font-body-alt text-muted-foreground dark:text-white/50 max-w-2xl mx-auto text-lg">
              From a bold idea in 2003 to one of India&apos;s most respected universities — every milestone has been a testament to our community&apos;s relentless pursuit of excellence.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-emerald/20 -translate-x-1/2" />

            <div className="space-y-12">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`about-milestone gsap-reveal relative flex flex-col sm:flex-row gap-4 sm:gap-8 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 sm:left-1/2 w-3 h-3 bg-emerald rounded-full -translate-x-1/2 mt-2 ring-4 ring-emerald/10 z-10" />

                  {/* Content */}
                  <div className={`ml-14 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                    <span className="font-stat-number text-3xl sm:text-4xl font-bold text-emerald">{m.year}</span>
                    <h3 className="font-feature-title text-lg font-semibold text-slate-dark dark:text-white mt-1 mb-2">{m.title}</h3>
                    <p className="font-body-alt text-sm text-muted-foreground dark:text-white/50 leading-relaxed">{m.desc}</p>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden sm:block sm:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* ===== Leadership Team ===== */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-white via-emerald-50/20 to-white dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="about-heading gsap-reveal text-center mb-16">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Our Leaders</span>
            <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4"><span className="gradient-text">Leadership Team</span></h2>
            <p className="font-body-alt text-muted-foreground dark:text-white/50 max-w-2xl mx-auto text-lg">
              Guided by visionaries with decades of experience in academia, research, and institutional leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 card-glow">
            {leaders.map((leader, i) => (
              <div key={leader.name} className={`about-card gsap-reveal group rounded-2xl overflow-hidden bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 hover:border-emerald/30 dark:hover:border-emerald/30 shadow-sm hover:shadow-xl hover:shadow-emerald/5 transition-all duration-500 hover:-translate-y-1 animate-fade-up stagger-${i + 1}`}>
                <div className="h-56 overflow-hidden img-reveal">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald">{leader.designation}</span>
                  <h3 className="font-feature-title text-lg font-semibold text-slate-dark dark:text-white mt-1">{leader.name}</h3>
                  <p className="font-body-alt text-sm text-muted-foreground dark:text-white/50 mt-3 leading-relaxed">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* ===== Accreditations & Rankings ===== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="about-heading gsap-reveal text-center mb-16">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Recognition</span>
            <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">Accreditations &amp; Rankings</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {accreditations.map((item) => (
              <div key={item.title} className="about-card gsap-reveal group text-center p-8 rounded-2xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 hover:border-emerald/30 dark:hover:border-emerald/30 shadow-sm hover:shadow-xl hover:shadow-emerald/5 transition-all duration-500 hover:-translate-y-1">
                <div className="w-16 h-16 rounded-2xl bg-emerald/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-emerald group-hover:scale-110 transition-all duration-400">
                  <item.icon className="w-8 h-8 text-emerald group-hover:text-white transition-colors duration-400" />
                </div>
                <h3 className="font-feature-title text-lg font-bold text-slate-dark dark:text-white mb-2">{item.title}</h3>
                <p className="font-body-alt text-sm text-muted-foreground dark:text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* ===== Campus Showcase ===== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="about-heading gsap-reveal text-center mb-16">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Campus Gallery</span>
            <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">Explore Our Campus</h2>
            <p className="font-body-alt text-muted-foreground dark:text-white/50 max-w-2xl mx-auto text-lg">
              A visual journey through our state-of-the-art facilities and vibrant campus life.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { src: PAGE_PHOTOS.campusAerial, title: 'Campus Aerial View', span: 'sm:col-span-2 lg:col-span-2' },
              { src: PAGE_PHOTOS.auditorium, title: 'Auditorium', span: '' },
              { src: PAGE_PHOTOS.researchLab, title: 'Research Laboratory', span: '' },
              { src: PAGE_PHOTOS.sportsComplex, title: 'Sports Complex', span: '' },
              { src: PAGE_PHOTOS.modernLibrary, title: 'Modern Library', span: 'sm:col-span-2' },
              { src: PAGE_PHOTOS.convocationHall, title: 'Convocation Hall', span: '' },
            ].map((photo) => (
              <a key={photo.title} href="/gallery" className={`about-card gsap-reveal group rounded-2xl overflow-hidden ${photo.span}`}>
                <div className="relative h-64 sm:h-72 lg:h-80">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <span className="font-feature-title text-white text-sm font-semibold bg-emerald/80 px-3 py-1.5 rounded-full backdrop-blur-sm">{photo.title}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* ===== Campus Facilities ===== */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-white via-emerald-50/20 to-white dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="about-heading gsap-reveal text-center mb-16">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Our Campus</span>
            <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">Campus Facilities</h2>
            <p className="font-body-alt text-muted-foreground dark:text-white/50 max-w-2xl mx-auto text-lg">
              A 120-acre campus designed to inspire learning, creativity, and personal growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 card-glow">
            {facilities.map((facility, i) => (
              <a key={facility.title} href="/campus" className={`about-card gsap-reveal group rounded-2xl overflow-hidden bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 hover:border-emerald/30 dark:hover:border-emerald/30 shadow-sm hover:shadow-xl hover:shadow-emerald/5 transition-all duration-500 hover:-translate-y-1 animate-fade-up stagger-${i + 1}`}>
                <div className="h-44 overflow-hidden relative img-reveal">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <span className="font-stat-number text-sm font-semibold text-white bg-emerald/80 px-3 py-1 rounded-full">{facility.stat}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald transition-colors duration-400">
                      <facility.icon className="w-5 h-5 text-emerald group-hover:text-white transition-colors duration-400" />
                    </div>
                    <h3 className="font-feature-title text-lg font-semibold text-slate-dark dark:text-white">{facility.title}</h3>
                  </div>
                  <p className="font-body-alt text-sm text-muted-foreground dark:text-white/50 leading-relaxed">{facility.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* ===== Global Partners ===== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="about-heading gsap-reveal text-center mb-16">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Worldwide Network</span>
            <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">Global Partners</h2>
            <p className="font-body-alt text-muted-foreground dark:text-white/50 max-w-2xl mx-auto text-lg">
              Strategic collaborations with world-class institutions for student exchange, joint research, and global exposure.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {globalPartners.map((partner) => (
              <div
                key={partner}
                className="about-partner gsap-reveal group flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 hover:border-emerald/30 dark:hover:border-emerald/30 hover:shadow-lg hover:shadow-emerald/5 transition-all duration-400 hover:-translate-y-1"
              >
                <Globe className="w-8 h-8 text-emerald/60 group-hover:text-emerald mb-3 transition-colors duration-400" />
                <span className="font-feature-title text-sm sm:text-base font-semibold text-slate-dark dark:text-white text-center leading-tight">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}