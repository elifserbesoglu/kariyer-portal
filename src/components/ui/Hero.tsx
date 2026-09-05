import React from 'react';
import { cn } from '../../utils/cn';

export interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'relative rounded-3xl overflow-hidden shadow-xl text-white p-8 md:p-12 border border-slate-800',
        className
      )}
    >
      {/* Background Image or Gradient */}
      <div className="absolute inset-0 z-0">
        {backgroundImage ? (
          <>
            <img src={backgroundImage} alt="Hero Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-900/80 to-burgundy-950/70 backdrop-blur-[2px]" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-burgundy-900 via-navy-900 to-navy-950" />
        )}
      </div>

      {/* Decorative patterns */}
      <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-burgundy-600/20 blur-3xl pointer-events-none" />
      <div className="absolute right-1/3 -bottom-20 w-64 h-64 rounded-full bg-navy-500/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl space-y-4">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-sm">
          {title}
        </h1>
        <p className="text-sm md:text-lg text-slate-200 font-medium leading-relaxed max-w-2xl">
          {subtitle}
        </p>
        {children && <div className="pt-4">{children}</div>}
      </div>
    </div>
  );
};
