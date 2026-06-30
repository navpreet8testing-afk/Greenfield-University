'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Compass, FileText, MapPin } from 'lucide-react';

const dockItems = [
  { label: 'Explore Programs', href: '/programs', icon: Compass },
  { label: 'Apply Now', href: '/admissions', icon: FileText },
  { label: 'Virtual Tour', href: '/campus', icon: MapPin },
];

export function FloatingDock() {
  const dockRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);
  const router = useRouter();

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          scrollVelocity.current = Math.abs(scrollY - lastScrollY.current);
          lastScrollY.current = scrollY;

          // Show dock after scrolling past hero
          if (scrollY > window.innerHeight * 0.6) {
            setVisible(true);
          } else {
            setVisible(false);
          }

          // Scale down during fast scrolling
          if (dockRef.current) {
            if (scrollVelocity.current > 15) {
              dockRef.current.style.transform = 'translateY(0) scale(0.95)';
              dockRef.current.style.opacity = '0.85';
            } else {
              dockRef.current.style.transform = 'translateY(0) scale(1)';
              dockRef.current.style.opacity = '1';
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={dockRef}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-800 floating-dock animate-float ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-[200%] opacity-0'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
    >
      <nav
        className="relative flex items-center gap-1 bg-slate-dark/80 rounded-full px-2 py-2 shadow-2xl shadow-black/20 border border-white/10"
        onMouseLeave={() => setActiveIndex(-1)}
      >
        {/* Animated pill background */}
        <div
          className="absolute h-[calc(100%-12px)] bg-emerald/20 rounded-full border border-emerald/30"
          style={{
            left: activeIndex >= 0 ? `${activeIndex * (100 / dockItems.length)}%` : '-100%',
            width: `${100 / dockItems.length}%`,
            opacity: activeIndex >= 0 ? 1 : 0,
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}
        />
        {dockItems.map((item, i) => (
          <a
            key={item.label}
            href={item.href}
            className="floating-dock-pill relative z-10 flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-white/80 hover:text-white text-sm font-medium whitespace-nowrap"
            onMouseEnter={() => setActiveIndex(i)}
            onClick={(e) => {
              e.preventDefault();
              router.push(item.href);
            }}
          >
            <item.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}