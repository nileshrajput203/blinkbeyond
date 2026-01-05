'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
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
  children?: ReactNode;
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
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobileState, setIsMobileState] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpanded) {
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
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);
  const textOpacity = Math.max(0, 1 - scrollProgress * 2);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div className="relative">
      <section
        ref={sectionRef}
        className="min-h-screen relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        }}
      >
        {/* Background image with dark overlay */}
        <div
          className="fixed inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500 z-0"
          style={{
            backgroundImage: `url(${bgImageSrc})`,
            opacity: mediaFullyExpanded ? 0 : 0.4,
          }}
        />
        
        {/* Dark gradient overlay for contrast */}
        <div 
          className="fixed inset-0 z-[1] transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, rgba(15, 12, 41, 0.85) 0%, rgba(48, 43, 99, 0.7) 50%, rgba(36, 36, 62, 0.85) 100%)',
            opacity: mediaFullyExpanded ? 0 : 1,
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <div className="min-h-screen flex flex-col items-center justify-center w-full sticky top-0">
            {/* Container for media and overlapping title */}
            <div className="relative flex flex-col items-center justify-center w-full">
              {/* Media container - Clean edges with 24px border-radius */}
              <div
                className="relative overflow-hidden transition-all duration-100 ease-out"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '90vh',
                  borderRadius: '24px',
                  boxShadow: '0 25px 80px -20px rgba(0, 0, 0, 0.5), 0 10px 40px -10px rgba(0, 0, 0, 0.3)',
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
                        style={{ borderRadius: '24px' }}
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
                        style={{ borderRadius: '24px' }}
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
                      style={{ borderRadius: '24px' }}
                    />
                  </div>
                )}
              </div>

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
                className="flex flex-col items-center text-center mt-8 transition-none"
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

            <motion.section
              className="flex flex-col w-full px-8 py-10 md:px-16 lg:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
