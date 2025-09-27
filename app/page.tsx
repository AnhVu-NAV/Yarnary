import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { BrandLogos } from "@/components/brand-logos"
import { ProductGrid } from "@/components/product-grid"
import { ServiceFeatures } from "@/components/service-features"
import { PromotionalBanners } from "@/components/promotional-banners"
import { BestSellingBags } from "@/components/best-selling-bags"
import { CollectionShowcase } from "@/components/collection-showcase"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <main>
        <HeroSection />
        {/* <BrandLogos /> */}
        <ProductGrid />
        <ServiceFeatures />
        <PromotionalBanners />
        <BestSellingBags />
        <CollectionShowcase />
        <Newsletter />
      </main>
      {/* <Footer /> */}
    </div>
  )
}
