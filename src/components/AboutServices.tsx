import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutServices = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const cards = [
    {
      title: "About Us",
      description:
        "We're a team of passionate designers and developers who believe in the power of great digital experiences. Our mission is to help businesses thrive in the digital age.",
      href: "#about",
    },
    {
      title: "Our Services",
      description:
        "From rapid prototyping to full-scale development, we offer end-to-end digital solutions tailored to your unique needs and goals.",
      href: "#services",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cardElements = cardsRef.current?.children;
      if (cardElements) {
        gsap.fromTo(
          cardElements,
          { opacity: 0, y: 80, rotateX: 10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
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
    <section ref={sectionRef} id="about" className="py-24 px-6">
      <div className="container mx-auto">
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
          {cards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="group bg-muted rounded-3xl p-10 md:p-14 min-h-[320px] flex flex-col justify-between hover-lift opacity-0"
              style={{ perspective: "1000px" }}
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold mb-6">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {card.description}
                </p>
              </div>
              <div className="flex justify-end mt-8">
                <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ArrowUpRight className="w-5 h-5 text-background" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutServices;
