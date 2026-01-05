import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

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
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          We Create Digital Experiences
        </h3>
        <p className="text-muted-foreground text-lg">
          Transforming ideas into stunning digital solutions through innovative design, 
          cutting-edge development, and strategic marketing.
        </p>
      </div>
    </ScrollExpandMedia>
  );
};

export default Hero;
