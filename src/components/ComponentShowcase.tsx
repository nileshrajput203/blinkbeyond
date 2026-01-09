import { useRef } from "react";
import { motion } from "framer-motion";

interface ShowcaseCard {
  title: string;
  description: string;
  gradient: string;
  rotation: { x: number; y: number; z: number };
}

const showcaseCards: ShowcaseCard[] = [
  {
    title: "Pixelate Image Render",
    description: "Colorful pixelated effect showcase",
    gradient: "linear-gradient(135deg, #ff6b6b 0%, #feca57 25%, #48dbfb 50%, #ff9ff3 75%, #54a0ff 100%)",
    rotation: { x: 15, y: -20, z: 5 },
  },
  {
    title: "Directional List Hover",
    description: "Dark interface with orange hover state",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    rotation: { x: 10, y: 15, z: -3 },
  },
  {
    title: "Flick Cards Slider",
    description: "Purple/dark gradient preview",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #2d1b69 100%)",
    rotation: { x: -10, y: -15, z: 3 },
  },
  {
    title: "Face Follow Cursor",
    description: "Orange glowing effect mascot",
    gradient: "linear-gradient(135deg, #f12711 0%, #f5af19 50%, #ff6b35 100%)",
    rotation: { x: -15, y: 20, z: -5 },
  },
];

const ComponentShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="py-24 bg-background relative overflow-hidden">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Components
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Interactive UI components with stunning visual effects
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto"
          style={{ perspective: "1500px" }}
        >
          {showcaseCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <motion.div
                className="relative rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateX(${card.rotation.x}deg) rotateY(${card.rotation.y}deg) rotateZ(${card.rotation.z}deg)`,
                }}
                whileHover={{
                  rotateX: 0,
                  rotateY: 0,
                  rotateZ: 0,
                  scale: 1.05,
                  transition: { duration: 0.4, ease: "easeOut" },
                }}
              >
                {/* Card Content */}
                <div
                  className="aspect-[4/3] w-full relative"
                  style={{ background: card.gradient }}
                >
                  {/* Decorative elements based on card type */}
                  {index === 0 && (
                    <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-1 p-4">
                      {Array.from({ length: 48 }).map((_, i) => (
                        <div
                          key={i}
                          className="rounded-sm"
                          style={{
                            backgroundColor: `hsl(${(i * 7) % 360}, 70%, 60%)`,
                            opacity: 0.8,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {index === 1 && (
                    <div className="absolute inset-0 flex flex-col justify-center px-8 gap-3">
                      {[1, 2, 3, 4].map((item) => (
                        <div
                          key={item}
                          className="h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center px-4"
                          style={{
                            borderLeft: item === 2 ? "3px solid #f5af19" : "none",
                            backgroundColor: item === 2 ? "rgba(245, 175, 25, 0.2)" : undefined,
                          }}
                        >
                          <div className="w-3 h-3 rounded-full bg-white/30 mr-3" />
                          <div className="h-2 bg-white/40 rounded flex-1" />
                        </div>
                      ))}
                    </div>
                  )}

                  {index === 2 && (
                    <div className="absolute inset-0 flex items-center justify-center gap-4 px-8">
                      {[-15, 0, 15].map((rot, i) => (
                        <div
                          key={i}
                          className="w-20 h-28 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30"
                          style={{
                            transform: `rotate(${rot}deg) translateY(${Math.abs(rot) * 0.5}px)`,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {index === 3 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Glow effect */}
                        <div
                          className="absolute inset-0 rounded-full blur-3xl"
                          style={{
                            background: "radial-gradient(circle, rgba(245,175,25,0.6) 0%, transparent 70%)",
                            width: "150px",
                            height: "150px",
                            transform: "translate(-25%, -25%)",
                          }}
                        />
                        {/* Mascot face */}
                        <div className="w-24 h-24 rounded-full bg-gradient-to-b from-orange-300 to-orange-500 relative shadow-2xl">
                          {/* Eyes */}
                          <div className="absolute top-8 left-5 w-4 h-4 rounded-full bg-white">
                            <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-gray-800" />
                          </div>
                          <div className="absolute top-8 right-5 w-4 h-4 rounded-full bg-white">
                            <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-gray-800" />
                          </div>
                          {/* Smile */}
                          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-4 border-b-4 border-gray-800 rounded-b-full" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card shadow overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.3) 100%)",
                  }}
                />
              </motion.div>

              {/* 3D Shadow */}
              <div
                className="absolute -bottom-4 left-4 right-4 h-8 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                style={{
                  background: card.gradient,
                  transform: "translateZ(-50px) scale(0.9)",
                }}
              />

              {/* Card Info */}
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComponentShowcase;
