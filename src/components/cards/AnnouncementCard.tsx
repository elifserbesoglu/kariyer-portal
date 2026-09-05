import React from 'react';
import { cn } from '../../utils/cn';
import { Bell, Calendar, ChevronRight } from 'lucide-react';
import { Badge } from '../ui/Badge';

export interface AnnouncementCardProps {
  id: string;
  title: string;
  date: string;
  category?: string;
  isImportant?: boolean;
  onClick?: () => void;
  className?: string;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  title,
  date,
  category = 'Duyuru',
  isImportant = false,
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 group',
        isImportant && 'border-l-4 border-l-burgundy-700 bg-burgundy-50/20 dark:bg-burgundy-950/20',
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-burgundy-50 dark:bg-burgundy-950/50 text-burgundy-700 dark:text-burgundy-400 flex items-center justify-center shrink-0 mt-0.5">
          <Bell className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant={isImportant ? 'primary' : 'secondary'} size="sm">
              {category}
            </Badge>
            <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {date}
            </span>
          </div>
          <h4 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white group-hover:text-burgundy-700 transition-colors line-clamp-1">
            {title}
          </h4>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
    </div>
  );
};

export const NewsCard: React.FC<{
  title: string;
  date: string;
  summary: string;
  image?: string;
  onClick?: () => void;
  className?: string;
}> = ({ title, date, summary, image, onClick, className }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-card-hover transition-all duration-200 cursor-pointer flex flex-col group',
        className
      )}
    >
      {image && (
        <div className="h-44 w-full overflow-hidden relative">
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute top-3 left-3 bg-burgundy-700 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
            HABER
          </div>
        </div>
      )}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {date}
          </span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-burgundy-700 transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {summary}
          </p>
        </div>
        <div className="pt-2 text-xs font-bold text-burgundy-700 dark:text-burgundy-400 flex items-center gap-1 group-hover:underline">
          <span>Devamını Oku</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
