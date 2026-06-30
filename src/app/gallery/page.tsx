'use client';

import { useState, useEffect, useCallback } from 'react';
import { Camera, FolderOpen, Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Navbar } from '@/components/college/Navbar';
import { Footer } from '@/components/college/Footer';
import { Badge } from '@/components/ui/badge';
import { IMAGES, PAGE_PHOTOS } from '@/lib/images';

/* ── Types ─────────────────────────────────────────────────── */

interface Photo {
  src: string;
  category: string;
  title: string;
  description: string;
}

/* ── Data ─────────────────────────────────────────────────── */

const PHOTOS: Photo[] = [
  // Campus
  { src: '/images/hero-campus.png', category: 'Campus', title: 'Campus Overview', description: 'Aerial view of the lush Greenfield University campus' },
  { src: IMAGES.campusLife, category: 'Campus', title: 'Campus Life', description: 'Students enjoying vibrant campus life' },
  { src: IMAGES.campusWalk, category: 'Campus', title: 'Campus Walk', description: 'Beautiful tree-lined pathways across campus' },
  { src: IMAGES.architecture, category: 'Campus', title: 'University Architecture', description: 'Modern architecture blending tradition and innovation' },
  { src: PAGE_PHOTOS.campusAerial, category: 'Campus', title: 'Aerial View', description: 'Stunning bird\'s-eye view of the university grounds' },
  { src: PAGE_PHOTOS.modernLibrary, category: 'Campus', title: 'Modern Library', description: 'State-of-the-art library building exterior' },
  { src: PAGE_PHOTOS.convocationHall, category: 'Campus', title: 'Convocation Hall', description: 'Grand convocation hall for ceremonies and events' },
  { src: PAGE_PHOTOS.auditorium, category: 'Campus', title: 'Auditorium', description: 'World-class auditorium with 2000+ seating capacity' },

  // Academics
  { src: IMAGES.bcaClassroom, category: 'Academics', title: 'BCA Classroom', description: 'Technology-enabled smart classroom for computer applications' },
  { src: IMAGES.mcaCoding, category: 'Academics', title: 'MCA Coding Lab', description: 'Postgraduate students working on advanced coding projects' },
  { src: IMAGES.commerce, category: 'Academics', title: 'Commerce Lecture', description: 'Interactive commerce and finance lecture session' },
  { src: IMAGES.arts, category: 'Academics', title: 'Arts & Humanities', description: 'Creative arts studio with hands-on learning' },
  { src: IMAGES.science, category: 'Academics', title: 'Science Laboratory', description: 'Advanced science lab for practical experiments' },
  { src: PAGE_PHOTOS.pgComputerLab, category: 'Academics', title: 'PG Computer Lab', description: 'Postgraduate computer laboratory with latest hardware' },
  { src: PAGE_PHOTOS.ugClassroom, category: 'Academics', title: 'UG Classroom', description: 'Modern undergraduate classroom with smart boards' },
  { src: PAGE_PHOTOS.phdSeminar, category: 'Academics', title: 'PhD Seminar', description: 'Doctoral research seminar and presentation session' },

  // Events
  { src: IMAGES.cultural, category: 'Events', title: 'Cultural Festival', description: 'Annual cultural festival celebrations at GU' },
  { src: IMAGES.graduation, category: 'Events', title: 'Graduation Ceremony', description: 'Convocation ceremony celebrating graduating students' },
  { src: IMAGES.career, category: 'Events', title: 'Career Fair', description: 'Annual placement fair with 300+ recruiting companies' },
  { src: IMAGES.hackathon, category: 'Events', title: 'Hackathon', description: 'National-level hackathon CodeStorm at Greenfield' },
  { src: PAGE_PHOTOS.admissionCounseling, category: 'Events', title: 'Admission Counseling', description: 'Personalized admission counseling sessions for aspirants' },

  // Sports
  { src: IMAGES.sports, category: 'Sports', title: 'Sports Complex', description: 'World-class sports facilities for all major games' },

  // Infrastructure
  { src: IMAGES.laboratory, category: 'Infrastructure', title: 'Research Laboratory', description: 'Cutting-edge research lab with advanced equipment' },
  { src: IMAGES.library, category: 'Infrastructure', title: 'Central Library', description: '50,000+ volumes and digital resources hub' },
  { src: IMAGES.cafeteria, category: 'Infrastructure', title: 'Cafeteria', description: 'Multi-cuisine food court with nutritious meal options' },
  { src: PAGE_PHOTOS.sportsComplex, category: 'Infrastructure', title: 'Indoor Sports Arena', description: 'Indoor sports arena with courts and gymnasium' },
  { src: PAGE_PHOTOS.researchLab, category: 'Infrastructure', title: 'Research Center', description: 'Dedicated research center for funded projects' },
];

const FILTER_TABS = ['All', 'Campus', 'Academics', 'Events', 'Sports', 'Infrastructure'] as const;
type FilterTab = (typeof FILTER_TABS)[number];

const STATS = [
  { icon: Camera, value: '200+', label: 'Photos' },
  { icon: FolderOpen, value: '5', label: 'Categories' },
  { icon: Heart, value: 'Campus Life', label: '' },
];

/* ── Component ─────────────────────────────────────────────── */

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredPhotos = activeTab === 'All'
    ? PHOTOS
    : PHOTOS.filter((p) => p.category === activeTab);

  const openLightbox = useCallback((index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goPrev = useCallback(() => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredPhotos.length - 1));
  }, [filteredPhotos.length]);

  const goNext = useCallback(() => {
    setSelectedIndex((prev) => (prev < filteredPhotos.length - 1 ? prev + 1 : 0));
  }, [filteredPhotos.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, closeLightbox, goPrev, goNext]);

  const handleTabChange = useCallback((tab: FilterTab) => {
    setActiveTab(tab);
    setSelectedIndex(0);
  }, []);

  const currentPhoto = filteredPhotos[selectedIndex];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* ═══════════ HERO ═══════════ */}
        <section className="relative h-[55vh] min-h-[380px] flex items-center justify-center overflow-hidden">
          <img
            src={IMAGES.campusWalk}
            alt="Greenfield University Campus"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="noise-overlay absolute inset-0" />
          <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
            <h1 className="font-section-title text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Photo Gallery
            </h1>
            <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto font-body-alt leading-relaxed">
              Explore the vibrant campus life at Greenfield University
            </p>
          </div>
        </section>

        <div className="section-divider-gradient" />

        {/* ═══════════ GALLERY CONTENT ═══════════ */}
        <section className="py-20 sm:py-28 bg-white dark:bg-slate-dark/95">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Section heading */}
            <div className="text-center mb-10">
              <span className="font-section-label inline-block text-emerald text-sm font-semibold tracking-[0.2em] mb-3">
                Visual Stories
              </span>
              <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-slate-200 mb-4 gradient-text">Campus Through the Lens</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-body-alt">
                A curated collection of moments that capture the spirit, energy, and beauty of life at Greenfield University.
              </p>
            </div>

            {/* Stats Bar */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-12">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 text-center">
                  <div className="w-11 h-11 rounded-xl bg-emerald/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-emerald" />
                  </div>
                  <div className="text-left">
                    <p className="font-feature-title text-lg font-bold text-slate-dark dark:text-slate-100">
                      {stat.value}
                    </p>
                    {stat.label && (
                      <p className="text-xs text-muted-foreground dark:text-slate-400">{stat.label}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Filter Tabs */}
            <div className="glass-card flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                    activeTab === tab
                      ? 'bg-emerald text-white shadow-lg shadow-emerald/25'
                      : 'bg-emerald-light/60 dark:bg-white/5 text-slate-dark dark:text-slate-300 hover:bg-emerald-light dark:hover:bg-white/10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Photo Grid */}
            <div className="glass-card grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filteredPhotos.map((photo, index) => (
                <div
                  key={`${photo.category}-${photo.title}`}
                  className="group rounded-xl overflow-hidden cursor-pointer relative aspect-[4/3]"
                  onClick={() => openLightbox(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${photo.title}`}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-3 sm:p-4 w-full">
                      <Badge className="bg-emerald/80 text-white border-0 text-[10px] font-semibold mb-1.5">
                        {photo.category}
                      </Badge>
                      <h3 className="text-white text-sm sm:text-base font-semibold font-feature-title leading-tight">
                        {photo.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty state */}
            {filteredPhotos.length === 0 && (
              <div className="text-center py-16">
                <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg font-body-alt">
                  No photos found for this category.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ═══════════ LIGHTBOX ═══════════ */}
      {lightboxOpen && currentPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-300 cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-3 sm:left-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-300 cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-3 sm:right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-300 cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image container */}
          <div className="flex flex-col items-center max-w-5xl max-h-[85vh] px-14 sm:px-20">
            <div className="relative w-full flex items-center justify-center" style={{ maxHeight: '75vh' }}>
              <img
                src={currentPhoto.src}
                alt={currentPhoto.title}
                className="max-w-full max-h-[75vh] object-contain rounded-lg select-none"
              />
            </div>
            {/* Title & description */}
            <div className="mt-4 sm:mt-6 text-center max-w-xl">
              <Badge className="bg-emerald/80 text-white border-0 text-xs font-semibold mb-2">
                {currentPhoto.category}
              </Badge>
              <h3 className="text-white text-lg sm:text-xl font-bold font-feature-title mb-1">
                {currentPhoto.title}
              </h3>
              <p className="text-white/50 text-sm font-body-alt">
                {currentPhoto.description}
              </p>
            </div>
          </div>

          {/* Photo counter */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs font-body-alt">
            {selectedIndex + 1} / {filteredPhotos.length}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}