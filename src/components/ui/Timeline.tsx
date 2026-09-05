import React from 'react';
import { cn } from '../../utils/cn';

export interface TimelineItem {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  description?: string;
  status?: 'completed' | 'current' | 'pending';
  icon?: React.ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, className }) => {
  return (
    <div className={cn('relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800', className)}>
      {items.map((item) => {
        const isCompleted = item.status === 'completed';
        const isCurrent = item.status === 'current';

        return (
          <div key={item.id} className="relative group">
            <span
              className={cn(
                'absolute -left-6 top-1.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white dark:ring-slate-900 transition-colors',
                isCompleted && 'bg-burgundy-700 text-white',
                isCurrent && 'bg-amber-500 text-white animate-pulse-subtle',
                !isCompleted && !isCurrent && 'bg-slate-300 dark:bg-slate-700 text-slate-600'
              )}
            >
              {item.icon || (isCompleted ? '✓' : '')}
            </span>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 shrink-0">{item.date}</span>
              </div>
              {item.subtitle && <p className="text-xs text-burgundy-700 dark:text-burgundy-400 font-semibold mb-1">{item.subtitle}</p>}
              {item.description && <p className="text-xs text-slate-600 dark:text-slate-300">{item.description}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};
