import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectsShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      name: "E-commerce Redesign",
      client: "FashionHub",
      progress: 100,
      isReversed: false,
    },
    {
      name: "SaaS Dashboard",
      client: "DataFlow",
      progress: 100,
      isReversed: true,
    },
  ];

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
        heroRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const projectItems = projectsRef.current?.children;
      if (projectItems) {
        gsap.fromTo(
          projectItems,
          { opacity: 0, x: (i) => (i % 2 === 0 ? -40 : 40) },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: projectsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2
          ref={headingRef}
          className="text-4xl md:text-6xl font-heading font-bold text-center mb-16 opacity-0"
        >
          About
        </h2>

        {/* Hero Image Placeholder */}
        <div
          ref={heroRef}
          className="bg-service-blink rounded-3xl h-[250px] md:h-[350px] mb-16 opacity-0"
        />

        {/* Project Rows */}
        <div ref={projectsRef} className="space-y-8">
          {projects.map((project) => (
            <div
              key={project.name}
              className={`flex items-center gap-6 opacity-0 ${
                project.isReversed ? "flex-row-reverse" : ""
              }`}
            >
              {/* Avatar */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-service-blink flex-shrink-0" />

              {/* Progress Bar */}
              <div className="flex-1">
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-muted-foreground/40 rounded-full transition-all duration-1000"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* CTA Button */}
              <button className="bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap">
                visit our website
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
