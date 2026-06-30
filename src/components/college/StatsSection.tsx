'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Users, BookOpen, TrendingUp, Award, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'Students Enrolled', value: 3200, suffix: '+', icon: GraduationCap },
  { label: 'Expert Faculty', value: 150, suffix: '+', icon: Users },
  { label: 'Programs Offered', value: 25, suffix: '+', icon: BookOpen },
  { label: 'Placement Rate', value: 94, suffix: '%', icon: TrendingUp },
  { label: 'Research Publications', value: 450, suffix: '+', icon: Award },
  { label: 'Global Partnerships', value: 80, suffix: '+', icon: Globe },
];

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Number counter
      if (numberRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          delay: index * 0.1 + 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            if (numberRef.current) {
              numberRef.current.textContent = Math.round(obj.val).toLocaleString() + stat.suffix;
            }
          },
        });
      }
    });
    return () => ctx.revert();
  }, [index, stat.suffix, stat.value]);

  return (
    <div
      ref={cardRef}
      className="gsap-reveal group relative p-6 rounded-2xl bg-white border border-emerald-100/50 hover:border-emerald/30 shadow-sm hover:shadow-xl hover:shadow-emerald/5 transition-all duration-500 hover:-translate-y-1 dark:bg-white/5 dark:border-white/10 dark:hover:border-emerald/30"
    >
      <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center mb-4 group-hover:bg-emerald group-hover:scale-110 transition-all duration-400">
        <stat.icon className="w-6 h-6 text-emerald group-hover:text-white transition-colors duration-400" />
      </div>
      <div className="text-3xl sm:text-4xl font-bold text-slate-dark mb-1">
        <span ref={numberRef} className="number-glow font-stat-number stat-number text-3xl sm:text-4xl font-bold text-slate-dark">0{stat.suffix}</span>
      </div>
      <div className="text-sm text-muted-foreground font-medium dark:text-white/60">{stat.label}</div>
    </div>
  );
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.stats-heading', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-gradient-to-b from-white via-emerald-50/30 to-white dark:from-slate-dark/95 dark:via-emerald-950/20 dark:to-slate-dark/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 stats-heading">
          <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Our Impact</span>
          <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark mb-4">
            Numbers That Speak
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-body-alt">
            Two decades of academic excellence reflected in our achievements and growing community.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}