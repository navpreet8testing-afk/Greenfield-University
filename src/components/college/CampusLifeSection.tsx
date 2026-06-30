'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from '@/lib/images';

gsap.registerPlugin(ScrollTrigger);

const bentoTiles = [
  { title: 'State-of-the-Art Library', desc: 'Over 50,000 volumes, digital archives, and 24/7 study spaces.', img: IMAGES.library, span: 'md:col-span-8 md:row-span-2', label: 'Library' },
  { title: 'Photography Club', desc: 'Capture campus moments and exhibit your creative vision.', img: IMAGES.campusWalk, span: 'md:col-span-4', label: 'Clubs' },
  { title: 'Sports Excellence', desc: 'Cricket, basketball, athletics, and 15+ more sports.', img: IMAGES.sports, span: 'md:col-span-4', label: 'Sports' },
  { title: 'Research Laboratories', desc: 'Cutting-edge equipment for science and technology research.', img: IMAGES.laboratory, span: 'md:col-span-5', label: 'Labs' },
  { title: 'Cultural Programs', desc: 'Music, dance, theater — celebrate diversity on campus.', img: IMAGES.cultural, span: 'md:col-span-7', label: 'Culture' },
  { title: 'Modern Cafeteria', desc: 'Diverse cuisine options in a vibrant social space.', img: IMAGES.cafeteria, span: 'md:col-span-6', label: 'Dining' },
  { title: 'Tech Workshops', desc: 'Hands-on hackathons, coding bootcamps, and devops labs.', img: IMAGES.hackathon, span: 'md:col-span-6', label: 'Tech' },
];

export function CampusLifeSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.campus-heading', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      // Staggered bento tile reveals — alternate directions
      const tiles = sectionRef.current?.querySelectorAll('.bento-tile-anim');
      tiles?.forEach((tile, i) => {
        const directions = ['from-bottom', 'from-left', 'from-right', 'from-bottom', 'scale-in', 'from-left', 'from-right'];
        gsap.fromTo(tile,
          { opacity: 0, y: 40, scale: 0.94 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.85,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: tile, start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="campus" ref={sectionRef} className="py-20 sm:py-28 bg-gradient-to-b from-white to-emerald-50/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 campus-heading">
          <span className="font-section-label inline-block text-emerald text-sm font-semibold tracking-[0.2em] mb-3">Life at Greenfield</span>
          <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark mb-4">
            Beyond the Classroom
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-body-alt">
            A vibrant campus culture that nurtures creativity, builds character, and creates lifelong memories.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 auto-rows-[200px] md:auto-rows-[240px]">
          {bentoTiles.map((tile, i) => (
            <a
              key={tile.title}
              href="/campus"
              className={`bento-tile bento-tile-anim group cursor-pointer shadow-ambient hover:shadow-ambient-hover ${tile.span} bg-gray-100 block`}
            >
              <img
                src={tile.img}
                alt={tile.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="bento-tile-overlay">
                <span className="text-emerald-light/80 text-xs font-semibold uppercase tracking-wider mb-1 font-accent-script text-base">{tile.label}</span>
                <h3 className="font-feature-title text-white text-lg sm:text-xl font-bold leading-tight mb-1">{tile.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed line-clamp-2 font-body-alt">{tile.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}