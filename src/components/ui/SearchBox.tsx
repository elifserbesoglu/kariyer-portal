import React from 'react';
import { cn } from '../../utils/cn';
import { Search, X } from 'lucide-react';

export interface SearchBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  onSearchSubmit?: (value: string) => void;
  variant?: 'default' | 'filled' | 'hero';
}

export const SearchBox = React.forwardRef<HTMLInputElement, SearchBoxProps>(
  ({ className, value, onChange, onClear, onSearchSubmit, placeholder = 'Ara...', variant = 'default', ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearchSubmit && typeof value === 'string') {
        onSearchSubmit(value);
      }
    };

    const variants = {
      default: 'h-10 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 shadow-sm',
      filled: 'h-10 bg-slate-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900',
      hero: 'h-12 text-base bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-md focus:shadow-lg',
    };

    return (
      <div className="relative flex items-center w-full">
        <Search className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            'w-full pl-10 pr-9 text-sm border rounded-lg transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-burgundy-700/20 focus:border-burgundy-700 dark:text-slate-100',
            variants[variant],
            className
          )}
          {...props}
        />
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }
);

SearchBox.displayName = 'SearchBox';
