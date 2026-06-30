'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, ArrowRight, Bell, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { EVENT_CATEGORY_IMAGES } from '@/lib/images';

gsap.registerPlugin(ScrollTrigger);

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  featured: boolean;
}

interface NoticeItem {
  id: string;
  title: string;
  content: string;
  category: string;
  important: boolean;
  date: string;
}

interface EventsSectionProps {
  events: EventItem[];
  notices: NoticeItem[];
}

const categoryColors: Record<string, string> = {
  tech: 'bg-cyan-100 text-cyan-700',
  sports: 'bg-green-100 text-green-700',
  academic: 'bg-purple-100 text-purple-700',
  cultural: 'bg-rose-100 text-rose-700',
  placement: 'bg-amber-100 text-amber-700',
  workshop: 'bg-teal-100 text-teal-700',
};

export function EventsSection({ events, notices }: EventsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<'events' | 'notices'>('events');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.events-heading', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      gsap.utils.toArray<HTMLElement>('.event-card').forEach((card, i) => {
        const fromX = i % 2 === 0 ? -50 : 50;
        gsap.fromTo(card,
          { opacity: 0, x: fromX, y: 20 },
          {
            opacity: 1, x: 0, y: 0,
            duration: 0.8,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [activeTab, events.length, notices.length]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getDay = (dateStr: string) => new Date(dateStr).getDate();
  const getMonth = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-IN', { month: 'short' }).toUpperCase();

  const getCategoryImage = (category: string) => EVENT_CATEGORY_IMAGES[category] || EVENT_CATEGORY_IMAGES.workshop;

  return (
    <section id="events" ref={sectionRef} className="py-20 sm:py-28 bg-white dark:bg-slate-dark/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 events-heading">
          <span className="font-section-label inline-block text-emerald text-sm font-semibold tracking-[0.2em] mb-3">Stay Updated</span>
          <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark mb-4">
            Events &amp; Announcements
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-body-alt">
            Never miss what matters — from academic conferences to cultural celebrations.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {(['events', 'notices'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-slate-dark text-white shadow-lg'
                  : 'bg-gray-100 text-muted-foreground hover:bg-gray-200 dark:bg-white/5 dark:text-white/50 dark:hover:bg-white/10'
              }`}
            >
              {tab === 'events' ? (
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Events</span>
              ) : (
                <span className="flex items-center gap-2"><Bell className="w-4 h-4" /> Notices</span>
              )}
            </button>
          ))}
        </div>

        {activeTab === 'events' ? (
          <div className="grid md:grid-cols-2 gap-6">
            {events.slice(0, 6).map((event, i) => (
              <div
                key={event.id}
                className="gsap-reveal event-card group flex gap-5 p-5 rounded-2xl bg-gray-50/50 hover:bg-white border border-transparent hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald/5 transition-all duration-500 dark:bg-white/5 dark:hover:bg-white/10"
              >
                {/* Date badge */}
                <div className="shrink-0 w-16 h-16 rounded-xl bg-white shadow-sm flex flex-col items-center justify-center border border-border/30 group-hover:bg-emerald group-hover:border-emerald transition-colors duration-400">
                  <span className="text-xs font-bold text-muted-foreground group-hover:text-emerald-200 transition-colors">{getMonth(event.date)}</span>
                  <span className="text-2xl font-bold text-slate-dark group-hover:text-white leading-tight transition-colors">{getDay(event.date)}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {/* Category image thumbnail instead of emoji */}
                    <img
                      src={getCategoryImage(event.category)}
                      alt={event.category}
                      className="w-5 h-5 rounded object-cover"
                    />
                    <Badge variant="secondary" className={`text-[11px] ${categoryColors[event.category] || 'bg-gray-100 text-gray-600'}`}>
                      {event.category}
                    </Badge>
                    {event.featured && (
                      <Badge variant="outline" className="text-[11px] border-gold text-gold">Featured</Badge>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-dark text-base mb-1 line-clamp-1 group-hover:text-emerald transition-colors dark:text-white">
                    {event.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3 dark:text-white/50">{event.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {formatDate(event.date)}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-4">
            {notices.map((notice, i) => (
              <div
                key={notice.id}
                className="gsap-reveal event-card group flex items-start gap-4 p-5 rounded-2xl bg-gray-50/50 hover:bg-white border border-transparent hover:border-emerald-100 hover:shadow-lg transition-all duration-400"
              >
                <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${notice.important ? 'bg-rose-100' : 'bg-emerald-100'}`}>
                  {notice.important ? (
                    <AlertTriangle className="w-5 h-5 text-rose-500" />
                  ) : (
                    <Bell className="w-5 h-5 text-emerald" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-dark text-sm">{notice.title}</h3>
                    {notice.important && (
                      <Badge variant="destructive" className="text-[10px] px-1.5">Urgent</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{notice.content}</p>
                  <div className="text-xs text-muted-foreground mt-2">{formatDate(notice.date)}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <a href="/campus" className="inline-flex items-center gap-2 text-sm font-medium text-emerald hover:text-emerald-dark transition-colors group">
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}