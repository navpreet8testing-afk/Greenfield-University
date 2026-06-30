'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

const MENU_ROUTES: Record<string, string> = {
  'Academics': '/programs',
  'Campus': '/campus',
  'About': '/about',
  'Admissions': '/admissions',
  'Connect': '/contact',
};

const megaMenus = [
  {
    label: 'Academics',
    cols: [
      { title: 'Programs', links: [
        { label: 'All Programs', href: '/programs' },
        { label: 'Undergraduate', href: '/programs' },
        { label: 'Postgraduate', href: '/programs' },
        { label: 'Doctoral (PhD)', href: '/programs' },
        { label: 'Certificate Courses', href: '/programs' },
      ]},
      { title: 'Academics', links: [
        { label: 'Departments', href: '/programs' },
        { label: 'Research Centers', href: '/about' },
        { label: 'Academic Calendar', href: '/downloads' },
        { label: 'Course Catalog', href: '/programs' },
      ]},
      { title: 'Resources', links: [
        { label: 'Faculty Portal', href: '/faculty-portal' },
        { label: 'Faculty Spotlight', href: '/about' },
        { label: 'Student Portal', href: '/portal' },
        { label: 'Downloads', href: '/downloads' },
        { label: 'Library', href: '/library' },
        { label: 'Labs & Facilities', href: '/about' },
      ]},
    ]
  },
  {
    label: 'Campus',
    cols: [
      { title: 'Life at GU', links: [
        { label: 'Campus Overview', href: '/campus' },
        { label: 'Sports & Fitness', href: '/campus' },
        { label: 'Clubs & Societies', href: '/campus' },
        { label: 'Hostel & Dining', href: '/campus' },
      ]},
      { title: 'Facilities', links: [
        { label: 'Library Portal', href: '/campus' },
        { label: 'Laboratories', href: '/campus' },
        { label: 'Cafeteria', href: '/campus' },
        { label: 'Photo Gallery', href: '/gallery' },
      ]},
      { title: 'Activities', links: [
        { label: 'Events & News', href: '/campus' },
        { label: 'Annual Fest', href: '/campus' },
        { label: 'Cultural Programs', href: '/campus' },
        { label: 'Workshops', href: '/campus' },
      ]},
    ]
  },
  {
    label: 'About',
    cols: [
      { title: 'University', links: [
        { label: 'About Us', href: '/about' },
        { label: 'Leadership Team', href: '/about' },
        { label: 'History & Heritage', href: '/about' },
        { label: 'Vision & Mission', href: '/about' },
      ]},
      { title: 'Excellence', links: [
        { label: 'Accreditations', href: '/about' },
        { label: 'Awards & Rankings', href: '/about' },
        { label: 'Research Impact', href: '/about' },
        { label: 'Global Partners', href: '/about' },
      ]},
      { title: 'Community', links: [
        { label: 'Alumni Network', href: '/alumni' },
        { label: 'Testimonials', href: '/about' },
        { label: 'News & Updates', href: '/' },
        { label: 'Careers at GU', href: '/career' },
      ]},
    ]
  },
  {
    label: 'Admissions',
    cols: [
      { title: 'Apply', links: [
        { label: 'How to Apply', href: '/admissions' },
        { label: 'Eligibility Criteria', href: '/admissions' },
        { label: 'Important Dates', href: '/admissions' },
        { label: 'Application Form', href: '/admissions' },
      ]},
      { title: 'Financial', links: [
        { label: 'Fee Structure', href: '/admissions' },
        { label: 'Scholarships', href: '/admissions' },
        { label: 'Education Loans', href: '/admissions' },
        { label: 'Fee Payment', href: '/portal' },
      ]},
      { title: 'Help', links: [
        { label: 'FAQs', href: '/contact' },
        { label: 'Contact Admissions', href: '/contact' },
        { label: 'Campus Visit', href: '/about' },
        { label: 'Virtual Tour', href: '/about' },
      ]},
    ]
  },
  {
    label: 'Connect',
    cols: [
      { title: 'Reach Us', links: [
        { label: 'Contact Us', href: '/contact' },
        { label: 'Campus Map', href: '/contact' },
        { label: 'Department Contacts', href: '/contact' },
        { label: 'Social Media', href: '/contact' },
      ]},
      { title: 'Network', links: [
        { label: 'Career Services', href: '/career' },
        { label: 'Alumni Network', href: '/alumni' },
        { label: 'Placement Cell', href: '/career' },
        { label: 'Industry Partners', href: '/career' },
        { label: 'International Office', href: '/about' },
      ]},
      { title: 'Info', links: [
        { label: 'News & Updates', href: '/' },
        { label: 'Events', href: '/' },
        { label: 'Testimonials', href: '/about' },
        { label: 'Student Portal', href: '/portal' },
      ]},
    ]
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  const handleMenuClick = useCallback((label: string) => {
    const route = MENU_ROUTES[label];
    if (route && route !== pathname) {
      router.push(route);
    }
  }, [router, pathname]);

  const handleMobileMenuClick = useCallback((label: string) => {
    const route = MENU_ROUTES[label];
    if (route && route !== pathname) {
      setMobileOpen(false);
      setOpenMega(null);
      router.push(route);
    } else {
      setOpenMega(openMega === label ? null : label);
    }
  }, [router, pathname, openMega]);

  const linkClass = `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
    scrolled ? 'text-foreground/70 hover:text-emerald hover:bg-emerald-50' : 'text-white/70 hover:text-white hover:bg-white/10'
  }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border-b border-emerald-100/50'
          : 'bg-transparent'
      }`}
    >
      {/* Top bar */}
      <div suppressHydrationWarning className={`transition-all duration-500 overflow-hidden ${scrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'}`}>
        <div className="bg-emerald-dark text-white text-xs py-1.5">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1" suppressHydrationWarning><Phone className="w-3 h-3" /> +91 7973290805</span>
              <span className="hidden sm:flex items-center gap-1"><Mail className="w-3 h-3" /> navpreet8testing@gmail.com</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> University Road, Academic City
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-base leading-tight transition-colors ${scrolled ? 'text-slate-dark' : 'text-white'}`}>
                Greenfield
              </span>
              <span className={`text-[10px] uppercase tracking-[0.2em] leading-tight transition-colors ${scrolled ? 'text-emerald' : 'text-emerald-light'}`}>
                University
              </span>
            </div>
          </Link>

          {/* Desktop links with mega menu */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className={linkClass}
            >
              Home
            </Link>
            {megaMenus.map((menu) => (
              <div
                key={menu.label}
                className="relative group"
                onMouseEnter={() => setOpenMega(menu.label)}
                onMouseLeave={() => setOpenMega(null)}
              >
                {/* Clickable link that also opens mega menu on hover */}
                <button
                  onClick={() => handleMenuClick(menu.label)}
                  className={linkClass}
                >
                  {menu.label}
                </button>
                {/* Mega dropdown */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 ${
                    openMega === menu.label ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 p-6 grid grid-cols-3 gap-6 w-[36rem]">
                    {menu.cols.map((col) => (
                      <div key={col.title}>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald mb-3 pb-2 border-b-2 border-emerald-100">
                          {col.title}
                        </h4>
                        <ul className="space-y-0.5">
                          {col.links.map((link) => (
                            <li key={link.label}>
                              <Link
                                href={link.href}
                                className="flex items-center gap-2 py-1.5 px-2 text-sm text-slate-600 rounded-lg hover:bg-emerald-50 hover:text-emerald hover:translate-x-1 transition-all"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle className={`${scrolled ? 'text-foreground/70 hover:bg-gray-100' : 'text-white/70 hover:bg-white/10'}`} />
            <Button
              size="sm"
              className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-5 shadow-lg shadow-emerald/20 transition-all hover:shadow-emerald/40 hover:scale-105"
              asChild
            >
              <Link href="/admissions">Apply Now</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-md"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className={`w-5 h-5 ${scrolled ? 'text-foreground' : 'text-white'}`} />
            ) : (
              <Menu className={`w-5 h-5 ${scrolled ? 'text-foreground' : 'text-white'}`} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-400 overflow-hidden ${
          mobileOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-emerald-100/50 px-4 py-4 space-y-1 overflow-y-auto max-h-[70vh]">
          <Link href="/" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-emerald hover:bg-emerald-50 rounded-md">Home</Link>
          {megaMenus.map((menu) => (
            <div key={menu.label}>
              <button
                onClick={() => handleMobileMenuClick(menu.label)}
                className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-emerald hover:bg-emerald-50 rounded-md"
              >
                {menu.label}
                <ChevronDown className={`w-4 h-4 transition-transform ${openMega === menu.label ? 'rotate-180' : ''}`} />
              </button>
              <div className={`pl-4 transition-all duration-300 overflow-hidden ${openMega === menu.label ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                {menu.cols.map((col) => (
                  <div key={col.title} className="mb-2">
                    <div className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald">{col.title}</div>
                    {col.links.map((link) => (
                      <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="block px-3 py-1.5 text-sm text-muted-foreground hover:text-emerald rounded-md">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="pt-2 flex items-center gap-3">
            <ThemeToggle className="text-foreground/70 hover:bg-gray-100" />
            <Button
              size="sm"
              className="w-full bg-emerald hover:bg-emerald-dark text-white rounded-full"
              asChild
            >
              <Link href="/admissions" onClick={() => setMobileOpen(false)}>Apply Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}