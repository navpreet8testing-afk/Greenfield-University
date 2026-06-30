'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IMAGES } from '@/lib/images';

gsap.registerPlugin(ScrollTrigger);

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
}

interface ProgramsSectionProps {
  programs: Program[];
}

const PROGRAM_IMAGE_MAP: Record<string, string> = {
  BCA: IMAGES.bcaClassroom,
  BBA: IMAGES.bbaBusiness,
  'B.Com': IMAGES.commerce,
  MCA: IMAGES.mcaCoding,
  'B.Sc': IMAGES.science,
  BA: IMAGES.arts,
};

function getProgramImage(program: Program): string {
  return PROGRAM_IMAGE_MAP[program.shortName] || IMAGES.bcaClassroom;
}

export function ProgramsSection({ programs }: ProgramsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Show only 4 featured programs on homepage
  const displayPrograms = programs.slice(0, 4);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.programs-heading', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      // Staggered entrance: alternate from-left and from-right
      const tiles = sectionRef.current?.querySelectorAll('.bento-tile-anim');
      tiles?.forEach((tile, i) => {
        const fromX = i % 2 === 0 ? -60 : 60;
        gsap.fromTo(tile,
          { opacity: 0, x: fromX, y: 30, scale: 0.95 },
          {
            opacity: 1, x: 0, y: 0, scale: 1,
            duration: 0.9,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: tile, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [displayPrograms.length]);

  return (
    <section id="programs" ref={sectionRef} className="py-20 sm:py-28 bg-white dark:bg-slate-dark/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 programs-heading">
          <span className="font-section-label inline-block text-emerald text-sm font-semibold tracking-[0.2em] mb-3">Academic Excellence</span>
          <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-slate-200 mb-4">
            Programs That Define Futures
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-body-alt">
            Industry-aligned curricula designed by experts to prepare you for the challenges of tomorrow.
          </p>
        </div>

        {/* 2x2 Program Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {displayPrograms.map((program) => (
            <a
              key={program.id}
              href="/programs"
              className="bento-tile bento-tile-anim group cursor-pointer shadow-ambient hover:shadow-ambient-hover h-64 sm:h-72 block"
            >
              <img
                src={getProgramImage(program)}
                alt={program.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />
              <div className="bento-tile-overlay">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge className="bg-emerald/90 text-white border-0 text-xs font-semibold px-2.5 py-0.5">
                    {program.shortName}
                  </Badge>
                  <Badge variant="outline" className="border-white/30 text-white/80 text-xs">
                    {program.department}
                  </Badge>
                </div>
                <h3 className="font-feature-title text-white text-lg sm:text-xl font-bold leading-tight mb-1">
                  {program.name}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed line-clamp-2 font-body-alt mb-3">
                  {program.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-white/70">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {program.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    {program.seats} Seats
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View All Programs */}
        <div className="text-center mt-10">
          <Button variant="outline" className="rounded-full px-8 bg-transparent" asChild>
            <a href="/programs">
              View All {programs.length > 0 ? programs.length : '25+'} Programs
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}