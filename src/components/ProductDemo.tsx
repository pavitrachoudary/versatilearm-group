import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, AlertCircle } from 'lucide-react';

interface Feature {
  icon: string;
  label: string;
}

interface ProductDemoProps {
  productName: 'VLands' | 'OwnMyLand';
  videoUrl?: string; // custom custom url passed in as prop
  demoTitle: string;
  demoSubtitle: string;
  features: Feature[];
  accentColor?: string;
}

// Map helper to detect if a custom URL is cloud stream or iframe-based
const parseVideoUrl = (url: string) => {
  if (!url) return { type: 'none', embedUrl: '' };

  const parsed = url.trim();
  const lower = parsed.toLowerCase();

  // 1. Google Drive Links
  if (lower.includes('drive.google.com')) {
    let fileId = '';
    const fileDMatch = parsed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileDMatch && fileDMatch[1]) {
      fileId = fileDMatch[1];
    } else {
      const idParamMatch = parsed.match(/id=([a-zA-Z0-9_-]+)/);
      if (idParamMatch && idParamMatch[1]) {
        fileId = idParamMatch[1];
      }
    }
    if (fileId) {
      return { 
        type: 'drive', 
        embedUrl: `https://drive.google.com/file/d/${fileId}/preview`
      };
    }
  }

  // 2. YouTube Links
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) {
    let videoId = '';
    if (lower.includes('youtube.com/embed/')) {
      const parts = parsed.split('/embed/');
      videoId = parts[parts.length - 1].split('?')[0].split('#')[0];
    } else {
      const watchMatch = parsed.match(/v=([a-zA-Z0-9_-]+)/);
      if (watchMatch && watchMatch[1]) {
        videoId = watchMatch[1];
      } else {
        const beMatch = parsed.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
        if (beMatch && beMatch[1]) {
          videoId = beMatch[1];
        }
      }
    }
    if (videoId) {
      return { 
        type: 'youtube', 
        embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`
      };
    }
  }

  // 3. Vimeo Links
  if (lower.includes('vimeo.com')) {
    const vimeoMatch = parsed.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch && vimeoMatch[1]) {
      return { 
        type: 'vimeo', 
        embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`
      };
    }
  }

  // 4. Direct Video Stream Links
  if (
    lower.endsWith('.mp4') || 
    lower.endsWith('.webm') || 
    lower.endsWith('.ogg') ||
    lower.includes('.mp4?') ||
    lower.includes('.webm?')
  ) {
    return { 
      type: 'native', 
      embedUrl: parsed 
    };
  }

  // Fallback to standard iframe for other links
  if (lower.startsWith('http://') || lower.startsWith('https://')) {
    return { 
      type: 'iframe', 
      embedUrl: parsed 
    };
  }

  return { type: 'none', embedUrl: '' };
};

const ProductDemo = ({
  productName,
  videoUrl,
  demoTitle,
  demoSubtitle,
  features,
  accentColor = 'primary',
}: ProductDemoProps) => {
  const [videoAspect, setVideoAspect] = useState<string>('16/9');

  // Identify if the videoUrl provided is web iframe-based (YouTube, Drive, etc.) or native stream
  const isExternalUrl = videoUrl && (
    videoUrl.includes('drive.google.com') ||
    videoUrl.includes('youtube.com') ||
    videoUrl.includes('youtu.be') ||
    videoUrl.includes('vimeo.com')
  );

  const parsed = parseVideoUrl(videoUrl || '');

  // Default elegant aerial placeholder paths as safe cloud fallbacks
  const defaultPlaceholderUrl = productName === 'VLands'
    ? 'https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-a-dense-green-forest-41584-large.mp4'
    : 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-mountain-landscape-with-farms-41586-large.mp4';

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.videoWidth && video.videoHeight) {
      setVideoAspect(`${video.videoWidth}/${video.videoHeight}`);
    }
  };

  return (
    <section id="demo" className="bg-neutral-950 text-white rounded-3xl p-8 md:p-14 border border-neutral-900 overflow-hidden relative w-full my-12 shadow-2xl">
      {/* Decorative gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_-10%,rgba(26,107,90,0.2),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 text-accent font-mono text-[10px] uppercase tracking-widest font-semibold mb-4">
            <Sparkles size={12} className="text-accent animate-pulse" />
            <span>Product Demo Video</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-medium leading-[1.15] tracking-tighter text-white">
            {demoTitle}
          </h2>
          <p className="text-neutral-400 text-sm md:text-base mt-4 text-center leading-relaxed max-w-2xl mx-auto">
            {demoSubtitle}
          </p>
        </div>

        {/* Responsive Video Canvas Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-950 flex items-center justify-center transition-[aspect-ratio] duration-500 ease-in-out"
          style={{ 
            aspectRatio: isExternalUrl ? '16/9' : videoAspect,
            maxHeight: '70vh'
          }}
        >
          {isExternalUrl ? (
            <iframe
              src={parsed.embedUrl}
              title={`${productName} Demo`}
              className="w-full h-full border-0"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              referrerPolicy="no-referrer"
            />
          ) : (
            <video 
              controls 
              autoPlay={false} 
              playsInline 
              loop
              onLoadedMetadata={handleLoadedMetadata}
              className="w-full h-full object-contain bg-black"
            >
              {/* Explicitly check passed URL */}
              {videoUrl && <source src={videoUrl} type="video/mp4" />}
              
              {/* Robust local upload endpoints */}
              <source src={`/${productName.toLowerCase()}_demo.mp4`} type="video/mp4" />
              <source src={`/${productName.toLowerCase()}.mp4`} type="video/mp4" />
              <source src={`/assets/${productName.toLowerCase()}_demo.mp4`} type="video/mp4" />
              
              {/* Beautiful, reliable Cloud stock layout placeholder */}
              <source src={defaultPlaceholderUrl} type="video/mp4" />
              
              <div className="absolute inset-0 bg-neutral-900 flex flex-col items-center justify-center p-6 gap-3 text-center">
                <AlertCircle className="text-accent/60" size={36} />
                <div className="text-lg font-display font-medium">Inactive Video Stream</div>
                <p className="text-neutral-500 text-xs max-w-sm">
                  Please upload a video file named {`${productName.toLowerCase()}_demo.mp4`} to the public directory.
                </p>
              </div>
            </video>
          )}
        </motion.div>

        {/* Feature strip with icons below the video player */}
        <div className="flex flex-wrap justify-center gap-3 mt-10 w-full">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="flex items-center gap-2.5 text-[11px] font-mono uppercase tracking-widest font-bold text-neutral-300 bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-accent/20 transition-all hover:-translate-y-0.5 cursor-default hover:bg-white/[0.08]"
            >
              <span className="text-xs">{feature.icon}</span>
              <span>{feature.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export { ProductDemo };
