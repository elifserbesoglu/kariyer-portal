import React from 'react';
import { cn } from '../../utils/cn';

export interface SectionTitleProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  action,
  align = 'left',
  className,
}) => {
  const alignments = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div className={cn('flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6', className)}>
      <div className={cn('flex flex-col space-y-1.5', alignments[align])}>
        <div className="flex items-center gap-2">
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
            {title}
          </h2>
          <div className="h-0.5 w-10 bg-burgundy-700 shrink-0 mt-1" />
        </div>
        {subtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
