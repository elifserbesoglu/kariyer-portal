import React from 'react';
import { cn } from '../../utils/cn';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export interface AlertProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error' | 'burgundy';
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  title,
  children,
  variant = 'info',
  onClose,
  className,
}) => {
  const icons = {
    info: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />,
    error: <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />,
    burgundy: <Info className="w-5 h-5 text-burgundy-700 dark:text-burgundy-400 shrink-0 mt-0.5" />,
  };

  const variants = {
    info: 'bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-900',
    success: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 border-emerald-200 dark:border-emerald-900',
    warning: 'bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 border-amber-200 dark:border-amber-900',
    error: 'bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-200 border-red-200 dark:border-red-900',
    burgundy: 'bg-burgundy-50 dark:bg-burgundy-950/30 text-burgundy-950 dark:text-burgundy-200 border-burgundy-200 dark:border-burgundy-900',
  };

  return (
    <div className={cn('flex items-start gap-3 p-4 rounded-xl border text-sm', variants[variant], className)}>
      {icons[variant]}
      <div className="flex-1">
        {title && <h5 className="font-bold text-sm mb-0.5">{title}</h5>}
        <div className="text-xs leading-relaxed opacity-90">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 rounded opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
