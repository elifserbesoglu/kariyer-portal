import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'inline-flex rounded-lg shadow-sm',
        '[&>button]:rounded-none [&>button:first-child]:rounded-l-lg [&>button:last-child]:rounded-r-lg [&>button:not(:last-child)]:border-r-0',
        className
      )}
    >
      {children}
    </div>
  );
};
