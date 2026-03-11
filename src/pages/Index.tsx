import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import BenefitsBar from "@/components/BenefitsBar";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import BrandsSection from "@/components/BrandsSection";
import Newsletter from "@/components/Newsletter";
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
      <FeaturedProducts />
      <BrandsSection />
      <Newsletter />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
