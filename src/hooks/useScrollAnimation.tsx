import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  animation?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scaleIn" | "stagger";
  delay?: number;
  duration?: number;
  staggerAmount?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
}

export const useScrollAnimation = <T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) => {
  const ref = useRef<T>(null);

  const {
    animation = "fadeUp",
    delay = 0,
    duration = 0.8,
    staggerAmount = 0.1,
    start = "top 85%",
    end = "bottom 20%",
    scrub = false,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let ctx = gsap.context(() => {
      const animations: Record<string, gsap.TweenVars> = {
        fadeUp: { opacity: 0, y: 60 },
        fadeIn: { opacity: 0 },
        slideLeft: { opacity: 0, x: -60 },
        slideRight: { opacity: 0, x: 60 },
        scaleIn: { opacity: 0, scale: 0.9 },
        stagger: { opacity: 0, y: 40 },
      };

      const from = animations[animation] || animations.fadeUp;

      if (animation === "stagger") {
        const children = element.children;
        gsap.set(children, from);
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration,
          stagger: staggerAmount,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start,
            end,
            scrub,
            toggleActions: "play none none reverse",
          },
        });
      } else {
        gsap.set(element, from);
        gsap.to(element, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start,
            end,
            scrub,
            toggleActions: "play none none reverse",
          },
        });
      }
    }, element);

    return () => ctx.revert();
  }, [animation, delay, duration, staggerAmount, start, end, scrub]);

  return ref;
};

export default useScrollAnimation;
