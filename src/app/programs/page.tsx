'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Clock,
  Users,
  GraduationCap,
  Globe,
  BookOpen,
  Microscope,
  Building2,
  Beaker,
  Palette,
  FlaskConical,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award,
} from 'lucide-react';
import { Navbar } from '@/components/college/Navbar';
import { Footer } from '@/components/college/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IMAGES } from '@/lib/images';

/* ── Types ─────────────────────────────────────────────────── */

interface Program {
  id: string;
  name: string;
  shortName: string;
  description: string;
  duration: string;
  credits: number;
  department: string;
  icon: string;
  color: string;
  seats: number;
  fee: string;
  featured: boolean;
  sortOrder: number;
}

/* ── Constants ─────────────────────────────────────────────── */

const PROGRAM_IMAGE_MAP: Record<string, string> = {
  BCA: IMAGES.bcaClassroom,
  BBA: IMAGES.bbaBusiness,
  'B.Com': IMAGES.commerce,
  MCA: IMAGES.mcaCoding,
  'B.Sc Maths': '/images/programs/bsc-maths.png',
  'BA English': '/images/programs/ba-english.png',
  'B.Sc Biotechnology': '/images/programs/bsc-biotechnology.png',
  'B.Sc Physics': '/images/programs/bsc-physics.png',
  'BA Economics': '/images/programs/ba-economics.png',
  'BBA LLB': '/images/programs/bba-llb.png',
  'BCA Data Science': '/images/programs/bca-data-science.png',
  MBA: '/images/programs/mba.png',
  'M.Com': '/images/programs/mcom.png',
  'M.Sc Physics': '/images/programs/msc-physics.png',
  'MA English': '/images/programs/ma-english.png',
  'MBA Marketing': '/images/programs/mba-marketing.png',
  'MCA AI & ML': '/images/programs/mca-ai-ml.png',
  'PhD Computer Science': '/images/programs/phd-cs.png',
  'PhD Management': '/images/programs/phd-management.png',
  'PhD Physics': '/images/programs/phd-physics.png',
  'PhD Commerce': '/images/programs/phd-commerce.png',
  'PhD Mathematics': '/images/programs/phd-mathematics.png',
};

const FILTER_TABS = ['All', 'Undergraduate', 'Postgraduate', 'Doctoral'] as const;
type FilterTab = (typeof FILTER_TABS)[number];

const BENEFITS = [
  {
    icon: TrendingUp,
    title: 'Industry Curriculum',
    description:
      'Programs co-designed with Fortune 500 companies and updated every semester to reflect emerging trends.',
  },
  {
    icon: GraduationCap,
    title: 'Expert Faculty',
    description:
      '150+ PhD-qualified professors from IITs, IIMs, and top global institutions with industry experience.',
  },
  {
    icon: Microscope,
    title: 'Research Opportunities',
    description:
      'Dedicated research centers with funded projects, publications in top journals, and patent support.',
  },
  {
    icon: Globe,
    title: 'Global Exposure',
    description:
      'Exchange programs with 80+ universities, international internships, and collaborative research across continents.',
  },
];

const DEPARTMENTS = [
  {
    name: 'Computer Science',
    icon: BookOpen,
    programs: 4,
    description: 'AI, Data Science, Cybersecurity, Software Engineering',
    color: 'emerald',
  },
  {
    name: 'Management',
    icon: Building2,
    programs: 3,
    description: 'Marketing, Finance, HR, Entrepreneurship',
    color: 'gold',
  },
  {
    name: 'Commerce & Finance',
    icon: TrendingUp,
    programs: 3,
    description: 'Accounting, Taxation, Financial Analysis',
    color: 'emerald',
  },
  {
    name: 'Sciences',
    icon: Beaker,
    programs: 4,
    description: 'Physics, Chemistry, Mathematics, Biology',
    color: 'gold',
  },
  {
    name: 'Humanities',
    icon: Palette,
    programs: 3,
    description: 'Literature, History, Political Science, Psychology',
    color: 'emerald',
  },
  {
    name: 'Research Center',
    icon: FlaskConical,
    programs: 2,
    description: 'PhD Programs, Post-Doctoral Research, Sponsored Projects',
    color: 'gold',
  },
];

/* ── Helpers ───────────────────────────────────────────────── */

function getProgramImage(program: Program): string {
  // Try full shortName first, then prefix match
  if (PROGRAM_IMAGE_MAP[program.shortName]) {
    return PROGRAM_IMAGE_MAP[program.shortName];
  }
  // Fallback: match by name prefix
  for (const key of Object.keys(PROGRAM_IMAGE_MAP)) {
    if (program.name.startsWith(key)) {
      return PROGRAM_IMAGE_MAP[key];
    }
  }
  return IMAGES.bcaClassroom;
}

function getCategory(program: Program): FilterTab {
  // Check program NAME for PhD prefix (most reliable)
  if (program.name.startsWith('PhD') || program.shortName.startsWith('PhD')) {
    return 'Doctoral';
  }
  // Check program NAME for PG indicators
  if (/^M\.|^MCA|^MBA|^MA\s/.test(program.name) || /^M\.|^MCA|^MBA|^MA\s/.test(program.shortName)) {
    return 'Postgraduate';
  }
  // Everything else is UG
  return 'Undergraduate';
}

/* ── Component ─────────────────────────────────────────────── */

export default function ProgramsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('All');

  const { data: programs = [], isSuccess: programsLoaded } = useQuery({
    queryKey: ['programs'],
    queryFn: () => fetch('/api/programs').then((r) => r.json()),
  });

  // ScrollTrigger refresh after data loads (for other components on the page)
  useEffect(() => {
    if (programsLoaded) {
      const timer = setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [programsLoaded]);

  // Count programs per tab
  const counts = programs.reduce(
    (acc, p: Program) => {
      const cat = getCategory(p);
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Filtering
  const filteredPrograms =
    activeTab === 'All'
      ? programs
      : programs.filter((p: Program) => getCategory(p) === activeTab);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* ═══════════ HERO ═══════════ */}
        <section className="relative h-[55vh] min-h-[380px] flex items-center justify-center overflow-hidden">
          <img
            src="/images/programs/mba.png"
            alt="Programs at Greenfield University"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="noise-overlay absolute inset-0" />
          <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
            <h1 className="font-section-title text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Our Programs
            </h1>
            <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto font-body-alt leading-relaxed">
              Explore industry-aligned programs designed to prepare you for tomorrow&apos;s challenges
            </p>
          </div>
        </section>

        <div className="section-divider-gradient" />

        {/* ═══════════ FILTER + GRID ═══════════ */}
        <section className="py-20 sm:py-28 bg-white dark:bg-slate-dark/95">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Section heading */}
            <div className="text-center mb-12">
              <span className="font-section-label inline-block text-emerald text-sm font-semibold tracking-[0.2em] mb-3">
                Browse by Level
              </span>
              <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-slate-200 mb-4 gradient-text">
                Find Your Program
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-body-alt">
                Choose from a diverse range of undergraduate, postgraduate, and doctoral programs across multiple
                disciplines.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="glass-card flex flex-wrap justify-center gap-2 sm:gap-3 mb-14">
              {FILTER_TABS.map((tab) => {
                const count = tab === 'All' ? programs.length : (counts[tab] || 0);
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                      activeTab === tab
                        ? 'bg-emerald text-white shadow-lg shadow-emerald/25'
                        : 'bg-emerald-light/60 dark:bg-white/5 text-slate-dark dark:text-slate-300 hover:bg-emerald-light dark:hover:bg-white/10'
                    }`}
                  >
                    {tab}
                    <span className={`ml-1.5 text-xs ${activeTab === tab ? 'text-white/70' : 'text-muted-foreground dark:text-slate-500'}`}>
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Programs Grid — CSS-only transitions, no GSAP */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPrograms.length > 0 ? (
                filteredPrograms.map((program: Program) => (
                  <a
                    key={program.id}
                    href="/admissions"
                    className="card-glow group rounded-2xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-emerald/5 transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Card Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={getProgramImage(program)}
                        alt={program.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <Badge className="bg-emerald/90 text-white border-0 text-xs font-semibold">
                          {program.shortName}
                        </Badge>
                        {program.featured && (
                          <Badge className="bg-gold/90 text-white border-0 text-xs font-semibold">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <Badge variant="outline" className="border-white/30 text-white/80 text-xs backdrop-blur-sm bg-black/20">
                          {program.department}
                        </Badge>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      <h3 className="font-feature-title text-lg font-bold text-slate-dark dark:text-slate-100 mb-2 leading-tight">
                        {program.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed font-body-alt mb-4 line-clamp-2">
                        {program.description}
                      </p>

                      {/* Meta Row */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground dark:text-slate-400 mb-4">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-emerald" />
                          {program.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-emerald" />
                          {program.seats} Seats
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-gold" />
                          {program.credits} Credits
                        </span>
                      </div>

                      {/* Fee + CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-emerald-100/50 dark:border-white/10">
                        <div>
                          <p className="text-xs text-muted-foreground dark:text-slate-500">Annual Fee</p>
                          <p className="font-feature-title text-base font-bold text-emerald dark:text-emerald">
                            {program.fee}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full gap-1.5 text-xs group-hover:bg-emerald group-hover:text-white group-hover:border-emerald transition-all duration-300"
                        >
                          Details
                          <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </Button>
                      </div>
                    </div>
                  </a>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-muted-foreground text-lg font-body-alt">
                    No programs found for this category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="section-divider-gradient" />

        {/* ═══════════ WHY STUDY AT GU ═══════════ */}
        <section className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-br from-emerald-dark via-emerald-dark/95 to-slate-dark">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="font-section-label inline-block text-emerald-light/80 text-sm font-semibold tracking-[0.2em] mb-3">
                Why Greenfield
              </span>
              <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Why Study at GU
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto text-lg font-body-alt">
                An ecosystem built for academic rigor, innovation, and holistic student development.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {BENEFITS.map((benefit) => (
                <div
                  key={benefit.title}
                  className="card-glow rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald/20 flex items-center justify-center mb-5 group-hover:bg-emerald/30 transition-colors duration-300">
                    <benefit.icon className="w-6 h-6 text-emerald-light" />
                  </div>
                  <h3 className="font-feature-title text-lg font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed font-body-alt">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider-gradient" />

        {/* ═══════════ DEPARTMENT DIRECTORY ═══════════ */}
        <section className="py-20 sm:py-28 bg-emerald-light/30 dark:bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="font-section-label inline-block text-emerald text-sm font-semibold tracking-[0.2em] mb-3">
                Academic Structure
              </span>
              <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-slate-200 mb-4">
                Department Directory
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-body-alt">
                Six specialized departments driving interdisciplinary education and cutting-edge research.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {DEPARTMENTS.map((dept) => (
                <a
                  key={dept.name}
                  href="/programs"
                  className="card-glow group rounded-2xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-emerald/5 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 ${
                        dept.color === 'emerald'
                          ? 'bg-emerald/10 group-hover:bg-emerald/20'
                          : 'bg-gold/10 group-hover:bg-gold/20'
                      }`
                      }
                    >
                      <dept.icon
                        className={`w-6 h-6 ${dept.color === 'emerald' ? 'text-emerald' : 'text-gold'}`}
                      />
                    </div>
                    <h3 className="font-feature-title text-lg font-bold text-slate-dark dark:text-slate-100 mb-1">
                      {dept.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed font-body-alt mb-4">
                      {dept.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          dept.color === 'emerald'
                            ? 'border-emerald/20 text-emerald'
                            : 'border-gold/20 text-gold'
                        }`}
                      >
                        {dept.programs} Programs
                      </Badge>
                      <ArrowRight
                        className={`w-4 h-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 ${
                          dept.color === 'emerald' ? 'group-hover:text-emerald' : 'group-hover:text-gold'
                        }`}
                      />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}