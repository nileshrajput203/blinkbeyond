import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesStack from "@/components/ServicesStack";
import TrustedBy from "@/components/TrustedBy";
import AboutServices from "@/components/AboutServices";
import OurWork from "@/components/OurWork";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ServicesStack />
        <TrustedBy />
        <AboutServices />
        <OurWork />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
