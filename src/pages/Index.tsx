import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesStack from "@/components/ServicesStack";
import TrustedBy from "@/components/TrustedBy";
import AboutServices from "@/components/AboutServices";
import OurWork from "@/components/OurWork";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import useSmoothScroll from "@/hooks/useSmoothScroll";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useSmoothScroll(!isLoading);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <div className={`min-h-screen bg-background ${isLoading ? "overflow-hidden" : ""}`}>
        {!isLoading && (
          <>
            <Header />
            <main>
              <Hero />
              <ServicesStack />
              <TrustedBy />
              <AboutServices />
              <OurWork />
            </main>
            <Footer />
          </>
        )}
      </div>
    </>
  );
};

export default Index;
