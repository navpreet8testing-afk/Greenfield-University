'use client';

import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '@/lib/images';

interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string;
  author: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

const FALLBACK_NEWS = [
  {
    title: 'Greenfield University Ranks Among Top 50 in NIRF 2025',
    date: 'June 15, 2025',
    category: 'Achievement',
    image: IMAGES.campusWalk,
  },
  {
    title: 'New AI & Machine Learning Lab Inaugurated',
    date: 'June 10, 2025',
    category: 'Infrastructure',
    image: IMAGES.laboratory,
  },
  {
    title: 'Student Team Wins National Hackathon Championship',
    date: 'June 5, 2025',
    category: 'Student Success',
    image: IMAGES.hackathon,
  },
  {
    title: 'International Conference on Sustainable Development',
    date: 'May 28, 2025',
    category: 'Research',
    image: IMAGES.laboratory,
  },
];

const categoryColors: Record<string, string> = {
  Achievement: 'bg-emerald/90',
  Infrastructure: 'bg-emerald/90',
  'Student Success': 'bg-emerald/90',
  Research: 'bg-emerald/90',
  Events: 'bg-emerald/90',
  Partnerships: 'bg-emerald/90',
  Alumni: 'bg-emerald/90',
  General: 'bg-emerald/90',
};

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return '';
  }
}

function SkeletonCard() {
  return (
    <article className="rounded-2xl overflow-hidden bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 shadow-sm">
      <div className="h-44 bg-muted animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-20 bg-muted rounded-full animate-pulse" />
        <div className="h-4 w-full bg-muted rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
        <div className="h-3 w-24 bg-muted rounded-full animate-pulse" />
      </div>
    </article>
  );
}

export function CampusNews() {
  const { data, isLoading, isError } = useQuery<NewsArticle[]>({
    queryKey: ['news'],
    queryFn: () => fetch('/api/news').then((r) => r.json()),
  });

  const articles = data && data.length > 0 && !isError ? data : null;

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-slate-dark/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="font-section-label inline-block text-emerald text-sm font-semibold tracking-[0.2em] mb-3">
            Latest Updates
          </span>
          <h2 className="font-section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark dark:text-white mb-4">
            Campus News
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-body-alt">
            Stay informed with the latest happenings, milestones, and stories from across the
            Greenfield campus.
          </p>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {/* News Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(articles ?? FALLBACK_NEWS)
              .slice(0, 4)
              .map((article) => {
                const isDB = articles !== null && 'id' in article;
                const title = isDB ? article.title : article.title;
                const date = isDB ? formatDate(article.createdAt) : (article as (typeof FALLBACK_NEWS)[number]).date;
                const category = isDB ? article.category : (article as (typeof FALLBACK_NEWS)[number]).category;
                const image =
                  isDB && article.imageUrl
                    ? article.imageUrl
                    : (article as (typeof FALLBACK_NEWS)[number]).image;

                return (
                  <article
                    key={isDB ? article.id : title}
                    className="group rounded-2xl overflow-hidden bg-white dark:bg-white/5 border border-emerald-100/50 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-emerald/5 transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Category Badge */}
                      <span
                        className={`absolute top-3 left-3 ${categoryColors[category] || 'bg-emerald/90'} text-white text-[11px] font-semibold px-2.5 py-1 rounded-full`}
                      >
                        {category}
                      </span>
                      {/* Date Badge */}
                      {date && (
                        <span className="absolute bottom-3 right-3 text-xs text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded">
                          {date}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-feature-title text-sm sm:text-base font-semibold text-slate-dark dark:text-white line-clamp-2 mb-3 group-hover:text-emerald transition-colors duration-300">
                        {title}
                      </h3>
                      <a
                        href="/campus"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald hover:text-emerald-dark transition-colors duration-300 group/link"
                      >
                        Read More
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-300" />
                      </a>
                    </div>
                  </article>
                );
              })}
          </div>
        )}
      </div>
    </section>
  );
}