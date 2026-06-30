'use client';

import { useQuery } from '@tanstack/react-query';
import { Bell } from 'lucide-react';

interface NoticeItem {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  important: boolean;
  createdAt: string;
  updatedAt: string;
}

export function NoticeBoard() {
  const { data: notices = [] } = useQuery<NoticeItem[]>({
    queryKey: ['notices'],
    queryFn: () => fetch('/api/notices').then(r => r.json()),
  });

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  // Duplicate notices for seamless looping
  const displayNotices = [...notices, ...notices];

  return (
    <div className="bg-slate-dark dark:bg-slate-950 py-5 px-4 sm:px-6 border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center gap-4 sm:gap-6 h-[52px] sm:h-[60px]">
        {/* Left: Label */}
        <div className="shrink-0 flex items-center gap-2">
          <Bell className="pulse-soft w-4 h-4 sm:w-5 sm:h-5 text-emerald" />
          <span className="font-section-label text-emerald text-[10px] sm:text-xs font-semibold tracking-[0.15em]">
            Notice Board
          </span>
        </div>

        {/* Divider */}
        <div className="shrink-0 w-px h-8 bg-white/10" />

        {/* Right: Scrolling marquee */}
        <div className="flex-1 overflow-hidden relative">
          <div className="marquee-ltr flex items-center gap-8 whitespace-nowrap">
            {displayNotices.map((notice, i) => (
              <span
                key={`${notice.id}-${i}`}
                className="inline-flex items-center gap-2 shrink-0"
              >
                {notice.important && (
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                )}
                <span className="text-white/30">•</span>
                <span className="text-[11px] sm:text-sm text-white/40 shrink-0">
                  [{formatDate(notice.date)}]
                </span>
                <span className="font-body-alt text-xs sm:text-sm text-white/80">
                  {notice.title}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}