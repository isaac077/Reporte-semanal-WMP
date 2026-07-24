import React from 'react';

interface WmpLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isDark?: boolean;
  textColor?: string;
}

export const WmpLogo: React.FC<WmpLogoProps> = ({
  className = '',
  size = 'md',
  isDark = false,
  textColor,
}) => {
  // Configuración de alturas proporcionales para el logo 1600x384 (aspect ratio ~4.16:1)
  const heightClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10 sm:h-11',
    xl: 'h-14',
  };

  const isDarkMode = isDark || (textColor && (textColor.toLowerCase().includes('fff') || textColor.toLowerCase().includes('f1f5f9')));

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src="/wmp-logo.png"
        alt="WMP Mexico Advisors"
        className={`${heightClasses[size]} w-auto object-contain shrink-0 ${
          isDarkMode ? 'brightness-0 invert opacity-90' : ''
        }`}
        crossOrigin="anonymous"
      />
    </div>
  );
};

