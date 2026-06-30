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
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import {
  BookOpen, GraduationCap, Calendar, Bell, FileText, Trophy,
  LogOut, ChevronRight, AlertTriangle, Clock, TrendingUp, User, Mail,
  CreditCard, Library, Home, Bus, ArrowRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { isSupabaseConfigured } from '@/lib/supabase';

gsap.registerPlugin(ScrollTrigger);

interface Subject {
  name: string;
  code: string;
  marks: number;
  maxMarks: number;
  grade: string;
}

interface StudentData {
  name: string;
  email: string;
  program: string;
  semester: number;
  enrollmentNo: string;
  sgpa: number;
  cgpa: number;
  attendance: number;
  subjects: Subject[];
  upcomingEvents: { title: string; date: string; type: string }[];
  notifications: { message: string; time: string; read: boolean }[];
}

const mockStudent: StudentData = {
  name: 'Arjun Mehta',
  email: 'arjun.mehta@greenfield.edu',
  program: 'B.Tech Computer Science',
  semester: 5,
  enrollmentNo: 'GU2023BTCS0142',
  sgpa: 8.7,
  cgpa: 8.4,
  attendance: 87,
  subjects: [
    { name: 'Operating Systems', code: 'CS-501', marks: 78, maxMarks: 100, grade: 'A' },
    { name: 'Database Management', code: 'CS-502', marks: 85, maxMarks: 100, grade: 'A+' },
    { name: 'Computer Networks', code: 'CS-503', marks: 72, maxMarks: 100, grade: 'B+' },
    { name: 'Software Engineering', code: 'CS-504', marks: 91, maxMarks: 100, grade: 'A+' },
    { name: 'Machine Learning', code: 'CS-505', marks: 68, maxMarks: 100, grade: 'B+' },
    { name: 'Theory of Computation', code: 'CS-506', marks: 82, maxMarks: 100, grade: 'A' },
  ],
  upcomingEvents: [
    { title: 'Mid-Semester Exam Begins', date: 'Feb 15, 2025', type: 'Exam' },
    { title: 'Tech Fest — CodeStorm 2025', date: 'Feb 22, 2025', type: 'Event' },
    { title: 'Career Fair — Placement Drive', date: 'Mar 5, 2025', type: 'Career' },
  ],
  notifications: [
    { message: 'Assignment 3 for Database Management is due tomorrow.', time: '2 hours ago', read: false },
    { message: 'Your scholarship application has been approved.', time: '1 day ago', read: false },
    { message: 'New timetable for Semester 6 has been uploaded.', time: '2 days ago', read: true },
    { message: 'Library book due: "Introduction to Algorithms"', time: '3 days ago', read: true },
  ],
};

export default function StudentPortalPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [fetchingData, setFetchingData] = useState(false);
  const [dbNotConfigured, setDbNotConfigured] = useState(false);
  const { toast } = useToast();

  const supabaseReady = isSupabaseConfigured();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.from('.sp-hero-content', {
          y: 50, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: heroRef.current, start: 'top 80%', once: true },
        });
      }
      document.querySelectorAll('.sp-animate').forEach((el, i) => {
        gsap.from(el, {
          y: 30, duration: 0.7, delay: i * 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });
    });
    return () => ctx.revert();
  }, [loggedIn]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setDbNotConfigured(false);

    // Simulate a short delay for UX
    await new Promise(r => setTimeout(r, 800));

    if (!supabaseReady) {
      // No Supabase — use mock data and show notice
      setDbNotConfigured(true);
      setStudentData(mockStudent);
      setLoggedIn(true);
      setLoading(false);
      toast({
        title: 'Logged in (Demo Mode)',
        description: 'Supabase is not configured. Showing sample student data.',
        variant: 'default',
      });
      return;
    }

    // Supabase is configured — attempt real fetch
    try {
      setFetchingData(true);
      const { supabase } = await import('@/lib/supabase');

      const { data, error } = await supabase!
        .from('students')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !data) {
        toast({
          title: 'Login Failed',
          description: 'No student found with this email. Using demo data.',
          variant: 'destructive',
        });
        setStudentData(mockStudent);
        setDbNotConfigured(false);
      } else {
        setStudentData(data as StudentData);
      }
      setLoggedIn(true);
    } catch {
      toast({
        title: 'Connection Error',
        description: 'Could not reach the database. Showing demo data.',
        variant: 'destructive',
      });
      setStudentData(mockStudent);
      setDbNotConfigured(true);
      setLoggedIn(true);
    } finally {
      setFetchingData(false);
      setLoading(false);
    }
  }

  function handleLogout() {
    setLoggedIn(false);
    setStudentData(null);
    setDbNotConfigured(false);
    setEmail('');
    setPassword('');
  }

  function getGradeColor(grade: string) {
    if (grade.startsWith('A')) return 'text-emerald-600 bg-emerald-50';
    if (grade.startsWith('B')) return 'text-amber-600 bg-amber-50';
    if (grade.startsWith('C')) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  }

  function getMarksColor(marks: number, max: number) {
    const pct = (marks / max) * 100;
    if (pct >= 80) return 'text-emerald-600';
    if (pct >= 60) return 'text-amber-600';
    return 'text-red-600';
  }

  // ─── LOGIN SCREEN ──────────────────────────────────────────────
  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30 dark:from-slate-950 dark:to-slate-900">
        <Navbar />

        <section ref={heroRef} className="min-h-[80vh] flex items-center justify-center px-4 pt-24 pb-16">
          <div className="sp-hero-content gsap-reveal w-full max-w-md">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald/10 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-emerald" />
              </div>
              <h1 className="text-3xl font-bold text-slate-dark dark:text-white mb-2">Student Portal</h1>
              <p className="text-muted-foreground">Sign in to access your academic dashboard</p>
            </div>

            <Card className="glass-card shadow-xl border-slate-200/60 dark:border-slate-800">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="sp-email" className="text-sm font-medium">University Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="sp-email"
                        type="email"
                        placeholder="your.name@greenfield.edu"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="pl-10 h-11 rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sp-password" className="text-sm font-medium">Password</Label>
                    <div className="relative">
                      <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="sp-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="pl-10 h-11 rounded-xl"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald hover:bg-emerald-dark text-white rounded-xl h-12 font-semibold shadow-lg shadow-emerald/20 transition-all"
                  >
                    {loading ? (
                      <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" /> Signing in...</>
                    ) : (
                      <>Sign In <ChevronRight className="w-4 h-4 ml-1" /></>
                    )}
                  </Button>
                </form>

                {!supabaseReady && (
                  <div className="mt-6 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                      <p className="text-xs text-amber-700 dark:text-amber-300">
                        Demo mode — Supabase is not configured. Enter any email to view sample data.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="section-divider-gradient" />

        <StudentServicesSection />

        <div className="section-divider-gradient" />

        <AnnouncementsSection />

        <div className="section-divider-gradient" />

        <QuickLinksSection />

        <Footer />
      </div>
    );
  }

  // ─── DASHBOARD ─────────────────────────────────────────────────
  if (!studentData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30 dark:from-slate-950 dark:to-slate-900">
      <Navbar />

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header bar */}
          <div className="sp-animate gsap-reveal flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-dark dark:text-white">
                Welcome, {studentData.name}
              </h1>
              <p className="text-muted-foreground mt-1">
                {studentData.program} • Semester {studentData.semester} • {studentData.enrollmentNo}
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2 rounded-xl border-slate-200 dark:border-slate-700">
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </div>

          {dbNotConfigured && (
            <div className="sp-animate gsap-reveal mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">Database Not Configured</p>
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
                    Supabase credentials are missing. Displaying sample data. Configure <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">.env.local</code> to enable live data.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quick stats */}
          <div className="sp-animate gsap-reveal grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={<TrendingUp className="w-5 h-5" />}
              label="Current SGPA"
              value={studentData.sgpa.toFixed(1)}
              color="emerald"
            />
            <StatCard
              icon={<GraduationCap className="w-5 h-5" />}
              label="Overall CGPA"
              value={studentData.cgpa.toFixed(1)}
              color="blue"
            />
            <StatCard
              icon={<BookOpen className="w-5 h-5" />}
              label="Attendance"
              value={`${studentData.attendance}%`}
              color={studentData.attendance >= 75 ? 'emerald' : 'red'}
            />
            <StatCard
              icon={<Trophy className="w-5 h-5" />}
              label="Subjects"
              value={String(studentData.subjects.length)}
              color="amber"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main content — 2 cols */}
            <div className="lg:col-span-2 space-y-6">
              {/* Performance Card */}
              <Card className="sp-animate gsap-reveal shadow-sm border-slate-200/60 dark:border-slate-800">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="w-5 h-5 text-emerald" /> Academic Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800">
                          <th className="text-left py-3 px-2 font-semibold text-muted-foreground">Subject</th>
                          <th className="text-center py-3 px-2 font-semibold text-muted-foreground">Marks</th>
                          <th className="text-center py-3 px-2 font-semibold text-muted-foreground">Grade</th>
                          <th className="text-right py-3 px-2 font-semibold text-muted-foreground">Progress</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentData.subjects.map((sub) => (
                          <tr key={sub.code} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="py-3 px-2">
                              <div className="font-medium text-slate-dark dark:text-white">{sub.name}</div>
                              <div className="text-xs text-muted-foreground">{sub.code}</div>
                            </td>
                            <td className={`py-3 px-2 text-center font-semibold ${getMarksColor(sub.marks, sub.maxMarks)}`}>
                              {sub.marks}/{sub.maxMarks}
                            </td>
                            <td className="py-3 px-2 text-center">
                              <Badge variant="secondary" className={`font-semibold ${getGradeColor(sub.grade)}`}>
                                {sub.grade}
                              </Badge>
                            </td>
                            <td className="py-3 px-2 text-right min-w-[100px]">
                              <Progress value={(sub.marks / sub.maxMarks) * 100} className="h-2" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Attendance Card */}
              <Card className="sp-animate gsap-reveal shadow-sm border-slate-200/60 dark:border-slate-800">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock className="w-5 h-5 text-emerald" /> Attendance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-24 h-24">
                      <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={studentData.attendance >= 75 ? '#059669' : '#dc2626'}
                          strokeWidth="3"
                          strokeDasharray={`${studentData.attendance}, 100`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-slate-dark dark:text-white">{studentData.attendance}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Overall Attendance</p>
                      <p className={`text-sm font-semibold mt-1 ${studentData.attendance >= 75 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {studentData.attendance >= 75 ? '✓ Eligible for exams' : '⚠ Below 75% — may not be eligible'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar — 1 col */}
            <div className="space-y-6">
              {/* Profile Card */}
              <Card className="sp-animate gsap-reveal shadow-sm border-slate-200/60 dark:border-slate-800">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald to-emerald-dark flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-dark dark:text-white">{studentData.name}</h3>
                  <p className="text-sm text-muted-foreground">{studentData.email}</p>
                  <div className="mt-4 space-y-2 text-left text-sm">
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-muted-foreground">Program</span>
                      <span className="font-medium text-slate-dark dark:text-white">{studentData.program}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-muted-foreground">Semester</span>
                      <span className="font-medium text-slate-dark dark:text-white">{studentData.semester}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-muted-foreground">Enrollment</span>
                      <span className="font-medium text-slate-dark dark:text-white text-xs">{studentData.enrollmentNo}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="sp-animate gsap-reveal shadow-sm border-slate-200/60 dark:border-slate-800">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Bell className="w-5 h-5 text-emerald" /> Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                    {studentData.notifications.map((n, i) => (
                      <div key={i} className={`flex gap-3 p-3 rounded-lg transition-colors ${n.read ? 'bg-slate-50/50 dark:bg-slate-800/30' : 'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900'}`}>
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.read ? 'bg-slate-300 dark:bg-slate-600' : 'bg-emerald'}`} />
                        <div className="min-w-0">
                          <p className="text-sm text-slate-dark dark:text-white leading-snug">{n.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card className="sp-animate gsap-reveal shadow-sm border-slate-200/60 dark:border-slate-800">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="w-5 h-5 text-emerald" /> Upcoming
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {studentData.upcomingEvents.map((ev, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald/10 flex items-center justify-center shrink-0">
                          <Calendar className="w-4 h-4 text-emerald" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-dark dark:text-white">{ev.title}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <p className="text-xs text-muted-foreground">{ev.date}</p>
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">{ev.type}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="section-divider-gradient" />

      {/* Student Services */}
      <StudentServicesSection />

      <div className="section-divider-gradient" />

      {/* Announcements */}
      <AnnouncementsSection />

      <div className="section-divider-gradient" />

      {/* Quick Links */}
      <QuickLinksSection />

      <Footer />
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  const colorClasses: Record<string, string> = {
    emerald: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400',
    blue: 'bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400',
    red: 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400',
    amber: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400',
  };

  return (
    <Card className="shadow-sm border-slate-200/60 dark:border-slate-800">
      <CardContent className="p-4 sm:p-5 flex items-center gap-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colorClasses[color] || colorClasses.emerald}`}>
          {icon}
        </div>
        <div>
          <p className="text-xs text-muted-foreground font-medium">{label}</p>
          <p className="text-xl font-bold text-slate-dark dark:text-white mt-0.5">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}

const studentServices = [
  { title: 'Exam Results', icon: FileText, desc: 'View semester results and grade cards' },
  { title: 'Course Registration', icon: BookOpen, desc: 'Register for next semester courses online' },
  { title: 'Fee Payment', icon: CreditCard, desc: 'Pay tuition and hostel fees securely' },
  { title: 'Library Account', icon: Library, desc: 'Access digital resources and track borrowings' },
  { title: 'Hostel Management', icon: Home, desc: 'Room allocation, complaints, and mess menu' },
  { title: 'Transport', icon: Bus, desc: 'Bus routes, pass renewal, and schedule' },
];

const announcements = [
  { title: 'Semester Exam Schedule Released', time: '2 hours ago' },
  { title: 'Library Extended Hours During Exam Period', time: '1 day ago' },
  { title: 'Sports Day Registration Open', time: '2 days ago' },
  { title: 'New AI Lab Access for All Students', time: '3 days ago' },
];

const quickLinks = [
  { title: 'Download Admit Card' },
  { title: 'View Academic Calendar' },
  { title: 'Check Attendance' },
  { title: 'Apply for Scholarship' },
  { title: 'Track Complaint' },
  { title: 'Alumni Registration' },
];

function StudentServicesSection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 to-emerald-50/30 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Services</span>
          <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">Student Services</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentServices.map((svc) => (
            <div key={svc.title} className="card-glow rounded-2xl bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 p-6 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-emerald/10 flex items-center justify-center mb-4 group-hover:bg-emerald transition-all duration-300">
                <svc.icon className="w-6 h-6 text-emerald group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-feature-title text-base font-semibold text-slate-dark dark:text-white mb-2">{svc.title}</h3>
              <p className="font-body-alt text-sm text-muted-foreground dark:text-white/50">{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnnouncementsSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Updates</span>
          <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">Latest Announcements</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {announcements.map((ann) => (
            <div key={ann.title} className="card-glow rounded-xl border border-emerald-100/50 dark:border-white/10 bg-white dark:bg-white/5 p-4 hover:border-emerald/30 dark:hover:border-emerald/30 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald/10 flex items-center justify-center shrink-0">
                    <Bell className="w-4 h-4 text-emerald" />
                  </div>
                  <p className="font-feature-title text-sm font-semibold text-slate-dark dark:text-white">{ann.title}</p>
                </div>
                <span className="font-body-alt text-xs text-muted-foreground dark:text-white/40 shrink-0">{ann.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickLinksSection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 to-emerald-50/30 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="font-section-label inline-block text-emerald text-sm font-semibold uppercase tracking-widest mb-3">Quick Access</span>
          <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">Important Links</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {quickLinks.map((link) => (
            <Button key={link.title} asChild variant="outline" className="card-glow h-auto p-5 rounded-xl border-emerald-100/50 dark:border-white/10 justify-between hover:border-emerald/30 hover:bg-emerald-light/20 transition-all duration-300 group">
              <a href="#">
                <span className="font-feature-title text-sm font-semibold text-slate-dark dark:text-white">{link.title}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-emerald group-hover:translate-x-1 transition-all duration-300" />
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}