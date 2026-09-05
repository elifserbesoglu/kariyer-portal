import React from 'react';
import { cn } from '../../utils/cn';
import { MapPin, Clock, GraduationCap, Bookmark } from 'lucide-react';
import { Button } from '../ui/Button';

export interface JobCardProps {
  id: string;
  companyName: string;
  companyLogo?: string;
  title: string;
  location: string;
  workType: string;
  experience?: string;
  department?: string;
  deadline?: string;
  isFeatured?: boolean;
  isSaved?: boolean;
  onClick?: () => void;
  onBookmarkClick?: () => void;
  className?: string;
}

export const JobCard: React.FC<JobCardProps> = ({
  companyName,
  companyLogo,
  title,
  location,
  workType,
  experience = 'Yeni Mezun / 0-2 Yıl',
  department = 'Bilgisayar Mühendisliği',
  deadline,
  isFeatured,
  isSaved,
  onClick,
  onBookmarkClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'group p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden',
        isFeatured && 'border-l-4 border-l-burgundy-700',
        className
      )}
    >
      <div className="flex items-start gap-3.5 flex-1 min-w-0">
        <div className="w-14 h-14 rounded-lg border border-slate-200 dark:border-slate-800 p-2 bg-white flex items-center justify-center shrink-0 shadow-2xs">
          {companyLogo ? (
            <img src={companyLogo} alt={companyName} className="max-h-full max-w-full object-contain" />
          ) : (
            <span className="font-extrabold text-xs text-slate-700 uppercase">{companyName.substring(0, 2)}</span>
          )}
        </div>

        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-burgundy-700 transition-colors truncate">
              {title}
            </h3>
            {isFeatured && (
              <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                Aktif
              </span>
            )}
          </div>

          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {companyName}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-burgundy-700" />
              {workType}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              {location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {experience}
            </span>
            <span className="flex items-center gap-1 hidden sm:inline-flex">
              <GraduationCap className="w-3 h-3 text-slate-400" />
              {department}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
        {deadline && (
          <div className="text-right hidden xl:block text-[10px]">
            <span className="text-slate-400 block">Son Başvuru:</span>
            <span className="font-bold text-red-600 dark:text-red-400">{deadline}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          {onBookmarkClick && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onBookmarkClick();
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-burgundy-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              aria-label="Kaydet"
            >
              <Bookmark className={cn('w-4 h-4', isSaved && 'fill-burgundy-700 text-burgundy-700')} />
            </button>
          )}

          <Button variant="outline" size="sm" className="text-xs border-burgundy-700 text-burgundy-700 hover:bg-burgundy-700 hover:text-white">
            Detayları Gör
          </Button>
        </div>
      </div>
    </div>
  );
};
