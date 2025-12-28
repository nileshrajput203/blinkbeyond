import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutServices = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const cards = [
    {
      title: "ABOUT US",
      href: "/about",
    },
    {
      title: "OUR SERVICES",
      href: "/services",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cardElements = cardsRef.current?.children;
      if (cardElements) {
        gsap.fromTo(
          cardElements,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
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
    <section ref={sectionRef} id="about" className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <Link
              key={card.title}
              to={card.href}
              className="group bg-muted rounded-3xl p-8 min-h-[180px] md:min-h-[220px] flex items-start hover-lift opacity-0"
            >
              <h3 className="text-lg md:text-xl font-heading font-bold">
                {card.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutServices;
