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
  const pixelHeights = {
    sm: 28,
    md: 36,
    lg: 48,
    xl: 64,
  };

  const currentHeight = pixelHeights[size] || 36;

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <img
          src={WMP_LOGO_BASE64}
          alt="Thomas Wagner.MX"
          style={{
            height: '48px',
            maxHeight: '48px',
            width: 'auto',
            maxWidth: '180px',
            objectFit: 'contain',
            display: 'block',
          }}
          className="shrink-0 mb-1"
        />
        <div className="text-[14px] font-black tracking-tight text-[#B91C1C] uppercase leading-tight font-sans" style={{ color: '#B91C1C' }}>
          Thomas Wagner.MX
        </div>
        <div className="text-[9px] font-bold tracking-wider text-slate-600 uppercase mt-0.5 font-sans" style={{ color: '#475569' }}>
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
        style={{
          height: `${currentHeight}px`,
          maxHeight: `${currentHeight}px`,
          width: 'auto',
          maxWidth: '220px',
          objectFit: 'contain',
          display: 'block',
        }}
        className={`shrink-0 ${isDark ? 'brightness-0 invert opacity-90' : ''}`}
      />
    </div>
  );
};




