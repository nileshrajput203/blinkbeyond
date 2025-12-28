import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OurWork = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const nodesRef = useRef<(SVGGElement | null)[]>([]);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
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

      // Path draw animation
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: svgRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Nodes staggered animation
      nodesRef.current.forEach((node, index) => {
        if (node) {
          gsap.fromTo(
            node,
            { opacity: 0, scale: 0 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              delay: 0.3 + index * 0.2,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: svgRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // Description text
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setNodeRef = (index: number) => (el: SVGGElement | null) => {
    nodesRef.current[index] = el;
  };

  return (
    <section ref={sectionRef} id="work" className="py-24 px-6">
      <div className="container mx-auto">
        <h2
          ref={headingRef}
          className="text-3xl md:text-5xl font-heading font-bold text-center mb-16 opacity-0"
        >
          Our Work
        </h2>

        <div className="max-w-4xl mx-auto">
          {/* Hand-drawn style flowchart visualization */}
          <div className="relative py-16">
            <svg
              ref={svgRef}
              viewBox="0 0 800 300"
              className="w-full h-auto"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Flow path */}
              <path
                ref={pathRef}
                d="M 50 150 Q 150 50 250 150 T 450 150 T 650 150 L 750 150"
                fill="none"
                stroke="hsl(0 0% 0%)"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Nodes */}
              <g ref={setNodeRef(0)} className="opacity-0">
                <circle cx="50" cy="150" r="20" fill="hsl(0 0% 0%)" />
                <text
                  x="50"
                  y="200"
                  textAnchor="middle"
                  className="text-sm font-medium fill-current"
                >
                  Idea
                </text>
              </g>

              <g ref={setNodeRef(1)} className="opacity-0">
                <circle cx="250" cy="150" r="20" fill="hsl(0 0% 0%)" />
                <text
                  x="250"
                  y="200"
                  textAnchor="middle"
                  className="text-sm font-medium fill-current"
                >
                  Design
                </text>
              </g>

              <g ref={setNodeRef(2)} className="opacity-0">
                <circle cx="450" cy="150" r="20" fill="hsl(0 0% 0%)" />
                <text
                  x="450"
                  y="200"
                  textAnchor="middle"
                  className="text-sm font-medium fill-current"
                >
                  Build
                </text>
              </g>

              <g ref={setNodeRef(3)} className="opacity-0">
                <circle cx="650" cy="150" r="20" fill="hsl(0 0% 0%)" />
                <text
                  x="650"
                  y="200"
                  textAnchor="middle"
                  className="text-sm font-medium fill-current"
                >
                  Launch
                </text>
              </g>

              <g ref={setNodeRef(4)} className="opacity-0">
                <polygon points="750,150 730,140 730,160" fill="hsl(0 0% 0%)" />
                <text
                  x="750"
                  y="200"
                  textAnchor="middle"
                  className="text-sm font-medium fill-current"
                >
                  Success
                </text>
              </g>
            </svg>
          </div>

          <p
            ref={textRef}
            className="text-center text-muted-foreground text-lg mt-8 opacity-0"
          >
            From concept to launch, we guide your project through every phase
            with precision and creativity.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurWork;
