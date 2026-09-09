import React, { useId } from 'react';

export const GbemiMascot = ({ state = 'idle', size = 120, className = '' }) => {
  const clipId = useId();

  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Gbemi companion in ${state} state`}
    >
      {/* Listening Soft Sage Pulse Ring */}
      {state === 'listening' && (
        <div 
          className="absolute inset-0 rounded-full bg-sage-light/70 animate-ping opacity-75"
          style={{ animationDuration: '2s' }}
        />
      )}

      {/* Speaking Voice Wave Accent */}
      {state === 'speaking' && (
        <div className="absolute -bottom-2 z-10 flex items-center justify-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-soft border border-stone-100">
          <div className="w-1 h-2.5 bg-rose rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
          <div className="w-1 h-4 bg-sage rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
          <div className="w-1 h-2 bg-peach rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
        </div>
      )}

      {/* Reflecting / Thinking Soft Peach Aura & Subtle Dots */}
      {(state === 'thinking' || state === 'reflecting') && (
        <>
          <div 
            className="absolute inset-0 rounded-full bg-peach-light/60 animate-ping opacity-60"
            style={{ animationDuration: '2.5s' }}
          />
          <div className="absolute -bottom-2 z-10 flex items-center justify-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg shadow-soft border border-stone-100">
            <div className="w-1.5 h-1.5 bg-rose rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-1.5 h-1.5 bg-sage rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-1.5 h-1.5 bg-peach rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </>
      )}

      {/* Celebrating Falling Petals */}
      {state === 'celebrating' && (
        <div className="absolute -top-4 inset-x-0 flex justify-around pointer-events-none z-10">
          <div className="w-2.5 h-2.5 rounded-full bg-rose animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2.5 h-2.5 rounded-full bg-peach animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2.5 h-2.5 rounded-full bg-sage animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      )}

      <div 
        className={`w-full h-full rounded-full transition-transform duration-300 ${
          state === 'idle' ? 'animate-breathe' : 
          state === 'listening' ? 'rotate-3 scale-105' : 
          (state === 'thinking' || state === 'reflecting') ? '-rotate-1 scale-[1.02] animate-pulse' :
          state === 'speaking' ? 'scale-105' : 
          state === 'celebrating' ? '-translate-y-2 scale-110' : ''
        }`}
        style={{ animationDuration: state === 'thinking' || state === 'reflecting' ? '2s' : '4s' }}
      >
        <svg 
          viewBox="77 182 90 90" 
          width={size} 
          height={size} 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          <defs>
            <clipPath id={clipId}>
              <circle cx="122" cy="227" r="44" />
            </clipPath>
          </defs>
          {/* Halo Backdrop (Soft Sage Light) */}
          <circle cx="122" cy="227" r="44" fill="#E5ECE0" />
          <g clipPath={`url(#${clipId})`}>
            {/* Base Top / Attire (Warm Rose) */}
            <path d="M89,312,83.3,283.18c5.91-7.31,29.86-12,29.86-12,.2,10.87,19.73,11.92,17.05,3.08a147.25,147.25,0,0,1,14,4.76c7.24,3.1,11.1,5.42,12.51,9.72,0,0,2.29,9.45-1.27,28.19-1,5.15-4.62,32.47-4,41.53l11.59,14.09c-5.73,4.77-15.87,11.77-23.67,10.47-30.14-5-48.2-8.45-48.2-8.45.61-5.53,3.91-14.17,4.91-18.28,0-5.36-1.16-9-2.58-18.51C93.31,335.94,89.62,313.81,89,312Z" fill="#DDA59F" />
            
            {/* Neck & Chest (Melanin Warm) */}
            <path d="M147.73,280.93c-3.75-1-12.07-3.3-15.59-4a7.26,7.26,0,0,1-2.39-6.61,28,28,0,0,1,1.74-6.47l-2.82-3.08L114,247c.7,9.56,2.41,24.88-4.88,30.34,0,0-6.38,4.84-10.27,6.05-1.42,4.37-8.82,24.8-8.82,24.8L153.7,303C155.14,293.09,147.36,282.61,147.73,280.93Z" fill="#A66537" />
            <path d="M130.38,271.17c-4-2.18-8.42-6-8.07-10.66a21.08,21.08,0,0,1,.93-5l8.31,10.21A26.38,26.38,0,0,0,130.38,271.17Z" fill="#2D2424" opacity="0.15" />
            
            {/* Hair Puff / Afro Bun Back & Top (Espresso Slate) */}
            <path d="M152.11,213.49a3.5,3.5,0,0,0,2-3.76,5.21,5.21,0,0,0-2.66-3.56A10.63,10.63,0,0,0,147,205a7.94,7.94,0,0,0-4.35.58l6.47,18.71a10.84,10.84,0,0,0,3.88-2.69,6.13,6.13,0,0,0,1.62-4.35A4.31,4.31,0,0,0,152.11,213.49Z" fill="#2D2424" />
            <path d="M150.59,198.05c-2.11-1.46-4.63-1.71-7.07-1.92a8,8,0,0,0,1-9.07c-2.41-4.13-7.58-3.8-11.64-2.44-3.55,1.19-7.19,3-9.39,6.52a6.45,6.45,0,0,0-3.36-4.72,9.21,9.21,0,0,0-5.3-.77,13.88,13.88,0,0,0-8.39,3.83,12.93,12.93,0,0,0-3.75,9.51c-4-1.79-8.91.2-11.17,4.52s-1.6,10.5,1.5,14c-1.61,1.76-1.52,4.39-.58,6.74s6.09,1.49,8.25,1.1l34.77-12.6c4.15,2.52,9.11.07,13.3-2.37,2-1.14,4.1-2.53,4.77-5A7.18,7.18,0,0,0,150.59,198.05Z" fill="#2D2424" />
            <path d="M133.68,218.3S145,238.7,145.53,245c4.34,3.69,7.42-3.79,7.25-13.82-.13-8.2-4.41-17.06-11.5-20.25C131.32,206.49,133.68,218.3,133.68,218.3Z" fill="#2D2424" />
            
            {/* Face & Ear (Melanin Warm) */}
            <path d="M110.09,231.77c1.86,14.53,2.35,20.71,10.15,28.09,11.74,11.09,29,6.59,31.49-8,2.23-13.11-1.19-34.68-15.74-40.29C121.67,206.06,108.22,217.23,110.09,231.77Z" fill="#A66537" />
            <path d="M106.11,243.81a11.74,11.74,0,0,0,7.29,5.26c3.89.83,5.66-5.45,4.2-9.27a7.76,7.76,0,0,0-8.92-4.71C105,236,104,240.47,106.11,243.81Z" fill="#A66537" />
            
            {/* Sideburn & Hair Texture */}
            <path d="M106.15,223.8c-2,2.86,2,11.16,2,11.16s7-2.08,7.38,8.46c2.58.43,5.48-9.41,5.06-19.3C120,218.53,109.64,218.75,106.15,223.8Z" fill="#2D2424" />
            <path d="M147.39,215.69c-3.08-6.42-15.65-12.38-30.11-6.18-13.06,5.57-19.2,21.48-9.76,22.19s25.23-7.45,25.23-7.45Z" fill="#2D2424" />
            
            {/* Gold Hoop Earring (Warm Peach) */}
            <circle cx="111" cy="244.5" r="3.2" stroke="#F4C095" strokeWidth="1.2" fill="none" />
            
            {/* Warm Rose Sister-Midwife Headband */}
            <path d="M114.49,254.61s-14.42-11.17-16-26.63c0,0,6.15-19.64,32.83-21.08l6.08,1.2S110.25,223.16,114.49,254.61Z" fill="#DDA59F" />
            <path d="M132.07,207a11,11,0,0,1,13.27,4.2,45.52,45.52,0,0,1,7,16.76s-2-10.25-7.64-13.4a78.9,78.9,0,0,0-10.43-4.92Z" fill="#DDA59F" />
            <polygon points="129.84 213.95 130.7 206.96 128.68 207.1 127.46 216.06 129.84 213.95" fill="#2D2424" opacity="0.15" />
            <path d="M100.19,224.25s2,13.89,14.07,26.84l-.15-5.58s-8.08-12.6-11.69-24.65A20.48,20.48,0,0,0,100.19,224.25Z" fill="#2D2424" opacity="0.15" />
            <path d="M106.6,216.31a57.12,57.12,0,0,0,9.28,19.05,46.69,46.69,0,0,1,1.64-4.54,117.2,117.2,0,0,1-8-16.84A32.06,32.06,0,0,0,106.6,216.31Z" fill="#2D2424" opacity="0.15" />
            <path d="M119.12,209.13c-1.24.41-2.41.87-3.51,1.36a57.14,57.14,0,0,0,6,12.86c.85-1.28,1.74-2.49,2.64-3.61A117.22,117.22,0,0,1,119.12,209.13Z" fill="#2D2424" opacity="0.15" />
            <path d="M144.35,214.38,142,207.82s1.68,1.38,2.19,2,2.09,5.91,2,5.88Z" fill="#2D2424" opacity="0.15" />
            <path d="M130.64,207.39s3.39-7.47,7.09-5.17,9.23,13.42,5.38,13-12.22.84-13.27-1.24S130.64,207.39,130.64,207.39Z" fill="#DDA59F" />
            <path d="M130.55,214.58l8.63-11.13s2,2.58,2.17,2.81-6.29,8.94-6.29,8.94S131.27,215.21,130.55,214.58Z" fill="#2D2424" opacity="0.2" />

            {/* Eyebrows & Eyes (Espresso Slate) */}
            <path d="M126,232.19a.62.62,0,0,0,.51-.19,5.26,5.26,0,0,1,4.74-1.56.66.66,0,0,0,.82-.52.78.78,0,0,0-.57-.88,6.59,6.59,0,0,0-6,1.91.72.72,0,0,0,0,1A.75.75,0,0,0,126,232.19Z" fill="#2D2424" />
            <path d="M148.6,229.21a.68.68,0,0,0,.39-.34.71.71,0,0,0-.36-.94,7.55,7.55,0,0,0-6.68-.16.64.64,0,0,0-.22.94.78.78,0,0,0,1,.27,6,6,0,0,1,5.28.19A.78.78,0,0,0,148.6,229.21Z" fill="#2D2424" />
            <path d="M129.87,236.89c0,1.37.8,2.53,1.76,2.6s1.72-1,1.71-2.36-.8-2.53-1.75-2.6S129.86,235.52,129.87,236.89Z" fill="#2D2424" />
            <path d="M144.71,235.62c-.06,1.32.65,2.49,1.6,2.62s1.78-.86,1.84-2.18-.65-2.5-1.6-2.62S144.78,234.29,144.71,235.62Z" fill="#2D2424" />
            <path d="M131.29,234.48l3.39-.63S132.73,236.26,131.29,234.48Z" fill="#2D2424" />
            <path d="M146.2,233.44l3.42-.43S147.53,235.29,146.2,233.44Z" fill="#2D2424" />
            
            {/* Nose Shadow (Melanin Tone) */}
            <path d="M139.6,234.7a49.49,49.49,0,0,0,5.18,8.68,1.13,1.13,0,0,1-.47,1.74,7.24,7.24,0,0,1-3.91.21Z" fill="#8D5524" />
            
            {/* Reassuring Sister-Midwife Smile */}
            <path d="M141.74,250.09a37.25,37.25,0,0,0-2.43,4.74l-.91-.22c-4.13-1.06-5.69-2.91-6.17-4.65a5.45,5.45,0,0,1,0-2.6,5.36,5.36,0,0,1,.48-1.4c1.85,1.87,5.62,3.15,7.66,3.75C141.2,250,141.74,250.09,141.74,250.09Z" fill="#2D2424" />
            <path d="M140.34,249.71l-.75,1.38c-3.88-1-6.48-2.24-7.39-3.73a5.36,5.36,0,0,1,.48-1.4C134.53,247.83,138.3,249.11,140.34,249.71Z" fill="#FFFFFF" />
            <path d="M138.4,254.61c-4.13-1.06-5.69-2.91-6.17-4.65a13.64,13.64,0,0,1,4.34,2.09A5.15,5.15,0,0,1,138.4,254.61Z" fill="#C88B85" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default GbemiMascot;
