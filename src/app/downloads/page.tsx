'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '@/components/college/Navbar';
import { Footer } from '@/components/college/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Calendar, CreditCard, BookOpen, Clock, ChevronDown, ExternalLink, Globe, Database, Newspaper, Search, GraduationCap } from 'lucide-react';
import { IMAGES } from '@/lib/images';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: 'Academic Forms',
    icon: FileText,
    items: [
      { name: 'Application Form 2025-26', size: '245 KB', format: 'PDF' },
      { name: 'Migration Certificate Request', size: '120 KB', format: 'PDF' },
      { name: 'Bonafide Certificate Form', size: '98 KB', format: 'PDF' },
      { name: 'Leave of Absence Form', size: '85 KB', format: 'PDF' },
      { name: 'Scholarship Application', size: '310 KB', format: 'PDF' },
    ],
  },
  {
    title: 'Syllabus',
    icon: BookOpen,
    items: [
      { name: 'BCA Syllabus (All Semesters)', size: '1.2 MB', format: 'PDF' },
      { name: 'BBA Syllabus (All Semesters)', size: '1.4 MB', format: 'PDF' },
      { name: 'B.Com Syllabus (All Semesters)', size: '980 KB', format: 'PDF' },
      { name: 'MCA Syllabus (All Semesters)', size: '1.8 MB', format: 'PDF' },
    ],
  },
  {
    title: 'Exam Schedule',
    icon: Clock,
    items: [
      { name: 'End-Semester Timetable – Dec 2024', size: '520 KB', format: 'PDF' },
      { name: 'Mid-Semester Timetable – Oct 2024', size: '480 KB', format: 'PDF' },
      { name: 'Supplementary Exam Schedule', size: '340 KB', format: 'PDF' },
    ],
  },
  {
    title: 'Fee Structure',
    icon: CreditCard,
    items: [
      { name: 'UG Fee Structure 2025-26', size: '680 KB', format: 'PDF' },
      { name: 'PG Fee Structure 2025-26', size: '720 KB', format: 'PDF' },
      { name: 'Hostel & Dining Charges', size: '280 KB', format: 'PDF' },
      { name: 'Scholarship Fee Waiver Policy', size: '350 KB', format: 'PDF' },
    ],
  },
  {
    title: 'Academic Calendar',
    icon: Calendar,
    items: [
      { name: 'Academic Calendar 2025-26', size: '1.1 MB', format: 'PDF' },
      { name: 'Holiday List 2025', size: '180 KB', format: 'PDF' },
      { name: 'Event Calendar – Spring Semester', size: '450 KB', format: 'PDF' },
    ],
  },
];

const calendarDates = [
  { date: 'Jul 1', event: 'Admissions Open' },
  { date: 'Aug 15', event: 'Last Date to Apply' },
  { date: 'Aug 25', event: 'Entrance Test' },
  { date: 'Sep 1', event: 'Classes Begin' },
  { date: 'Oct 15', event: 'Mid-Semester Exams' },
  { date: 'Dec 15', event: 'End-Semester Exams' },
  { date: 'Jan 5', event: 'Winter Break Ends' },
  { date: 'Jan 10', event: 'Spring Semester Begins' },
  { date: 'May 10', event: 'Summer Exams' },
  { date: 'Jun 15', event: 'Results Declared' },
];

const eResources = [
  { name: 'JSTOR', icon: Database, desc: 'Access 12,000+ academic journals, books, and primary sources across 75 disciplines.', url: 'https://www.jstor.org' },
  { name: 'IEEE Xplore', icon: Search, desc: 'Full-text access to IEEE journals, conferences, and standards in technology.', url: 'https://ieeexplore.ieee.org' },
  { name: 'PubMed', icon: Newspaper, desc: 'Biomedical and life sciences literature from MEDLINE and life science journals.', url: 'https://pubmed.ncbi.nlm.nih.gov' },
  { name: 'ScienceDirect', icon: GraduationCap, desc: 'Peer-reviewed journals and books in science, technology, and medicine.', url: 'https://www.sciencedirect.com' },
  { name: 'SpringerLink', icon: BookOpen, desc: 'Scientific documents including journals, books, and reference works.', url: 'https://link.springer.com' },
  { name: 'Google Scholar', icon: Globe, desc: 'Broad search across scholarly literature from all disciplines and sources.', url: 'https://scholar.google.com' },
];

const faqs = [
  { q: 'How do I download my admit card?', a: 'Visit the Student Portal and navigate to Documents section. Select "Admit Card" from the dropdown and click download. Make sure your enrollment number is entered correctly.' },
  { q: 'Where can I find the academic calendar?', a: 'The academic calendar is available on this page above in the Academic Calendar section. You can also download the PDF version from the Document Categories section.' },
  { q: 'How do I access digital library resources?', a: 'Log in to the Student Portal with your university credentials. Navigate to Library → Digital Resources. You will find direct links to all subscribed databases including JSTOR, IEEE Xplore, and more.' },
  { q: 'What if I forget my enrollment number?', a: 'Contact the Examination Cell at exam@greenfield.edu or visit the Administration Office with your ID proof. They can retrieve your enrollment number from the student database.' },
  { q: 'Are previous year question papers available?', a: 'Yes, visit the Student Portal → Resources → Question Papers. Papers are available for the last 5 years across all programs and semesters in PDF format.' },
];

export default function DownloadsPage() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.from('.dl-hero-content', {
          y: 50, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: heroRef.current, start: 'top 80%', once: true },
        });
      }
      document.querySelectorAll('.dl-section-heading').forEach((el) => {
        gsap.from(el, {
          y: 30, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });
      document.querySelectorAll('.dl-category').forEach((el, i) => {
        gsap.from(el, {
          y: 40, duration: 0.7, delay: i * 0.1, ease: 'power3.out',
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
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${IMAGES.mcaCoding})` }} />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-32 w-full">
          <div className="dl-hero-content gsap-reveal max-w-3xl">
            <span className="font-section-label inline-block text-emerald-light text-sm font-semibold uppercase tracking-widest mb-4">Resources</span>
            <h1 className="font-hero-word text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6">
              Downloads Center
            </h1>
            <p className="font-body-alt text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed">
              Access academic forms, syllabi, exam schedules, fee structures, and more — all in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-white via-emerald-50/20 to-white dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="dl-section-heading gsap-reveal text-center mb-16">
            <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Browse & Download</span>
            <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">Document Categories</h2>
            <p className="font-body-alt text-muted-foreground max-w-2xl mx-auto text-lg">
              Find and download the documents you need for your academic journey.
            </p>
          </div>

          <div className="space-y-10">
            {categories.map((cat) => (
              <div key={cat.title} className="dl-category gsap-reveal glass-card">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-emerald/10 flex items-center justify-center">
                    <cat.icon className="w-5 h-5 text-emerald" />
                  </div>
                  <h3 className="font-feature-title text-xl font-semibold text-slate-dark dark:text-white">{cat.title}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.items.map((item) => (
                    <button
                      key={item.name}
                      className="card-glow group flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 hover:border-emerald/30 dark:hover:border-emerald/30 hover:shadow-md hover:shadow-emerald/5 transition-all duration-300 hover:-translate-y-0.5 text-left"
                    >
                      <div className="w-12 h-14 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/30 flex flex-col items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-bold text-red-500 uppercase leading-none">PDF</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-slate-dark dark:text-white group-hover:text-emerald transition-colors truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground dark:text-white/40 mt-1">{item.size} — {item.format}</p>
                      </div>
                      <Download className="w-5 h-5 text-muted-foreground dark:text-white/30 group-hover:text-emerald flex-shrink-0 mt-1 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Help CTA */}
      <section className="py-16 bg-emerald-dark dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-section-title text-2xl sm:text-3xl font-bold text-white mb-3">Need a Document?</h2>
          <p className="font-body-alt text-white/60 mb-6">
            If you cannot find what you are looking for, contact the administration office for assistance.
          </p>
          <Button size="lg" className="bg-emerald hover:bg-emerald text-white rounded-full px-8 shadow-lg shadow-emerald/30" asChild>
            <a href="/contact">Contact Administration</a>
          </Button>
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* Academic Calendar */}
      <AcademicCalendarSection />

      <div className="section-divider-gradient" />

      {/* E-Resources */}
      <EResourcesSection />

      <div className="section-divider-gradient" />

      {/* FAQ */}
      <FAQSection />

      <Footer />
    </main>
  );
}

function AcademicCalendarSection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-white via-emerald-50/20 to-white dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Important Dates</span>
          <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">Academic Calendar</h2>
        </div>
        <div className="glass-card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {calendarDates.map((item) => (
            <div key={item.date} className="rounded-xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 p-4 hover:border-emerald/30 dark:hover:border-emerald/30 transition-all duration-300 hover:-translate-y-1">
              <Badge className="bg-emerald/10 text-emerald hover:bg-emerald/20 border-0 font-semibold mb-3">{item.date}</Badge>
              <p className="font-feature-title text-sm font-semibold text-slate-dark dark:text-white">{item.event}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EResourcesSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Digital Library</span>
          <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">E-Resources &amp; Journals</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eResources.map((res) => (
            <div key={res.name} className="rounded-2xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 p-5 hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center shrink-0 group-hover:bg-emerald transition-all duration-300">
                  <res.icon className="w-6 h-6 text-emerald group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-feature-title text-base font-semibold text-slate-dark dark:text-white mb-1">{res.name}</h3>
                  <p className="font-body-alt text-sm text-muted-foreground dark:text-white/50 mb-4">{res.desc}</p>
                  <Button size="sm" variant="outline" className="border-emerald/30 text-emerald hover:bg-emerald hover:text-white rounded-lg text-xs" asChild>
                    <a href={res.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                      Access
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-white via-emerald-50/20 to-white dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Help</span>
          <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">Frequently Asked Questions</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 overflow-hidden transition-all duration-300">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-emerald-50/50 dark:hover:bg-white/5 transition-colors"
              >
                <span className="font-feature-title text-sm sm:text-base font-semibold text-slate-dark dark:text-white pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-emerald shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${openIndex === i ? 'max-h-60 pb-5' : 'max-h-0'}`}>
                <p className="px-5 font-body-alt text-sm text-muted-foreground dark:text-white/60 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}