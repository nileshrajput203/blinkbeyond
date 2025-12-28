import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OurWork = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2
          ref={headingRef}
          className="text-2xl md:text-3xl font-heading font-bold text-center mb-12 opacity-0"
        >
          OUR WORK
        </h2>

        <div
          ref={textRef}
          className="text-center py-16 opacity-0"
        >
          {/* Hand-drawn style "Flow Chart" text */}
          <svg
            viewBox="0 0 500 180"
            className="w-full max-w-lg mx-auto h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* "Flow" text */}
            <text
              x="50"
              y="80"
              className="fill-destructive"
              style={{
                fontFamily: "'Caveat', 'Dancing Script', cursive",
                fontSize: "72px",
                fontWeight: "400",
              }}
            >
              Flow
            </text>
            
            {/* "Chart" text with underline */}
            <text
              x="200"
              y="140"
              className="fill-destructive"
              style={{
                fontFamily: "'Caveat', 'Dancing Script', cursive",
                fontSize: "72px",
                fontWeight: "400",
              }}
            >
              Chart
            </text>
            
            {/* Underline */}
            <path
              d="M 320 145 Q 380 145 450 140"
              fill="none"
              className="stroke-destructive"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default OurWork;
