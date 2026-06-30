import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const newsArticles = [
  {
    title: 'Greenfield University Climbs to NIRF Top 30 Rankings',
    slug: 'nirf-top-30-rankings',
    excerpt:
      'Greenfield University has achieved a historic milestone by securing a position in the Top 30 of the NIRF 2025 rankings, marking a significant leap from last year\'s position.',
    content:
      'Greenfield University has achieved a historic milestone by securing a position in the Top 30 of the National Institutional Ranking Framework (NIRF) 2025 rankings released by the Ministry of Education. This marks a significant leap of 18 positions from last year, reflecting the university\'s sustained commitment to academic excellence, research output, and overall institutional quality.\n\nThe improvement is attributed to strengthened research infrastructure, increased faculty publications in high-impact journals, and enhanced placement outcomes. Vice Chancellor Dr. Ananya Sharma credited the achievement to the collective efforts of faculty, students, and staff. "This ranking validates our holistic approach to education, combining rigorous academics with real-world skill development," she stated during the press briefing.\n\nThe university scored particularly well in the Research, Professional Practice, and Collaborative Performance (RPC) category, where it moved into the top 20 nationally. Plans are already underway to further strengthen industry partnerships and interdisciplinary research programs to maintain this upward trajectory.',
    category: 'Achievement',
    imageUrl: 'https://sfile.chatglm.cn/images-ppt/05-campus-aerial.png',
    author: 'Greenfield University',
    featured: true,
    published: true,
  },
  {
    title: 'New AI & Machine Learning Lab Inaugurated',
    slug: 'ai-ml-lab-inaugurated',
    excerpt:
      'A state-of-the-art AI & Machine Learning laboratory has been inaugurated at Greenfield University, equipped with GPU clusters and industry-standard tools.',
    content:
      'Greenfield University has inaugurated a cutting-edge Artificial Intelligence and Machine Learning laboratory, equipped with NVIDIA A100 GPU clusters, robotic process automation stations, and a dedicated natural language processing suite. The lab was officially opened by Dr. Rajesh Kumar, Chief Technology Officer at a leading tech multinational.\n\nThe facility will serve undergraduate and postgraduate students across Computer Science, Data Science, and Electronics departments. It features 60 high-performance workstations, a dedicated server room for model training, and collaboration spaces designed for project-based learning. Students will have access to cloud platforms including AWS, Google Cloud, and Azure as part of the curriculum.\n\n"We want our students to not just learn AI concepts but to build, deploy, and scale intelligent systems," said Dr. Priya Mehta, Head of the Computer Science department. The lab will also host regular hackathons, industry guest lectures, and a semester-long capstone project where students solve real-world problems using AI/ML techniques.',
    category: 'Infrastructure',
    imageUrl: 'https://sfile.chatglm.cn/images-ppt/cfcca0576fbb.jpg',
    author: 'Greenfield University',
    featured: true,
    published: true,
  },
  {
    title: 'Students Win National Hackathon Championship',
    slug: 'students-win-national-hackathon',
    excerpt:
      'A team of four Greenfield students has won the National Hackathon Championship 2025, beating 500+ teams from across India with their innovative solution.',
    content:
      'A team of four B.Tech students from Greenfield University has emerged victorious at the National Hackathon Championship 2025, organized by the All India Council for Technical Education (AICTE) in collaboration with leading technology companies. The team "GreenCoders" developed an AI-powered agricultural advisory platform that helps farmers make data-driven decisions about crop management, pest control, and market pricing.\n\nTeam members Arjun Patel, Sneha Reddy, Vikram Singh, and Meera Joshi worked for 36 hours straight during the grand finale held in New Delhi. Their solution, "KrishiMitra," uses satellite imagery, weather data, and machine learning models to provide personalized farming recommendations in multiple regional languages. The platform impressed the jury with its practical applicability and technical sophistication.\n\nThe winning team received a prize of ₹10 lakhs, internship offers from three leading tech companies, and an opportunity to present their solution at the upcoming Global AgriTech Summit. University Chancellor Shri Ramesh Agarwal congratulated the team and announced a dedicated startup incubation cell to help students transform such innovations into viable products.',
    category: 'Student Success',
    imageUrl: 'https://sfile.chatglm.cn/images-ppt/2752e38b09c6.jpg',
    author: 'Greenfield University',
    featured: true,
    published: true,
  },
  {
    title: 'International Conference on Sustainable Development',
    slug: 'international-conference-sustainable-development',
    excerpt:
      'Greenfield University is hosting a three-day International Conference on Sustainable Development, bringing together 200+ researchers from 25 countries.',
    content:
      'Greenfield University is hosting the 4th International Conference on Sustainable Development (ICSD 2025) from July 15-17, 2025. The conference has attracted over 200 researchers, policymakers, and industry leaders from 25 countries, making it one of the largest sustainability-focused academic events in the region.\n\nThe conference features 12 keynote sessions, 45 parallel paper presentations, and 8 specialized workshops covering topics such as renewable energy integration, circular economy models, sustainable urban planning, and climate-resilient agriculture. Distinguished speakers include Dr. Maria Santos from the UN Environment Programme and Prof. Hiroshi Tanaka from the Tokyo Institute of Sustainability.\n\nThe event also includes a student poster competition, an industry-academia networking session, and the launch of the Greenfield Centre for Sustainability Studies. Vice Chancellor Dr. Ananya Sharma emphasized that the conference reflects the university\'s commitment to addressing global challenges through collaborative research and knowledge exchange.',
    category: 'Events',
    imageUrl: 'https://sfile.chatglm.cn/images-ppt/05-campus-aerial.png',
    author: 'Greenfield University',
    featured: false,
    published: true,
  },
  {
    title: 'Research Grant of ₹5 Crore for Biotechnology',
    slug: 'research-grant-biotechnology',
    excerpt:
      'The Department of Biotechnology at Greenfield has secured a ₹5 crore research grant from DST for a groundbreaking genome editing project.',
    content:
      'The Department of Biotechnology at Greenfield University has been awarded a prestigious research grant of ₹5 crores by the Department of Science and Technology (DST), Government of India, for a pioneering three-year project on CRISPR-based genome editing for drought-resistant crop varieties. The project is led by Dr. Kavitha Nair, Associate Professor of Biotechnology.\n\nThe research aims to identify and modify specific gene sequences in indigenous crop varieties to enhance their drought tolerance without compromising yield or nutritional value. The grant will fund advanced laboratory equipment, field trial sites across three agro-climatic zones, and research fellowships for six doctoral students.\n\n"This grant is a testament to the quality of research being conducted at Greenfield," said Dr. Nair. "Our goal is to develop climate-resilient crop varieties that can be adopted by farmers in water-scarce regions across India." The project also involves collaborations with the Indian Council of Agricultural Research (ICAR) and two international research universities.',
    category: 'Research',
    imageUrl: 'https://sfile.chatglm.cn/images-ppt/39f78f24c039.jpg',
    author: 'Greenfield University',
    featured: false,
    published: true,
  },
  {
    title: 'MoU Signed with MIT for Student Exchange Program',
    slug: 'mou-mit-student-exchange',
    excerpt:
      'Greenfield University has signed a Memorandum of Understanding with the Massachusetts Institute of Technology for a semester-long student exchange program.',
    content:
      'Greenfield University has signed a landmark Memorandum of Understanding (MoU) with the Massachusetts Institute of Technology (MIT), establishing a semester-long student exchange program that will begin from the Spring 2026 semester. The agreement was signed during a virtual ceremony attended by senior administrators from both institutions.\n\nUnder the program, up to five undergraduate and three postgraduate students from Greenfield will spend a semester at MIT each year, attending courses, participating in research projects, and engaging in cross-cultural academic collaboration. Similarly, MIT students will have the opportunity to study at Greenfield, gaining exposure to India\'s emerging technology ecosystem and diverse cultural landscape.\n\nThe MoU also includes provisions for joint research initiatives, faculty exchange programs, and collaborative online courses. "This partnership opens doors for our students to learn at one of the world\'s finest institutions," said Dr. Ananya Sharma, Vice Chancellor. The university will offer merit-cum-means scholarships to ensure that financial constraints do not prevent deserving students from participating in the exchange program.',
    category: 'Partnerships',
    imageUrl: 'https://sfile.chatglm.cn/images-ppt/62e4de1236aa.jpg',
    author: 'Greenfield University',
    featured: false,
    published: true,
  },
  {
    title: 'Greenfield Alumni Reaches Mars Mission Team',
    slug: 'alumni-mars-mission-team',
    excerpt:
      'Dr. Aditya Verma, a 2015 B.Tech alumnus of Greenfield, has been selected as a systems engineer for India\'s upcoming Mars Mission.',
    content:
      'Dr. Aditya Verma, who graduated from Greenfield University with a B.Tech in Computer Science in 2015, has been selected as a systems engineer for the Indian Space Research Organisation\'s (ISRO) upcoming Mars Orbiter Mission 2. Dr. Verma will be responsible for the onboard navigation software and autonomous decision-making systems for the spacecraft.\n\nAfter completing his undergraduate studies at Greenfield, Dr. Verma pursued his M.S. at the California Institute of Technology and a Ph.D. at Stanford University, specializing in autonomous systems and space robotics. His doctoral research on AI-based spacecraft navigation was published in leading journals including Nature and Science Robotics.\n\n"I owe a significant part of my foundation to the professors and lab facilities at Greenfield," said Dr. Verma during a virtual interaction with current students. "The hands-on approach to learning and the emphasis on critical thinking prepared me well for the challenges of space research." The university plans to honor Dr. Verma at the upcoming convocation ceremony and has announced a scholarship in his name for meritorious students in Computer Science.',
    category: 'Alumni',
    imageUrl: 'https://sfile.chatglm.cn/images-ppt/b76ba9aafe86.jpg',
    author: 'Greenfield University',
    featured: false,
    published: true,
  },
  {
    title: "Annual Cultural Festival 'Pratibha 2025' Announced",
    slug: 'pratibha-2025-cultural-festival',
    excerpt:
      'The much-awaited annual cultural festival Pratibha 2025 is scheduled for August 20-22, featuring performances, competitions, and celebrity appearances.',
    content:
      'Greenfield University has officially announced the dates for its flagship annual cultural festival, Pratibha 2025, scheduled to be held from August 20-22, 2025. The three-day extravaganza is expected to host over 5,000 participants from 80+ colleges across the country, making it one of the largest inter-college cultural festivals in the state.\n\nThis year\'s edition features 35 competitive events spanning music, dance, theater, literary arts, fine arts, and digital media. Highlights include a national-level band competition with a prize pool of ₹3 lakhs, a fashion show with a sustainability theme, and a 24-hour film-making challenge. The festival will also feature workshops by industry professionals in photography, stand-up comedy, and street art.\n\nBollywood singer and Greenfield alumnus Nikhita Gandhi is confirmed as the headline performer for the closing night concert. The Student Council has launched the festival website and registration portal, with early bird registrations already crossing 2,000. "Pratibha is more than a festival — it\'s a celebration of creativity, diversity, and the vibrant spirit of our student community," said Festival Coordinator Rishi Malhotra.',
    category: 'Events',
    imageUrl: 'https://sfile.chatglm.cn/images-ppt/c89a801a1712.jpg',
    author: 'Greenfield University',
    featured: false,
    published: true,
  },
];

async function main() {
  console.log('Seeding news articles...');

  for (const article of newsArticles) {
    await prisma.news.create({ data: article });
    console.log(`  ✓ Created: ${article.title}`);
  }

  console.log(`\nDone! Seeded ${newsArticles.length} news articles.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });