const ServicesStack = () => {
  const services = [
    {
      name: "Blink",
      description: "Lightning-fast prototyping and MVP development",
      bgClass: "bg-service-blink",
      textClass: "text-primary-foreground",
      height: "h-[280px] md:h-[320px]",
    },
    {
      name: "Build",
      description: "Full-scale development and implementation",
      bgClass: "bg-service-build",
      textClass: "text-primary-foreground",
      height: "h-[80px] md:h-[100px]",
    },
    {
      name: "Boom",
      description: "Launch, scale, and grow your digital presence",
      bgClass: "bg-service-boom",
      textClass: "text-foreground",
      height: "h-[100px] md:h-[120px]",
    },
  ];

  return (
    <section id="services" className="py-24 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-center mb-16 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Our Services
        </h2>

        <div className="max-w-3xl mx-auto space-y-0">
          {services.map((service, index) => (
            <div
              key={service.name}
              className={`service-card ${service.bgClass} ${service.textClass} ${service.height} flex flex-col items-center justify-center px-8 opacity-0 animate-scale-in`}
              style={{ 
                animationDelay: `${0.2 + index * 0.15}s`,
                borderRadius: index === 0 ? "1.5rem 1.5rem 0 0" : index === services.length - 1 ? "0 0 1.5rem 1.5rem" : "0"
              }}
            >
              <h3 className="text-2xl md:text-4xl font-heading font-bold mb-2">{service.name}</h3>
              <p className="text-sm md:text-base opacity-80 text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesStack;
