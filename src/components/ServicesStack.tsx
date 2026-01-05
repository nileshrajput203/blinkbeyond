import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServicesStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const services = useMemo(
    () => [
      {
        name: "Blink",
        bgClass: "bg-service-blink",
        textClass: "text-primary-foreground",
        description:
          "Rapid ideation & strategy — we turn your vision into actionable plans in record time.",
        collapsedHeight: 90,
        expandedHeight: 420,
      },
      {
        name: "Build",
        bgClass: "bg-service-build",
        textClass: "text-primary-foreground",
        description:
          "Development & execution — bringing your digital product to life with precision and care.",
        collapsedHeight: 80,
        expandedHeight: 380,
      },
      {
        name: "Boom",
        bgClass: "bg-service-boom",
        textClass: "text-muted-foreground",
        description:
          "Launch & growth — amplifying your reach with data-driven marketing strategies.",
        collapsedHeight: 70,
        expandedHeight: 340,
      },
    ],
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stack = stackRef.current;
      if (!stack) return;

      // Initial state
      services.forEach((s, i) => {
        const card = cardsRef.current[i];
        const content = contentRefs.current[i];
        if (!card || !content) return;

        gsap.set(card, { height: s.collapsedHeight });
        gsap.set(content, { autoAlpha: 0, y: 24 });
      });
      gsap.set(stack, { y: 0 });

      const totalScroll = window.innerHeight * (services.length * 1.7);

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalScroll}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      let offset = 0;
      services.forEach((s, i) => {
        const card = cardsRef.current[i];
        const content = contentRefs.current[i];
        if (!card || !content) return;

        // Expand
        tl.to(card, { height: s.expandedHeight, duration: 0.5 }, "+=0.12");
        // Reveal content
        tl.to(content, { autoAlpha: 1, y: 0, duration: 0.25 }, "<0.15");
        // Hold
        tl.to({}, { duration: 0.25 });

        if (i < services.length - 1) {
          // Hide content + collapse before moving to next
          tl.to(content, { autoAlpha: 0, y: 16, duration: 0.18 }, "+=0.05");
          tl.to(card, { height: s.collapsedHeight, duration: 0.3 }, "<0.05");

          offset += s.collapsedHeight;
          tl.to(stack, { y: -offset, duration: 0.35 }, "+=0.08");
        }
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [services]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-16 px-6 min-h-screen bg-background overflow-hidden isolate relative z-30"
      aria-label="Our services"
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-10">
          Our Services
        </h2>

        {/* Viewport for the pinned stack */}
        <div
          className="relative"
          style={{ height: services[0]?.expandedHeight ?? 420 }}
        >
          <div ref={stackRef} className="will-change-transform">
            {services.map((service, index) => (
              <article
                key={service.name}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`service-card ${service.bgClass} ${service.textClass} px-6 md:px-10 py-6 relative overflow-hidden`}
                style={{
                  height: service.collapsedHeight,
                  borderRadius:
                    index === 0
                      ? "1.5rem 1.5rem 0 0"
                      : index === services.length - 1
                        ? "0 0 1.5rem 1.5rem"
                        : "0",
                }}
              >
                <h3 className="text-xl md:text-2xl font-heading font-bold">
                  {service.name}
                </h3>

                <div
                  ref={(el) => (contentRefs.current[index] = el)}
                  className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
                >
                  <div className="space-y-4">
                    <p className="text-sm md:text-base opacity-90 leading-relaxed">
                      {service.description}
                    </p>
                    <button
                      className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-background/20 hover:bg-background/30 transition-colors"
                      type="button"
                    >
                      Learn More →
                    </button>
                  </div>

                  <div className="w-full h-40 md:h-52 rounded-xl bg-background/10 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-background/25 to-background/5 flex items-center justify-center">
                      <span className="text-sm opacity-50">Image + content</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesStack;
