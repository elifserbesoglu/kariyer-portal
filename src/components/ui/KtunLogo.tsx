import React from 'react';
import ktunOfficialLogo from '../../assets/images/ktun-logo.png';

export interface KtunLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'seal-only';
  showSubtitle?: boolean;
}

export const KtunLogo: React.FC<KtunLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  showSubtitle = true,
}) => {
  const sizes = {
    sm: { logo: 'w-9 h-9', title: 'text-xs', subtitle: 'text-[9px]' },
    md: { logo: 'w-12 h-12', title: 'text-sm md:text-base', subtitle: 'text-[10px] md:text-[11px]' },
    lg: { logo: 'w-14 h-14', title: 'text-lg md:text-xl', subtitle: 'text-xs' },
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official KTÜN Seal Emblem Asset Image */}
      <div className={`relative ${currentSize.logo} rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shrink-0 p-0.5 overflow-hidden shadow-xs border border-slate-200 dark:border-slate-800`}>
        <img
          src={ktunOfficialLogo}
          alt="Konya Teknik Üniversitesi Amblemi"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Brand Title Text Vertically Centered with Logo */}
      {variant === 'full' && (
        <div className="flex flex-col justify-center">
          <h1 className={`${currentSize.title} font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight flex items-center gap-1.5`}>
            <span>KONYA TEKNİK ÜNİVERSİTESİ</span>
          </h1>
          {showSubtitle && (
            <p className={`${currentSize.subtitle} font-bold text-burgundy-700 dark:text-burgundy-400 leading-tight mt-0.5`}>
              Kariyer Gelişim ve Mezun İzleme Uygulama ve Araştırma Merkezi
            </p>
          )}
        </div>
      )}
    </div>
  );
};
