import React from 'react';
import { cn } from '../../utils/cn';

export interface TagProps {
  children: React.ReactNode;
  variant?: 'slate' | 'burgundy' | 'navy' | 'emerald';
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ children, variant = 'slate', className }) => {
  const variants = {
    slate: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    burgundy: 'bg-burgundy-50 text-burgundy-700 dark:bg-burgundy-950/40 dark:text-burgundy-300 border-burgundy-200 dark:border-burgundy-900',
    navy: 'bg-navy-50 text-navy-800 dark:bg-navy-950/40 dark:text-navy-200 border-navy-200 dark:border-navy-900',
    emerald: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
