import { motion } from 'motion/react';

interface VAGLogoProps {
  className?: string;
}

export const VAGLogo = ({ className = "w-16 h-16" }: VAGLogoProps) => {
  return (
    <div className={`relative ${className} flex items-center justify-center overflow-hidden group`}>
      <img 
        src="https://lh3.googleusercontent.com/d/1X46M4pP5FGOrWgqtsqMiCcV6B7sP1k6p" 
        alt="Versatile Arm Group" 
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain select-none transition-transform duration-300 group-hover:scale-105"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
};
