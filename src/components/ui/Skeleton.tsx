import React from 'react';
import { cn } from '../../utils/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'text',
  width,
  height,
  style,
  ...props
}) => {
  const variants = {
    text: 'h-4 rounded-md w-full',
    circular: 'rounded-full w-10 h-10',
    rectangular: 'rounded-lg w-full h-24',
    card: 'rounded-2xl w-full h-48',
  };

  return (
    <div
      className={cn('animate-pulse bg-slate-200 dark:bg-slate-800', variants[variant], className)}
      style={{ width, height, ...style }}
      {...props}
    />
  );
};
