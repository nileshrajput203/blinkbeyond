import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.8 }); // After preloader

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current?.children || [],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-[80vh] flex items-center justify-center pt-20 px-6"
    >
      <div className="container mx-auto">
        <div className="bg-muted rounded-3xl p-12 md:p-20 lg:p-28 text-center relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-foreground/5 rounded-full blur-2xl" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-foreground/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h1
              ref={headingRef}
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6 opacity-0"
            >
              We Create Digital
              <br />
              <span className="text-muted-foreground">Experiences</span>
            </h1>
            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0"
            >
              BlinkBeyond is a creative agency that transforms ideas into
              stunning digital realities through design, development, and
              strategy.
            </p>
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#services"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium text-lg hover-lift opacity-0"
              >
                Explore Services
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center px-8 py-4 bg-background text-foreground rounded-full font-medium text-lg border border-border hover-lift opacity-0"
              >
                View Our Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
