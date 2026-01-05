'use client';

import {
  useEffect,
  useRef,
  useState,
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
  const [isMobileState, setIsMobileState] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  // Refs to avoid re-binding listeners on every progress tick (prevents DOM/scroll race conditions)
  const scrollProgressRef = useRef(0);
  const animationCompleteRef = useRef(false);
  const canScrollPastRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const autoScrollTimeoutRef = useRef<number | null>(null);
  const restoreOverflowRef = useRef<{ html: string; body: string } | null>(null);

  const setProgress = (value: number) => {
    scrollProgressRef.current = value;
    setScrollProgress(value);
  };

  const markAnimationComplete = () => {
    animationCompleteRef.current = true;
    setAnimationComplete(true);
  };

  const releaseAndScrollNext = () => {
    if (canScrollPastRef.current) return;

    canScrollPastRef.current = true;
    setCanScrollPast(true);

    // Restore scrolling
    const prev = restoreOverflowRef.current;
    if (prev) {
      document.documentElement.style.overflow = prev.html;
      document.body.style.overflow = prev.body;
      restoreOverflowRef.current = null;
    }

    // Scroll to next section
    const next = document.getElementById("services");
    next?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    // Reset when media changes
    setProgress(0);
    animationCompleteRef.current = false;
    setAnimationComplete(false);
    canScrollPastRef.current = false;
    setCanScrollPast(false);
    touchStartYRef.current = null;

    if (autoScrollTimeoutRef.current) {
      window.clearTimeout(autoScrollTimeoutRef.current);
      autoScrollTimeoutRef.current = null;
    }
  }, [mediaType]);

  useEffect(() => {
    // Lock document scrolling until we auto-scroll to the next section
    if (canScrollPast) return;

    const html = document.documentElement;
    const body = document.body;

    restoreOverflowRef.current = {
      html: html.style.overflow,
      body: body.style.overflow,
    };

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      // Restore only if we didn't already release
      if (!canScrollPastRef.current && restoreOverflowRef.current) {
        html.style.overflow = restoreOverflowRef.current.html;
        body.style.overflow = restoreOverflowRef.current.body;
        restoreOverflowRef.current = null;
      }
    };
  }, [canScrollPast]);

  useEffect(() => {
    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

    const maybeFinish = (nextProgress: number) => {
      if (nextProgress >= 1 && !animationCompleteRef.current) {
        markAnimationComplete();

        // After it gets wide, wait 1s, then auto-scroll to the next section
        autoScrollTimeoutRef.current = window.setTimeout(() => {
          releaseAndScrollNext();
        }, 1000);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Once released, don't intercept
      if (canScrollPastRef.current) return;

      // Never allow page scroll while locked
      e.preventDefault();

      // If fully expanded, wait for the 1s auto-scroll
      if (animationCompleteRef.current) return;

      const nextProgress = clamp01(scrollProgressRef.current + e.deltaY * 0.002);
      setProgress(nextProgress);
      maybeFinish(nextProgress);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (canScrollPastRef.current) return;
      if (touchStartYRef.current == null) return;

      // Never allow page scroll while locked
      e.preventDefault();

      // If fully expanded, wait for the 1s auto-scroll
      if (animationCompleteRef.current) return;

      const touchY = e.touches[0]?.clientY ?? touchStartYRef.current;
      const deltaY = touchStartYRef.current - touchY; // positive = scrolling down

      const nextProgress = clamp01(scrollProgressRef.current + deltaY * 0.008);
      setProgress(nextProgress);
      maybeFinish(nextProgress);

      touchStartYRef.current = touchY;
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = null;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const baseWidth = isMobileState ? 280 : 320;
  const maxWidth = isMobileState ? window.innerWidth : window.innerWidth;
  const baseHeight = isMobileState ? 350 : 420;
  const maxHeight = isMobileState ? window.innerHeight : window.innerHeight;

  const mediaWidth = baseWidth + scrollProgress * (maxWidth - baseWidth);
  const mediaHeight = baseHeight + scrollProgress * (maxHeight - baseHeight);
  const borderRadius = Math.max(0, 24 * (1 - scrollProgress));
  
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);
  const textOpacity = Math.max(0, 1 - scrollProgress * 2.5);

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
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${bgImageSrc})`,
          opacity: scrollProgress > 0.8 ? 0 : 0.4,
          transition: 'opacity 0.5s ease',
        }}
      />
      
      {/* Dark gradient overlay for contrast */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(135deg, rgba(15, 12, 41, 0.85) 0%, rgba(48, 43, 99, 0.7) 50%, rgba(36, 36, 62, 0.85) 100%)',
          opacity: scrollProgress > 0.8 ? 0 : 1,
          transition: 'opacity 0.5s ease',
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
        {/* Container for media and overlapping title */}
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          {/* Media container */}
          <div
            className="relative overflow-hidden"
            style={{
              width: `${mediaWidth}px`,
              height: `${mediaHeight}px`,
              borderRadius: `${borderRadius}px`,
              boxShadow: scrollProgress >= 1 
                ? 'none' 
                : '0 25px 80px -20px rgba(0, 0, 0, 0.5), 0 10px 40px -10px rgba(0, 0, 0, 0.3)',
              transition: 'box-shadow 0.3s ease',
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
                  disablePictureInPicture
                />
              )
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
