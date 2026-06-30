'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const rotatingWords = ['Ambition', 'Future', 'Impact', 'Legacy'];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroFrameRef = useRef<HTMLDivElement>(null);
  const wordContainerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    // Kinetic typography cycling
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);

    const ctx = gsap.context(() => {
      // Subtitle fade in
      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, delay: 1.2, ease: 'power3.out' }
        );
      }

      // CTA fade in
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, delay: 1.5, ease: 'power3.out' }
        );
      }

      // Scroll-driven scale for hero image frame
      if (heroFrameRef.current) {
        gsap.to(heroFrameRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
          scale: 1.15,
          borderRadius: '24px',
          ease: 'power2.out',
        });
      }

      // Parallax on hero
      if (sectionRef.current) {
        gsap.to('.hero-content', {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
          y: -100,
          opacity: 0,
        });
      }
    }, sectionRef);

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, []);

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with scroll scale */}
      <div ref={heroFrameRef} className="absolute inset-0 campus-hero-frame">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/hero-campus.png)' }}
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Noise texture */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Content */}
      <div className="hero-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20 w-full">
        <div className="max-w-3xl">
          {/* Kinetic Typography Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
            Unify Your
            <br />
            <span className="kinetic-container inline-block h-[1.15em] align-bottom relative w-[5ch] sm:w-[7ch] md:w-[9ch]">
              {rotatingWords.map((word, i) => (
                <span
                  key={word}
                  className="kinetic-word font-hero-word absolute inset-0 text-emerald-light flex items-end"
                  style={{
                    opacity: i === currentWord ? 1 : 0,
                    transform: i === currentWord
                      ? 'translateY(0) rotateX(0)'
                      : i < currentWord
                        ? 'translateY(-110%) rotateX(45deg)'
                        : 'translateY(110%) rotateX(-45deg)',
                    transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                >
                  {word}
                </span>
              ))}
            </span>
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className="text-lg sm:text-xl text-white/70 max-w-xl mb-10 leading-relaxed">
            At Greenfield University, we nurture tomorrow&apos;s leaders through world-class education,
            cutting-edge research, and a vibrant campus experience.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              className="card-shine bg-emerald hover:bg-emerald-dark text-white rounded-full px-8 shadow-2xl shadow-emerald/30 transition-all hover:shadow-emerald/50 hover:scale-105 text-base"
              asChild
            >
              <a href="#admission">Start Your Journey</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="card-shine rounded-full px-8 border-white/30 text-white hover:bg-white/10 hover:text-white transition-all text-base bg-transparent hover:border-white/50"
              asChild
            >
              <a href="/programs">
                <Play className="w-4 h-4 mr-2 fill-current" />
                Explore Programs
              </a>
            </Button>
          </div>

          {/* Quick stats */}
          <div className="mt-16 flex flex-wrap gap-8 sm:gap-12">
            {[
              { value: '3200+', label: 'Students' },
              { value: '94%', label: 'Placements' },
              { value: '150+', label: 'Faculty' },
              { value: '25+', label: 'Programs' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-white/50 text-sm mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5 text-white/40" />
      </div>
    </section>
  );
}