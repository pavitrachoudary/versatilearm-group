import { motion } from 'motion/react';

interface VLandsLogoProps {
  className?: string;
  variant?: 'white' | 'primary';
}

export const VLandsLogo = ({ className = "w-16 h-16", variant = 'primary' }: VLandsLogoProps) => {
  return (
    <div className={`relative ${className} flex items-center justify-center overflow-hidden group`}>
      <img 
        src="https://lh3.googleusercontent.com/d/1p1VaoN61XeEnVGvfUZB0gmKkQa4oKPYV" 
        alt="VLands" 
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain select-none transition-transform duration-300 group-hover:scale-105"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
};
