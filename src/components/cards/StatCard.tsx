import React from 'react';
import { cn } from '../../utils/cn';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  iconBg?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  change,
  changeType = 'positive',
  icon,
  iconBg = 'bg-burgundy-50 dark:bg-burgundy-950/50 text-burgundy-700 dark:text-burgundy-400',
  className,
}) => {
  return (
    <div className={cn('p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-card-hover transition-all duration-200 flex items-start justify-between gap-4', className)}>
      <div className="space-y-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{title}</span>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{value}</span>
          {change && (
            <span
              className={cn(
                'inline-flex items-center text-xs font-bold px-1.5 py-0.5 rounded',
                changeType === 'positive' && 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
                changeType === 'negative' && 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300',
                changeType === 'neutral' && 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              )}
            >
              {changeType === 'positive' && <TrendingUp className="w-3 h-3 mr-0.5" />}
              {changeType === 'negative' && <TrendingDown className="w-3 h-3 mr-0.5" />}
              {change}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>}
      </div>
      {icon && (
        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-xs', iconBg)}>
          {icon}
        </div>
      )}
    </div>
  );
};

export const MetricCard: React.FC<StatCardProps> = (props) => <StatCard {...props} />;
