import { FullpageContainer, FullpageSection } from "@/components/Fullpage"
import { HeroSection } from "@/components/hero-section"
import { ProductGrid } from "@/components/product-grid"
import { ServiceFeatures } from "@/components/service-features"
import { PromotionalBanners } from "@/components/promotional-banners"
import { BestSellingBags } from "@/components/best-selling-bags"
import { CollectionShowcase } from "@/components/collection-showcase"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <FullpageContainer>
      <FullpageSection id="hero"><HeroSection /></FullpageSection>
      <FullpageSection id="products"><ProductGrid /></FullpageSection>
      <FullpageSection id="services"><ServiceFeatures /></FullpageSection>
      <FullpageSection id="promos"><PromotionalBanners /></FullpageSection>
      <FullpageSection id="bestsellers"><BestSellingBags /></FullpageSection>
      <FullpageSection id="collections"><CollectionShowcase /></FullpageSection>
      <FullpageSection id="newsletter"><Newsletter /></FullpageSection>
      {/* Footer là frame cuối để vẫn snap đẹp */}
      <FullpageSection id="footer"><Footer /></FullpageSection>
    </FullpageContainer>
  )
}
