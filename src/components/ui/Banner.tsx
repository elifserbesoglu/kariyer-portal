import React from 'react';
import { cn } from '../../utils/cn';
import { Button } from './Button';

export interface BannerProps {
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
  icon?: React.ReactNode;
  variant?: 'burgundy' | 'navy' | 'emerald';
  className?: string;
}

export const Banner: React.FC<BannerProps> = ({
  title,
  description,
  buttonText,
  onButtonClick,
  icon,
  variant = 'navy',
  className,
}) => {
  const variants = {
    navy: 'bg-navy-900 text-white border-navy-800',
    burgundy: 'bg-burgundy-800 text-white border-burgundy-700',
    emerald: 'bg-emerald-900 text-white border-emerald-800',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md border',
        variants[variant],
        className
      )}
    >
      <div className="flex items-start gap-4 z-10">
        {icon && (
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
            {icon}
          </div>
        )}
        <div className="space-y-1">
          <h3 className="text-lg md:text-xl font-bold tracking-tight">{title}</h3>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed max-w-xl">{description}</p>
        </div>
      </div>
      {buttonText && onButtonClick && (
        <div className="shrink-0 z-10 w-full md:w-auto">
          <Button variant="secondary" onClick={onButtonClick} fullWidth>
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  );
};
