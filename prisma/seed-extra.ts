import { db } from '../src/lib/db';

async function main() {
  const programs = [
    // ──────────────────────────────────────────────
    // UNDERGRADUATE PROGRAMS (sortOrder 0–9)
    // ──────────────────────────────────────────────
    {
      name: "Bachelor of Computer Applications",
      shortName: "BCA",
      description:
        "A comprehensive 3-year program covering programming, database management, web development, and software engineering. Prepares students for careers in IT and software development with a strong foundation in modern computing paradigms.",
      duration: "3 Years (6 Semesters)",
      credits: 120,
      department: "Computer Science",
      icon: "💻",
      color: "#059669",
      seats: 120,
      fee: "₹55,000/year",
      featured: false,
      sortOrder: 0,
    },
    {
      name: "Bachelor of Business Administration",
      shortName: "BBA",
      description:
        "A dynamic 3-year program focusing on management principles, marketing, human resources, and entrepreneurship. Builds strong business acumen and leadership skills essential for the modern corporate landscape.",
      duration: "3 Years (6 Semesters)",
      credits: 120,
      department: "Management",
      icon: "💼",
      color: "#047857",
      seats: 120,
      fee: "₹50,000/year",
      featured: false,
      sortOrder: 1,
    },
    {
      name: "Bachelor of Commerce",
      shortName: "B.Com",
      description:
        "A rigorous 3-year program in accounting, finance, business law, and economics. Ideal for students aspiring to build careers in commerce, banking, and financial services with strong analytical foundations.",
      duration: "3 Years (6 Semesters)",
      credits: 120,
      department: "Commerce & Finance",
      icon: "📈",
      color: "#10b981",
      seats: 120,
      fee: "₹45,000/year",
      featured: false,
      sortOrder: 2,
    },
    {
      name: "Bachelor of Science in Mathematics",
      shortName: "B.Sc Maths",
      description:
        "An intensive 3-year program covering calculus, linear algebra, statistics, and mathematical modeling. Provides a solid foundation for careers in research, data science, and academia.",
      duration: "3 Years (6 Semesters)",
      credits: 120,
      department: "Sciences",
      icon: "🔢",
      color: "#065f46",
      seats: 60,
      fee: "₹42,000/year",
      featured: false,
      sortOrder: 3,
    },
    {
      name: "Bachelor of Arts in English",
      shortName: "BA English",
      description:
        "A 3-year program exploring literature, linguistics, creative writing, and critical thinking. Develops strong communication and analytical skills valued across media, education, and publishing industries.",
      duration: "3 Years (6 Semesters)",
      credits: 120,
      department: "Humanities",
      icon: "📖",
      color: "#064e3b",
      seats: 60,
      fee: "₹38,000/year",
      featured: false,
      sortOrder: 4,
    },
    {
      name: "Bachelor of Science in Biotechnology",
      shortName: "B.Sc Biotechnology",
      description:
        "A cutting-edge 3-year program combining biology, genetics, and technology to address challenges in healthcare, agriculture, and the environment. Includes extensive lab work and industry-relevant projects.",
      duration: "3 Years (6 Semesters)",
      credits: 120,
      department: "Sciences",
      icon: "🧬",
      color: "#0d9488",
      seats: 60,
      fee: "₹55,000/year",
      featured: false,
      sortOrder: 5,
    },
    {
      name: "Bachelor of Science in Physics",
      shortName: "B.Sc Physics",
      description:
        "A rigorous 3-year program covering classical mechanics, quantum physics, thermodynamics, and electromagnetism. Equips students with analytical skills for careers in research, engineering, and technology.",
      duration: "3 Years (6 Semesters)",
      credits: 120,
      department: "Sciences",
      icon: "⚛️",
      color: "#0f766e",
      seats: 60,
      fee: "₹42,000/year",
      featured: false,
      sortOrder: 6,
    },
    {
      name: "Bachelor of Arts in Economics",
      shortName: "BA Economics",
      description:
        "A comprehensive 3-year program covering microeconomics, macroeconomics, econometrics, and development economics. Prepares students for careers in policy, finance, analytics, and public administration.",
      duration: "3 Years (6 Semesters)",
      credits: 120,
      department: "Humanities",
      icon: "📊",
      color: "#047857",
      seats: 60,
      fee: "₹40,000/year",
      featured: false,
      sortOrder: 7,
    },
    {
      name: "Bachelor of Business Administration LLB",
      shortName: "BBA LLB",
      description:
        "An integrated 5-year program combining business administration and legal education. Graduates are equipped to navigate corporate law, mergers and acquisitions, and regulatory compliance with a management edge.",
      duration: "5 Years (10 Semesters)",
      credits: 200,
      department: "Law & Management",
      icon: "⚖️",
      color: "#065f46",
      seats: 60,
      fee: "₹75,000/year",
      featured: false,
      sortOrder: 8,
    },
    {
      name: "BCA in Data Science",
      shortName: "BCA Data Science",
      description:
        "A specialized 3-year program focused on statistics, machine learning, data visualization, and big data technologies. Prepares students for the rapidly growing field of data-driven decision making.",
      duration: "3 Years (6 Semesters)",
      credits: 120,
      department: "Computer Science",
      icon: "🧪",
      color: "#10b981",
      seats: 60,
      fee: "₹65,000/year",
      featured: true,
      sortOrder: 9,
    },

    // ──────────────────────────────────────────────
    // POSTGRADUATE PROGRAMS (sortOrder 10–16)
    // ──────────────────────────────────────────────
    {
      name: "Master of Computer Applications",
      shortName: "MCA",
      description:
        "An advanced 2-year program covering advanced computing, AI/ML, cloud architecture, and enterprise software development. Designed for graduates seeking deep technical expertise and leadership in technology.",
      duration: "2 Years (4 Semesters)",
      credits: 80,
      department: "Computer Science",
      icon: "🖥️",
      color: "#059669",
      seats: 60,
      fee: "₹85,000/year",
      featured: true,
      sortOrder: 10,
    },
    {
      name: "Master of Business Administration",
      shortName: "MBA",
      description:
        "A prestigious 2-year program developing strategic thinking, leadership, and decision-making skills. Offers specializations and real-world case studies to prepare future business leaders and entrepreneurs.",
      duration: "2 Years (4 Semesters)",
      credits: 80,
      department: "Management",
      icon: "🎯",
      color: "#047857",
      seats: 120,
      fee: "₹90,000/year",
      featured: true,
      sortOrder: 11,
    },
    {
      name: "Master of Commerce",
      shortName: "M.Com",
      description:
        "An advanced 2-year program delving into advanced accounting, financial management, taxation, and business analytics. Ideal for aspiring chartered accountants, financial analysts, and commerce educators.",
      duration: "2 Years (4 Semesters)",
      credits: 80,
      department: "Commerce & Finance",
      icon: "🏦",
      color: "#065f46",
      seats: 60,
      fee: "₹55,000/year",
      featured: false,
      sortOrder: 12,
    },
    {
      name: "Master of Science in Physics",
      shortName: "M.Sc Physics",
      description:
        "An in-depth 2-year program exploring quantum mechanics, condensed matter physics, astrophysics, and computational physics. Prepares students for research careers and advanced applications in technology.",
      duration: "2 Years (4 Semesters)",
      credits: 80,
      department: "Sciences",
      icon: "🔭",
      color: "#0d9488",
      seats: 30,
      fee: "₹60,000/year",
      featured: false,
      sortOrder: 13,
    },
    {
      name: "Master of Arts in English",
      shortName: "MA English",
      description:
        "A 2-year program offering advanced study of literary theory, criticism, linguistics, and world literature. Cultivates scholarly research abilities and prepares students for academia, publishing, and content leadership.",
      duration: "2 Years (4 Semesters)",
      credits: 80,
      department: "Humanities",
      icon: "✍️",
      color: "#064e3b",
      seats: 30,
      fee: "₹45,000/year",
      featured: false,
      sortOrder: 14,
    },
    {
      name: "MBA in Marketing",
      shortName: "MBA Marketing",
      description:
        "A specialized 2-year program focusing on brand management, digital marketing, consumer behavior, and market analytics. Equips students with strategic marketing skills for leadership roles in dynamic industries.",
      duration: "2 Years (4 Semesters)",
      credits: 80,
      department: "Management",
      icon: "📣",
      color: "#10b981",
      seats: 60,
      fee: "₹95,000/year",
      featured: false,
      sortOrder: 15,
    },
    {
      name: "MCA in Artificial Intelligence",
      shortName: "MCA AI & ML",
      description:
        "A cutting-edge 2-year program specializing in deep learning, natural language processing, computer vision, and intelligent systems. Prepares students for high-impact roles at the forefront of AI innovation.",
      duration: "2 Years (4 Semesters)",
      credits: 80,
      department: "Computer Science",
      icon: "🤖",
      color: "#059669",
      seats: 60,
      fee: "₹1,00,000/year",
      featured: true,
      sortOrder: 16,
    },

    // ──────────────────────────────────────────────
    // DOCTORAL PROGRAMS (sortOrder 17–21)
    // ──────────────────────────────────────────────
    {
      name: "Doctor of Philosophy in Computer Science",
      shortName: "PhD Computer Science",
      description:
        "A rigorous research-based program spanning 3–5 years focused on advancing knowledge in algorithms, AI, systems, and software engineering. Scholars contribute to groundbreaking research published in top-tier venues.",
      duration: "3–5 Years (Research)",
      credits: 0,
      department: "Computer Science",
      icon: "🔬",
      color: "#059669",
      seats: 20,
      fee: "₹50,000/year",
      featured: true,
      sortOrder: 17,
    },
    {
      name: "Doctor of Philosophy in Management",
      shortName: "PhD Management",
      description:
        "A 3–5 year research program exploring strategic management, organizational behavior, entrepreneurship, and business innovation. Scholars produce impactful research contributing to management theory and practice.",
      duration: "3–5 Years (Research)",
      credits: 0,
      department: "Management",
      icon: "📝",
      color: "#047857",
      seats: 20,
      fee: "₹55,000/year",
      featured: false,
      sortOrder: 18,
    },
    {
      name: "Doctor of Philosophy in Physics",
      shortName: "PhD Physics",
      description:
        "An advanced research program of 3–5 years delving into theoretical and experimental physics. Scholars work on frontier topics including quantum computing, materials science, and astrophysics.",
      duration: "3–5 Years (Research)",
      credits: 0,
      department: "Sciences",
      icon: "🌌",
      color: "#0d9488",
      seats: 15,
      fee: "₹45,000/year",
      featured: false,
      sortOrder: 19,
    },
    {
      name: "Doctor of Philosophy in Commerce",
      shortName: "PhD Commerce",
      description:
        "A 3–5 year research program investigating advanced topics in finance, accounting, taxation, and commerce. Scholars contribute original research to academic journals and shape policy and industry standards.",
      duration: "3–5 Years (Research)",
      credits: 0,
      department: "Commerce & Finance",
      icon: "🏛️",
      color: "#065f46",
      seats: 15,
      fee: "₹40,000/year",
      featured: false,
      sortOrder: 20,
    },
    {
      name: "Doctor of Philosophy in Mathematics",
      shortName: "PhD Mathematics",
      description:
        "A 3–5 year research-intensive program in pure and applied mathematics. Scholars explore algebraic structures, number theory, mathematical modeling, and computational mathematics with international collaborations.",
      duration: "3–5 Years (Research)",
      credits: 0,
      department: "Sciences",
      icon: "📐",
      color: "#064e3b",
      seats: 15,
      fee: "₹40,000/year",
      featured: false,
      sortOrder: 21,
    },
  ];

  console.log(`🌱 Seeding ${programs.length} programs...\n`);

  let created = 0;
  let updated = 0;

  for (const p of programs) {
    const id = `prog-${p.shortName.toLowerCase().replace(/\s/g, '')}`;
    const result = await db.program.upsert({
      where: { id },
      update: p,
      create: { ...p, id },
    });

    // Detect whether it was created or updated by comparing timestamps
    // A newly created record will have a very recent createdAt
    const ageMs = Date.now() - result.createdAt.getTime();
    if (ageMs < 5000) {
      created++;
      console.log(`  ✅ Created: ${p.shortName} — ${p.name}`);
    } else {
      updated++;
      console.log(`  🔄 Updated: ${p.shortName} — ${p.name}`);
    }
  }

  console.log(`\n📊 Summary: ${created} created, ${updated} updated, ${programs.length} total`);
  console.log("✅ Seed-extra completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed-extra failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });