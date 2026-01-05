'use client';

import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobileState, setIsMobileState] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setScrollProgress(0);
    setAnimationComplete(false);
  }, [mediaType]);

  useEffect(() => {
    // Once animation is complete, don't intercept scroll events
    if (animationComplete) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const scrollDelta = e.deltaY * 0.0015;
      const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
      setScrollProgress(newProgress);

      if (newProgress >= 1) {
        setAnimationComplete(true);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      e.preventDefault();
      const scrollFactor = 0.006;
      const scrollDelta = deltaY * scrollFactor;
      const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
      setScrollProgress(newProgress);

      if (newProgress >= 1) {
        setAnimationComplete(true);
      }

      setTouchStartY(touchY);
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    const handleScroll = (): void => {
      if (!animationComplete) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollProgress, animationComplete, touchStartY]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // When animation is complete, expand to full viewport
  const mediaWidth = animationComplete 
    ? '100vw' 
    : `${300 + scrollProgress * (isMobileState ? 650 : 1250)}px`;
  const mediaHeight = animationComplete 
    ? '100vh' 
    : `${400 + scrollProgress * (isMobileState ? 200 : 400)}px`;
  const borderRadius = animationComplete ? 0 : 24;
  
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);
  const textOpacity = Math.max(0, 1 - scrollProgress * 2);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      }}
    >
      {/* Background image with dark overlay */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500 z-0"
        style={{
          backgroundImage: `url(${bgImageSrc})`,
          opacity: animationComplete ? 0 : 0.4,
        }}
      />
      
      {/* Dark gradient overlay for contrast */}
      <div 
        className="absolute inset-0 z-[1] transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(15, 12, 41, 0.85) 0%, rgba(48, 43, 99, 0.7) 50%, rgba(36, 36, 62, 0.85) 100%)',
          opacity: animationComplete ? 0 : 1,
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
        {/* Container for media and overlapping title */}
        <div className="relative flex flex-col items-center justify-center w-full">
          {/* Media container - Clean edges with 24px border-radius */}
          <motion.div
            className="relative overflow-hidden"
            animate={{
              width: mediaWidth,
              height: mediaHeight,
              borderRadius: borderRadius,
            }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{
              maxWidth: animationComplete ? '100vw' : '95vw',
              maxHeight: animationComplete ? '100vh' : '90vh',
              boxShadow: animationComplete 
                ? 'none' 
                : '0 25px 80px -20px rgba(0, 0, 0, 0.5), 0 10px 40px -10px rgba(0, 0, 0, 0.3)',
            }}
          >
            {mediaType === 'video' ? (
              mediaSrc.includes('youtube.com') ? (
                <div className="relative w-full h-full pointer-events-none">
                  <iframe
                    src={`${mediaSrc}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="absolute inset-0 w-[300%] h-[300%] -top-[100%] -left-[100%] pointer-events-none"
                  />
                </div>
              ) : (
                <div className="relative w-full h-full pointer-events-none">
                  <video
                    src={mediaSrc}
                    poster={posterSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                    controls={false}
                    disablePictureInPicture
                  />
                </div>
              )
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={mediaSrc}
                  alt={title || 'Media content'}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </motion.div>

          {/* Title text overlay - Vertically centered, above card with blend mode */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ 
              zIndex: 30,
              opacity: textOpacity,
            }}
          >
            <div 
              className="flex flex-col items-center text-center gap-1"
              style={{
                mixBlendMode: textBlend ? 'difference' : 'normal',
              }}
            >
              <motion.h2
                className="text-5xl md:text-7xl lg:text-8xl font-bold transition-none"
                style={{ 
                  transform: `translateX(-${textTranslateX}vw)`,
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: 'italic',
                  color: 'white',
                  textShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
                }}
              >
                {firstWord}
              </motion.h2>
              <motion.h2
                className="text-5xl md:text-7xl lg:text-8xl font-bold transition-none"
                style={{ 
                  transform: `translateX(${textTranslateX}vw)`,
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: 'italic',
                  color: 'white',
                  textShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
                }}
              >
                {restOfTitle}
              </motion.h2>
            </div>
          </div>

          {/* Date and scroll text below media */}
          <div 
            className="absolute bottom-8 left-0 right-0 flex flex-col items-center text-center"
            style={{ 
              zIndex: 20,
              opacity: textOpacity,
            }}
          >
            {date && (
              <p
                className="text-xl md:text-2xl"
                style={{ 
                  transform: `translateX(-${textTranslateX}vw)`,
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: 'italic',
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                {date}
              </p>
            )}
            {scrollToExpand && (
              <p
                className="text-sm font-medium text-center tracking-widest uppercase"
                style={{ 
                  transform: `translateX(${textTranslateX}vw)`,
                  color: 'rgba(255, 255, 255, 0.6)',
                }}
              >
                {scrollToExpand}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollExpandMedia;
