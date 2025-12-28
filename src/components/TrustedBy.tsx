const TrustedBy = () => {
  const logos = [
    { name: "Company 1" },
    { name: "Company 2" },
    { name: "Company 3" },
    { name: "Company 4" },
    { name: "Company 5" },
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, hsl(0 0% 0%) 0%, hsl(0 0% 30%) 50%, hsl(0 0% 0%) 100%)"
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          <span className="text-primary-foreground font-medium text-lg opacity-0 animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
            Trusted by
          </span>
          {logos.map((logo, index) => (
            <div
              key={logo.name}
              className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary flex items-center justify-center opacity-0 animate-scale-in"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              title={logo.name}
            >
              <span className="text-primary-foreground text-xs font-medium">Logo</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
