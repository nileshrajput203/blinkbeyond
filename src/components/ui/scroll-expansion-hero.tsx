'use client';

import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

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
  const [canScrollPast, setCanScrollPast] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800, isMobile: false });
  const [mounted, setMounted] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  // Handle mounting and dimensions
  useEffect(() => {
    setMounted(true);
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
      });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    setScrollProgress(0);
    setAnimationComplete(false);
    setCanScrollPast(false);
  }, [mediaType]);

  const handleScrollProgress = useCallback((delta: number) => {
    if (canScrollPast) return false;

    if (animationComplete && delta > 0) {
      setCanScrollPast(true);
      return false;
    }

    if (animationComplete && delta < 0) {
      return true;
    }

    const scrollDelta = delta * 0.002;
    const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
    setScrollProgress(newProgress);

    if (newProgress >= 1 && !animationComplete) {
      setAnimationComplete(true);
    }
    return true;
  }, [scrollProgress, animationComplete, canScrollPast]);

  useEffect(() => {
    if (!mounted || canScrollPast) return;

    const handleWheel = (e: WheelEvent) => {
      const shouldPrevent = handleScrollProgress(e.deltaY);
      if (shouldPrevent) {
        e.preventDefault();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      const shouldPrevent = handleScrollProgress(deltaY * 4);
      if (shouldPrevent) {
        e.preventDefault();
      }
      setTouchStartY(touchY);
    };

    const handleTouchEnd = () => {
      setTouchStartY(0);
    };

    const handleScroll = () => {
      if (!canScrollPast && mounted) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [mounted, canScrollPast, handleScrollProgress, touchStartY]);

  const baseWidth = dimensions.isMobile ? 280 : 320;
  const baseHeight = dimensions.isMobile ? 350 : 420;

  const mediaWidth = baseWidth + scrollProgress * (dimensions.width - baseWidth);
  const mediaHeight = baseHeight + scrollProgress * (dimensions.height - baseHeight);
  const borderRadius = Math.max(0, 24 * (1 - scrollProgress));
  
  const textTranslateX = scrollProgress * (dimensions.isMobile ? 180 : 150);
  const textOpacity = Math.max(0, 1 - scrollProgress * 2.5);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  if (!mounted) {
    return (
      <section className="relative h-screen overflow-hidden bg-[#0f0c29]" />
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${bgImageSrc})`,
          opacity: scrollProgress > 0.8 ? 0 : 0.4,
          transition: 'opacity 0.5s ease',
        }}
      />
      
      {/* Dark gradient overlay */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(135deg, rgba(15, 12, 41, 0.85) 0%, rgba(48, 43, 99, 0.7) 50%, rgba(36, 36, 62, 0.85) 100%)',
          opacity: scrollProgress > 0.8 ? 0 : 1,
          transition: 'opacity 0.5s ease',
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          {/* Media container */}
          <div
            className="relative overflow-hidden"
            style={{
              width: mediaWidth,
              height: mediaHeight,
              borderRadius: borderRadius,
              boxShadow: scrollProgress >= 1 
                ? 'none' 
                : '0 25px 80px -20px rgba(0, 0, 0, 0.5), 0 10px 40px -10px rgba(0, 0, 0, 0.3)',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            {mediaType === 'video' ? (
              <video
                src={mediaSrc}
                poster={posterSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover pointer-events-none"
                controls={false}
              />
            ) : (
              <img
                src={mediaSrc}
                alt={title || 'Media content'}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Title text overlay */}
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
              <h2
                className="text-5xl md:text-7xl lg:text-8xl font-bold"
                style={{ 
                  transform: `translateX(-${textTranslateX}vw)`,
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: 'italic',
                  color: 'white',
                  textShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
                }}
              >
                {firstWord}
              </h2>
              <h2
                className="text-5xl md:text-7xl lg:text-8xl font-bold"
                style={{ 
                  transform: `translateX(${textTranslateX}vw)`,
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: 'italic',
                  color: 'white',
                  textShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
                }}
              >
                {restOfTitle}
              </h2>
            </div>
          </div>

          {/* Date and scroll text */}
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
