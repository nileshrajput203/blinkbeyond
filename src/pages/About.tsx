import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Star, Linkedin, Twitter } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useSmoothScroll from "@/hooks/useSmoothScroll";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useSmoothScroll();

  const team = [
    {
      name: "Neel Sharma",
      role: "Founder & AIML Engineer",
      bio: "Passionate about leveraging AI and machine learning to create innovative digital solutions.",
    },
  ];

  const testimonials = [
    {
      quote: "BlinkBeyond transformed our digital presence. Their speed and quality exceeded all expectations. Highly recommend for any startup!",
      author: "Sarah Johnson",
      role: "CEO, TechStart",
      rating: 5,
    },
    {
      quote: "The team delivered an incredible e-commerce platform that boosted our sales by 200% in just 3 months. Exceptional work!",
      author: "Michael Chen",
      role: "Founder, GrowthLab",
      rating: 5,
    },
    {
      quote: "Professional, creative, and always on time. They truly understand modern digital marketing and user experience.",
      author: "Emily Rodriguez",
      role: "Marketing Director",
      rating: 5,
    },
  ];

  const projects = [
    { name: "E-commerce Redesign", client: "FashionHub", type: "Shopify" },
    { name: "SaaS Dashboard", client: "DataFlow", type: "Web App" },
    { name: "Brand Identity", client: "TechVenture", type: "Branding" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current?.children || [],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.2 }
      );

      // Story animation
      if (storyRef.current) {
        gsap.fromTo(
          storyRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: { trigger: storyRef.current, start: "top 80%" },
          }
        );
      }

      // Team animation
      if (teamRef.current) {
        gsap.fromTo(
          teamRef.current.children,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: teamRef.current, start: "top 80%" },
          }
        );
      }

      // Testimonials animation
      if (testimonialsRef.current) {
        gsap.fromTo(
          testimonialsRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: testimonialsRef.current, start: "top 80%" },
          }
        );
      }

      // Projects animation
      if (projectsRef.current) {
        gsap.fromTo(
          projectsRef.current.children,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: projectsRef.current, start: "top 80%" },
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
                Who We Are
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-8 opacity-0">
                About
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/70 max-w-2xl mx-auto opacity-0">
                We are a UI/UX Design company shipping delightful digital experiences globally
              </p>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="px-6 pb-16">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-secondary/40 rounded-3xl h-[300px] md:h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl font-heading font-bold">▸▸</span>
                </div>
                <p className="text-primary-foreground/60">Made for the world, from India</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-4xl">
            <div ref={storyRef} className="space-y-16">
              <div className="flex flex-col md:flex-row gap-8 items-center opacity-0">
                <div className="w-20 h-20 rounded-full bg-secondary/50 flex-shrink-0" />
                <div className="flex-1">
                  <div className="h-3 bg-muted/20 rounded-full mb-4" />
                  <p className="text-primary-foreground/70 text-lg">
                    We're a team of passionate designers and developers who believe in the power of great digital experiences. Our mission is to help businesses thrive in the digital age.
                  </p>
                </div>
                <Link
                  to="/services"
                  className="bg-primary-foreground text-foreground px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform whitespace-nowrap"
                >
                  visit our website
                </Link>
              </div>

              <div className="flex flex-col md:flex-row-reverse gap-8 items-center opacity-0">
                <div className="w-20 h-20 rounded-full bg-secondary/50 flex-shrink-0" />
                <div className="flex-1">
                  <div className="h-3 bg-muted/20 rounded-full mb-4" />
                  <p className="text-primary-foreground/70 text-lg">
                    From rapid prototyping to full-scale development, we offer end-to-end digital solutions tailored to your unique needs and goals.
                  </p>
                </div>
                <Link
                  to="/services"
                  className="border border-primary-foreground/30 text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary-foreground hover:text-foreground transition-all whitespace-nowrap"
                >
                  view services
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 px-6 bg-secondary/10">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-16">
              What Clients Say
            </h2>

            <div ref={testimonialsRef} className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.author}
                  className="bg-muted/10 rounded-2xl p-8 hover:bg-muted/20 transition-colors duration-300 opacity-0"
                >
                  <p className="font-heading font-semibold text-lg mb-4">review</p>
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary-foreground text-primary-foreground" />
                    ))}
                  </div>

                  <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary/50" />
                    <div>
                      <p className="font-medium text-sm">{testimonial.author}</p>
                      <p className="text-primary-foreground/60 text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-16">
              Meet the Team
            </h2>

            <div ref={teamRef} className="flex justify-center">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="bg-secondary/30 rounded-3xl p-8 text-center max-w-sm hover:bg-secondary/40 transition-colors duration-300 opacity-0"
                >
                  <div className="w-32 h-32 rounded-full bg-secondary/50 mx-auto mb-6" />
                  <h3 className="text-2xl font-heading font-bold mb-2">{member.name}</h3>
                  <p className="text-primary-foreground/60 font-medium mb-4">{member.role}</p>
                  <p className="text-primary-foreground/70 text-sm mb-6">{member.bio}</p>
                  <div className="flex justify-center gap-4">
                    <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Projects */}
        <section className="py-24 px-6 bg-secondary/10">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-16">
              Recent Projects
            </h2>

            <div ref={projectsRef} className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.name}
                  className="group flex items-center justify-between p-6 bg-muted/10 rounded-2xl hover:bg-muted/20 transition-all duration-300 cursor-pointer opacity-0"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-xl bg-secondary/50" />
                    <div>
                      <h4 className="font-heading font-bold text-lg">{project.name}</h4>
                      <p className="text-primary-foreground/60 text-sm">{project.client}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-4 py-1.5 rounded-full bg-primary-foreground/10 text-sm">
                      {project.type}
                    </span>
                    <ArrowUpRight className="w-6 h-6 text-primary-foreground/40 group-hover:text-primary-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Let's Work Together
            </h2>
            <p className="text-xl text-primary-foreground/70 mb-10">
              Ready to bring your vision to life? We'd love to hear from you.
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

export default About;
