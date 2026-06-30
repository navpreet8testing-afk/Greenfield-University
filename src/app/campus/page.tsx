'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '@/components/college/Navbar';
import { Footer } from '@/components/college/Footer';
import {
  Dumbbell, Users, BedDouble, BookOpen, FlaskConical, Coffee,
  Camera, CalendarDays, PartyPopper, Music, Wrench,
  TreePine, Wifi, Shield, Utensils, Monitor, ChevronRight,
  MapPin, Clock, Star,
} from 'lucide-react';
import { IMAGES, PAGE_PHOTOS } from '@/lib/images';

gsap.registerPlugin(ScrollTrigger);

/* ── Data ───────────────────────────────────────────────── */

const campusStats = [
  { icon: TreePine, value: '150+', label: 'Acres of Green Campus' },
  { icon: Users, value: '30+', label: 'Student Clubs' },
  { icon: Star, value: '4.8★', label: 'Student Satisfaction' },
  { icon: Shield, value: '24/7', label: 'Campus Security' },
];

const sportsFacilities = [
  { title: 'Cricket Ground', desc: 'International-standard cricket ground with practice nets and floodlights for day-night matches.' },
  { title: 'Swimming Pool', desc: 'Olympic-size heated swimming pool with trained lifeguards and coaching staff.' },
  { title: 'Indoor Sports Arena', desc: 'Badminton, table tennis, basketball, and volleyball courts in a climate-controlled arena.' },
  { title: 'Gymnasium', desc: 'State-of-the-art fitness center with modern equipment, personal trainers, and yoga studio.' },
  { title: 'Athletics Track', desc: '400m synthetic athletics track with facilities for long jump, high jump, and shot put.' },
  { title: 'Tennis & Squash Courts', desc: 'Professional-grade tennis and squash courts available for practice and tournaments.' },
];

const clubs = [
  { name: 'Robotics Club', icon: Monitor, members: '120+', desc: 'Build robots, compete in national-level competitions, and explore AI & embedded systems.' },
  { name: 'Dramatics Society', icon: Music, members: '80+', desc: 'Stage plays, street theatre, and improv workshops throughout the year.' },
  { name: 'Debate & MUN Society', icon: Users, members: '95+', desc: 'Regular debates, Model UN conferences, and public speaking competitions.' },
  { name: 'Photography Club', icon: Camera, members: '60+', desc: 'Photo walks, exhibitions, and workshops with professional photographers.' },
  { name: 'Eco & Sustainability Club', icon: TreePine, members: '70+', desc: 'Campus greening initiatives, waste management drives, and eco-awareness campaigns.' },
  { name: 'Coding & Hackathon Club', icon: Wrench, members: '150+', desc: 'Hosts CodeStorm hackathon, competitive coding sessions, and open-source contributions.' },
  { name: 'Sports Club', icon: Dumbbell, members: '200+', desc: 'Organizes inter-department tournaments and represents the university at state and national level.' },
  { name: 'Music & Dance Society', icon: PartyPopper, members: '110+', desc: 'Classical and western music, choreography, and performances at fests and events.' },
];

const hostelFeatures = [
  { icon: Wifi, title: 'High-Speed Wi-Fi', desc: '24/7 fiber-optic internet in every room and common area.' },
  { icon: Utensils, title: 'Mess & Dining', desc: 'Nutritious multi-cuisine meals with vegetarian and non-vegetarian options.' },
  { icon: Shield, title: '24/7 Security', desc: 'CCTV surveillance, biometric entry, and round-the-clock wardens.' },
  { icon: Monitor, title: 'Common Rooms', desc: 'TV, indoor games, and recreational spaces for socializing.' },
];

const labs = [
  { title: 'Computer Science Lab', desc: '200+ workstations with latest hardware, dual monitors, and high-speed networking for coding, AI/ML, and data science projects.', image: PAGE_PHOTOS.pgComputerLab },
  { title: 'Research Lab', desc: 'Dedicated research facility for PhD scholars with advanced instrumentation, funded projects, and publication support.', image: PAGE_PHOTOS.researchLab },
  { title: 'Smart Classroom', desc: 'Technology-enabled classrooms with interactive smart boards, projectors, and video conferencing for hybrid learning.', image: PAGE_PHOTOS.ugClassroom },
  { title: 'Biotechnology Lab', desc: 'Fully equipped biotech lab with PCR machines, centrifuges, spectrophotometers, and tissue culture facilities.', image: IMAGES.laboratory },
];

const events = [
  { title: 'Annual Technical Fest — TechVista', date: 'March 2025', desc: 'Three-day national-level technical festival with hackathons, coding contests, robotics challenges, and tech talks by industry leaders.', image: IMAGES.hackathon },
  { title: 'Cultural Extravaganza — Rang Tarang', date: 'February 2025', desc: 'A vibrant celebration of music, dance, drama, and art featuring performances by students and guest artists.', image: IMAGES.cultural },
  { title: 'Greenfield Model UN Conference', date: 'January 2025', desc: 'Inter-collegiate MUN conference with 500+ delegates debating global issues across multiple committees.', image: PAGE_PHOTOS.auditorium },
  { title: 'Inter-University Sports Meet', date: 'November 2024', desc: 'Annual sports championship hosting 20+ universities competing across 15 disciplines over 5 days.', image: PAGE_PHOTOS.sportsComplex },
];

const workshops = [
  { title: 'AI & Machine Learning Bootcamp', category: 'Technology', desc: 'Intensive 3-day hands-on workshop covering neural networks, NLP, and computer vision with industry mentors.' },
  { title: 'Entrepreneurship & Startup Summit', category: 'Business', desc: 'Pitch competitions, investor meet-and-greet, and masterclasses by successful founders.' },
  { title: 'Research Methodology Workshop', category: 'Academics', desc: 'Training in research design, statistical analysis, academic writing, and publication ethics.' },
  { title: 'Digital Marketing Masterclass', category: 'Marketing', desc: 'SEO, social media strategy, Google Ads, and analytics with live campaign projects.' },
  { title: 'Cybersecurity Awareness Camp', category: 'Technology', desc: 'Ethical hacking, CTF challenges, and security best practices for students and faculty.' },
  { title: 'Personality Development & Soft Skills', category: 'Personal Growth', desc: 'Communication, leadership, teamwork, and interview preparation by certified trainers.' },
];

/* ── Page ───────────────────────────────────────────────── */

export default function CampusPage() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.from('.campus-hero-content', { y: 30, duration: 0.8, ease: 'power3.out' });
      }
      document.querySelectorAll('.campus-heading').forEach((el) => {
        gsap.from(el, { y: 30, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
      });
      document.querySelectorAll('.campus-card').forEach((el, i) => {
        gsap.from(el, { y: 40, duration: 0.7, delay: i * 0.08, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
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
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${PAGE_PHOTOS.campusAerial})` }} />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-32 w-full">
          <div className="campus-hero-content max-w-3xl">
            <span className="font-section-label inline-block text-emerald-light text-sm font-semibold uppercase tracking-widest mb-4">Life at Greenfield</span>
            <h1 className="font-hero-word text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6">
              Campus Life
            </h1>
            <p className="font-body-alt text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed">
              A vibrant 150-acre campus where academics meet adventure. World-class facilities, thriving communities, and unforgettable experiences await you.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Campus Overview ===== */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="campus-heading text-center mb-16">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Explore</span>
            <h2 className="font-section-title text-3xl sm:text-4xl font-bold text-slate-dark dark:text-white mb-4">Campus Overview</h2>
            <p className="font-body-alt text-muted-foreground dark:text-white/60 max-w-2xl mx-auto">
              Nestled in lush greenery, our campus is a self-contained ecosystem designed to nurture learning, creativity, and personal growth.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {campusStats.map((s) => (
              <div key={s.label} className="campus-card p-6 rounded-2xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 shadow-sm text-center">
                <s.icon className="w-8 h-8 text-emerald mx-auto mb-3" />
                <p className="font-section-title text-3xl font-bold text-slate-dark dark:text-white">{s.value}</p>
                <p className="text-sm text-muted-foreground dark:text-white/60 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Overview Image */}
          <div className="campus-card rounded-2xl overflow-hidden shadow-lg">
            <img src={IMAGES.campusWalk} alt="Campus walkway" className="w-full h-64 sm:h-80 object-cover" />
            <div className="p-6 bg-white dark:bg-white/5">
              <p className="font-body-alt text-muted-foreground dark:text-white/70 leading-relaxed">
                Greenfield University spans <strong className="text-slate-dark dark:text-white">150+ acres</strong> of beautifully landscaped grounds featuring modern academic blocks, tree-lined pathways, tranquil gardens, and sustainable green buildings. Our campus is a <strong className="text-slate-dark dark:text-white">zero-waste certified</strong> institution with solar power, rainwater harvesting, and organic gardens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Sports & Fitness ===== */}
      <section className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="campus-heading text-center mb-16">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Stay Active</span>
            <h2 className="font-section-title text-3xl sm:text-4xl font-bold text-slate-dark dark:text-white mb-4">Sports &amp; Fitness</h2>
            <p className="font-body-alt text-muted-foreground dark:text-white/60 max-w-2xl mx-auto">
              Compete, train, and play — our world-class sports facilities ensure every student finds their athletic passion.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sportsFacilities.map((s) => (
              <div key={s.title} className="campus-card p-6 rounded-2xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center mb-4">
                  <Dumbbell className="w-6 h-6 text-emerald" />
                </div>
                <h3 className="font-feature-title text-lg font-bold text-slate-dark dark:text-white mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground dark:text-white/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="campus-card mt-8 rounded-2xl overflow-hidden shadow-md">
            <img src={PAGE_PHOTOS.sportsComplex} alt="Sports complex" className="w-full h-64 object-cover" />
          </div>
        </div>
      </section>

      {/* ===== Clubs & Societies ===== */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="campus-heading text-center mb-16">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Get Involved</span>
            <h2 className="font-section-title text-3xl sm:text-4xl font-bold text-slate-dark dark:text-white mb-4">Clubs &amp; Societies</h2>
            <p className="font-body-alt text-muted-foreground dark:text-white/60 max-w-2xl mx-auto">
              Join 30+ active student clubs and discover your passion beyond the classroom.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clubs.map((c) => (
              <div key={c.name} className="campus-card p-6 rounded-2xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300 text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center mb-4 mx-auto">
                  <c.icon className="w-6 h-6 text-emerald" />
                </div>
                <h3 className="font-feature-title text-sm font-bold text-slate-dark dark:text-white mb-1">{c.name}</h3>
                <p className="text-xs text-emerald font-medium mb-2">{c.members} Members</p>
                <p className="text-xs text-muted-foreground dark:text-white/60 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Hostel & Dining ===== */}
      <section className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="campus-heading">
              <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Home Away</span>
              <h2 className="font-section-title text-3xl sm:text-4xl font-bold text-slate-dark dark:text-white mb-6">Hostel &amp; Dining</h2>
              <p className="font-body-alt text-muted-foreground dark:text-white/60 leading-relaxed mb-8">
                Our residential halls provide a safe, comfortable, and vibrant living experience. With separate hostels for boys and girls, each equipped with modern amenities, students feel right at home.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {hostelFeatures.map((f) => (
                  <div key={f.title} className="campus-card flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10">
                    <f.icon className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-dark dark:text-white">{f.title}</h4>
                      <p className="text-xs text-muted-foreground dark:text-white/60 mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground dark:text-white/60">
                <div className="flex items-center gap-2"><BedDouble className="w-4 h-4 text-emerald" /> <span><strong className="text-slate-dark dark:text-white">2,000+</strong> hostel beds</span></div>
                <div className="flex items-center gap-2"><Users className="w-4 h-4 text-emerald" /> <span><strong className="text-slate-dark dark:text-white">AC & Non-AC</strong> rooms</span></div>
                <div className="flex items-center gap-2"><Utensils className="w-4 h-4 text-emerald" /> <span><strong className="text-slate-dark dark:text-white">3 dining halls</strong></span></div>
              </div>
            </div>

            <div className="campus-card rounded-2xl overflow-hidden shadow-lg">
              <img src={IMAGES.campusLife} alt="Hostel life" className="w-full h-80 lg:h-[420px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Library Portal ===== */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="campus-card rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
              <img src={PAGE_PHOTOS.modernLibrary} alt="Library" className="w-full h-80 lg:h-[420px] object-cover" />
            </div>
            <div className="campus-heading order-1 lg:order-2">
              <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Knowledge Hub</span>
              <h2 className="font-section-title text-3xl sm:text-4xl font-bold text-slate-dark dark:text-white mb-6">Library Portal</h2>
              <p className="font-body-alt text-muted-foreground dark:text-white/60 leading-relaxed mb-6">
                Our central library is a treasure trove of knowledge with an extensive collection of print and digital resources, modern reading halls, and 24/7 online access.
              </p>
              <ul className="space-y-3">
                {[
                  '50,000+ volumes across all disciplines',
                  'Digital access to 10,000+ e-journals & e-books',
                  'Separate sections for reference, periodicals, and rare collections',
                  '24/7 online portal with OPAC search and remote access',
                  'Dedicated quiet zones and collaborative study rooms',
                ].map((item, i) => (
                  <li key={i} className="campus-card flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                    <span className="font-body-alt text-sm text-muted-foreground dark:text-white/60">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Laboratories ===== */}
      <section className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="campus-heading text-center mb-16">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Innovation Hub</span>
            <h2 className="font-section-title text-3xl sm:text-4xl font-bold text-slate-dark dark:text-white mb-4">Laboratories</h2>
            <p className="font-body-alt text-muted-foreground dark:text-white/60 max-w-2xl mx-auto">
              25+ cutting-edge laboratories equipped with the latest technology for research, innovation, and hands-on learning.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {labs.map((l) => (
              <div key={l.title} className="campus-card rounded-2xl overflow-hidden bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <img src={l.image} alt={l.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="font-feature-title text-lg font-bold text-slate-dark dark:text-white mb-2">{l.title}</h3>
                  <p className="text-sm text-muted-foreground dark:text-white/60 leading-relaxed">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Cafeteria ===== */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="campus-heading">
              <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Fresh &amp; Delicious</span>
              <h2 className="font-section-title text-3xl sm:text-4xl font-bold text-slate-dark dark:text-white mb-6">Cafeteria</h2>
              <p className="font-body-alt text-muted-foreground dark:text-white/60 leading-relaxed mb-8">
                Our multi-cuisine cafeteria and food courts serve nutritious, freshly prepared meals throughout the day — from North Indian thalis to continental dishes, fresh juices, and healthy snacks.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Utensils, label: 'Multi-Cuisine Menu' },
                  { icon: Shield, label: 'FSSAI Certified Kitchen' },
                  { icon: Clock, label: '6 AM – 11 PM Daily' },
                  { icon: TreePine, label: 'Organic Garden Fresh' },
                ].map((item) => (
                  <div key={item.label} className="campus-card flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10">
                    <item.icon className="w-5 h-5 text-emerald shrink-0" />
                    <span className="text-sm font-medium text-slate-dark dark:text-white">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="campus-card rounded-2xl overflow-hidden shadow-lg">
              <img src={IMAGES.cafeteria} alt="Cafeteria" className="w-full h-80 lg:h-[400px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Photo Gallery (teaser) ===== */}
      <section className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="campus-heading text-center mb-16">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Memories</span>
            <h2 className="font-section-title text-3xl sm:text-4xl font-bold text-slate-dark dark:text-white mb-4">Photo Gallery</h2>
            <p className="font-body-alt text-muted-foreground dark:text-white/60 max-w-2xl mx-auto">
              A visual journey through campus life — from academics to celebrations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: PAGE_PHOTOS.campusAerial, label: 'Campus Aerial' },
              { src: PAGE_PHOTOS.convocationHall, label: 'Convocation Hall' },
              { src: PAGE_PHOTOS.auditorium, label: 'Auditorium' },
              { src: IMAGES.campusWalk, label: 'Campus Walk' },
              { src: IMAGES.sports, label: 'Sports Complex' },
              { src: IMAGES.cultural, label: 'Cultural Night' },
              { src: IMAGES.graduation, label: 'Graduation Day' },
              { src: PAGE_PHOTOS.modernLibrary, label: 'Library' },
            ].map((p) => (
              <div key={p.label} className="campus-card group relative rounded-2xl overflow-hidden aspect-square">
                <img src={p.src} alt={p.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-medium">{p.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Events & News ===== */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="campus-heading text-center mb-16">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">What&apos;s Happening</span>
            <h2 className="font-section-title text-3xl sm:text-4xl font-bold text-slate-dark dark:text-white mb-4">Events &amp; News</h2>
            <p className="font-body-alt text-muted-foreground dark:text-white/60 max-w-2xl mx-auto">
              Stay updated with the latest happenings, achievements, and celebrations at Greenfield.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {events.map((e) => (
              <div key={e.title} className="campus-card rounded-2xl overflow-hidden bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <img src={e.image} alt={e.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-emerald font-medium mb-2">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {e.date}
                  </div>
                  <h3 className="font-feature-title text-lg font-bold text-slate-dark dark:text-white mb-2">{e.title}</h3>
                  <p className="text-sm text-muted-foreground dark:text-white/60 leading-relaxed">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Annual Fest ===== */}
      <section className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <a href="/gallery" className="campus-card rounded-2xl overflow-hidden shadow-lg block">
              <img src={IMAGES.cultural} alt="Annual fest" className="w-full h-80 lg:h-[420px] object-cover" />
            </a>
            <div className="campus-heading">
              <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">The Big Celebration</span>
              <h2 className="font-section-title text-3xl sm:text-4xl font-bold text-slate-dark dark:text-white mb-6">Annual Fest — Rang Tarang</h2>
              <p className="font-body-alt text-muted-foreground dark:text-white/60 leading-relaxed mb-6">
                Our flagship annual fest is a 3-day extravaganza that brings together 5,000+ students from 50+ colleges. It features technical events, cultural performances, celebrity nights, and more.
              </p>
              <div className="space-y-3">
                {[
                  '50+ inter-college competitions and events',
                  'Celebrity performances and DJ nights',
                  'Tech expo, startup showcase, and innovation fair',
                  'Food festival with 30+ stalls from across India',
                ].map((item, i) => (
                  <li key={i} className="campus-card flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                    <span className="font-body-alt text-sm text-muted-foreground dark:text-white/60">{item}</span>
                  </li>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Cultural Programs ===== */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="campus-heading text-center mb-16">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Express Yourself</span>
            <h2 className="font-section-title text-3xl sm:text-4xl font-bold text-slate-dark dark:text-white mb-4">Cultural Programs</h2>
            <p className="font-body-alt text-muted-foreground dark:text-white/60 max-w-2xl mx-auto">
              A year-round calendar of cultural activities celebrating diversity, creativity, and artistic expression.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Music, title: 'Music Concerts', desc: 'Classical, western, and fusion performances by student bands and guest artists throughout the year.' },
              { icon: PartyPopper, title: 'Dance Competitions', desc: 'From classical dance forms to hip-hop battles — our stage welcomes every style and tradition.' },
              { icon: Camera, title: 'Theatre & Drama', desc: 'Full-length plays, street theatre, and improv nights that explore social themes and storytelling.' },
              { icon: Star, title: 'Talent Shows', desc: 'Open mic nights, singing competitions, poetry slams, and stand-up comedy events.' },
              { icon: Star, title: 'Festival Celebrations', desc: 'Diwali, Holi, Eid, Christmas, Onam, and Pongal — celebrating every culture on campus.' },
              { icon: Users, title: 'Inter-College Meets', desc: 'Host and participate in cultural fests at universities across the state and country.' },
            ].map((item) => (
              <div key={item.title} className="campus-card p-6 rounded-2xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-emerald" />
                </div>
                <h3 className="font-feature-title text-lg font-bold text-slate-dark dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground dark:text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Workshops ===== */}
      <section className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="campus-heading text-center mb-16">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Learn &amp; Grow</span>
            <h2 className="font-section-title text-3xl sm:text-4xl font-bold text-slate-dark dark:text-white mb-4">Workshops</h2>
            <p className="font-body-alt text-muted-foreground dark:text-white/60 max-w-2xl mx-auto">
              Regular skill-building workshops conducted by industry experts and academia to bridge the gap between theory and practice.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map((w) => (
              <div key={w.title} className="campus-card p-6 rounded-2xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald/10 text-emerald text-xs font-medium mb-4">{w.category}</span>
                <h3 className="font-feature-title text-lg font-bold text-slate-dark dark:text-white mb-2">{w.title}</h3>
                <p className="text-sm text-muted-foreground dark:text-white/60 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA: Visit Campus ===== */}
      <section className="py-20 sm:py-24 bg-emerald text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="campus-heading">
            <h2 className="font-section-title text-3xl sm:text-4xl font-bold mb-4">Experience Campus Life First-Hand</h2>
            <p className="font-body-alt text-white/80 max-w-xl mx-auto mb-8">
              Schedule a campus visit and see for yourself why Greenfield is the perfect place for your academic journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-emerald font-semibold text-sm hover:bg-white/90 transition-colors duration-300 shadow-lg">
                <MapPin className="w-4 h-4" />
                Schedule a Visit
              </a>
              <a href="/gallery" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors duration-300">
                <Camera className="w-4 h-4" />
                View Photo Gallery
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}