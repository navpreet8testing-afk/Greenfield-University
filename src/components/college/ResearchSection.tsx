'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from '@/lib/images';

gsap.registerPlugin(ScrollTrigger);

const RESEARCH_CARDS = [
  {
    title: 'AI & Machine Learning Lab',
    stat: '50+ Research Papers',
    description:
      'Pioneering artificial intelligence research with publications in top-tier journals.',
    image: IMAGES.mcaCoding,
  },
  {
    title: 'Sustainable Development Center',
    stat: '₹2Cr+ Funding',
    description:
      'Addressing global challenges through interdisciplinary research and innovation.',
    image: IMAGES.hackathon,
  },
  {
    title: 'Biotechnology Research Hub',
    stat: '15 Patents Filed',
    description:
      'Cutting-edge biotech research bridging science and real-world applications.',
    image: IMAGES.laboratory,
  },
];

export function ResearchSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        sectionRef.current?.querySelector('.research-heading'),
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

      // Staggered card entrance
      const cards = cardsRef.current?.querySelectorAll('.research-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              once: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 bg-background px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="research-heading text-center mb-14 sm:mb-16">
          <p className="font-section-label text-emerald text-xs sm:text-sm mb-3">
            Innovation Hub
          </p>
          <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
            Research &amp; Innovation
          </h2>
          <p className="font-body-alt text-slate-500 dark:text-slate-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
            Driving breakthroughs through interdisciplinary research, state-of-the-art labs, and global collaborations.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-4 sm:gap-6"
        >
          {RESEARCH_CARDS.map((card) => (
            <a
              key={card.title}
              href="/about"
              className="research-card bento-tile rounded-2xl aspect-[4/5] sm:aspect-[3/4] group cursor-pointer block"
            >
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="bento-tile-overlay">
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald/20 text-emerald-light dark:text-emerald text-xs font-medium backdrop-blur-sm">
                    {card.stat}
                  </span>
                  <h3 className="font-feature-title text-xl sm:text-2xl font-semibold text-white leading-tight">
                    {card.title}
                  </h3>
                  <p className="font-body-alt text-white/70 text-sm leading-relaxed line-clamp-3">
                    {card.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}