import { ArrowUpRight } from "lucide-react";

const AboutServices = () => {
  const cards = [
    {
      title: "About Us",
      description: "We're a team of passionate designers and developers who believe in the power of great digital experiences. Our mission is to help businesses thrive in the digital age.",
      href: "#about",
    },
    {
      title: "Our Services",
      description: "From rapid prototyping to full-scale development, we offer end-to-end digital solutions tailored to your unique needs and goals.",
      href: "#services",
    },
  ];

  return (
    <section id="about" className="py-24 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <a
              key={card.title}
              href={card.href}
              className="group bg-muted rounded-3xl p-10 md:p-14 min-h-[320px] flex flex-col justify-between hover-lift opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold mb-6">{card.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{card.description}</p>
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
