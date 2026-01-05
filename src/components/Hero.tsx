import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

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
    />
  );
};

export default Hero;
