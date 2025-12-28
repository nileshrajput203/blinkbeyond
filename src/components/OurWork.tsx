const OurWork = () => {
  return (
    <section id="work" className="py-24 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-center mb-16 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Our Work
        </h2>

        <div className="max-w-4xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          {/* Hand-drawn style flowchart visualization */}
          <div className="relative py-16">
            <svg
              viewBox="0 0 800 300"
              className="w-full h-auto"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Flow path */}
              <path
                d="M 50 150 Q 150 50 250 150 T 450 150 T 650 150 L 750 150"
                fill="none"
                stroke="hsl(0 0% 0%)"
                strokeWidth="3"
                strokeLinecap="round"
                className="animate-[dash_2s_ease-in-out_forwards]"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                style={{ animation: "dash 2s ease-in-out 0.5s forwards" }}
              />
              
              {/* Nodes */}
              <g className="opacity-0 animate-scale-in" style={{ animationDelay: "0.8s" }}>
                <circle cx="50" cy="150" r="20" fill="hsl(0 0% 0%)" />
                <text x="50" y="200" textAnchor="middle" className="text-sm font-medium fill-current">Idea</text>
              </g>
              
              <g className="opacity-0 animate-scale-in" style={{ animationDelay: "1s" }}>
                <circle cx="250" cy="150" r="20" fill="hsl(0 0% 0%)" />
                <text x="250" y="200" textAnchor="middle" className="text-sm font-medium fill-current">Design</text>
              </g>
              
              <g className="opacity-0 animate-scale-in" style={{ animationDelay: "1.2s" }}>
                <circle cx="450" cy="150" r="20" fill="hsl(0 0% 0%)" />
                <text x="450" y="200" textAnchor="middle" className="text-sm font-medium fill-current">Build</text>
              </g>
              
              <g className="opacity-0 animate-scale-in" style={{ animationDelay: "1.4s" }}>
                <circle cx="650" cy="150" r="20" fill="hsl(0 0% 0%)" />
                <text x="650" y="200" textAnchor="middle" className="text-sm font-medium fill-current">Launch</text>
              </g>
              
              <g className="opacity-0 animate-scale-in" style={{ animationDelay: "1.6s" }}>
                <polygon points="750,150 730,140 730,160" fill="hsl(0 0% 0%)" />
                <text x="750" y="200" textAnchor="middle" className="text-sm font-medium fill-current">Success</text>
              </g>
            </svg>
            
            <style>{`
              @keyframes dash {
                to {
                  stroke-dashoffset: 0;
                }
              }
            `}</style>
          </div>

          <p className="text-center text-muted-foreground text-lg mt-8">
            From concept to launch, we guide your project through every phase with precision and creativity.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurWork;
