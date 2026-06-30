'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { IMAGES, PAGE_PHOTOS } from '@/lib/images';

interface TourStop {
  title: string;
  description: string;
  image: string;
  icon?: string;
}

const TOUR_STOPS: TourStop[] = [
  {
    title: 'Main Entrance & Auditorium',
    description:
      'The grand entrance of Greenfield University with the iconic auditorium building that hosts convocations, cultural events, and distinguished guest lectures.',
    image: PAGE_PHOTOS.auditorium,
  },
  {
    title: 'Central Library',
    description:
      'Our state-of-the-art library with over 50,000 volumes and digital archives, offering quiet study zones and collaborative research spaces.',
    image: PAGE_PHOTOS.modernLibrary,
  },
  {
    title: 'Science Laboratories',
    description:
      'Cutting-edge research labs for Physics, Chemistry, and Biotechnology equipped with the latest instruments and safety standards.',
    image: IMAGES.laboratory,
  },
  {
    title: 'Computer Science Block',
    description:
      'Modern computing facilities with AI/ML labs and cloud infrastructure, supporting hands-on learning in software development and data science.',
    image: PAGE_PHOTOS.pgComputerLab,
  },
  {
    title: 'Sports Complex',
    description:
      'Olympic-size swimming pool, indoor courts, and cricket/football grounds — a world-class facility nurturing champions and promoting fitness.',
    image: PAGE_PHOTOS.sportsComplex,
  },
  {
    title: 'Student Hostels',
    description:
      'Comfortable residential facilities with Wi-Fi, mess, and recreation areas — a home away from home for students from across the country.',
    image: IMAGES.campusLife,
  },
  {
    title: 'Cafeteria & Food Court',
    description:
      'Multi-cuisine food court with vegetarian and non-vegetarian options, hygienic preparation, and a vibrant social atmosphere.',
    image: IMAGES.cafeteria,
  },
  {
    title: 'Research & Innovation Hub',
    description:
      'Interdisciplinary research center with incubation facilities, fostering startups and groundbreaking research across emerging domains.',
    image: PAGE_PHOTOS.researchLab,
  },
];

export function VirtualTour() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getCardWidth = useCallback(() => {
    if (typeof window === 'undefined') return 400;
    return window.innerWidth >= 640 ? 400 : 320;
  }, []);

  const scrollToIndex = useCallback(
    (index: number) => {
      const container = scrollRef.current;
      if (!container) return;
      const clamped = Math.max(0, Math.min(index, TOUR_STOPS.length - 1));
      const cardWidth = getCardWidth();
      const gap = 24;
      container.scrollTo({
        left: clamped * (cardWidth + gap),
        behavior: 'smooth',
      });
      setActiveIndex(clamped);
    },
    [getCardWidth]
  );

  // Detect active card on scroll
  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = getCardWidth();
    const gap = 24;
    const scrollLeft = container.scrollLeft;
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.max(0, Math.min(index, TOUR_STOPS.length - 1)));
  }, [getCardWidth]);

  // Auto-advance
  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % TOUR_STOPS.length;
        scrollToIndex(next);
        return next;
      });
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, scrollToIndex]);

  // Add scroll listener
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const goNext = () => {
    const next = (activeIndex + 1) % TOUR_STOPS.length;
    scrollToIndex(next);
  };

  const goPrev = () => {
    const prev = (activeIndex - 1 + TOUR_STOPS.length) % TOUR_STOPS.length;
    scrollToIndex(prev);
  };

  return (
    <section className="py-20 sm:py-28 bg-slate-dark dark:bg-slate-950 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="font-section-label inline-block text-emerald text-sm font-semibold tracking-[0.2em] mb-3">
            Explore Our Campus
          </span>
          <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Virtual Campus Tour
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-body-alt">
            Take a guided stroll through our lush 50-acre campus and discover the world-class
            facilities that make Greenfield University a premier institution.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative group/tour"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Scrollable Track */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth px-1 pb-4 tour-scroll-container"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {TOUR_STOPS.map((stop, index) => (
              <div
                key={stop.title}
                className="flex-shrink-0 min-w-[320px] sm:min-w-[400px] scroll-snap-start"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div
                  className={`glass-card rounded-2xl overflow-hidden transition-all duration-500 h-full ${
                    index === activeIndex
                      ? 'ring-2 ring-emerald/60 shadow-lg shadow-emerald/10'
                      : 'ring-1 ring-white/10 hover:ring-white/20'
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={stop.image}
                      alt={stop.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/tour:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    {/* Stop number badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-emerald/90 text-white text-xs font-bold flex items-center justify-center shadow-lg">
                        {index + 1}
                      </span>
                      <span className="text-white/70 text-xs font-body-alt">
                        / {TOUR_STOPS.length}
                      </span>
                    </div>
                    {/* Map pin icon */}
                    <div className="absolute bottom-4 left-4">
                      <MapPin className="w-4 h-4 text-emerald" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3
                      className={`font-feature-title text-lg font-semibold mb-2 transition-colors duration-300 ${
                        index === activeIndex ? 'text-emerald' : 'text-white'
                      }`}
                    >
                      {stop.title}
                    </h3>
                    <p className="text-slate-400 text-sm font-body-alt leading-relaxed line-clamp-3">
                      {stop.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/tour:opacity-100 transition-all duration-300 hover:bg-emerald/80 hover:border-emerald/80 z-20"
            aria-label="Previous stop"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/tour:opacity-100 transition-all duration-300 hover:bg-emerald/80 hover:border-emerald/80 z-20"
            aria-label="Next stop"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8" role="tablist" aria-label="Tour stops">
          {TOUR_STOPS.map((stop, index) => (
            <button
              key={stop.title}
              onClick={() => scrollToIndex(index)}
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Go to ${stop.title}`}
              className={`transition-all duration-300 rounded-full ${
                index === activeIndex
                  ? 'w-8 h-2.5 bg-emerald'
                  : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}