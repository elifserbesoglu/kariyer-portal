import React from 'react';
import { cn } from '../../utils/cn';
import { CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  warning?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      success,
      warning,
      leftIcon,
      rightIcon,
      isLoading,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    let stateColorClass = 'border-slate-300 dark:border-slate-700 focus:border-burgundy-700 focus:ring-burgundy-700/20';
    if (error) {
      stateColorClass = 'border-red-500 text-red-900 focus:border-red-600 focus:ring-red-500/20 dark:border-red-500 dark:text-red-200';
    } else if (warning) {
      stateColorClass = 'border-amber-500 text-amber-900 focus:border-amber-600 focus:ring-amber-500/20 dark:border-amber-500 dark:text-amber-200';
    } else if (success) {
      stateColorClass = 'border-emerald-500 focus:border-emerald-600 focus:ring-emerald-500/20 dark:border-emerald-500';
    }

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
          >
            {label}
            {props.required && <span className="text-burgundy-700 ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled || isLoading}
            className={cn(
              'w-full h-10 px-3.5 text-sm bg-white dark:bg-slate-900 border rounded-lg transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed dark:disabled:bg-slate-800 dark:disabled:text-slate-500',
              stateColorClass,
              leftIcon && 'pl-10',
              (rightIcon || error || success || warning || isLoading) && 'pr-10',
              className
            )}
            {...props}
          />
          <div className="absolute right-3 flex items-center gap-1.5 pointer-events-none">
            {isLoading && (
              <div className="w-4 h-4 border-2 border-burgundy-700 border-t-transparent rounded-full animate-spin" />
            )}
            {!isLoading && error && <AlertCircle className="w-4 h-4 text-red-500" />}
            {!isLoading && !error && warning && <HelpCircle className="w-4 h-4 text-amber-500" />}
            {!isLoading && !error && !warning && success && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
            {!isLoading && !error && !warning && !success && rightIcon && (
              <span className="text-slate-400 dark:text-slate-500">{rightIcon}</span>
            )}
          </div>
        </div>
        {(error || warning || helperText) && (
          <p
            className={cn(
              'text-xs mt-1.5 font-medium',
              error && 'text-red-600 dark:text-red-400',
              !error && warning && 'text-amber-600 dark:text-amber-400',
              !error && !warning && helperText && 'text-slate-500 dark:text-slate-400'
            )}
          >
            {error || warning || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
