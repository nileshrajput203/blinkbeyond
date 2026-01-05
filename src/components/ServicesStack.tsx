import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServicesStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const services = useMemo(
    () => [
      {
        name: "Blink",
        bgClass: "bg-service-blink",
        textClass: "text-primary-foreground",
        description:
          "Rapid ideation & strategy — we turn your vision into actionable plans in record time.",
      },
      {
        name: "Build",
        bgClass: "bg-service-build",
        textClass: "text-primary-foreground",
        description:
          "Development & execution — bringing your digital product to life with precision and care.",
      },
      {
        name: "Boom",
        bgClass: "bg-service-boom",
        textClass: "text-muted-foreground",
        description:
          "Launch & growth — amplifying your reach with data-driven marketing strategies.",
      },
    ],
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      const contents = contentRefs.current.filter(Boolean) as HTMLDivElement[];
      
      if (cards.length !== services.length) return;

      // Initial state - stack cards with offset, first card expanded
      cards.forEach((card, i) => {
        gsap.set(card, {
          y: i * 60, // Stack offset
          zIndex: services.length - i,
          scale: 1 - i * 0.02,
        });
        
        // First card content visible, rest hidden
        if (i === 0) {
          gsap.set(contents[i], { autoAlpha: 1, y: 0 });
        } else {
          gsap.set(contents[i], { autoAlpha: 0, y: 30 });
        }
      });

      const totalScroll = window.innerHeight * 2.5;

      // Master timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalScroll}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Card 1 (Blink) - shrink and move up as Build comes
      tl.to(cards[0], {
        y: -80,
        scale: 0.9,
        filter: "blur(2px)",
        duration: 1,
        ease: "power2.inOut",
      }, 0);
      
      tl.to(contents[0], {
        autoAlpha: 0,
        y: -20,
        duration: 0.4,
      }, 0);

      // Card 2 (Build) - slide up and overlap
      tl.to(cards[1], {
        y: 0,
        scale: 1,
        zIndex: 10,
        duration: 1,
        ease: "power2.inOut",
      }, 0);
      
      tl.to(contents[1], {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
      }, 0.5);

      // Card 3 (Boom) - move closer
      tl.to(cards[2], {
        y: 60,
        scale: 0.98,
        duration: 1,
        ease: "power2.inOut",
      }, 0);

      // === Second phase: Boom overlaps Build ===
      
      // Build shrinks and moves up
      tl.to(cards[1], {
        y: -80,
        scale: 0.9,
        filter: "blur(2px)",
        duration: 1,
        ease: "power2.inOut",
      }, 1.2);
      
      tl.to(contents[1], {
        autoAlpha: 0,
        y: -20,
        duration: 0.4,
      }, 1.2);

      // Boom slides up and overlaps
      tl.to(cards[2], {
        y: 0,
        scale: 1,
        zIndex: 20,
        duration: 1,
        ease: "power2.inOut",
      }, 1.2);
      
      tl.to(contents[2], {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
      }, 1.7);

      // Blink moves further up
      tl.to(cards[0], {
        y: -160,
        scale: 0.85,
        filter: "blur(4px)",
        duration: 1,
        ease: "power2.inOut",
      }, 1.2);

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [services]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="min-h-screen bg-background overflow-hidden isolate relative z-30 py-20"
      aria-label="Our services"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-service-blink/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-service-build/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-service-boom/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto max-w-5xl px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="inline-block text-sm font-medium text-muted-foreground mb-4 tracking-widest uppercase">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            Our Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A seamless three-step process designed to take your ideas from concept to market dominance.
          </p>
        </div>

        {/* Cards container */}
        <div className="relative h-[500px] perspective-1000">
          {services.map((service, index) => (
            <div
              key={service.name}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`absolute inset-x-0 ${service.bgClass} ${service.textClass} rounded-3xl shadow-2xl overflow-hidden will-change-transform`}
              style={{
                height: "480px",
                transformOrigin: "center top",
              }}
            >
              {/* Card inner content */}
              <div className="h-full p-8 md:p-12 flex flex-col relative">
                {/* Step indicator */}
                <div className="absolute top-8 right-8 md:right-12">
                  <span className="text-6xl md:text-7xl font-heading font-bold opacity-10">
                    0{index + 1}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-background/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-2xl">
                      {index === 0 ? "⚡" : index === 1 ? "🔧" : "🚀"}
                    </span>
                  </div>
                  <div className="h-px flex-1 bg-current opacity-20" />
                </div>
                
                <h3 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                  {service.name}
                </h3>

                <div
                  ref={(el) => (contentRefs.current[index] = el)}
                  className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  <div className="space-y-6">
                    <p className="text-lg md:text-xl opacity-90 leading-relaxed font-medium">
                      {service.description}
                    </p>
                    
                    {/* Features list */}
                    <ul className="space-y-3">
                      {["Strategy & Planning", "Expert Execution", "Measurable Results"].map((feature, i) => (
                        <li key={feature} className="flex items-center gap-3 text-sm opacity-80">
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold bg-background/20 hover:bg-background/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:gap-3 group"
                      type="button"
                    >
                      Learn More 
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>

                  <div className="w-full h-56 md:h-72 rounded-2xl bg-background/10 backdrop-blur-sm overflow-hidden border border-white/10 relative group">
                    {/* Animated gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-transparent to-background/20" />
                    
                    {/* Grid pattern */}
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                      backgroundSize: '24px 24px'
                    }} />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 mx-auto rounded-2xl bg-background/20 backdrop-blur-sm flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                          <span className="text-4xl">
                            {index === 0 ? "⚡" : index === 1 ? "🔧" : "🚀"}
                          </span>
                        </div>
                        <span className="text-sm opacity-60 block font-medium tracking-wide">
                          {service.name} Phase
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesStack;
