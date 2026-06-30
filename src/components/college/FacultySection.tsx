'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail } from 'lucide-react';
import { FACULTY_IMAGES } from '@/lib/images';

gsap.registerPlugin(ScrollTrigger);

interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  bio: string;
  email?: string;
}

interface FacultySectionProps {
  faculty: FacultyMember[];
}

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

const avatarColors = [
  'from-emerald-400 to-teal-600',
  'from-amber-400 to-orange-600',
  'from-rose-400 to-pink-600',
  'from-violet-400 to-purple-600',
  'from-cyan-400 to-blue-600',
  'from-lime-400 to-green-600',
];

export function FacultySection({ faculty }: FacultySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = useCallback((index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo('.faculty-heading', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      // Card entrance animations
      gsap.utils.toArray<HTMLElement>('.faculty-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      });

      // Photo clip-reveal + scale entrance
      gsap.utils.toArray<HTMLElement>('.faculty-photo-wrap').forEach((wrap, i) => {
        gsap.fromTo(wrap,
          { clipPath: 'inset(100% 0 0 0)', scale: 0.95, opacity: 0 },
          {
            clipPath: 'inset(0 0 0 0)',
            scale: 1,
            opacity: 1,
            duration: 0.9,
            delay: i * 0.1 + 0.3,
            ease: 'power3.out',
            scrollTrigger: { trigger: wrap, start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [faculty.length]);

  return (
    <section id="faculty" ref={sectionRef} className="py-20 sm:py-28 bg-gradient-to-b from-white to-emerald-50/20 dark:from-slate-dark/95 dark:to-slate-dark/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section heading */}
        <div className="text-center mb-16 faculty-heading">
          <span className="font-section-label inline-block text-emerald text-sm font-semibold tracking-[0.2em] mb-3">Our Experts</span>
          <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">
            Meet Our Faculty
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-body-alt">
            Learn from the best minds in academia and industry, dedicated to shaping your intellectual journey.
          </p>
        </div>

        {/* Faculty grid — bento-style: first card spans 2 cols on md+ */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {faculty.map((member, i) => {
            const isFeatured = i === 0;
            const imgUrl = FACULTY_IMAGES[i % FACULTY_IMAGES.length];
            const hasError = imageErrors[i];

            return (
              <div
                key={member.id}
                className={`gsap-reveal faculty-card group relative bg-white rounded-2xl border border-border/50 overflow-hidden transition-all duration-500 hover:-translate-y-1 dark:bg-white/5 dark:border-white/10 dark:hover:border-emerald/30 ${
                  isFeatured ? 'sm:col-span-2 md:col-span-2' : ''
                } hover:shadow-xl hover:shadow-emerald/5`}
              >
                {isFeatured ? (
                  /* Featured faculty — horizontal layout on md+ */
                  <div className="flex flex-col md:flex-row">
                    {/* Photo */}
                    <div className="faculty-photo-wrap relative w-full md:w-2/5 h-56 md:h-auto shrink-0 overflow-hidden">
                      {hasError ? (
                        <div className={`w-full h-full min-h-[14rem] bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center`}>
                          <span className="text-white font-bold text-4xl">{getInitials(member.name)}</span>
                        </div>
                      ) : (
                        <img
                          src={imgUrl}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          onError={() => handleImageError(i)}
                        />
                      )}
                      {/* Gradient overlay on photo */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-white/10 dark:md:to-white/5 pointer-events-none" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 p-6 flex flex-col justify-center">
                      <span className="font-feature-title text-xs font-medium text-emerald tracking-[0.15em] uppercase mb-1">Featured Faculty</span>
                      <h3 className="font-feature-title text-xl md:text-2xl font-bold text-slate-dark dark:text-white mb-1">{member.name}</h3>
                      <p className="text-emerald text-sm font-semibold">{member.designation}</p>
                      <p className="text-muted-foreground text-sm mt-0.5">{member.department}</p>

                      <div className="flex items-center gap-2 mt-3 mb-3">
                        <span className="text-xs font-medium bg-emerald-50 text-emerald px-2.5 py-1 rounded-full dark:bg-emerald/10 dark:text-emerald">
                          {member.qualification}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed font-body-alt line-clamp-3">
                        {member.bio}
                      </p>

                      {member.email && (
                        <div className="mt-4 pt-4 border-t border-border/30 dark:border-white/10">
                          <a
                            href={`mailto:${member.email}`}
                            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-emerald transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            {member.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Standard faculty card — vertical layout */
                  <>
                    {/* Photo */}
                    <div className="faculty-photo-wrap relative h-48 overflow-hidden">
                      {hasError ? (
                        <div className={`w-full h-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center`}>
                          <span className="text-white font-bold text-3xl">{getInitials(member.name)}</span>
                        </div>
                      ) : (
                        <img
                          src={imgUrl}
                          alt={member.name}
                          className="w-full h-full object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
                          onError={() => handleImageError(i)}
                        />
                      )}
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Info */}
                    <div className="p-6">
                      <h3 className="font-feature-title text-lg font-bold text-slate-dark dark:text-white truncate">{member.name}</h3>
                      <p className="text-emerald text-sm font-semibold">{member.designation}</p>
                      <p className="text-muted-foreground text-xs mt-0.5">{member.department}</p>

                      <div className="flex items-center gap-2 mt-3 mb-3">
                        <span className="text-xs font-medium bg-emerald-50 text-emerald px-2.5 py-1 rounded-full dark:bg-emerald/10 dark:text-emerald">
                          {member.qualification}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed font-body-alt line-clamp-3">
                        {member.bio}
                      </p>

                      {member.email && (
                        <div className="mt-4 pt-4 border-t border-border/30 dark:border-white/10">
                          <a
                            href={`mailto:${member.email}`}
                            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-emerald transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            {member.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}