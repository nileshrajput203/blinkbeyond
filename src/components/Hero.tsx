import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <ScrollExpandMedia
      mediaType="video"
      mediaSrc="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4"
      bgImageSrc="https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&auto=format&fit=crop"
      title="Digital Excellence Delivered"
      date="BlinkBeyond Agency"
      scrollToExpand="Scroll to explore"
      textBlend
    >
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          We Transform Ideas Into Digital Reality
        </h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          From Shopify stores to social media dominance, we craft digital experiences 
          that captivate audiences and drive results. Let's build something extraordinary together.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h4 className="text-xl font-bold text-foreground mb-2">Shopify Development</h4>
            <p className="text-muted-foreground">Custom e-commerce solutions that convert visitors into customers.</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h4 className="text-xl font-bold text-foreground mb-2">Web Development</h4>
            <p className="text-muted-foreground">Beautiful, responsive websites built with modern technologies.</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h4 className="text-xl font-bold text-foreground mb-2">Social Media</h4>
            <p className="text-muted-foreground">Strategic management that grows your brand's online presence.</p>
          </div>
        </div>
        <div className="flex items-center justify-center pt-4">
          <ArrowDown className="w-6 h-6 text-muted-foreground animate-bounce" />
        </div>
      </div>
    </ScrollExpandMedia>
  );
};

export default Hero;
