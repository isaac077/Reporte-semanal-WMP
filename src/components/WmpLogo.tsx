import React from 'react';
import { WMP_LOGO_BASE64 } from '../assets/logoBase64';

interface WmpLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'horizontal' | 'stacked' | 'icon';
  isDark?: boolean;
}

export const WmpLogo: React.FC<WmpLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'horizontal',
  isDark = false,
}) => {
  // Alturas para variante horizontal
  const horizontalHeights = {
    sm: 'h-7',
    md: 'h-9 sm:h-10',
    lg: 'h-12 sm:h-14',
    xl: 'h-18',
  };

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <img
          src={WMP_LOGO_BASE64}
          alt="Thomas Wagner.MX"
          className="h-12 w-auto object-contain shrink-0 mb-1"
        />
        <div className="text-[14px] font-black tracking-tight text-[#B91C1C] uppercase leading-tight font-sans">
          Thomas Wagner.MX
        </div>
        <div className="text-[9px] font-bold tracking-wider text-slate-600 uppercase mt-0.5 font-sans">
          Business Development Agency
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src={WMP_LOGO_BASE64}
        alt="Thomas Wagner.MX - Business Development Agency"
        className={`${horizontalHeights[size]} w-auto object-contain shrink-0 ${
          isDark ? 'brightness-0 invert opacity-90' : ''
        }`}
      />
    </div>
  );
};



