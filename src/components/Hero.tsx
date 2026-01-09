import { CircularGallery, type GalleryItem } from "@/components/ui/circular-gallery-2";
import mainBanner from "@/assets/main_banner.jpg";

const galleryItems: GalleryItem[] = [
  { image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop", text: "Analytics" },
  { image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop", text: "Team Work" },
  { image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop", text: "Collaboration" },
  { image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop", text: "Strategy" },
  { image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop", text: "Innovation" },
  { image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop", text: "Technology" },
];

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col">
      {/* Banner Image Top Half */}
      <div 
        className="relative w-full h-1/2 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mainBanner})` }}
      >
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Circular Gallery Bottom Half */}
      <div 
        className="relative w-full h-1/2 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mainBanner})` }}
      >
        <CircularGallery
          items={galleryItems}
          bend={3}
          borderRadius={0.05}
          autoRotate={true}
          autoRotateSpeed={0.015}
          className="h-full w-full text-foreground font-bold text-xl"
        />
      </div>
    </section>
  );
};

export default Hero;
