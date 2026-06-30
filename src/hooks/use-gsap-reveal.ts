'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reliable GSAP scroll reveal hook.
 * - Uses gsap.set() for initial states (not CSS opacity-0)
 * - Includes a safety timeout to ensure content is always visible
 * - Supports data-dependent refresh
 */
export function useGsapReveal(
  options: {
    /** Section ref for scoped GSAP context */
    sectionRef: React.RefObject<HTMLElement | null>;
    /** GSAP animation config - runs once on mount */
    animations?: () => void;
    /** Re-run animations when this dependency changes (e.g., data loaded) */
    refreshDeps?: unknown[];
    /** Safety timeout in ms to force-show all content (default 3000) */
    safetyTimeout?: number;
  } = {}
) {
  const { sectionRef, animations, refreshDeps = [], safetyTimeout = 3000 } = options;
  const initialized = useRef(false);

  const setupAnimations = useCallback(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      animations?.();
    }, sectionRef);

    return ctx;
  }, [sectionRef, animations]);

  useEffect(() => {
    if (initialized.current) return;

    const ctx = setupAnimations();
    initialized.current = true;

    // Safety timeout: force all animated elements visible if GSAP didn't fire
    const timer = setTimeout(() => {
      const section = sectionRef.current;
      if (!section) return;

      // Find all elements that might still be hidden
      const hiddenElements = section.querySelectorAll(
        '.stat-card, .event-card, .faculty-card, .testimonial-card, .why-card, .campus-card, .stacked-card, .program-card'
      );
      hiddenElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        if (parseFloat(gsap.getProperty(htmlEl, 'opacity') as string) < 0.1) {
          gsap.to(htmlEl, {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            rotateY: 0,
            duration: 0.6,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      });
    }, safetyTimeout);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
      initialized.current = false;
    };
  }, [sectionRef, setupAnimations, safetyTimeout]);

  // Refresh ScrollTrigger when data changes
  useEffect(() => {
    if (initialized.current) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, refreshDeps);
}

/**
 * Utility: set initial hidden state via GSAP (not CSS)
 * Call this inside your animation setup function
 */
export function setInitialHidden(
  selector: string,
  sectionRef: React.RefObject<HTMLElement | null>,
  options: { opacity?: number; y?: number; x?: number; scale?: number; rotateY?: number } = {}
) {
  const { opacity = 0, y = 40, x = 0, scale = 1, rotateY = 0 } = options;
  const elements = sectionRef.current?.querySelectorAll(selector);
  elements?.forEach((el) => {
    gsap.set(el, { opacity, y, x, scale, rotateY });
  });
}