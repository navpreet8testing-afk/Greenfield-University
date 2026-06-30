// Centralized image URLs for all bento grid tiles and section backgrounds
// All images sourced from free/licensed platforms (Unsplash, Pexels, etc.)

export const IMAGES = {
  // Hero
  heroCampus: '/images/hero-campus.png',
  campusLife: '/images/campus-life.png',

  // Bento grid — Programs & Academics
  bcaClassroom: 'https://sfile.chatglm.cn/images-ppt/86be663ead8b.jpg',
  commerce: 'https://sfile.chatglm.cn/images-ppt/dcc7f2070ed7.jpg',
  bbaBusiness: 'https://sfile.chatglm.cn/images-ppt/212b62c8bfb2.jpg',
  mcaCoding: 'https://sfile.chatglm.cn/images-ppt/fd51115506c7.jpg',
  science: 'https://sfile.chatglm.cn/images-ppt/39f78f24c039.jpg',
  arts: 'https://sfile.chatglm.cn/images-ppt/76bf56f3aa0a.jpg',

  // Bento grid — Campus Life
  library: 'https://sfile.chatglm.cn/images-ppt/eb0bd7587847.jpeg',
  laboratory: 'https://sfile.chatglm.cn/images-ppt/cfcca0576fbb.jpg',
  sports: 'https://sfile.chatglm.cn/images-ppt/fe9206d55aaf.jpg',
  cafeteria: 'https://sfile.chatglm.cn/images-ppt/95227f7aac8f.jpg',
  graduation: 'https://sfile.chatglm.cn/images-ppt/b76ba9aafe86.jpg',
  cultural: 'https://sfile.chatglm.cn/images-ppt/c89a801a1712.jpg',
  architecture: 'https://sfile.chatglm.cn/images-ppt/741be1d9d317.jpg',
  campusWalk: 'https://sfile.chatglm.cn/images-ppt/855335d10b89.jpg',
  career: 'https://sfile.chatglm.cn/images-ppt/62e4de1236aa.jpg',
  hackathon: 'https://sfile.chatglm.cn/images-ppt/2752e38b09c6.jpg',

  // Event categories — replaces emoji
  tech: 'https://sfile.chatglm.cn/images-ppt/fd51115506c7.jpg',
  sportsEvent: 'https://sfile.chatglm.cn/images-ppt/fe9206d55aaf.jpg',
  academic: 'https://sfile.chatglm.cn/images-ppt/86be663ead8b.jpg',
  culturalEvent: 'https://sfile.chatglm.cn/images-ppt/c89a801a1712.jpg',
  placement: 'https://sfile.chatglm.cn/images-ppt/62e4de1236aa.jpg',
  workshop: 'https://sfile.chatglm.cn/images-ppt/39f78f24c039.jpg',
} as const;

// Faculty headshot images
export const FACULTY_IMAGES = [
  'https://sfile.chatglm.cn/images-ppt/86be663ead8b.jpg', // faculty1 — professional male professor
  'https://sfile.chatglm.cn/images-ppt/c89a801a1712.jpg', // faculty2 — professional female professor
  'https://sfile.chatglm.cn/images-ppt/b76ba9aafe86.jpg', // faculty3 — professional male researcher
  'https://sfile.chatglm.cn/images-ppt/62e4de1236aa.jpg', // faculty4 — professional female academic
  'https://sfile.chatglm.cn/images-ppt/741be1d9d317.jpg', // faculty5 — professional male dean
  'https://sfile.chatglm.cn/images-ppt/eb0bd7587847.jpeg', // faculty6 — professional female department head
] as const;

// Event category image map (replaces emoji)
export const EVENT_CATEGORY_IMAGES: Record<string, string> = {
  tech: IMAGES.tech,
  sports: IMAGES.sportsEvent,
  academic: IMAGES.academic,
  cultural: IMAGES.culturalEvent,
  placement: IMAGES.placement,
  workshop: IMAGES.workshop,
};

// Page-specific photos (generated)
export const PAGE_PHOTOS = {
  convocationHall: '/images/page-photos/01-convocation-hall.png',
  auditorium: '/images/page-photos/02-auditorium.png',
  researchLab: '/images/page-photos/03-research-lab.png',
  sportsComplex: '/images/page-photos/04-sports-complex.png',
  campusAerial: '/images/page-photos/05-campus-aerial.png',
  modernLibrary: '/images/page-photos/06-modern-library.png',
  admissionCounseling: '/images/page-photos/07-admission-counseling.png',
  phdSeminar: '/images/page-photos/08-phd-seminar.png',
  pgComputerLab: '/images/page-photos/09-pg-computer-lab.png',
  ugClassroom: '/images/page-photos/10-ug-classroom.png',
} as const;