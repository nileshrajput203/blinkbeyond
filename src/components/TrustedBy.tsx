import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TrustedBy = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  const logos = [
    { name: "Company 1" },
    { name: "Company 2" },
    { name: "Company 3" },
    { name: "Company 4" },
    { name: "Company 5" },
    { name: "Company 6" },
    { name: "Company 7" },
    { name: "Company 8" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text slide in
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden z-0">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, hsl(0 0% 0%) 0%, hsl(0 0% 30%) 50%, hsl(0 0% 0%) 100%)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          <span
            ref={textRef}
            className="text-primary-foreground font-medium text-lg opacity-0"
          >
            Trusted by
          </span>
          <div className="overflow-hidden flex-1 max-w-4xl marquee-container">
            <div 
              ref={logosRef} 
              className="flex items-center gap-12 animate-marquee"
              style={{
                width: 'max-content',
              }}
            >
              {/* Double the logos for seamless loop */}
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary flex items-center justify-center flex-shrink-0"
                  title={logo.name}
                >
                  <span className="text-primary-foreground text-xs font-medium">
                    Logo
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
