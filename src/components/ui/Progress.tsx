import React from 'react';
import { cn } from '../../utils/cn';

export interface ProgressProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: 'burgundy' | 'emerald' | 'amber' | 'navy';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  label,
  showValue = false,
  variant = 'burgundy',
  size = 'md',
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const variants = {
    burgundy: 'bg-burgundy-700',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    navy: 'bg-navy-900',
  };

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full space-y-1.5', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-xs font-semibold">
          {label && <span className="text-slate-700 dark:text-slate-300">{label}</span>}
          {showValue && <span className="text-slate-500 dark:text-slate-400">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={cn('w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden', sizes[size])}>
        <div
          className={cn('h-full transition-all duration-300 ease-out rounded-full', variants[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
