import React from 'react';
import { cn } from '../../utils/cn';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  description?: string;
  size?: 'sm' | 'md';
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, description, size = 'md', disabled, checked, onChange, id, ...props }, ref) => {
    const switchId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const trackSizes = {
      sm: 'w-8 h-4.5 p-0.5',
      md: 'w-11 h-6 p-0.5',
    };

    const thumbSizes = {
      sm: 'w-3.5 h-3.5',
      md: 'w-5 h-5',
    };

    const translateSizes = {
      sm: 'translate-x-3.5',
      md: 'translate-x-5',
    };

    return (
      <label
        htmlFor={switchId}
        className={cn(
          'inline-flex items-center gap-3 cursor-pointer select-none',
          disabled && 'cursor-not-allowed opacity-60',
          className
        )}
      >
        <div className="relative inline-flex shrink-0">
          <input
            id={switchId}
            ref={ref}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className="sr-only peer"
            {...props}
          />
          <div
            className={cn(
              'rounded-full transition-colors duration-200 ease-in-out bg-slate-300 dark:bg-slate-700 peer-focus-visible:ring-2 peer-focus-visible:ring-burgundy-700 peer-checked:bg-burgundy-700',
              trackSizes[size]
            )}
          >
            <div
              className={cn(
                'rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out pointer-events-none',
                thumbSizes[size],
                checked && translateSizes[size]
              )}
            />
          </div>
        </div>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                {label}
              </span>
            )}
            {description && (
              <span className="text-xs text-slate-500 dark:text-slate-400">{description}</span>
            )}
          </div>
        )}
      </label>
    );
  }
);

Switch.displayName = 'Switch';
