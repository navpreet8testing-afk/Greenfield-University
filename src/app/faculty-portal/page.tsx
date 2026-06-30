'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '@/components/college/Navbar';
import { Footer } from '@/components/college/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Calendar, Bell, FileText, Users, LogOut, ChevronRight, FlaskConical, Globe, ClipboardList } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { IMAGES, FACULTY_IMAGES } from '@/lib/images';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const dashboardData = {
  upcomingClasses: [
    { subject: 'Data Structures (BCA-301)', time: '9:00 AM – 10:30 AM', room: 'Room 204, Block A', day: 'Today' },
    { subject: 'Business Ethics (BBA-205)', time: '11:00 AM – 12:30 PM', room: 'Room 112, Block B', day: 'Today' },
    { subject: 'Digital Marketing (BBA-401)', time: '2:00 PM – 3:30 PM', room: 'Room 305, Block A', day: 'Tomorrow' },
  ],
  recentSubmissions: [
    { title: 'Mid-term Exam Papers – BCA Sem 3', date: 'Dec 15, 2024', status: 'Pending Review' },
    { title: 'Assignment: Marketing Strategy', date: 'Dec 14, 2024', status: 'Graded' },
    { title: 'Lab Report: Database Systems', date: 'Dec 12, 2024', status: 'Graded' },
  ],
  announcements: [
    { title: 'Faculty Development Workshop – Jan 5', date: 'Dec 16, 2024', type: 'Workshop' },
    { title: 'Semester Exam Schedule Released', date: 'Dec 15, 2024', type: 'Exam' },
    { title: 'Annual Research Symposium – Call for Papers', date: 'Dec 13, 2024', type: 'Event' },
  ],
};

export default function FacultyPortalPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.from('.fp-hero-content', {
          y: 50, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: heroRef.current, start: 'top 80%', once: true },
        });
      }
      document.querySelectorAll('.fp-animate').forEach((el, i) => {
        gsap.from(el, {
          y: 30, duration: 0.7, delay: i * 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });
    });
    return () => ctx.revert();
  }, [loggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: 'Missing Fields', description: 'Please enter both email and password.', variant: 'destructive' });
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setLoggedIn(true);
    toast({ title: 'Welcome!', description: 'Successfully logged in to Faculty Portal.', variant: 'default' });
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${IMAGES.bcaClassroom})` }} />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-32 w-full">
          <div className="fp-hero-content gsap-reveal max-w-3xl">
            <span className="font-section-label inline-block text-emerald-light text-sm font-semibold uppercase tracking-widest mb-4">Faculty Portal</span>
            <h1 className="font-hero-word text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6">
              Your Academic Command Center
            </h1>
            <p className="font-body-alt text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed">
              Manage classes, grade submissions, access resources, and stay connected with the university ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Login / Dashboard */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-white via-emerald-50/20 to-white dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {!loggedIn ? (
            /* Login Form */
            <div className="fp-animate gsap-reveal max-w-md mx-auto">
              <Card className="glass-card border-emerald-100 dark:border-white/10 shadow-lg shadow-emerald/5">
                <CardHeader className="text-center pb-2">
                  <div className="w-14 h-14 rounded-2xl bg-emerald/10 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-7 h-7 text-emerald" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-dark dark:text-white">Sign In to Portal</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-slate-dark dark:text-white">University Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="faculty@greenfield.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 rounded-xl border-emerald-200 dark:border-white/10 focus:border-emerald"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium text-slate-dark dark:text-white">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 rounded-xl border-emerald-200 dark:border-white/10 focus:border-emerald"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 bg-emerald hover:bg-emerald-dark text-white rounded-xl font-semibold text-base"
                    >
                      {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </form>
                  <p className="text-xs text-center text-muted-foreground dark:text-white/40 mt-4">
                    Use your university-issued email credentials
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Dashboard */
            <div className="space-y-8">
              {/* Dashboard Header */}
              <div className="fp-animate gsap-reveal flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="font-section-title text-2xl sm:text-3xl font-bold text-slate-dark dark:text-white">Dashboard</h2>
                  <p className="font-body-alt text-muted-foreground dark:text-white/50">Welcome back, Faculty Member</p>
                </div>
                <Button variant="outline" className="border-emerald-200 dark:border-white/10 text-emerald hover:bg-emerald-50 dark:hover:bg-emerald/10" onClick={() => setLoggedIn(false)}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upcoming Classes */}
                <Card className="fp-animate gsap-reveal glass-card border-emerald-100/50 dark:border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-dark dark:text-white">
                      <Calendar className="w-5 h-5 text-emerald" />
                      Upcoming Classes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {dashboardData.upcomingClasses.map((cls, i) => (
                      <div key={i} className="p-3 rounded-xl bg-emerald-50/50 dark:bg-white/5 border border-emerald-100/50 dark:border-white/5">
                        <p className="font-medium text-sm text-slate-dark dark:text-white">{cls.subject}</p>
                        <p className="text-xs text-muted-foreground dark:text-white/50 mt-1">{cls.time}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-emerald font-medium">{cls.day}</span>
                          <span className="text-xs text-muted-foreground dark:text-white/40">{cls.room}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Recent Submissions */}
                <Card className="fp-animate gsap-reveal border-emerald-100/50 dark:border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-dark dark:text-white">
                      <FileText className="w-5 h-5 text-emerald" />
                      Recent Submissions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {dashboardData.recentSubmissions.map((sub, i) => (
                      <div key={i} className="p-3 rounded-xl bg-emerald-50/50 dark:bg-white/5 border border-emerald-100/50 dark:border-white/5">
                        <p className="font-medium text-sm text-slate-dark dark:text-white">{sub.title}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground dark:text-white/50">{sub.date}</span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${sub.status === 'Graded' ? 'bg-emerald/10 text-emerald' : 'bg-gold/10 text-gold'}`}>
                            {sub.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Announcements */}
                <Card className="fp-animate gsap-reveal border-emerald-100/50 dark:border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-dark dark:text-white">
                      <Bell className="w-5 h-5 text-emerald" />
                      Announcements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {dashboardData.announcements.map((ann, i) => (
                      <div key={i} className="group p-3 rounded-xl bg-emerald-50/50 dark:bg-white/5 border border-emerald-100/50 dark:border-white/5 cursor-pointer hover:border-emerald/30 transition-colors">
                        <p className="font-medium text-sm text-slate-dark dark:text-white group-hover:text-emerald transition-colors">{ann.title}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground dark:text-white/50">{ann.date}</span>
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-muted-foreground dark:text-white/60">{ann.type}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="fp-animate gsap-reveal grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'My Classes', icon: Users, href: '/programs' },
                  { label: 'Grade Book', icon: BookOpen, href: '/downloads' },
                  { label: 'Upload Material', icon: FileText, href: '/faculty-portal' },
                  { label: 'Full Portal', icon: ChevronRight, href: '/faculty-portal' },
                ].map((action) => (
                  <a key={action.label} href={action.href} className="card-glow p-4 rounded-2xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 hover:border-emerald/30 dark:hover:border-emerald/30 hover:-translate-y-1 transition-all duration-300 text-center group block">
                    <action.icon className="w-6 h-6 text-emerald mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-slate-dark dark:text-white">{action.label}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="section-divider-gradient" />

      {/* Faculty Resources */}
      <FacultyResourcesSection />

      <div className="section-divider-gradient" />

      {/* Recent Achievements */}
      <AchievementsSection />

      <div className="section-divider-gradient" />

      {/* Development Programs */}
      <DevelopmentProgramsSection />

      <Footer />
    </main>
  );
}

const facultyResources = [
  { title: 'Research Grants', icon: FlaskConical, desc: 'Apply for internal and external research funding' },
  { title: 'Publication Support', icon: BookOpen, desc: 'Get assistance with journal submissions and ISBN' },
  { title: 'Conference Travel', icon: Globe, desc: 'Funded travel for presenting at international conferences' },
  { title: 'Workshop Materials', icon: ClipboardList, desc: 'Access teaching materials and workshop templates' },
  { title: 'Sabbatical Leave', icon: Calendar, desc: 'Apply for research sabbatical and leave of absence' },
  { title: 'Student Mentoring', icon: Users, desc: 'Track your mentee progress and mentoring schedules' },
];

const achievements = [
  { name: 'Dr. Rajesh Kumar', text: 'Published in Nature Machine Intelligence', img: FACULTY_IMAGES[0] },
  { name: 'Dr. Priya Sharma', text: 'Received INSA Young Scientist Award', img: FACULTY_IMAGES[1] },
  { name: 'Prof. Anil Mehta', text: 'Patent Granted for IoT Framework', img: FACULTY_IMAGES[2] },
  { name: 'Dr. Sunita Reddy', text: 'Keynote at IEEE International Conference', img: FACULTY_IMAGES[3] },
];

const devPrograms = [
  { title: 'Teaching Excellence Workshop', date: 'Aug 10-12, 2025', desc: 'Interactive workshop on modern pedagogy' },
  { title: 'Research Methodology Bootcamp', date: 'Sep 5-9, 2025', desc: 'Hands-on training in research methods' },
  { title: 'Industry Immersion Program', date: 'Oct 15-30, 2025', desc: '2-week industry placement for faculty' },
  { title: 'International Faculty Exchange', date: 'Nov 2025', desc: 'Partner university exchange opportunities' },
];

function FacultyResourcesSection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-white via-emerald-50/20 to-white dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Resources</span>
          <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">Faculty Resources</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facultyResources.map((res) => (
            <div key={res.title} className="card-glow rounded-2xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 p-6 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-emerald/10 flex items-center justify-center mb-4 group-hover:bg-emerald transition-all duration-300">
                <res.icon className="w-6 h-6 text-emerald group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-feature-title text-base font-semibold text-slate-dark dark:text-white mb-2">{res.title}</h3>
              <p className="font-body-alt text-sm text-muted-foreground dark:text-white/50">{res.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementsSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Excellence</span>
          <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">Recent Achievements</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {achievements.map((item) => (
            <div key={item.name} className="card-glow flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 hover:border-emerald/30 dark:hover:border-emerald/30 transition-all duration-300">
              <img src={item.img} alt={item.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
              <div>
                <p className="font-feature-title text-sm font-semibold text-slate-dark dark:text-white">{item.name}</p>
                <p className="font-body-alt text-sm text-muted-foreground dark:text-white/50 mt-0.5">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DevelopmentProgramsSection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-white via-emerald-50/20 to-white dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Growth</span>
          <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">Development Programs</h2>
        </div>
        <div className="space-y-4 max-w-4xl mx-auto">
          {devPrograms.map((prog) => (
            <div key={prog.title} className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 hover:border-emerald/30 dark:hover:border-emerald/30 transition-all duration-300">
              <Badge className="bg-emerald/10 text-emerald hover:bg-emerald/20 border-0 font-semibold shrink-0 mt-0.5">{prog.date}</Badge>
              <div>
                <p className="font-feature-title text-base font-semibold text-slate-dark dark:text-white">{prog.title}</p>
                <p className="font-body-alt text-sm text-muted-foreground dark:text-white/50 mt-1">{prog.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}