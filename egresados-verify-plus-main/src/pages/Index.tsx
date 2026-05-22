import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VerificationSection from "@/components/VerificationSection";
import BenefitsSection from "@/components/BenefitsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <VerificationSection />
        <BenefitsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
