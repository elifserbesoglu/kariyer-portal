import React from 'react';
import { cn } from '../../utils/cn';
import { X } from 'lucide-react';

export interface ChipProps {
  label: string;
  onRemove?: () => void;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  onRemove,
  onClick,
  selected = false,
  disabled = false,
  className,
  icon,
}) => {
  return (
    <span
      onClick={!disabled && onClick ? onClick : undefined}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border transition-all duration-150 select-none',
        onClick && !disabled && 'cursor-pointer hover:border-burgundy-600',
        selected
          ? 'bg-burgundy-700 text-white border-burgundy-700 shadow-sm'
          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
      {onRemove && !disabled && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className={cn(
            'p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/20 transition-colors',
            selected ? 'text-white/80 hover:text-white' : 'text-slate-400 hover:text-slate-600'
          )}
          aria-label="Kaldır"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};
