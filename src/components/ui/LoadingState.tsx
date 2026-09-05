import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

export interface LoadingStateProps {
  label?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  label = 'Yükleniyor...',
  className,
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center', className)}>
      <Loader2 className="w-8 h-8 text-burgundy-700 dark:text-burgundy-500 animate-spin mb-2" />
      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{label}</span>
    </div>
  );
};
