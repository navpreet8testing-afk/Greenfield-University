import { db } from '../src/lib/db';

async function main() {
  // Programs
  const programs = [
    {
      name: "Bachelor of Computer Applications",
      shortName: "BCA",
      description: "A comprehensive 3-year program covering programming, database management, web development, and software engineering. Prepares students for careers in IT and software development.",
      duration: "3 Years",
      credits: 120,
      department: "Computer Science",
      icon: "Monitor",
      color: "#0f766e",
      seats: 60,
      fee: "₹75,000/year",
      featured: true,
      sortOrder: 0,
    },
    {
      name: "Bachelor of Commerce",
      shortName: "B.Com",
      description: "A rigorous 3-year program in accounting, finance, business law, and economics. Ideal for students aspiring to build careers in commerce, banking, and financial services.",
      duration: "3 Years",
      credits: 120,
      department: "Commerce & Finance",
      icon: "TrendingUp",
      color: "#b45309",
      seats: 80,
      fee: "₹50,000/year",
      featured: true,
      sortOrder: 1,
    },
    {
      name: "Bachelor of Business Administration",
      shortName: "BBA",
      description: "A dynamic 3-year program focusing on management principles, marketing, human resources, and entrepreneurship. Builds strong business acumen and leadership skills.",
      duration: "3 Years",
      credits: 120,
      department: "Management",
      icon: "Briefcase",
      color: "#7c3aed",
      seats: 60,
      fee: "₹65,000/year",
      featured: true,
      sortOrder: 2,
    },
    {
      name: "Bachelor of Science in Mathematics",
      shortName: "B.Sc Maths",
      description: "An intensive 3-year program covering calculus, linear algebra, statistics, and mathematical modeling. Foundation for careers in research, data science, and academia.",
      duration: "3 Years",
      credits: 120,
      department: "Science",
      icon: "Calculator",
      color: "#0369a1",
      seats: 40,
      fee: "₹45,000/year",
      featured: false,
      sortOrder: 3,
    },
    {
      name: "Bachelor of Arts in English",
      shortName: "BA English",
      description: "A 3-year program exploring literature, linguistics, creative writing, and critical thinking. Develops strong communication and analytical skills.",
      duration: "3 Years",
      credits: 120,
      department: "Humanities",
      icon: "BookOpen",
      color: "#be123c",
      seats: 50,
      fee: "₹35,000/year",
      featured: false,
      sortOrder: 4,
    },
    {
      name: "Master of Computer Applications",
      shortName: "MCA",
      description: "An advanced 2-year program in advanced computing, AI/ML, cloud architecture, and enterprise software development. Designed for graduates seeking deep technical expertise.",
      duration: "2 Years",
      credits: 80,
      department: "Computer Science",
      icon: "Cpu",
      color: "#0d9488",
      seats: 30,
      fee: "₹90,000/year",
      featured: true,
      sortOrder: 5,
    },
  ];

  for (const p of programs) {
    await db.program.upsert({ where: { id: `prog-${p.shortName.toLowerCase().replace(/\s/g, '')}` }, update: p, create: { ...p, id: `prog-${p.shortName.toLowerCase().replace(/\s/g, '')}` } });
  }

  // Faculty
  const faculty = [
    { name: "Dr. Rajesh Kumar", designation: "Professor & HOD", department: "Computer Science", qualification: "Ph.D. Computer Science, IIT Delhi", bio: "20+ years of experience in academic research and software architecture. Published 45+ research papers in international journals.", email: "rajesh.kumar@college.edu", sortOrder: 0 },
    { name: "Dr. Priya Sharma", designation: "Associate Professor", department: "Computer Science", qualification: "Ph.D. Data Science, BITS Pilani", bio: "Specializes in machine learning and data analytics. Former research scientist at a leading tech company.", email: "priya.sharma@college.edu", sortOrder: 1 },
    { name: "Prof. Anil Mehta", designation: "Associate Professor", department: "Commerce & Finance", qualification: "M.Com, CA, CS", bio: "15+ years in financial education. Chartered Accountant with industry experience in Big 4 firms.", email: "anil.mehta@college.edu", sortOrder: 2 },
    { name: "Dr. Sunita Reddy", designation: "Professor & HOD", department: "Management", qualification: "Ph.D. Business Administration, IIM Ahmedabad", bio: "Expert in strategic management and organizational behavior. Consultant for multiple Fortune 500 companies.", email: "sunita.reddy@college.edu", sortOrder: 3 },
    { name: "Prof. Vikram Singh", designation: "Assistant Professor", department: "Science", qualification: "M.Sc. Mathematics, NET Qualified", bio: "Passionate about pure mathematics and its applications. Gold medalist in post-graduation.", email: "vikram.singh@college.edu", sortOrder: 4 },
    { name: "Dr. Meera Nair", designation: "Associate Professor", department: "Humanities", qualification: "Ph.D. English Literature, JNU", bio: "Published author and literary critic. Expertise in post-colonial literature and cultural studies.", email: "meera.nair@college.edu", sortOrder: 5 },
  ];

  for (const f of faculty) {
    await db.faculty.upsert({ where: { id: `fac-${f.name.toLowerCase().replace(/\s/g, '')}` }, update: f, create: { ...f, id: `fac-${f.name.toLowerCase().replace(/\s/g, '')}` } });
  }

  // Testimonials
  const testimonials = [
    { name: "Arjun Patel", role: "Software Engineer", company: "Google", quote: "The BCA program gave me the perfect foundation. The faculty's mentorship and hands-on projects prepared me well for my career in tech.", batch: "2022", rating: 5, column: 1, sortOrder: 0 },
    { name: "Sneha Gupta", role: "Financial Analyst", company: "Goldman Sachs", quote: "The commerce department's rigorous curriculum and industry connections helped me land my dream role right after graduation.", batch: "2021", rating: 5, column: 2, sortOrder: 1 },
    { name: "Rohit Verma", role: "Product Manager", company: "Microsoft", quote: "The BBA program taught me to think strategically. The case study approach and real-world projects were invaluable.", batch: "2020", rating: 5, column: 3, sortOrder: 2 },
    { name: "Priya Das", role: "Data Scientist", company: "Amazon", quote: "From classroom algorithms to production ML systems — the CS department bridged the gap beautifully. Grateful for every lecture.", batch: "2022", rating: 5, column: 1, sortOrder: 3 },
    { name: "Karthik Iyer", role: "Entrepreneur", company: "EdTech Startup Founder", quote: "The management program didn't just teach me business — it gave me the confidence to build my own. The incubation center was a game-changer.", batch: "2019", rating: 5, column: 2, sortOrder: 4 },
    { name: "Ananya Reddy", role: "Chartered Accountant", company: "Deloitte", quote: "The commerce faculty's dedication is unmatched. Their guidance through CA preparation alongside my degree was extraordinary.", batch: "2021", rating: 5, column: 3, sortOrder: 5 },
  ];

  for (const t of testimonials) {
    await db.testimonial.upsert({ where: { id: `test-${t.name.toLowerCase().replace(/\s/g, '')}` }, update: t, create: { ...t, id: `test-${t.name.toLowerCase().replace(/\s/g, '')}` } });
  }

  // Events
  const now = new Date();
  const events = [
    { title: "Annual Tech Fest — CodeStorm 2025", description: "A 3-day national-level hackathon and tech symposium featuring coding competitions, workshops on AI/Blockchain, and keynote speeches by industry leaders.", date: new Date(now.getFullYear(), now.getMonth() + 1, 15), location: "Main Auditorium", category: "tech", featured: true },
    { title: "Inter-Collegiate Sports Meet", description: "Annual sports tournament featuring cricket, basketball, athletics, and badminton. Teams from 20+ colleges participate.", date: new Date(now.getFullYear(), now.getMonth() + 2, 5), location: "Sports Complex", category: "sports", featured: true },
    { title: "National Conference on AI & Data Science", description: "Academic conference bringing together researchers, industry experts, and students to discuss cutting-edge developments in artificial intelligence.", date: new Date(now.getFullYear(), now.getMonth() + 1, 20), location: "Conference Hall", category: "academic", featured: false },
    { title: "Cultural Festival — Rang Tarang", description: "A vibrant celebration of art, music, dance, and drama. Includes inter-department competitions and a grand finale concert.", date: new Date(now.getFullYear(), now.getMonth() + 3, 10), location: "Open Air Theatre", category: "cultural", featured: true },
    { title: "Campus Placement Drive — Season 1", description: "Major recruitment drive with 30+ companies including Fortune 500 firms. Pre-placement talks start a week before.", date: new Date(now.getFullYear(), now.getMonth() + 1, 1), location: "Placement Cell", category: "placement", featured: false },
    { title: "Workshop: Cloud Computing & DevOps", description: "Hands-on workshop on AWS, Docker, Kubernetes, and CI/CD pipelines. Certificates provided to all participants.", date: new Date(now.getFullYear(), now.getMonth(), 25), location: "CS Lab 201", category: "workshop", featured: false },
  ];

  for (const e of events) {
    await db.event.upsert({ where: { id: `evt-${e.title.toLowerCase().replace(/\s+/g, '-').substring(0, 30)}` }, update: e, create: { ...e, id: `evt-${e.title.toLowerCase().replace(/\s+/g, '-').substring(0, 30)}` } });
  }

  // Notices
  const notices = [
    { title: "Admissions Open 2025-26", content: "Applications are now open for all UG and PG programs. Last date to apply: July 31, 2025. Apply online through the admission portal.", category: "admission", important: true, date: new Date(now.getFullYear(), now.getMonth(), 1) },
    { title: "Scholarship Applications Due", content: "Merit-based and need-based scholarship applications must be submitted by the 15th of this month. Contact the financial aid office for details.", category: "scholarship", important: true, date: new Date(now.getMonth() > 0 ? now : new Date(now.getFullYear(), now.getMonth(), 5)) },
    { title: "Library Hours Extended During Exams", content: "The central library will remain open from 7 AM to 11 PM during the examination period. E-resources access is available 24/7.", category: "facility", important: false, date: new Date(now.getFullYear(), now.getMonth(), 10) },
    { title: "New AI Lab Inauguration", content: "The state-of-the-art AI Research Lab with GPU clusters and robotics workstations will be inaugurated next week. All CS students are invited.", category: "academic", important: false, date: new Date(now.getFullYear(), now.getMonth(), 8) },
  ];

  for (const n of notices) {
    await db.notice.upsert({ where: { id: `notice-${n.title.toLowerCase().replace(/\s+/g, '-').substring(0, 30)}` }, update: n, create: { ...n, id: `notice-${n.title.toLowerCase().replace(/\s+/g, '-').substring(0, 30)}` } });
  }

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });