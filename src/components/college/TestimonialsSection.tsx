'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  quote: string;
  batch: string;
  rating: number;
  column: number;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

const avatarGradients = [
  'from-emerald-400 to-teal-500',
  'from-amber-400 to-orange-500',
  'from-rose-400 to-pink-500',
  'from-cyan-400 to-sky-500',
  'from-violet-400 to-purple-500',
  'from-lime-400 to-green-500',
];

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const parallaxFactors = [0.05, 0.12, 0.08];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonials-heading', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      // Parallax animation per column
      const columns = sectionRef.current?.querySelectorAll('.parallax-col');
      columns?.forEach((col, i) => {
        gsap.to(col, {
          y: () => (1 - parallaxFactors[i]) * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      });

      // Individual card reveal
      gsap.utils.toArray<HTMLElement>('.testimonial-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 30, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none none' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [testimonials.length]);

  const columns: Testimonial[][] = [[], [], []];
  testimonials.forEach((t) => {
    const col = (t.column || 1) - 1;
    columns[col >= 0 && col < 3 ? col : 0].push(t);
  });

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 sm:py-28 bg-gradient-to-b from-emerald-50/30 to-white dark:from-emerald-950/20 dark:to-slate-dark/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 testimonials-heading">
          <span className="font-section-label inline-block text-emerald text-sm font-semibold tracking-[0.2em] mb-3">Voices of Greenfield</span>
          <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark mb-4">
            What Our Alumni Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-body-alt">
            Real stories from graduates who transformed their ambitions into remarkable careers.
          </p>
        </div>

        <div className="testimonials-mask max-h-[800px] overflow-y-auto rounded-2xl">
          <div className="grid md:grid-cols-3 gap-6 pb-4">
            {columns.map((col, colIdx) => (
              <div key={colIdx} className="parallax-col flex flex-col gap-6">
                {col.map((testimonial, i) => (
                  <div
                    key={testimonial.id}
                    className="border-gradient-hover gsap-reveal testimonial-card group relative bg-white rounded-2xl p-6 border border-border/50 hover:border-emerald/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-400 dark:bg-white/5 dark:border-white/10 dark:hover:border-emerald/30"
                  >
                    {/* Quote icon */}
                    <div className="absolute top-5 right-5 text-emerald/10 group-hover:text-emerald/20 transition-colors">
                      <Quote className="w-10 h-10" />
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-0.5 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                      ))}
                    </div>

                    <p className="font-quote text-sm text-foreground/80 leading-relaxed mb-6 dark:text-white/70">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>

                    <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarGradients[(colIdx * 2 + i) % avatarGradients.length]} flex items-center justify-center`}>
                        <span className="text-white text-xs font-bold">{getInitials(testimonial.name)}</span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-dark dark:text-white">{testimonial.name}</div>
                        <div className="text-xs text-muted-foreground dark:text-white/50">
                          {testimonial.role}{testimonial.company ? ` at ${testimonial.company}` : ''} · Batch &apos;{testimonial.batch}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}