import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const OurWork = () => {
  return (
    <section id="work" className="bg-background">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center">
            <span className="text-sm md:text-base font-medium text-primary uppercase tracking-widest mb-4">
              Our Portfolio
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4">
              Transforming Ideas Into
            </h2>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-gradient">
              Digital Excellence
            </h2>
          </div>
        }
      >
        <div className="relative w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
            alt="Dashboard showcase"
            className="w-full h-full object-cover object-left-top"
          />
          {/* Overlay with project info */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent">
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full mb-3">
                Featured Project
              </span>
              <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-2">
                Analytics Dashboard
              </h3>
              <p className="text-sm md:text-base text-muted-foreground max-w-md">
                A comprehensive analytics platform with real-time data visualization and insights.
              </p>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
};

export default OurWork;
