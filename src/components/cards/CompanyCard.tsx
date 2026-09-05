import React from 'react';
import { cn } from '../../utils/cn';
import { MapPin, Briefcase, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';

export interface CompanyCardProps {
  id: string;
  name: string;
  logo?: string;
  sector: string;
  location: string;
  activeJobCount: number;
  description?: string;
  onClick?: () => void;
  className?: string;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
  name,
  logo,
  sector,
  location,
  activeJobCount,
  description,
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-card-hover transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 group',
        className
      )}
    >
      <div className="flex items-start gap-3.5">
        <div className="w-14 h-14 rounded-xl border border-slate-200 dark:border-slate-800 p-2 flex items-center justify-center bg-white shrink-0 shadow-xs group-hover:scale-105 transition-transform">
          {logo ? (
            <img src={logo} alt={name} className="max-h-full max-w-full object-contain" />
          ) : (
            <span className="text-xs font-bold text-burgundy-700">{name.substring(0, 3).toUpperCase()}</span>
          )}
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-burgundy-700 transition-colors">
            {name}
          </h3>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{sector}</p>
          <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
            <MapPin className="w-3 h-3" />
            <span>{location}</span>
          </div>
        </div>
      </div>

      {description && (
        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {description}
        </p>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
        <span className="text-xs font-bold text-burgundy-700 dark:text-burgundy-400 flex items-center gap-1">
          <Briefcase className="w-3.5 h-3.5" />
          {activeJobCount} Açık İlan
        </span>
        <Button variant="ghost" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
          İncele
        </Button>
      </div>
    </div>
  );
};
