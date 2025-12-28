import { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Reviews = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const reviews = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      content: "BlinkBeyond transformed our digital presence. Their speed and quality exceeded all expectations.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Founder, GrowthLab",
      content: "The team delivered an incredible e-commerce platform that boosted our sales by 200% in 3 months.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director, InnovateCo",
      content: "Professional, creative, and always on time. They truly understand modern digital marketing.",
      rating: 5,
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

      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
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
    <section ref={sectionRef} className="py-24 px-6">
      <div className="container mx-auto">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-heading font-bold text-center mb-16 opacity-0"
        >
          What Our Clients Say
        </h2>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-muted rounded-2xl p-8 flex flex-col opacity-0 hover-lift"
            >
              <p className="font-heading font-semibold text-lg mb-4">review</p>
              
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-foreground text-foreground" />
                ))}
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
                "{review.content}"
              </p>

              <div className="pt-4 border-t border-border">
                <p className="font-medium text-sm">{review.name}</p>
                <p className="text-muted-foreground text-xs">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
