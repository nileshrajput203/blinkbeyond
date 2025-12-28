import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [count, setCount] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Count animation
    const countUp = { value: 0 };
    gsap.to(countUp, {
      value: 100,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(countUp.value)),
      onComplete: () => {
        // Fade out preloader
        gsap.to(preloaderRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete,
        });
      },
    });

    // Text animation
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out" }
    );
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] bg-foreground flex flex-col items-center justify-center"
    >
      {/* Logo */}
      <div className="mb-8">
        <span className="text-4xl md:text-6xl font-heading font-bold text-background">
          ▸▸ Blink<span className="text-background/60">Beyond</span>
        </span>
      </div>

      {/* Counter */}
      <div className="flex items-baseline gap-2">
        <span
          ref={counterRef}
          className="text-8xl md:text-[12rem] font-heading font-bold text-background leading-none"
        >
          {count}%
        </span>
      </div>

      {/* Loading text */}
      <span
        ref={textRef}
        className="text-background/60 text-sm uppercase tracking-widest mt-4"
      >
        [Loading...]
      </span>
    </div>
  );
};

export default Preloader;
