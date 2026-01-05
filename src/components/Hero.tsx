import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { ArrowRight, Sparkles, Zap, Target } from "lucide-react";

const Hero = () => {
  return (
    <ScrollExpandMedia
      mediaType="video"
      mediaSrc="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4"
      posterSrc="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1920&auto=format&fit=crop"
      bgImageSrc="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1920&auto=format&fit=crop"
      title="BLINK BEYOND"
      date="Creative Agency"
      scrollToExpand="Scroll to Explore"
      textBlend
    >
      {/* Expanded Content Section */}
      <div className="max-w-6xl mx-auto">
        {/* Main Headline */}
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            We Create Digital Experiences
          </h3>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Transforming ideas into stunning digital solutions through innovative design, 
            cutting-edge development, and strategic marketing.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center hover:bg-card/70 transition-all">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h4 className="text-xl font-semibold text-foreground mb-3">Creative Design</h4>
            <p className="text-muted-foreground">
              Stunning visuals that capture attention and tell your brand story.
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center hover:bg-card/70 transition-all">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h4 className="text-xl font-semibold text-foreground mb-3">Fast Development</h4>
            <p className="text-muted-foreground">
              Lightning-fast websites built with modern technologies.
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center hover:bg-card/70 transition-all">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h4 className="text-xl font-semibold text-foreground mb-3">Results Driven</h4>
            <p className="text-muted-foreground">
              Strategic solutions focused on growing your business.
            </p>
          </div>
        </div>

        {/* Image Showcase */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="aspect-square rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop" 
              alt="Project 1"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="aspect-square rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop" 
              alt="Project 2"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="aspect-square rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop" 
              alt="Project 3"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="aspect-square rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop" 
              alt="Project 4"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors">
            Start Your Project
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </ScrollExpandMedia>
  );
};

export default Hero;
