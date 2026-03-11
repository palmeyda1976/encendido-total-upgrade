import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import BenefitsBar from "@/components/BenefitsBar";
import Categories from "@/components/Categories";
import BrandsSection from "@/components/BrandsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />
      <HeroSlider />
      <BenefitsBar />
      <Categories />
      <BrandsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
