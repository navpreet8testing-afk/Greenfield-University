'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, TrendingUp, GraduationCap, Globe, BookOpen, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ACHIEVEMENTS = [
  { stat: 'NAAC A++', label: 'Accreditation', icon: Award },
  { stat: 'NIRF Top 50', label: 'National Ranking', icon: TrendingUp },
  { stat: '94%', label: 'Placement Rate', icon: GraduationCap },
  { stat: '80+', label: 'Global Partners', icon: Globe },
  { stat: '450+', label: 'Publications', icon: BookOpen },
  { stat: '15+', label: 'Patents Filed', icon: Lightbulb },
];

export function AchievementBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = itemsRef.current?.querySelectorAll('.achievement-item');
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bannerRef.current,
              start: 'top 85%',
              once: true,
            },
          },
        );
      }
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={bannerRef}
      className="py-16 sm:py-20 bg-slate-dark dark:bg-slate-950 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Mobile: horizontal scroll */}
        <div
          ref={itemsRef}
          className="flex lg:grid lg:grid-cols-6 gap-4 sm:gap-6 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 snap-x snap-mandatory scrollbar-thin"
        >
          {ACHIEVEMENTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="achievement-item flex-shrink-0 snap-center w-40 sm:w-48 flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 hover:border-gold/30 transition-colors duration-300"
              >
                <Icon className="w-5 h-5 text-gold/50 mb-4" strokeWidth={1.5} />
                <span className="shimmer-number font-stat-number text-2xl sm:text-3xl font-bold text-gold leading-none mb-2">
                  {item.stat}
                </span>
                <span className="font-body-alt text-xs sm:text-sm text-white/50 uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}