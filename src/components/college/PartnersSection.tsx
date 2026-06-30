'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ROW_1 = ['Google', 'Microsoft', 'Amazon', 'Infosys', 'TCS', 'Wipro'];
const ROW_2 = ['Deloitte', 'Accenture', 'IBM', 'Oracle', 'Adobe', 'Salesforce'];

function LogoCard({ name }: { name: string }) {
  return (
    <div className="flex-shrink-0 mx-3 sm:mx-4">
      <div className="flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm hover:border-emerald/40 dark:hover:border-emerald/40 transition-colors duration-300 min-w-[160px] sm:min-w-[180px]">
        <span className="font-feature-title text-lg sm:text-xl font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap select-none">
          {name}
        </span>
      </div>
    </div>
  );
}

export function PartnersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-white via-emerald-light/20 to-white dark:from-slate-900 dark:via-slate-800/30 dark:to-slate-900"
    >
      {/* Heading */}
      <div ref={headingRef} className="text-center mb-14 sm:mb-16 px-4 sm:px-6">
        <p className="font-section-label text-emerald text-xs sm:text-sm mb-3">
          Our Partners
        </p>
        <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
          Trusted by Industry Leaders
        </h2>
        <p className="font-body-alt text-slate-500 dark:text-slate-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
          We collaborate with world-class organizations to deliver exceptional career opportunities for our graduates.
        </p>
      </div>

      {/* Row 1 — left to right */}
      <div className="mb-5 overflow-hidden">
        <div className="marquee-ltr flex whitespace-nowrap">
          {[...ROW_1, ...ROW_1, ...ROW_1, ...ROW_1].map((name, i) => (
            <LogoCard key={`r1-${i}`} name={name} />
          ))}
        </div>
      </div>

      {/* Row 2 — right to left */}
      <div className="overflow-hidden">
        <div className="marquee-rtl flex whitespace-nowrap">
          {[...ROW_2, ...ROW_2, ...ROW_2, ...ROW_2].map((name, i) => (
            <LogoCard key={`r2-${i}`} name={name} />
          ))}
        </div>
      </div>

      {/* Fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10" />
    </section>
  );
}