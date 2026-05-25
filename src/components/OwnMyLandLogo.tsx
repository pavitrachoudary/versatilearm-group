import { motion } from 'motion/react';

interface OwnMyLandLogoProps {
  className?: string;
}

export const OwnMyLandLogo = ({ className = "w-16 h-16" }: OwnMyLandLogoProps) => {
  return (
    <div className={`relative ${className} flex items-center justify-center overflow-hidden group`}>
      <img 
        src="https://lh3.googleusercontent.com/d/1j6zibuHtRwogLHgiipVmPFliLdgxo1s3" 
        alt="OwnMyLand" 
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain select-none transition-transform duration-300 group-hover:scale-105"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
};
