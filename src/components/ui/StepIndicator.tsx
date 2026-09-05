import React from 'react';
import { cn } from '../../utils/cn';
import { Check } from 'lucide-react';

export interface StepItem {
  id: string;
  title: string;
  description?: string;
}

export interface StepIndicatorProps {
  steps: StepItem[];
  currentStep: number; // 0-indexed
  onStepClick?: (index: number) => void;
  className?: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  onStepClick,
  className,
}) => {
  return (
    <div className={cn('w-full flex items-center justify-between', className)}>
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isCurrent = idx === currentStep;

        return (
          <React.Fragment key={step.id}>
            <div
              className={cn(
                'flex items-center gap-2.5',
                onStepClick && 'cursor-pointer group'
              )}
              onClick={() => onStepClick && onStepClick(idx)}
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 shrink-0',
                  isCompleted && 'bg-burgundy-700 text-white shadow-sm',
                  isCurrent && 'bg-burgundy-50 border-2 border-burgundy-700 text-burgundy-700 font-extrabold dark:bg-burgundy-950/60 dark:text-burgundy-300',
                  !isCompleted && !isCurrent && 'bg-slate-100 text-slate-500 border border-slate-300 dark:bg-slate-800 dark:border-slate-700'
                )}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
              </div>
              <div className="hidden md:flex flex-col">
                <span
                  className={cn(
                    'text-xs font-bold',
                    isCurrent || isCompleted ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'
                  )}
                >
                  {step.title}
                </span>
                {step.description && (
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">{step.description}</span>
                )}
              </div>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-3 transition-colors',
                  idx < currentStep ? 'bg-burgundy-700' : 'bg-slate-200 dark:bg-slate-800'
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
