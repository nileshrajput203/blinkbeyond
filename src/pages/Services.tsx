import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Zap, Code, Rocket, BarChart3 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useSmoothScroll from "@/hooks/useSmoothScroll";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useSmoothScroll();

  const servicePills = [
    "FRAMER", "SHOPIFY", "FIGMA", "WEBFLOW",
    "WEBSITE", "UX AUDIT", "REVAMP!", "APP",
    "IDEATION", "STRATEGY", "RESEARCH"
  ];

  const services = [
    {
      icon: Zap,
      number: "01",
      title: "Blink",
      subtitle: "Rapid Prototyping",
      description: "Lightning-fast prototyping and MVP development. We transform your ideas into tangible products within days, not months. Perfect for startups looking to validate ideas quickly.",
      features: ["Rapid Prototyping", "MVP Development", "Design Sprints", "Wireframing"],
    },
    {
      icon: Code,
      number: "02",
      title: "Build",
      subtitle: "Full-Scale Development",
      description: "From web apps to e-commerce, we build scalable solutions that grow with you. Our development process ensures clean, maintainable code that stands the test of time.",
      features: ["Web Development", "E-commerce", "Custom CMS", "API Integration"],
    },
    {
      icon: Rocket,
      number: "03",
      title: "Boom",
      subtitle: "Launch & Scale",
      description: "Launch, scale, and grow your digital presence. We help you reach your audience and convert visitors into customers with data-driven strategies.",
      features: ["Growth Strategy", "SEO Optimization", "Analytics", "Performance Marketing"],
    },
    {
      icon: BarChart3,
      number: "04",
      title: "Optimize",
      subtitle: "Continuous Improvement",
      description: "We don't just launch and leave. Our optimization services ensure your digital products continue to perform at their best with ongoing improvements.",
      features: ["A/B Testing", "Conversion Optimization", "Performance Tuning", "UX Research"],
    },
  ];

  const process = [
    { step: "01", title: "Discovery", description: "Understanding your goals and target audience" },
    { step: "02", title: "Strategy", description: "Creating a roadmap for success" },
    { step: "03", title: "Design", description: "Crafting beautiful, functional interfaces" },
    { step: "04", title: "Development", description: "Building with modern technologies" },
    { step: "05", title: "Launch", description: "Deploying and monitoring performance" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current?.children || [],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.2 }
      );

      // Pills animation
      if (pillsRef.current) {
        gsap.fromTo(
          pillsRef.current.children,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "back.out(1.7)",
            scrollTrigger: { trigger: pillsRef.current, start: "top 85%" },
          }
        );
      }

      // Services animation
      if (servicesRef.current) {
        gsap.fromTo(
          servicesRef.current.children,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: { trigger: servicesRef.current, start: "top 80%" },
          }
        );
      }

      // Process animation
      if (processRef.current) {
        gsap.fromTo(
          processRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: processRef.current, start: "top 80%" },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-service-blink text-primary-foreground">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <div ref={heroRef} className="text-center">
              <p className="text-primary-foreground/60 text-sm uppercase tracking-widest mb-6 opacity-0">
                What We Do
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-8 opacity-0">
                Our Services
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/70 max-w-2xl mx-auto opacity-0">
                End-to-end digital solutions tailored to your unique needs and goals
              </p>
            </div>
          </div>
        </section>

        {/* Service Pills */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-5xl">
            <div ref={pillsRef} className="flex flex-wrap justify-center gap-3">
              {servicePills.map((pill) => (
                <span
                  key={pill}
                  className="px-5 py-2.5 rounded-full border border-primary-foreground/30 text-sm font-medium hover:bg-primary-foreground hover:text-foreground transition-all duration-300 cursor-pointer opacity-0"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Services */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-5xl">
            <div ref={servicesRef} className="space-y-8">
              {services.map((service) => (
                <div
                  key={service.number}
                  className="group bg-secondary/30 rounded-3xl p-8 md:p-12 hover:bg-secondary/50 transition-all duration-500 cursor-pointer opacity-0"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Left: Icon & Number */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="w-10 h-10 text-primary-foreground" />
                      </div>
                      <span className="text-primary-foreground/40 font-heading font-bold text-2xl">
                        {service.number}
                      </span>
                    </div>

                    {/* Right: Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                            {service.title}
                          </h3>
                          <p className="text-primary-foreground/60 font-medium">
                            {service.subtitle}
                          </p>
                        </div>
                        <ArrowUpRight className="w-8 h-8 text-primary-foreground/40 group-hover:text-primary-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                      </div>

                      <p className="text-primary-foreground/70 text-lg leading-relaxed mb-6">
                        {service.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature) => (
                          <span
                            key={feature}
                            className="px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground/80 text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 px-6 bg-secondary/20">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-16">
              Our Process
            </h2>

            <div ref={processRef} className="grid md:grid-cols-5 gap-6">
              {process.map((item, index) => (
                <div key={item.step} className="text-center opacity-0">
                  <div className="w-16 h-16 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
                    <span className="font-heading font-bold text-xl">{item.step}</span>
                  </div>
                  <h4 className="font-heading font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-primary-foreground/60 text-sm">{item.description}</p>
                  {index < process.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-primary-foreground/30 mx-auto mt-4 hidden md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Ready to Start?
            </h2>
            <p className="text-xl text-primary-foreground/70 mb-10">
              Let's discuss how we can help bring your vision to life.
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-3 bg-primary-foreground text-foreground px-8 py-4 rounded-full font-medium text-lg hover:scale-105 transition-transform duration-300"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
