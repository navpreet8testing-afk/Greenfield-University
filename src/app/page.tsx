'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Navbar } from '@/components/college/Navbar';
import { HeroSection } from '@/components/college/HeroSection';
import { FloatingDock } from '@/components/college/FloatingDock';
import { StatsSection } from '@/components/college/StatsSection';
import { ProgramsSection } from '@/components/college/ProgramsSection';
import { WhyChooseSection } from '@/components/college/WhyChooseSection';
import { FacultySection } from '@/components/college/FacultySection';
import { CampusLifeSection } from '@/components/college/CampusLifeSection';
import { TestimonialsSection } from '@/components/college/TestimonialsSection';
import { EventsSection } from '@/components/college/EventsSection';
import { AdmissionSection } from '@/components/college/AdmissionSection';
import { ContactSection } from '@/components/college/ContactSection';
import { Footer } from '@/components/college/Footer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SmoothScroller } from '@/components/SmoothScroller';
import { PartnersSection } from '@/components/college/PartnersSection';
import { ResearchSection } from '@/components/college/ResearchSection';
import { AchievementBanner } from '@/components/college/AchievementBanner';
import { NoticeBoard } from '@/components/college/NoticeBoard';
import { CampusNews } from '@/components/college/CampusNews';
import { VirtualTour } from '@/components/college/VirtualTour';


export default function CollegeHomePage() {
  const { data: programs = [], isSuccess: programsLoaded } = useQuery({
    queryKey: ['programs'],
    queryFn: () => fetch('/api/programs').then(r => r.json()),
  });

  const { data: faculty = [], isSuccess: facultyLoaded } = useQuery({
    queryKey: ['faculty'],
    queryFn: () => fetch('/api/faculty').then(r => r.json()),
  });

  const { data: events = [], isSuccess: eventsLoaded } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetch('/api/events').then(r => r.json()),
  });

  const { data: testimonials = [], isSuccess: testimonialsLoaded } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => fetch('/api/testimonials').then(r => r.json()),
  });

  const { data: notices = [], isSuccess: noticesLoaded } = useQuery({
    queryKey: ['notices'],
    queryFn: () => fetch('/api/notices').then(r => r.json()),
  });

  // Refresh ScrollTrigger after data loads to re-calculate positions
  useEffect(() => {
    if (programsLoaded || facultyLoaded || eventsLoaded || testimonialsLoaded || noticesLoaded) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [programsLoaded, facultyLoaded, eventsLoaded, testimonialsLoaded, noticesLoaded]);

  return (
    <SmoothScroller>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <div className="section-divider-gradient" />
          <StatsSection />
          <PartnersSection />
          <div className="section-divider-gradient" />
          <ProgramsSection programs={programs} />
          <div className="section-divider-gradient" />
          <WhyChooseSection />
          <div className="section-divider-gradient" />
          <FacultySection faculty={faculty} />
          <CampusLifeSection />
          <ResearchSection />
          <VirtualTour />
          <div className="section-divider-gradient" />
          <TestimonialsSection testimonials={testimonials} />
          <AchievementBanner />
          <NoticeBoard />
          <CampusNews />
          <EventsSection events={events} notices={notices} />
          <div className="section-divider-gradient" />
          <AdmissionSection programs={programs} />
          <div className="section-divider-gradient" />
          <ContactSection />
        </main>
        <Footer />
        <FloatingDock />
      </div>
    </SmoothScroller>
  );
}