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
  // Alturas para variante horizontal (proporción ~4.16:1)
  const horizontalHeights = {
    sm: 'h-6',
    md: 'h-8 sm:h-9',
    lg: 'h-11 sm:h-12',
    xl: 'h-16',
  };

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {/* Círculo con blanco de tiro azul oficial WMP */}
        <div className="w-12 h-12 rounded-full bg-[#0F3D64] flex items-center justify-center shrink-0 mb-1 shadow-xs">
          <svg className="w-8 h-8 text-[#BAE6FD]" viewBox="0 0 100 100" fill="none">
            {/* Anillo exterior */}
            <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="7" fill="none" />
            {/* Anillo medio */}
            <circle cx="50" cy="50" r="18" stroke="currentColor" strokeWidth="5" fill="none" />
            {/* Punto central */}
            <circle cx="50" cy="50" r="7" fill="currentColor" />
          </svg>
        </div>
        {/* WMP MEXICO ADVISORS */}
        <div className="text-[15px] font-black tracking-tight text-[#0F3D64] uppercase leading-tight font-sans">
          WMP MEXICO ADVISORS
        </div>
        {/* SUBTITULO Y SERVICIOS */}
        <div className="text-[8px] font-bold tracking-wider text-[#475569] uppercase mt-0.5 font-sans">
          TAX | ACCOUNTING | AUDIT | LEGAL | DIGITAL | CONSULTING
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src={WMP_LOGO_BASE64}
        alt="WMP Mexico Advisors"
        className={`${horizontalHeights[size]} w-auto object-contain shrink-0 ${
          isDark ? 'brightness-0 invert opacity-90' : ''
        }`}
      />
    </div>
  );
};


