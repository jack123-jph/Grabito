import React from 'react';
import grabitoMascot from '../assets/images/grabito_mascot_1783993154090.jpg';

interface LogoProps {
  className?: string;
  theme?: 'light' | 'dark';
  showSlogan?: boolean;
  iconOnly?: boolean;
  lang?: 'en' | 'kn';
}

export default function Logo({
  className = '',
  theme = 'light',
  showSlogan = true,
  iconOnly = false,
  lang = 'en'
}: LogoProps) {
  // Brand colors extracted: Primary #FF6B00, deep charcoal #111111, white #FFFFFF
  const textMainColor = theme === 'light' ? '#111111' : '#FFFFFF';
  const sloganColor = theme === 'light' ? '#666666' : '#BBBBBB';
  const sloganText = lang === 'kn' ? 'ಎಲ್ಲವೂ, ಒಂದೇ ಗ್ರಾಬ್‌ನಲ್ಲಿ.' : 'Everything, in one grab.';

  return (
    <div className={`flex items-center gap-3 md:gap-4 ${className}`} id="grabito-logo">
      {/* High-Definition Mascot Icon */}
      <div className="relative shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-[#FF6B00] shadow-md bg-white flex items-center justify-center transition-transform hover:scale-105 duration-300">
        <img
          src={grabitoMascot}
          alt="Grabito Mascot"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Brand Text & Slogan Group */}
      {!iconOnly && (
        <div className="flex flex-col">
          {/* "Grabito" stylized text */}
          <div className="flex items-end leading-none select-none">
            <span
              className="font-display font-extrabold italic text-2xl md:text-3xl tracking-tight"
              style={{ color: textMainColor }}
            >
              Grab
            </span>
            <span 
              className="font-display font-extrabold italic text-2xl md:text-3xl tracking-tight text-[#FF6B00] relative inline-flex items-center ml-[2px]"
            >
              <span className="relative inline-block pr-[2px]">
                ı
                <svg
                  className="absolute -top-[4px] left-[-1px] w-3 h-3 text-[#FF6B00] fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </span>
              <span>to</span>
            </span>
          </div>
          
          {/* Slogan with elegant side margins matching the official logo */}
          {showSlogan && (
            <span
              className="text-[9px] md:text-[10px] tracking-[0.08em] uppercase font-mono font-bold leading-none mt-1.5 transition-all opacity-90"
              style={{ color: sloganColor }}
            >
              {sloganText}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

