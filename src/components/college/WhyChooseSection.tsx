'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from '@/lib/images';

gsap.registerPlugin(ScrollTrigger);

const bentoItems = [
  { title: 'NAAC A++ Accredited', desc: 'Nationally recognized for academic excellence, infrastructure, and research output.', img: IMAGES.architecture, span: 'md:col-span-7 md:row-span-2', label: 'Excellence' },
  { title: 'Innovation-First Curriculum', desc: 'Programs co-designed with industry leaders for cutting-edge knowledge.', img: IMAGES.mcaCoding, span: 'md:col-span-5', label: 'Curriculum' },
  { title: 'Expert Faculty', desc: '150+ PhD-qualified professors from top institutions worldwide.', img: IMAGES.library, span: 'md:col-span-5', label: 'Faculty' },
  { title: 'Startup Incubation Center', desc: 'Mentorship, funding, and workspace for student entrepreneurs.', img: IMAGES.hackathon, span: 'md:col-span-4', label: 'Innovation' },
  { title: 'Global Exposure', desc: 'Exchange programs and collaborations with 80+ global universities.', img: IMAGES.graduation, span: 'md:col-span-4', label: 'Global' },
  { title: '94% Placement Record', desc: '300+ recruiting companies including Fortune 500 and top tech firms.', img: IMAGES.career, span: 'md:col-span-4', label: 'Careers' },
];

export function WhyChooseSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.why-heading', { opacity: 0, y: 40 }, {
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
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-slate-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16 why-heading">
          <span className="font-section-label inline-block text-emerald text-sm font-semibold tracking-[0.2em] mb-3">Why Greenfield</span>
          <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Where Excellence Is a Tradition
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg font-body-alt">
            Discover what sets us apart — from world-class infrastructure to an ecosystem designed for holistic growth.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 auto-rows-[200px] md:auto-rows-[220px]">
          {bentoItems.map((item, i) => (
            <a
              key={item.title}
              href="/about"
              className={`bento-tile bento-tile-anim group cursor-pointer shadow-ambient hover:shadow-ambient-hover ${item.span} block`}
            >
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="bento-tile-overlay">
                <span className="text-emerald-light/80 text-xs font-semibold uppercase tracking-wider mb-1 font-feature-title">{item.label}</span>
                <h3 className="font-feature-title text-white text-lg sm:text-xl font-bold leading-tight mb-1">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed line-clamp-2 font-body-alt">{item.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}