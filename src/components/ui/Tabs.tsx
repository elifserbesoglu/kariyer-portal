import React from 'react';
import { cn } from '../../utils/cn';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'underline' | 'pills' | 'enclosed';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'underline',
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 overflow-x-auto no-scrollbar',
        variant === 'underline' && 'border-b border-slate-200 dark:border-slate-800',
        variant === 'enclosed' && 'bg-slate-100 dark:bg-slate-800/60 p-1 rounded-xl',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            disabled={tab.disabled}
            onClick={() => onChange(tab.id)}
            className={cn(
              'inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 whitespace-nowrap select-none',
              tab.disabled && 'opacity-50 cursor-not-allowed',
              variant === 'underline' && [
                'py-2.5 px-3 border-b-2 -mb-px',
                isActive
                  ? 'border-burgundy-700 text-burgundy-700 font-semibold dark:text-burgundy-400 dark:border-burgundy-500'
                  : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:border-slate-300',
              ],
              variant === 'pills' && [
                'py-2 px-4 rounded-lg',
                isActive
                  ? 'bg-burgundy-700 text-white shadow-sm font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700',
              ],
              variant === 'enclosed' && [
                'py-1.5 px-3.5 rounded-lg text-xs',
                isActive
                  ? 'bg-white text-slate-900 shadow-sm font-semibold dark:bg-slate-900 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200',
              ]
            )}
          >
            {tab.icon && <span className="w-4 h-4 shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  'px-1.5 py-0.5 text-[10px] font-bold rounded-full ml-1',
                  isActive
                    ? variant === 'pills'
                      ? 'bg-white/20 text-white'
                      : 'bg-burgundy-100 text-burgundy-800 dark:bg-burgundy-950 dark:text-burgundy-300'
                    : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
