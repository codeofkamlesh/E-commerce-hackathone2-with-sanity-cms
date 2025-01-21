import HomeHeroSection from "../components/HomeHeroSection";
import LogoShowcase from "../components/HomeAllLogoShowcase";
import FeaturedProducts from "../components/Homefeaturedproducts";
import TopCategories from "../components/Hometopcategories";
import HotCategories from "../components/HomeHotcategories";
import ProductGrid from "../components/HomeOurProductGrid";

export default async function Home() {
  return (
    <div>

      <HomeHeroSection />
      <LogoShowcase />
      <FeaturedProducts />
      <TopCategories />
      <HotCategories />
      <ProductGrid />
    </div>
  );
}
